import React, { useState } from "react";
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Spacer,
} from "@nextui-org/react";
import { Typography } from "@mui/joy";

export default function Model() {
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [urlErr, setUrlErr] = useState("");
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button auto color="primary" onPress={handler}>
        Track New Item
      </Button>
      <Typography>
        <Modal
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}>
          <Modal.Header>
            <Typography level="h5">Track new item</Typography>
          </Modal.Header>
          <Modal.Body>
            <Typography>
              <Input
                bordered
                fullWidth
                size="lg"
                placeholder="Paste URL here"
                value={url}
                color={urlErr !== "" ? "error" : "primary"}
                onChange={(event) => {
                  setUrlErr("");
                  setUrl(event.target.value);
                }}
                helperText={urlErr}
                helperColor="error"
              />
            </Typography>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Close
            </Button>
            <Button auto onPress={closeHandler} disabled>
              Add Task
            </Button>
          </Modal.Footer>
        </Modal>
      </Typography>
    </div>
  );
}
