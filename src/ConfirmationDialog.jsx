import React, { createContext, useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ConfirmationDialogContext = createContext({});

const ConfirmationDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});

  const openDialog = ({ title, message, onChange, actionCallback }) => {
    console.log("openDialog -> setDialogOpen", setDialogOpen);
    console.log("openDialog -> dialogOpen", dialogOpen);
    setDialogOpen(true);
    setDialogConfig({ title, message, onChange, actionCallback });
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setDialogConfig({});
  };

  const onConfirm = () => {
    resetDialog();

    dialogConfig.actionCallback(true);
  };

  const onDismiss = () => {
    resetDialog();
    dialogConfig.actionCallback(false);
  };

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <ConfirmationDialog
        open={dialogOpen}
        title={dialogConfig?.title}
        message={dialogConfig?.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
        onChange={dialogConfig?.onChange}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onDismiss,
  onChange
}) => {
  const [text, setText] = useState();
  const executeConfirm = () => {
    onChange(text);
    onConfirm();
  };
  const executeDismiss = () => {
    onChange("");
    onDismiss();
  };
  return (
    <Dialog open={open} onClose={executeDismiss}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={executeDismiss}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={executeConfirm}>
          Confirm
        </Button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogActions>
    </Dialog>
  );
};

const useConfirmationDialog = () => {
  const { openDialog } = useContext(ConfirmationDialogContext);

  const getConfirmation = ({ ...options }) =>
    new Promise((res) => {
      openDialog({ actionCallback: res, ...options });
    });

  return { getConfirmation };
};

export default ConfirmationDialog;
export { ConfirmationDialogProvider, useConfirmationDialog };
