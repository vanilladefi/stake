import { state } from "..";
import Button from "../../components/Button";
import { correctNetwork } from "../../utils/helpers";
import { switchToCorrectNetwork } from "./wallet";

interface DialogOpts {
  body?: string;
  link?: { text: string; href: string };
}

const showDialog = (title: string, opts?: DialogOpts) => {
  state.alert = {
    title,
    body: opts?.body,
  };
};

const closeDialog = () => (state.alert = null);

export const NetworkSwitcherBody = () => (<Button onClick={() => switchToCorrectNetwork()}>Switch to {correctNetwork.chainName}</Button>)

export { showDialog, closeDialog };
