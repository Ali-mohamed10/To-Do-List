import { createContext, useState } from "react";
import MySnackbar from "../MySnackbar";
export const ToastContext = createContext({
  showToast: null,
  background: null,
});

export default function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const openSnackbox = (snackMessage) => {
    setMessage(snackMessage);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  function changeBackground(color) {
    setBackgroundColor(color);
  }
  return (
    <ToastContext.Provider
      value={{ showToast: openSnackbox, background: changeBackground }}
    >
      <MySnackbar open={open} title={message} color={backgroundColor} />
      {children}
    </ToastContext.Provider>
  );
}
