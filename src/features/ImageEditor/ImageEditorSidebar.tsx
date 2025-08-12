import { useState } from "react";
import { ChevronRight, Settings } from "lucide-react";
import { Button, Separator } from "@/shared/ui";
import { useBellow } from "@/shared/lib/hooks";
import { ImageEditorSidebarResize } from "./ImageEditorSidebarResize";
import { ImageEditorSidebarCrop } from "./ImageEditorSidebarCrop";
import { ImageEditorSidebarPresets } from "./ImageEditorSidebarPresets";
import ImageEditorSidebarFlip from "./ImageEditorSidebarFlip";
import { ImageEditorSidebarFilters } from "./ImageEditorSidebarFilters";

export const ImageEditorSidebar = () => {
  const [open, setOpen] = useState(false);
  const isBellowMd = useBellow("md");

  return (
    <div
      className="w-0 relative z-10 transition-transform md:transition-none md:w-80"
      style={{
        transform: isBellowMd && open ? "translateX(-320px)" : "translateX(0%)",
      }}
    >
      <div className="absolute inset-0 box-border border-l border-l-neutral-300 ">
        <div className="absolute flex flex-col top-0 left-0 h-full w-80 overflow-y-auto bg-white py-3 px-4">
          <ImageEditorSidebarResize />
          <Separator className="mt-5 mb-3" />
          <div className="flex flex-col gap-3">
            <ImageEditorSidebarCrop />
            <ImageEditorSidebarPresets />
          </div>
          <Separator className="mt-5 mb-3" />
          <ImageEditorSidebarFlip />
          <Separator className="mt-5 mb-3" />
          <ImageEditorSidebarFilters />
        </div>
        <Button
          variant="outline"
          className="absolute top-1 right-1 md:hidden rounded-full size-10"
          onClick={() => setOpen(!open)}
        >
          {!open && <Settings className="size-5" />}
          {open && <ChevronRight className="size-5" />}
        </Button>
      </div>
    </div>
  );
};
