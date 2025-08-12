import type { ChangeEvent } from "react";
import { X, Lock } from "lucide-react";
import { Input } from "@/shared/ui";
import { useImageEditorContext } from "./provider/useImageEditorContext";

export const ImageEditorSidebarResize = () => {
  const { originHeight, originWidth, dispatch, getResize } =
    useImageEditorContext();
  const { width, height } = getResize();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = /^([0-9]\d*)$/g.test(e.target.value) ? e.target.value : "0";
    if (value.length > 1) value = value.replace(/^0+/, "");

    const originRation = originWidth / originHeight;
    let updatedWidth = 0;
    let updatedHeight = 0;

    if (e.target.name === "width") {
      updatedWidth = Number(value);
      updatedHeight = Math.round(updatedWidth / originRation);
    }

    if (e.target.name === "height") {
      updatedHeight = Number(value);
      updatedWidth = Math.round(updatedHeight * originRation);
    }

    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        name: "resize",
        args: { width: updatedWidth, height: updatedHeight },
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <h4>Resize</h4>
      <div className="flex gap-2 items-center">
        <PixelInput
          value={width}
          name="width"
          label="Width"
          onChange={handleChange}
        />
        <X className="size-4 text-muted-foreground" />
        <PixelInput
          value={height}
          name="height"
          label="Height"
          onChange={handleChange}
        />
        <Lock className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
};

type PixelInputProps = {
  value: number;
  name: string;
  label: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

const PixelInput = ({ value, name, label, onChange }: PixelInputProps) => {
  return (
    <div className="relative">
      <Input
        value={value}
        onChange={onChange}
        name={name}
        className="w-28 pl-3 pr-8 py-4 rounded"
      />
      <span className="absolute bottom-1 right-2 text-sm text-muted-foreground">
        px
      </span>
      <label className="absolute left-2 -top-2 text-xs text-muted-foreground bg-white px-1">
        {label}
      </label>
    </div>
  );
};
