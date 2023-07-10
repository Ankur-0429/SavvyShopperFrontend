import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Button,
  Loading,
  Spacer,
  Image,
} from "@nextui-org/react";
import { Typography } from "@mui/joy";
import axios, { AxiosError } from "axios";
import fetchClient from "@/service/FetchClient";

interface URLSuccessResponse {
  name: string;
  price: number;
  retailer: {
    name: string;
    icon: string;
  }
}

export default function Model() {
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [urlErr, setUrlErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [retailerName, setRetailerName] = useState("");
  const [retailerIcon, setRetailerIcon] = useState("");
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
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
          onClose={closeHandler}>
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
                  setUrlErr("");
                  setPrice(0);
                  setIsLoading(event.target.value != "");
                  setUrl(event.target.value);
                }}
                helperText={urlErr}
                helperColor="error"
              />
              <Spacer y={1} />

              <div className={`${price == 0 && "hidden"}`}>
                <div className="flex flex-row">
                    <Image objectFit="contain" src={retailerIcon} alt="retailer icon" width={50} height={50} className="rounded-full shrink-0" />
                    <Spacer x={1} />
                    <Typography>
                        {name}
                    </Typography>
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
                    placeholder="0"
                    label="Desired Price"
                    className="ml-1"
                    step="0.01"
                    min="0"
                    pattern="^\$[0-9]+(\.[0-9]{0,2})?$"
                  />
                </div>
              </div>
            </Typography>
            <Spacer y={0.5} />
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
