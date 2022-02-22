import { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import Button from "../Button";
import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./primitive";

const AlertDialog = () => {
  const { alert } = useSnapshot(state);
  const { title, body, onConfirm, onCancel, confirmText, cancelText } = alert || {};

  const handleConfirm = useCallback(() => {
    onConfirm?.();
    state.alert = null;
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    state.alert = null;
    onCancel?.();
  }, [onCancel]);

  useEffect(() => {
    const onKeyEvent = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleConfirm();
      }
    };
    window.addEventListener("keydown", onKeyEvent);
    return () => window.removeEventListener("keydown", onKeyEvent);
  }, [handleConfirm]);

  if (!alert) return null;

  return (
    <AlertDialogPrimitive
      open={!!alert}
      onOpenChange={(open) => !open && (state.alert = null)}
    >
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        {body && <AlertDialogDescription>{body}</AlertDialogDescription>}
        <AlertDialogCancel as="div">
          <Button
            onClick={handleCancel}
            fluid
            variant={onConfirm ? "default" : "primary"}
          >
            {cancelText || "Close"}
          </Button>
          {onConfirm && (
            <Button
              onClick={handleConfirm}
              fluid
              variant="primary"
              css={{ ml: "$2" }}
            >
              {confirmText || "Confirm"}
            </Button>
          )}
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialogPrimitive>
  );
};

export default AlertDialog;
