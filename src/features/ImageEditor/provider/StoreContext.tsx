import { createContext } from "react";
import { initialState } from "./initialState";
import type { ReducerAction } from "./storeReducer";
import type { ActionCrop, Sizes } from "../types";

type StoreContextType = typeof initialState & {
  base64: string;
  originWidth: number;
  originHeight: number;
  title: string;
  fileName: string;
  ext: string;
  dispatch: React.Dispatch<ReducerAction>;
  getResize: () => Sizes;
  getCrop: () => ActionCrop;
  getFlipH: () => number;
  getFlipV: () => number;
  getFilters: () => Record<string, number>;
};

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);
