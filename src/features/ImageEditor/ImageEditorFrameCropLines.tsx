import { cn } from "@/shared/lib";

const styleLine = "absolute border border-dashed border-white opacity-50";
const styleLineVertical =
  "w-[33%] h-full top-0 left-[33%] border-t-0 border-b-0";
const styleLineHorizontal =
  "w-full h-[33%] top-[33%] left-0 border-r-0 border-l-0";

export const ImageEditorFrameCropLines = () => {
  return (
    <>
      <span className={cn(styleLine, styleLineVertical)} />
      <span className={cn(styleLine, styleLineHorizontal)} />
    </>
  );
};
