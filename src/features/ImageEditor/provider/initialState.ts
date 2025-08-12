import type { Sizes, History } from "../types";

export type ImageEditorContextType = {
  history: History;
  frameSizes: Sizes;
};

export const initialState: ImageEditorContextType = {
  history: {
    pointer: -1,
    items: [],
    actions: [],
  },
  frameSizes: { width: 0, height: 0 },
};
