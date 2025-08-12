import { useEffect, useState } from "react";

export const useImage = (
  src: string,
  extension: string
): {
  loading: boolean;
  error: string;
  width: number;
  height: number;
  base64: string;
} => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [base64, setBase64] = useState<string>("");

  useEffect(() => {
    const preloadImage = async (): Promise<{ width: number; height: number }> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            img.width,
            img.height
          );
          setBase64(canvas.toDataURL("png"));
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
      });

    if (!["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      setLoading(false);
      setError("Invalid extension. Allowed: jpg, jpeg, png, gif, webp");
      return;
    }

    preloadImage()
      .then((res) => {
        setWidth(res.width);
        setHeight(res.height);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to load image");
      });
  }, [extension, src]);

  return { loading, error, width, height, base64 };
};
