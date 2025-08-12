import { cn } from "@/shared/lib";
import type { Direction } from "./types";

const styleBorder = "absolute bg-blue-500";
const styleTop =
  "top-0 left-0 w-full h-[2px] -tranlate-y-[1px] cursor-ns-resize";
const styleRight =
  "top-0 right-0 w-[2px] h-full tranlate-x-[1px] cursor-ew-resize";
const styleBottom =
  "bottom-0 left-0 w-full h-[2px] tranlate-y-[1px] cursor-ns-resize";
const styleLeft =
  "top-0 left-0 w-[2px] h-full -tranlate-x-[1px] cursor-ew-resize";

type ImageEditorFrameCropBordersProps = {
  onMouseDown: (e: React.MouseEvent, type: Direction, cursor: string) => void;
};

export const ImageEditorFrameCropBorders = ({
  onMouseDown,
}: ImageEditorFrameCropBordersProps) => {
  return (
    <>
      <span
        className={cn(styleBorder, styleTop)}
        onMouseDown={(e: React.MouseEvent) => onMouseDown(e, "t", "ns")}
      />
      <span
        className={cn(styleBorder, styleRight)}
        onMouseDown={(e) => onMouseDown(e, "r", "ew")}
      />
      <span
        className={cn(styleBorder, styleBottom)}
        onMouseDown={(e) => onMouseDown(e, "b", "ns")}
      />
      <span
        className={cn(styleBorder, styleLeft)}
        onMouseDown={(e) => onMouseDown(e, "l", "ew")}
      />
    </>
  );
};
