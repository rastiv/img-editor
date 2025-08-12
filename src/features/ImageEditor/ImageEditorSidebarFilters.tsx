import { RotateCcw } from "lucide-react";
import { Button, Slider } from "@/shared/ui";
import { useImageEditorContext } from "./provider/useImageEditorContext";
import { useSyncPropState } from "@/shared/hooks";

const defaultValues = {
  saturate: 100,
  brightness: 100,
  contrast: 100,
  sepia: 0,
};

const compareFilters = (
  a: Record<string, number>,
  b: Record<string, number>
): boolean => {
  return Object.values(a).every((value, index) => {
    return value === Object.values(b)[index];
  });
};

export const ImageEditorSidebarFilters = () => {
  const { getFilters, dispatch } = useImageEditorContext();

  const filters = getFilters();
  const isDefault = compareFilters(filters, defaultValues);

  const handleChange = (name: string, value: number) => {
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        name: "filters",
        args: { ...filters, [name]: value },
      },
    });
  };

  const handleReset = () => {
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: {
        name: "filters",
        args: {
          ...defaultValues,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <h4>Filters</h4>
        <Button
          variant={"outline"}
          className="size-7 rounded"
          disabled={isDefault}
          onClick={handleReset}
        >
          <RotateCcw className="size-3" />
        </Button>
      </div>
      <div className="flex gap-3"></div>
      <Filter
        name="saturate"
        label="Saturation"
        currentValue={filters.saturate}
        defaultValue={defaultValues.saturate}
        onChange={handleChange}
      />
      <Filter
        name="brightness"
        label="Brightness"
        currentValue={filters.brightness}
        defaultValue={defaultValues.brightness}
        min={50}
        max={150}
        onChange={handleChange}
      />
      <Filter
        name="contrast"
        label="Contrast"
        currentValue={filters.contrast}
        defaultValue={defaultValues.contrast}
        min={50}
        max={150}
        onChange={handleChange}
      />
      <Filter
        name="sepia"
        label="Sepia"
        currentValue={filters.sepia}
        defaultValue={defaultValues.sepia}
        onChange={handleChange}
      />
    </div>
  );
};

type FilterProps = {
  name: string;
  label: string;
  currentValue: number;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (name: string, value: number) => void;
};

const Filter = ({
  name,
  label,
  currentValue,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: FilterProps) => {
  const [value, setValue] = useSyncPropState<number>(currentValue);

  return (
    <div className="flex flex-col gap-2 border border-neutral-300 rounded p-2.5 pb-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm">
          <span className="font-semibold">{value.toString()}</span>
          <span className="text-xs text-muted-foreground">%</span>
        </span>
      </div>
      <Slider
        value={[Number(value)]}
        defaultValue={[defaultValue]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => setValue(Number(v[0]))}
        onValueCommit={(v) => onChange(name, v[0])}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="translate-x-1">{min}</span>
        <span className="translate-x-0.5">{max}</span>
      </div>
    </div>
  );
};
