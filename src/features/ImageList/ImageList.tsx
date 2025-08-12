import { imagesData } from "@/app/entries/image";
import { ImageCard } from "./ImageCard";

export const ImageList = () => {
  return (
    <div className="w-4xl p-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:p-8">
      {imagesData.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};
