import React, { useState } from "react";
import {
  Modal,
  Input,
  Button,
  Spacer,
  Image,
} from "@nextui-org/react";
import { Typography } from "@mui/joy";
import fetchClient from "@/service/FetchClient";
import { ItemType } from "../ItemTable";
import { toast } from "react-toastify";
import useList from "@/hook/AsyncList";
import { IconButton } from "../ItemTable/IconButton";
import { EditIcon } from "../ItemTable/EditIcon";

export default function EditModel({item}: {item: ItemType}) {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const list = useList();

  const newTaskData = item;

  const [taskData, setTaskData] = useState(newTaskData);


  const executeEditItemPostRequest = async () => {
    fetchClient
      .post("/editTask", taskData)
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
        <EditIcon size={20} fill="#979797" />
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
            <Typography level="h5">Edit item</Typography>
          </Modal.Header>
          <Modal.Body>
            <Typography>
              <Spacer y={1} />
              <div className={`${taskData.item_name == '' && "hidden"}`}>
                <div className="flex flex-row">
                  <Image
                    objectFit="contain"
                    src={taskData.retailer.icon}
                    alt="retailer icon"
                    width={50}
                    height={50}
                    className="rounded-full shrink-0"
                  />
                  <Spacer x={1} />
                  <Typography>{taskData.item_name}</Typography>
                </div>
                <Spacer y={1} />
                <div className="flex flex-row">
                  <Input
                    labelLeft={"$"}
                    disabled
                    placeholder={(
                      taskData.price_data[taskData.price_data.length - 1] || 0
                    ).toString()}
                    label="Current Price"
                    className="mr-1"
                  />
                  <Input
                    labelLeft={"$"}
                    type="number"
                    required
                    helperText="Required"
                    placeholder="0"
                    label="Desired Price"
                    className="ml-1"
                    step="0.01"
                    min="0"
                    pattern="^\$[0-9]+(\.[0-9]{0,2})?$"
                    value={taskData.desired_price}
                    onChange={(event) => {
                      const newPrice = parseFloat(
                        parseFloat(event.target.value).toFixed(2)
                      );
                      const currentState = { ...taskData };
                      currentState.desired_price = newPrice;
                      setTaskData(currentState);
                    }}
                  />
                </div>
                <Spacer y={0.5} />
                <Input
                  width="100%"
                  label="Name"
                  value={taskData.nickname}
                  onChange={(event) => {
                    const currentState = { ...taskData };
                    currentState.nickname = event.target.value;
                    setTaskData(currentState);
                  }}
                />
              </div>
            </Typography>
            <Spacer y={0.5} />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Close
            </Button>
            <Button
              auto
              onPress={() => {
                executeEditItemPostRequest().then(() => {
                  setTaskData(taskData);
                  closeHandler();
                });
              }}
              disabled={taskData.desired_price === 0}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </Typography>
    </div>
  );
}
