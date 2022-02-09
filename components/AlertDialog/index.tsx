import { useSnapshot } from "valtio";
import { state } from "../../state";
import { NetworkSwitcherBody } from "../../state/actions/dialog";
import Button from "../Button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogTitle
} from "./primitive";


const AlertDialogDemo = () => {
  const { alert } = useSnapshot(state);

  if (!alert) return null;
  return (
    <AlertDialog
      open={!!alert}
      onOpenChange={(open) => !open && (state.alert = null)}
    >
      {/* <AlertDialogPortal container={container}> */}
      <AlertDialogContent>
        <AlertDialogTitle>{alert.title}</AlertDialogTitle>
        {alert.body && (
          <AlertDialogDescription>{alert.body}</AlertDialogDescription>
        )}
          <NetworkSwitcherBody/>
          <AlertDialogCancel>
            <Button fluid variant="primary">
              CLOSE
            </Button>
          </AlertDialogCancel>
      </AlertDialogContent>
      {/* </AlertDialogPortal> */}
    </AlertDialog>
  );
};

export default AlertDialogDemo;
