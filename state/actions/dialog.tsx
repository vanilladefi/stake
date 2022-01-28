import { state } from "..";

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

export { showDialog, closeDialog };
