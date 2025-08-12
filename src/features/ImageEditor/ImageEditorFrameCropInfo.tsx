import { useRef, useImperativeHandle } from "react";
import { FoldHorizontal, FoldVertical, X } from "lucide-react";
import { Button, Separator } from "@/shared/ui";
import { getCropByNewSizes } from "./utils";
import type { CropRect } from "./types";
import { useImageEditorContext } from "./provider/useImageEditorContext";

export type ImageEditorFrameCropInfoRef = {
  update: (updatedCrop: CropRect) => void;
};

export const ImageEditorFrameCropInfo = ({
  ref,
}: {
  ref?: React.Ref<ImageEditorFrameCropInfoRef>;
}) => {
  const { getResize, frameSizes, getCrop, dispatch } = useImageEditorContext();

  const crop = getCrop();
  const resize = getResize();

  const widthRef = useRef<HTMLSpanElement>(null);
  const heightRef = useRef<HTMLSpanElement>(null);

  const { w, h } = crop.isPreset
    ? crop.presets
    : getCropByNewSizes(
        { x: crop.x, y: crop.y, w: crop.w, h: crop.h },
        resize.width,
        resize.height,
        frameSizes.width
      );

  useImperativeHandle(ref, () => ({
    update: (updatedCrop: CropRect) => {
      const updatedSizes = crop.isPreset
        ? crop.presets
        : getCropByNewSizes(
            updatedCrop,
            resize.width,
            resize.height,
            frameSizes.width
          );
      if (!widthRef.current || !heightRef.current) {
        return;
      }
      widthRef.current.textContent = updatedSizes.w.toString();
      heightRef.current.textContent = updatedSizes.h.toString();
    },
  }));

  const handleCenterHorizontal = () => {
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        name: "crop",
        args: {
          ...crop,
          x: (frameSizes.width - crop.w) / 2,
        },
      },
    });
  };

  const handleCenterVertical = () => {
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        name: "crop",
        args: {
          ...crop,
          y: (frameSizes.height - crop.h) / 2,
        },
      },
    });
  };

  const handleClose = () => {
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        name: "crop",
        args: {
          ...crop,
          isClosed: true,
        },
      },
    });
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-sm flex h-10 items-center">
      <div className="flex">
        <Button
          type="button"
          variant="ghost"
          className="size-10 flex items-center justify-center rounded-none"
          onClick={handleCenterHorizontal}
          disabled={crop.x === (frameSizes.width - crop.w) / 2}
        >
          <FoldHorizontal className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="size-10 flex items-center justify-center rounded-none"
          onClick={handleCenterVertical}
          disabled={crop.y === (frameSizes.height - crop.h) / 2}
        >
          <FoldVertical className="size-4" />
        </Button>
      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center">
        <div className="flex pl-4">
          <div className="relative font-semibold min-w-12">
            <span ref={widthRef} className="text-sm relative top-[3px]">
              {w}
            </span>
            <span className="absolute text-xs left-0 -translate-y-[8px] opacity-40">
              width
            </span>
          </div>
        </div>
        <div className="flex pl-2 pr-1">
          <div className="relative font-semibold min-w-12">
            <span ref={heightRef} className="text-sm relative top-[3px]">
              {h}
            </span>
            <span className="absolute text-xs left-0 -translate-y-[8px] opacity-40">
              height
            </span>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <Button
        type="button"
        variant="ghost"
        className="size-10 flex items-center justify-center rounded-none"
        onClick={handleClose}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
};
