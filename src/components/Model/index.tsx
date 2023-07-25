import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Modal,
  Input,
  Button,
  Loading,
  Spacer,
  Image,
} from "@nextui-org/react";
import { Typography } from "@mui/joy";
import fetchClient from "@/service/FetchClient";
import { ItemType } from "../ItemTable";
import useAuth from "@/hook/Auth";
import { toast } from "react-toastify";
import useList from "@/hook/AsyncList";

interface URLSuccessResponse {
  name: string;
  price: number;
  retailer: {
    name: string;
    icon: string;
  };
}

export default function Model() {
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [urlErr, setUrlErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desiredPrice, setDesiredPrice] = useState(0);
  const [retailerName, setRetailerName] = useState("");
  const [retailerIcon, setRetailerIcon] = useState("");
  const [nickname, setNickname] = useState("");
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const auth = useAuth();
  const list = useList();

  const newTaskData = {
    url: url,
    retailer: {
      name: retailerName,
      icon: retailerIcon,
    },
    price_data: [price],
    desired_price: desiredPrice,
    start_date: new Date().toISOString(),
    item_name: name,
    nickname: nickname
  };

  const reset = () => {
    setUrl("");
    setUrlErr("");
    setIsLoading(false);
    setName("");
    setPrice(0);
    setDesiredPrice(0);
    setRetailerIcon("");
    setRetailerName("");
    setNickname("");
  };

  const executeUrlGetRequest = async () => {
    fetchClient
      .get<URLSuccessResponse>("/search", {
        params: {
          url: url,
        },
      })
      .then(({ data }) => {
        setName(data.name);
        setPrice(data.price);
        setRetailerName(data.retailer.name);
        setRetailerIcon(data.retailer.icon);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setUrlErr(response?.data?.error);
        setIsLoading(false);
      });
  };

  const executeAddItemPostRequest = async () => {
    fetchClient
      .post("/schedule", newTaskData)
      .then(() => {
        list.reload()
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (url != "") {
        executeUrlGetRequest();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div>
      <Button auto color="primary" onPress={handler}>
        Track New Item
      </Button>
      <Typography>
        <Modal
          scroll={false}
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={() => {
            reset();
            closeHandler();
          }}>
          <Modal.Header>
            <Typography level="h5">Track new item</Typography>
          </Modal.Header>
          <Modal.Body>
            <Typography>
              <Input
                bordered
                fullWidth
                type="url"
                size="lg"
                aria-label="Paste URL here"
                placeholder="Paste URL here"
                contentRight={isLoading && <Loading size="sm" />}
                value={url}
                color={urlErr !== "" ? "error" : "primary"}
                onChange={(event) => {
                  reset();
                  setIsLoading(event.target.value != "");
                  setUrl(event.target.value);
                }}
                helperText={urlErr}
                helperColor="error"
              />
              <Spacer y={1} />

              <div className={`${price == 0 && "hidden"}`}>
                <div className="flex flex-row">
                  <Image
                    objectFit="contain"
                    src={retailerIcon}
                    alt="retailer icon"
                    width={50}
                    height={50}
                    className="rounded-full shrink-0"
                  />
                  <Spacer x={1} />
                  <Typography>{name}</Typography>
                </div>
                <Spacer y={1} />
                <div className="flex flex-row">
                  <Input
                    labelLeft={"$"}
                    disabled
                    placeholder={price.toString()}
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
                    value={desiredPrice}
                    onChange={(event) => {
                      const newPrice = parseFloat(
                        parseFloat(event.target.value).toFixed(2)
                      );
                      setDesiredPrice(newPrice);
                    }}
                  />
                </div>
                <Spacer y={0.5} />
                <Input
              width="100%"
              label="Name"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
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
                executeAddItemPostRequest().then(() => {
                  reset();
                  closeHandler();
                });
              }}
              disabled={desiredPrice === 0}>
              Add Task
            </Button>
          </Modal.Footer>
        </Modal>
      </Typography>
    </div>
  );
}
