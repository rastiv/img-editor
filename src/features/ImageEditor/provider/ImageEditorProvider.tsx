import { useReducer } from "react";
import { storeReducer } from "./storeReducer";
import { initialState } from "./initialState";
import { StoreContext } from "./StoreContext";
import type { ActionCrop, ActionWithVal, Sizes } from "../types";

type ImageEditorProviderProps = {
  children: React.ReactNode;
  base64: string;
  width: number;
  height: number;
  fileName: string;
  title: string;
  ext: string;
};

export const ImageEditorProvider = ({
  children,
  base64,
  width,
  height,
  fileName,
  title,
  ext,
}: ImageEditorProviderProps) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const getResize = (): Sizes =>
    (state.history.actions.find((a) => a.name === "resize")?.args as Sizes) ?? {
      width,
      height,
    };

  const getCrop = (): ActionCrop =>
    state.history.actions.find((a) => a.name === "crop")?.args as ActionCrop;

  const getFlipH = (): number => {
    const args = (state.history.actions.find((a) => a.name === "flipH")
      ?.args as ActionWithVal) ?? { val: 1 };
    return args.val as number;
  };

  const getFlipV = (): number => {
    const args = (state.history.actions.find((a) => a.name === "flipV")
      ?.args as ActionWithVal) ?? { val: 1 };
    return args.val as number;
  };

  const getFilters = (): Record<string, number> => {
    const args = (state.history.actions.find((a) => a.name === "filters")
      ?.args as Record<string, number>) ?? {
      saturate: 100,
      brightness: 100,
      contrast: 100,
      sepia: 0,
    };
    return args ?? {};
  };

  const value = {
    ...state,
    base64,
    originWidth: width,
    originHeight: height,
    fileName,
    title,
    ext,
    dispatch,
    getResize,
    getCrop,
    getFlipH,
    getFlipV,
    getFilters,
  };

  return <StoreContext value={value}>{children}</StoreContext>;
};
