import { useState } from "react";
import type { Image } from "@/app/entries/image/type";
import { Skeleton } from "@/shared/ui";
import { Link } from "react-router-dom";
import { cn } from "@/shared/lib";

type ImageCardProps = {
  image: Image;
};

export const ImageCard = ({ image }: ImageCardProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const buttonStyle =
    "w-full text-center px-4 py-2 text-sm font-semibold bg-amber-500 text-white rounded-xl";

  return (
    <div className="flex flex-col gap-4 bg-white rounded-2xl p-1 shadow-sm">
      <div className="bg-neutral-200 rounded-xl overflow-hidden pb-[75%] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {loading && <Skeleton className="w-full h-full" />}
          {error && (
            <div className="text-sm text-muted-foreground">
              Error loading image
            </div>
          )}
          <img
            onLoad={() => setLoading(false)}
            onError={() => setError(true)}
            src={image.thumbnail}
            alt={image.title}
            className="object-fill"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="px-2 text-md font-semibold text-neutral-800 leading-4">
          {image.title}
        </h3>
        <p className="px-2 text-sm text-neutral-500">{image.author}</p>
      </div>
      <div className="flex items-end flex-1">
        {loading && (
          <div className={cn(buttonStyle, "opacity-50")}>Edit Image</div>
        )}
        {!loading && (
          <Link
            to={`/images/${image.id}/edit`}
            className={cn(buttonStyle, "hover:bg-amber-600 transition-colors")}
          >
            Edit Image
          </Link>
        )}
      </div>
    </div>
  );
};
