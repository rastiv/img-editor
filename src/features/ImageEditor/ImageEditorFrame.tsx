import { useLayoutEffect, useRef } from "react";
import { useImageEditorContext } from "./provider/useImageEditorContext";
import ImageEditorFrameCrop from "./ImageEditorFrameCrop";
import { ImageEditorFrameCropInfo } from "./ImageEditorFrameCropInfo";
import type { ImageEditorFrameCropInfoRef } from "./ImageEditorFrameCropInfo";
import { cn } from "@/shared/lib";
import type { CropRect } from "./types";

export const ImageEditorFrame = () => {
  const {
    base64,
    originHeight,
    originWidth,
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

  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const cropInfoRef = useRef<ImageEditorFrameCropInfoRef>(null);

  const handleDragging = (draggingCrop: CropRect) => {
    if (!cropInfoRef.current) return;
    cropInfoRef.current.update(draggingCrop);
  };

  useLayoutEffect(() => {
    if (!wrapperRef.current || !frameRef.current || !imgRef.current) return;

    const ratio = originWidth / originHeight;
    const { offsetWidth: wW, offsetHeight: wH } = wrapperRef.current;

    let fW = 0;
    let fH = 0;
    if (wW / wH > ratio) {
      fH = wH;
      fW = Math.round(fH * ratio);
    } else {
      fW = wW;
      fH = Math.round(fW / ratio);
    }
    frameRef.current.style.width = `${fW}px`;
    frameRef.current.style.height = `${fH}px`;
    imgRef.current.style.width = `${fW}px`;
    imgRef.current.style.height = `${fH}px`;

    dispatch({
      type: "SET_FRAME_SIZES",
      payload: {
        width: fW,
        height: fH,
      },
    });
  }, [base64, dispatch, originHeight, originWidth]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "flex-1 flex justify-center items-center relative overflow-hidden",
        crop && "bg-neutral-900/50"
      )}
    >
      <div ref={frameRef} className="flex justify-center items-center relative">
        <img
          ref={imgRef}
          src={base64}
          alt="Image"
          style={{
            transform: `scaleX(${flipH}) scaleY(${flipV})`,
            opacity: crop ? 0.4 : 1,
            width: 0,
            height: 0,
            filter: filtersString,
          }}
        />
        {crop && <ImageEditorFrameCrop onDragging={handleDragging} />}
      </div>
      {crop && <ImageEditorFrameCropInfo ref={cropInfoRef} />}
    </div>
  );
};
