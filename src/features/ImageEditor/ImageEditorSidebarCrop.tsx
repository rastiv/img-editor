import { Crop, Image, Square } from "lucide-react";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { useImageEditorContext } from "./provider/useImageEditorContext";
import { getInitalCrop } from "./utils";

export const ImageEditorSidebarCrop = () => {
  const { originHeight, originWidth, dispatch, getCrop, frameSizes } =
    useImageEditorContext();

  const crop = getCrop();
  const originRation = originWidth / originHeight;

  const handleClick = (id: string, ratio: number) => {
    if (id === crop?.id) {
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
      return;
    }

    const args = {
      id,
      ratio,
      isOrigin: id === "original",
      isFree: id === "freeform",
      isPreset: false,
      isClosed: false,
      ...getInitalCrop(ratio, frameSizes.width, frameSizes.height),
      presets: { w: 0, h: 0 },
    };

    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        name: "crop",
        args,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h4>Crop</h4>
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          className={cn(
            "flex flex-col items-center gap-2 h-auto py-3 rounded",
            crop?.id === "freeform" ? "border-blue-600 bg-blue-50" : "",
            "transition-colors"
          )}
          onClick={() => handleClick("freeform", originRation)}
        >
          <Crop className="size-5" />
          <div className="text-xs font-normal">Freeform</div>
        </Button>
        <Button
          variant="outline"
          className={cn(
            "flex flex-col items-center gap-2 h-auto py-3 rounded",
            crop?.id === "original" ? "border-blue-600 bg-blue-50" : "",
            "transition-colors"
          )}
          onClick={() => handleClick("original", originRation)}
        >
          <Image className="size-5" />
          <div className="text-xs font-normal">Original</div>
        </Button>
        <Button
          variant="outline"
          className={cn(
            "flex flex-col items-center gap-2 h-auto py-3 rounded",
            crop?.id === "1:1" ? "border-blue-600 bg-blue-50" : "",
            "transition-colors"
          )}
          onClick={() => handleClick("1:1", 1)}
        >
          <Square className="size-5" />
          <div className="text-xs font-normal">1 : 1</div>
        </Button>
      </div>
    </div>
  );
};
