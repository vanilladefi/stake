import { useSnapshot } from "valtio";
import { state } from "../../state";
import Button from "../Button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./primitive";

const AlertDialogDemo = () => {
  const { alert } = useSnapshot(state);

  if (!alert) return null;
  return (
    <AlertDialog
      open={!!alert}
      onOpenChange={(open) => !open && (state.alert = null)}
    >
      <AlertDialogContent>
        <AlertDialogTitle>{alert.title}</AlertDialogTitle>
        {alert.body && (
          <AlertDialogDescription>{alert.body}</AlertDialogDescription>
        )}
        <AlertDialogCancel as="div">
          <Button
            onClick={() => {
              state.alert = null;
            }}
            fluid
            variant="primary"
          >
            CLOSE
          </Button>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDemo;
