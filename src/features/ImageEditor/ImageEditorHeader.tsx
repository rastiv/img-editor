import { ArrowLeft, Check, Redo, Undo } from "lucide-react";
import type { Image } from "@/app/entries/image";
import { Button } from "@/shared/ui";
import { useImageEditorContext } from "./provider/useImageEditorContext";
import { useSaveDialog } from "./useSaveDialog";

type ImageEditorHeaderProps = {
  image: Image;
  onSave: (base64: string, fileName: string) => void;
  onBack: () => void;
};

export const ImageEditorHeader = ({
  image,
  onSave,
  onBack,
}: ImageEditorHeaderProps) => {
  const { history, dispatch } = useImageEditorContext();
  const { dialog: saveDialog, openDialog } = useSaveDialog(onSave);

  const disabledUndo = history.items.length === 0 || history.pointer === -1;
  const disabledRedo =
    history.items.length === 0 || history.pointer === history.items.length - 1;

  const handleUndo = () => {
    dispatch({
      type: "UNDO",
    });
  };

  const handleRedo = () => {
    dispatch({
      type: "REDO",
    });
  };

  const handleReset = () => {
    dispatch({
      type: "RESET_HISTORY",
    });
  };

  const handleApply = () => {
    openDialog();
    // onSave("asasdad", "asdasd");
  };

  return (
    <div className="h-14 flex justify-between items-center px-2 box-border bg-white border-b border-b-neutral-300">
      <div className="flex gap-2 items-center">
        <Button variant="ghost" className="size-10 rounded" onClick={onBack}>
          <ArrowLeft className="size-5" />
        </Button>
        <h4 className="leading-4 max-w-64">{image.title}</h4>
      </div>

      <div className="hidden md:flex gap-2">
        <Button
          variant="outline"
          className="rounded"
          disabled={disabledUndo}
          onClick={handleUndo}
        >
          <Undo /> Undo
        </Button>
        <Button
          variant="outline"
          className="rounded"
          disabled={disabledRedo}
          onClick={handleRedo}
        >
          Redo <Redo />
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="rounded"
          disabled={history.items.length === 0}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          className="bg-blue-600 rounded hover:bg-blue-500"
          disabled={history.actions.length === 0}
          onClick={handleApply}
        >
          <Check /> Apply
        </Button>
      </div>
      {saveDialog}
    </div>
  );
};
