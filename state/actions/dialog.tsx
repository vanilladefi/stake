import { state } from "..";
import { ref } from "valtio";

interface DialogOpts {
  body?: string | JSX.Element;
  onConfirm?: () => any;
  confirmText?: string;
  cancelText?: string;
}

const showDialog = (title: string, opts?: DialogOpts) => {
  const { body: _body, onConfirm, confirmText, cancelText } = opts || {};
  const body = typeof _body === "string" || !_body ? _body : ref(_body)
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
