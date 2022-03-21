import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useConfirmationDialog } from "./ConfirmationDialog";

export const DeleteButton = () => {
  const { getConfirmation } = useConfirmationDialog();
  const [data, setdata] = useState();

  const onClick = async () => {
    const confirmed = await getConfirmation({
      title: "Attention!",
      message: "OMG are you sure?",
      onChange: setdata
    });

    if (confirmed) alert("A Møøse once bit my sister... No realli!");
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={onClick}>
        Delete
      </Button>
      <input
        type="text"
        value={data}
        onChange={(e) => setdata(e.target.value)}
      />
    </>
  );
};
