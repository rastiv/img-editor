import type { Image } from "@/app/entries/image";
import { useImage } from "./useImage";
import { ImageEditorHeader } from "./ImageEditorHeader";
import { ImageEditorProvider } from "./provider/ImageEditorProvider";
import { ImageEditorFrame } from "./ImageEditorFrame";
import { ImageEditorSidebar } from "./ImageEditorSidebar";
import type { FuncSaveArgs } from "./types";

type ImageEditorProps = {
  image: Image;
  onSave: FuncSaveArgs;
  onBack: () => void;
};

export const ImageEditor = ({ image, onSave, onBack }: ImageEditorProps) => {
  const { loading, error, width, height, base64 } = useImage(
    image.original,
    image.ext
  );

  if (loading || error) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        {loading && <div className="text-muted-foreground">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  }

  return (
    <ImageEditorProvider
      base64={base64}
      width={width}
      height={height}
      fileName={image.fileName}
      title={image.title}
      ext={image.ext}
    >
      <div className="flex flex-col min-h-svh w-full bg-neutral-50">
        <ImageEditorHeader image={image} onSave={onSave} onBack={onBack} />
        <div className="flex-1 flex overflow-hidden">
          <ImageEditorFrame />
          <ImageEditorSidebar />
        </div>
      </div>
    </ImageEditorProvider>
  );
};
