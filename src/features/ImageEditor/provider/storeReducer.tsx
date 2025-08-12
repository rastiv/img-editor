import type { ActionCrop, HistoryItem, Sizes } from "../types";
import { initialState } from "./initialState";

export type ReducerAction =
  | { type: "SET_FRAME_SIZES"; payload: Sizes }
  | { type: "ADD_TO_HISTORY"; payload: HistoryItem }
  | { type: "RESET_HISTORY" | "UNDO" | "REDO" };

export const storeReducer = (
  state: typeof initialState,
  action: ReducerAction
): typeof initialState => {
  const getActions = (
    items: Array<HistoryItem>,
    pointer: number
  ): Array<HistoryItem> => {
    // get unique actions up to the current pointer
    const activeActions = items
      .slice(0, pointer + 1)
      .reverse()
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name)
      );

    const resize = activeActions.find((action) => action.name === "resize");

    const flips = activeActions
      .filter((action) => {
        const { val } = action.args as { val: number | string };
        return (
          (action.name === "flipV" && val === -1) ||
          (action.name === "flipH" && val === -1)
        );
      })
      .reverse();

    const filters = activeActions.find((action) => action.name === "filters");

    const crop = activeActions.find((action) => {
      const { ratio, isClosed } = action.args as ActionCrop;
      return action.name === "crop" && ratio && !isClosed;
    });

    return [
      ...(resize ? [resize] : []),
      ...(flips ? flips : []),
      ...(filters ? [filters] : []),
      ...(crop ? [crop] : []),
    ];
  };

  switch (action.type) {
    case "SET_FRAME_SIZES":
      return {
        ...state,
        frameSizes: (action as { type: "SET_FRAME_SIZES"; payload: Sizes })
          .payload,
      };

    case "ADD_TO_HISTORY": {
      const { history } = state;
      const pointer = history.pointer + 1;
      const items = [...history.items.slice(0, pointer), action.payload];

      return {
        ...state,
        history: { items, pointer, actions: getActions(items, pointer) },
      };
    }

    case "RESET_HISTORY":
      return { ...state, history: initialState.history };

    case "UNDO": {
      const { history } = state;
      if (history.pointer <= -1) return state;
      const currentItem = history.items[history.pointer];
      const pointer =
        currentItem && typeof currentItem.undo === "number"
          ? history.pointer - currentItem.undo
          : history.pointer - 1;
      return {
        ...state,
        history: {
          ...history,
          pointer,
          actions: getActions(history.items, pointer),
        },
      };
    }

    case "REDO": {
      const { history } = state;
      if (history.pointer >= history.items.length - 1) return state;
      const currentItem = history.items[history.pointer + 1];
      const pointer = currentItem?.redo
        ? history.pointer + currentItem.redo
        : history.pointer + 1;
      return {
        ...state,
        history: {
          ...history,
          pointer,
          actions: getActions(history.items, pointer),
        },
      };
    }

    default:
      return state;
  }
};
