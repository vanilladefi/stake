import { state } from "..";
import { ref } from "valtio";

interface DialogOpts {
  body?: string | JSX.Element;
  onConfirm?: () => any;
  onCancel?: () => any;
  confirmText?: string;
  cancelText?: string;
}

const showDialog = (title: string, opts?: DialogOpts) => {
  const { body: _body, onConfirm, onCancel, confirmText, cancelText } = opts || {};
  const body = typeof _body === "string" || !_body ? _body : ref(_body)
  state.alert = {
    title,
    body,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
  };
};

const closeDialog = () => (state.alert = null);

export { showDialog, closeDialog };
