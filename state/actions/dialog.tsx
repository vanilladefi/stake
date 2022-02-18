import { state } from "..";

interface DialogOpts {
  body?: string;
  onConfirm?: () => any;
  confirmText?: string;
  cancelText?: string;
  link?: { text: string; href: string };
}

const showDialog = (title: string, opts?: DialogOpts) => {
  const { body, onConfirm, confirmText, cancelText } = opts || {};
  state.alert = {
    title,
    body,
    onConfirm,
    confirmText,
    cancelText,
  };
};

const closeDialog = () => (state.alert = null);

export { showDialog, closeDialog };
