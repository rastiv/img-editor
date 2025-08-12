import { useState, useEffect } from "react";
import { useImageEditorContext } from "./provider/useImageEditorContext";
import type { CropSizes } from "./types";

const renderCanvas = (img: HTMLImageElement) => {
  let prevCnv: HTMLImageElement | HTMLCanvasElement = img;

  return {
    resize: function (width: number, height: number) {
      const cnv = document.createElement("canvas");
      const ctx: CanvasRenderingContext2D | null = cnv.getContext("2d");

      cnv.width = width;
      cnv.height = height;

      if (ctx) {
        ctx.drawImage(prevCnv, 0, 0, width, height);
      }

      prevCnv = cnv;
    },

    filters: function (filters: Record<string, number>) {
      const cnv = document.createElement("canvas");
      const ctx: CanvasRenderingContext2D | null = cnv.getContext("2d");

      cnv.width = prevCnv.width;
      cnv.height = prevCnv.height;

      const filterString = Object.entries(filters)
        .map(([name, value]) => `${name}(${value}%)`)
        .join(" ");

      if (ctx) {
        ctx.filter = filterString;
        ctx.drawImage(prevCnv, 0, 0);
      }

      prevCnv = cnv;
    },

    flipH: function (val = 1) {
      const cnv = document.createElement("canvas");
      const ctx: CanvasRenderingContext2D | null = cnv.getContext("2d");

      cnv.width = prevCnv.width;
      cnv.height = prevCnv.height;

      if (ctx) {
        ctx.scale(val, 1);
        ctx.drawImage(
          prevCnv,
          -prevCnv.width,
          0,
          prevCnv.width,
          prevCnv.height
        );
      }

      prevCnv = cnv;
    },

    flipV: function (val = 1) {
      const cnv = document.createElement("canvas");
      const ctx: CanvasRenderingContext2D | null = cnv.getContext("2d");

      cnv.width = prevCnv.width;
      cnv.height = prevCnv.height;

      if (ctx) {
        ctx.scale(1, val);
        ctx.drawImage(
          prevCnv,
          0,
          -prevCnv.height,
          prevCnv.width,
          prevCnv.height
        );
      }

      prevCnv = cnv;
    },

    crop: function (
      frameWidth: number,
      x: number,
      y: number,
      w: number,
      h: number,
      isPreset: boolean,
      presets: CropSizes
    ) {
      const cnv = document.createElement("canvas");
      const ctx: CanvasRenderingContext2D | null = cnv.getContext("2d");

      const ratio = prevCnv.width / frameWidth;
      const mapCrop = {
        x: Math.round(x * ratio),
        y: Math.round(y * ratio),
        w: Math.round(w * ratio),
        h: Math.round(h * ratio),
      };

      cnv.width = isPreset ? presets.w : mapCrop.w;
      cnv.height = isPreset ? presets.h : mapCrop.h;

      if (ctx) {
        ctx.drawImage(
          prevCnv,
          mapCrop.x,
          mapCrop.y,
          mapCrop.w,
          mapCrop.h,
          0,
          0,
          isPreset ? presets.w : mapCrop.w,
          isPreset ? presets.h : mapCrop.h
        );
      }
      prevCnv = cnv;
    },

    get: function (): HTMLCanvasElement | HTMLImageElement {
      return prevCnv;
    },
  };
};

export const useCanvas = (
  isStartRender: boolean
): {
  isLoading: boolean;
  error: string;
  updatedBase64: string;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [updatedBase64, setUpdatedBase64] = useState<string>("");

  const { base64, frameSizes, history } = useImageEditorContext();

  useEffect(() => {
    if (!isStartRender) return;
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const { actions } = history;
      const canvas = renderCanvas(img);

      actions
        .map((action) =>
          action.name === "crop"
            ? {
                ...action,
                args: {
                  frameWidth: frameSizes.width,
                  x: action.args.x,
                  y: action.args.y,
                  w: action.args.w,
                  h: action.args.h,
                  isPreset: action.args.isPreset,
                  presets: action.args.presets,
                },
              }
            : action
        )
        .forEach((action) => {
          if (action.name === "resize") {
            const { width, height } = action.args;
            canvas.resize(width, height);
          } else if (action.name === "filters") {
            canvas.filters(action.args);
          } else if (action.name === "flipH") {
            const { val } = action.args;
            canvas.flipH(val);
          } else if (action.name === "flipV") {
            const { val } = action.args;
            canvas.flipV(val);
          } else if (action.name === "crop") {
            const { frameWidth, x, y, w, h, isPreset, presets } = action.args;
            canvas.crop(frameWidth, x, y, w, h, isPreset, presets);
          }
        });

      const result = canvas.get();

      let updatedBase64: string;
      if (result instanceof HTMLCanvasElement) {
        updatedBase64 = result.toDataURL("image/png");
      } else {
        // result is HTMLImageElement, draw it to a canvas first
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = result.width;
        tempCanvas.height = result.height;
        const ctx = tempCanvas.getContext("2d");
        ctx?.drawImage(result, 0, 0);
        updatedBase64 = tempCanvas.toDataURL("image/png");
      }
      setUpdatedBase64(updatedBase64);
      setIsLoading(false);
    };
    img.onerror = (err) => {
      setError(typeof err === "string" ? err : "Failed to load image");
      setIsLoading(false);
    };
    img.src = base64;
  }, [base64, frameSizes, history, isStartRender]);

  return { isLoading, error, updatedBase64 };
};
