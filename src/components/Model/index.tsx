import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Loading } from "@nextui-org/react";
import { Typography } from "@mui/joy";
import axios from "axios";

interface URLSuccessResponse {
    name: string;
    price: string;
}

export default function Model() {
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [urlErr, setUrlErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const executeUrlGetRequest = async () => {
    try {
      const response = await axios.get<URLSuccessResponse>("http://100.64.20.52:7789/search", {
        params: {
          url: url,
        },
      });
      console.log(response.data.name);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (url != "") {
        executeUrlGetRequest();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [url]);

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
                contentRight={isLoading && <Loading size="sm" />}
                value={url}
                color={urlErr !== "" ? "error" : "primary"}
                onChange={(event) => {
                  setUrlErr("");
                  setIsLoading(event.target.value != "");
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
