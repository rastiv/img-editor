export type Sizes = {
  width: number;
  height: number;
};

export type Direction = "r" | "l" | "t" | "b" | "tl" | "tr" | "bl" | "br";

export type CropSizes = {
  w: number;
  h: number;
};

export type CropRect = CropSizes & {
  x: number;
  y: number;
};

export type ActionCrop = CropRect & {
  id: string;
  ratio: number;
  isOrigin: boolean;
  isFree: boolean;
  isClosed: boolean;
  isPreset: boolean;
  presets: Pick<CropRect, "w" | "h">;
};

export type ActionWithVal = {
  val: number;
};

export type HistoryItem = (
  | { name: "crop"; args: ActionCrop }
  | { name: "resize"; args: Sizes }
  | { name: "flipH"; args: ActionWithVal }
  | { name: "flipV"; args: ActionWithVal }
  | { name: "filters"; args: Record<string, number> }
) & {
  undo?: number;
  redo?: number;
};

export type History = {
  pointer: number;
  items: Array<HistoryItem>;
  actions: Array<HistoryItem>;
};

export type FuncSaveArgs = (base64: string, fileName: string) => void;
