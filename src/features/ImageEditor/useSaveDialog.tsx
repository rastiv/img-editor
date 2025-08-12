import { Check, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/shared/ui";
import type { FuncSaveArgs } from "./types";
import { useCanvas } from "./useCanvas";
import { useImageEditorContext } from "./provider/useImageEditorContext";

const getFileNameWithoutExt = (fileName: string): string =>
  fileName.replace(/\.[^/.]+$/, "");

export function useSaveDialog(onSave: FuncSaveArgs): {
  dialog: React.ReactNode;
  openDialog: () => void;
  closeDialog: () => void;
} {
  const { title, fileName, ext } = useImageEditorContext();
  const [open, setOpen] = useState<boolean>(false);
  const [newFileName, setNewFileName] = useState<string>(
    getFileNameWithoutExt(fileName)
  );

  const { isLoading, error, updatedBase64 } = useCanvas(open);

  const openDialog = (): void => {
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  const handleSubmit = () => {
    onSave(updatedBase64, `${newFileName}.${ext}`);

    closeDialog();
  };

  const dialog = (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-sm gap-6">
        <DialogHeader>
          <DialogTitle>Save changes</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="w-full h-[300px] bg-neutral-50 p-1 border border-neutral-200">
            {isLoading && (
              <div className="flex justify-center items-center h-full">
                <Loader2Icon className="animate-spin" />
              </div>
            )}
            {error && <div className="text-red-500 text-center">{error}</div>}
            {!isLoading && !error && (
              <img
                src={updatedBase64}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <div>
            <div className="relative">
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="w-full pl-3 pr-8 py-4 rounded"
              />
              <span className="absolute bottom-1 right-2 text-sm text-muted-foreground">
                {ext}
              </span>
              <label className="absolute left-2 -top-2 text-xs text-muted-foreground bg-white px-1">
                File name
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded"
              disabled={isLoading}
              onClick={closeDialog}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-blue-600 rounded hover:bg-blue-500"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <Check /> Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return { dialog, openDialog, closeDialog };
}
