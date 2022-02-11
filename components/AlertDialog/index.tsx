import { useSnapshot } from "valtio";
import { state } from "../../state";
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
        {/* TODO: Support passing child components as props to alert dialog to support buttons etc */}
        {/* {alert.customBody && (
          <AlertDialogDescription><alert.customBody /></AlertDialogDescription>
        )} */}
          <AlertDialogCancel as="div">
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
