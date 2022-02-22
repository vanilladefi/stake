import { AlertOpts, state } from "..";
import { ref } from "valtio";

type DialogOpts = Omit<AlertOpts, "title">;

const showDialog = (title: string, opts?: DialogOpts) => {
  const { body: _body, ...rst } = opts || {};
  const body = typeof _body === "string" || !_body ? _body : ref(_body);
  state.alert = {
    title,
    body,
    ...rst,
  };
};

const closeDialog = () => (state.alert = null);

export { showDialog, closeDialog };
