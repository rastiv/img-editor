import { useState } from "react";

export function useSyncPropState<T>(propValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState(propValue);
  const [propValueState, setPropValueState] = useState<T>(propValue);

  if (propValueState !== propValue) {
    setPropValueState(propValue);
    setValue(propValue);
  }

  return [value, setValue];
}
