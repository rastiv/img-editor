import { useEffect, useRef } from "react";
import { getCropPoints } from "./utils";
import { useImageEditorContext } from "./provider/useImageEditorContext";
import { ImageEditorFrameCropLines } from "./ImageEditorFrameCropLines";
import { ImageEditorFrameCropBorders } from "./ImageEditorFrameCropBorders";
import { ImageEditorFrameCropPointers } from "./ImageEditorFrameCropPointers";
import type { CropRect, Direction } from "./types";

type ImageEditorFrameCropProps = {
  onDragging: (draggingCrop: CropRect) => void;
};

const ImageEditorFrameCrop = ({ onDragging }: ImageEditorFrameCropProps) => {
  const {
    base64,
    frameSizes,
    dispatch,
    getCrop,
    getFlipH,
    getFlipV,
    getFilters,
  } = useImageEditorContext();

  const crop = getCrop();
  const flipH = getFlipH();
  const flipV = getFlipV();
  const filters = getFilters();

  const filtersString = Object.entries(filters)
    .map(([name, value]) => `${name}(${value}%)`)
    .join(" ");

  const cropRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const directionRef = useRef<Direction | "">("");

  const { width: fW, height: fH } = frameSizes ?? { width: 0, height: 0 };

  const getClientCoordinates = (e: React.MouseEvent) => {
    return { clientX: e.clientX, clientY: e.clientY };
  };

  const handleCropStart = (
    e: React.MouseEvent,
    type: Direction,
    cursor: string
  ) => {
    if (!cropRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const { clientX, clientY } = getClientCoordinates(e);
    startPointRef.current = { x: clientX, y: clientY };
    directionRef.current = type;
    cropRef.current.style.cursor = `${cursor}-resize`;
    document.body.style.cursor = `${cursor}-resize`;
  };

  useEffect(() => {
    const handleMoveStart = (e: MouseEvent) => {
      e.preventDefault();

      const clientX = e.clientX;
      const clientY = e.clientY;
      startPointRef.current = { x: clientX, y: clientY };
      document.body.style.cursor = "move";
    };

    const handleMove = (e: MouseEvent) => {
      e.preventDefault();

      if (!imgRef.current || !cropRef.current || !startPointRef.current)
        return false;

      const clientX = e.clientX;
      const clientY = e.clientY;
      const elCrop = cropRef.current;
      const elImage = imgRef.current;

      // handle moving the frame
      if (startPointRef.current && !directionRef.current) {
        const { offsetWidth: frmWidth, offsetHeight: frmHeight } = elCrop;
        const { x, y } = startPointRef.current;

        const newX = (crop.x ?? 0) + (clientX - x);
        const newY = (crop.y ?? 0) + (clientY - y);

        const left =
          newX > 0 ? (newX + frmWidth > fW ? fW - frmWidth : newX) : 0;
        const top =
          newY > 0 ? (newY + frmHeight > fH ? fH - frmHeight : newY) : 0;

        elCrop.style.top = `${top}px`;
        elCrop.style.left = `${left}px`;
        elImage.style.clipPath = `xywh(${left}px ${top}px ${crop.w}px ${crop.h}px)`;

        onDragging({ x: left, y: top, w: crop.w, h: crop.h });
      }

      // handle resizing the frame
      if (directionRef.current) {
        const { x, y, w, h } = getCropPoints(
          directionRef.current,
          crop.isFree,
          crop.ratio,
          startPointRef.current.x,
          startPointRef.current.y,
          clientX,
          clientY,
          fW,
          fH,
          crop,
          elCrop
        );
        elCrop.style.left = `${x}px`;
        elCrop.style.top = `${y}px`;
        elCrop.style.width = `${w}px`;
        elCrop.style.height = `${h}px`;
        elImage.style.clipPath = `xywh(${x}px ${y}px ${w}px ${h}px)`;

        onDragging({ x, y, w, h });
      }
    };

    const handelMoveEnd = () => {
      if (!startPointRef.current || !cropRef.current) return false;

      const elCrop = cropRef.current;

      dispatch({
        type: "ADD_TO_HISTORY",
        payload: {
          name: "crop",
          args: {
            ...crop,
            x: elCrop.offsetLeft,
            y: elCrop.offsetTop,
            w: elCrop.offsetWidth,
            h: elCrop.offsetHeight,
          },
        },
      });

      startPointRef.current = null;
      directionRef.current = "";
      elCrop.style.cursor = "move";
      document.body.style.cursor = "auto";
    };

    if (!cropRef.current) return;

    cropRef.current.addEventListener("mousedown", handleMoveStart);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handelMoveEnd);

    return () => {
      if (cropRef.current) {
        cropRef.current.removeEventListener("mousedown", handleMoveStart);
      }
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handelMoveEnd);
    };
  }, [crop, dispatch, fH, fW, onDragging]);

  if (!crop) return null;

  return (
    <>
      <div
        ref={imgRef}
        className="absolute flex justify-center items-center cursor-move"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: `${fH}px`,
          width: `${fW}px`,
          clipPath: `xywh(${crop.x}px ${crop.y}px ${crop.w}px ${crop.h}px)`,
        }}
      >
        <img
          src={base64}
          alt="Cropped image"
          style={{
            width: `${fW}px`,
            height: `${fH}px`,
            transform: `scaleX(${flipH}) scaleY(${flipV})`,
            filter: filtersString,
          }}
        />
      </div>
      <div
        ref={cropRef}
        className="absolute cursor-move"
        style={{
          top: `${crop.y}px`,
          left: `${crop.x}px`,
          height: `${crop.h}px`,
          width: `${crop.w}px`,
        }}
      >
        <ImageEditorFrameCropLines />
        <ImageEditorFrameCropBorders onMouseDown={handleCropStart} />
        <ImageEditorFrameCropPointers onMouseDown={handleCropStart} />
      </div>
    </>
  );
};

export default ImageEditorFrameCrop;
