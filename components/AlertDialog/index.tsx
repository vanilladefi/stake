import { useSnapshot } from "valtio";
import { state } from "../../state";

import Button from "../Button";
import Flex from "../Flex";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  // AlertDialogPortal,
} from "./primitive";

const AlertDialogDemo = () => {
  const snap = useSnapshot(state);

  if (!snap.alert) return null;
  return (
    <AlertDialog
      open={!!snap.alert}
      onOpenChange={(open) => !open && (state.alert = null)}
    >
      {/* <AlertDialogPortal container={container}> */}
      <AlertDialogContent>
        <AlertDialogTitle>{snap.alert.title}</AlertDialogTitle>
        {snap.alert.body && (
          <AlertDialogDescription>{snap.alert.body}</AlertDialogDescription>
        )}
        <Flex>
          <AlertDialogCancel asChild>
            <Button fluid variant="primary">
              CLOSE
            </Button>
          </AlertDialogCancel>
        </Flex>
      </AlertDialogContent>
      {/* </AlertDialogPortal> */}
    </AlertDialog>
  );
};

export default AlertDialogDemo;
