import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { presetsData } from "@/app/entries/image";
import { useImageEditorContext } from "./provider/useImageEditorContext";
import { getInitalCrop } from "./utils";
import { X } from "lucide-react";

const presetOptions = presetsData.map((p) => p.options).flat();

export const ImageEditorSidebarPresets = () => {
  const { dispatch, getCrop, frameSizes } = useImageEditorContext();

  const crop = getCrop();

  const isCropPreset = crop?.isPreset;

  const handleChange = (value: string) => {
    if (value === crop?.id) return;
    const option = presetOptions.find((po) => po.id === value);
    if (!option) return;

    const ratio = option.w / option.h;

    const args = {
      id: value,
      ratio,
      isOrigin: false,
      isFree: false,
      isPreset: true,
      isClosed: false,
      ...getInitalCrop(ratio, frameSizes.width, frameSizes.height),
      presets: { w: option.w, h: option.h },
    };

    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        name: "crop",
        args,
      },
    });
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div className="flex flex-col gap-2">
      <h5 className="text-sm">Presets</h5>
      <div className="relative">
        <Select
          value={isCropPreset ? crop?.id : ""}
          onValueChange={handleChange}
        >
          {isCropPreset && (
            <Button
              variant="ghost"
              className="absolute right-8 top-1/2 -translate-y-1/2 size-6 rounded z-10"
              onClick={handleClose}
            >
              <X className="size-3.5" />
            </Button>
          )}
          <SelectTrigger className="relative w-full rounded">
            <SelectValue placeholder="Select a preset" />
          </SelectTrigger>
          <SelectContent>
            {presetsData.map((group) => (
              <SelectGroup key={group.id}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
