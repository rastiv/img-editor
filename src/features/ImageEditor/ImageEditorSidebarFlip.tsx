import { FlipHorizontal, FlipVertical } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { useImageEditorContext } from "./provider/useImageEditorContext";

const ImageEditorSidebarFlip = () => {
  const { dispatch, getFlipH, getFlipV } = useImageEditorContext();

  const flipH = getFlipH();
  const flipV = getFlipV();

  const handleChangeFlip = (direction: "H" | "V") => {
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        name: direction === "H" ? "flipH" : "flipV",
        args: { val: direction === "H" ? flipH * -1 : flipV * -1 },
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h4>Flip</h4>
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className={cn(
            "size-10 rounded",
            flipH !== 1 ? "border-blue-600 bg-blue-50" : ""
          )}
          onClick={() => handleChangeFlip("H")}
        >
          <FlipHorizontal className="size-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "size-10 rounded",
            flipV !== 1 ? "border-blue-600 bg-blue-50" : ""
          )}
          onClick={() => handleChangeFlip("V")}
        >
          <FlipVertical className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default ImageEditorSidebarFlip;
