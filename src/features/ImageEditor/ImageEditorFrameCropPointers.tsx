import { cn } from "@/shared/lib";
import type { Direction } from "./types";

const stylePointer =
  "absolute border-box w-[10px] h-[10px] border border-blue-500 bg-white/80";
const styleTopLeft = "-top-[5px] -left-[5px] cursor-nwse-resize";
const styleTop = "-top-[5px] left-1/2 -translate-x-1/2 cursor-ns-resize";
const styleTopRight = "-top-[5px] -right-[5px] cursor-nesw-resize";
const styleRight = "top-1/2 -right-[5px] -translate-y-1/2 cursor-ew-resize";
const styleBottomRight = "-bottom-[5px] -right-[5px] cursor-nwse-resize";
const styleBottom = "-bottom-[5px] left-1/2 -translate-x-1/2 cursor-ns-resize";
const styleBottomLeft = "-bottom-[5px] -left-[5px] cursor-nesw-resize";
const styleLeft = "top-1/2 -left-[5px] -translate-y-1/2 cursor-ew-resize";

type ImageEditorFrameCropPointersProps = {
  onMouseDown: (e: React.MouseEvent, type: Direction, cursor: string) => void;
};

export const ImageEditorFrameCropPointers = ({
  onMouseDown,
}: ImageEditorFrameCropPointersProps) => {
  return (
    <>
      <span
        className={cn(stylePointer, styleTopLeft)}
        onMouseDown={(e) => onMouseDown(e, "tl", "nwse")}
      />
      <span
        className={cn(stylePointer, styleTop)}
        onMouseDown={(e) => onMouseDown(e, "t", "ns")}
      />
      <span
        className={cn(stylePointer, styleTopRight)}
        onMouseDown={(e) => onMouseDown(e, "tr", "nesw")}
      />
      <span
        className={cn(stylePointer, styleRight)}
        onMouseDown={(e) => onMouseDown(e, "r", "ew")}
      />
      <span
        className={cn(stylePointer, styleBottomRight)}
        onMouseDown={(e) => onMouseDown(e, "br", "nwse")}
      />
      <span
        className={cn(stylePointer, styleBottom)}
        onMouseDown={(e) => onMouseDown(e, "b", "ns")}
      />
      <span
        className={cn(stylePointer, styleBottomLeft)}
        onMouseDown={(e) => onMouseDown(e, "bl", "nesw")}
      />
      <span
        className={cn(stylePointer, styleLeft)}
        onMouseDown={(e) => onMouseDown(e, "l", "ew")}
      />
    </>
  );
};
