import React, { useState } from "react";
import {
  Modal,
  Button,
  Grid,
} from "@nextui-org/react";
import { Typography } from "@mui/joy";
import useList from "@/hook/AsyncList";
import { IconButton } from "../ItemTable/IconButton";
import { DeleteIcon } from "../ItemTable/DeleteIcon";
import fetchClient from "@/service/FetchClient";
import { toast } from "react-toastify";

export default function DeleteModel({id}: {id: string}) {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const list = useList();

  const executeDeleteItemPostRequest = async () => {
    fetchClient
      .post("/deleteTask", {itemId: id})
      .then(() => {
        list.reload();
      })
      .catch(({ response }) => {
        toast.warn(response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div>
      <IconButton onClick={handler}>
        <DeleteIcon size={20} fill="#FF0080" />
      </IconButton>
      <Typography>
        <Modal
          scroll={false}
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={() => {
            closeHandler();
          }}>
          <Modal.Header>
            <Typography level="h5">Delete item</Typography>
          </Modal.Header>
          <Modal.Body>
          <Typography>
            Are you sure you want to delete this item ? By doing this, you will
            not be able to recover the data.
          </Typography>
          </Modal.Body>
          <Modal.Footer>
            <Grid.Container justify="space-between" alignContent="center">
              <Grid>
                <Button onClick={closeHandler} size="sm" light>
                  Cancel
                </Button>
              </Grid>
              <Grid>
                <Button onClick={() => {
                  executeDeleteItemPostRequest()
                    .then(() => {
                      closeHandler()
                    })
                }} size="sm" shadow color="error">
                  Delete
                </Button>
              </Grid>
            </Grid.Container>
          </Modal.Footer>
        </Modal>
      </Typography>
    </div>
  );
}
