import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Typography } from "@mui/joy";

type ItemType = {
  id: string | number;
  url: string;
  name: string;
  priorPrice: number;
  awaitedPrice: number;
  imageUrl?: string;
  status: "processing" | "stopped" | "completed";
};

export default function App() {
  const columns = [
    { name: "Item", uid: "item" },
    { name: "Prior Price", uid: "priorPrice" },
    { name: "Awaited Price", uid: "awaitedPrice" },
    { name: "Status", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const Items: ItemType[] = [
    {
      id: "1",
      name: "ZOTAC Gaming GeForce RTX 3060 Twin Edge OC 12GB GDDR6 192-bit 15 Gbps PCIE 4.0 Graphics Card, IceStorm 2.0 Cooling, Active Fan Control, Freeze Fan Stop ZT-A30600H-10M",
      priorPrice: 50,
      url: "https://www.bestbuy.com/site/samsung-65-class-cu7000-crystal-uhd-4k-uhd-smart-tizen-tv/6537363.p?skuId=6537363",
      awaitedPrice: 40,
      imageUrl:
        "https://cdn4.iconfinder.com/data/icons/social-media-2146/512/31_social-512.png",
      status: "processing",
    },
    {
      id: 2,
      name: "Dell i5 Desktop Computer PC | up to 16GB RAM, 4TB SSD | Windows 10 Pro, WiFi",
      priorPrice: 20,
      awaitedPrice: 15,
      url: "https://www.bestbuy.com/site/samsung-65-class-cu7000-crystal-uhd-4k-uhd-smart-tizen-tv/6537363.p?skuId=6537363",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGdMt18SC8odpNAOLKPjWFdO1ElD3KdVXFUfgkPcs&s",
      status: "stopped",
    },
    {
      id: "3",
      name: "LG - 65” Class UQ75 Series LED 4K UHD Smart webOS TV",
      priorPrice: 100,
      awaitedPrice: 90,
      url: "https://www.bestbuy.com/site/samsung-65-class-cu7000-crystal-uhd-4k-uhd-smart-tizen-tv/6537363.p?skuId=6537363",
      imageUrl:
        "data:image/jpeg;base64,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",
      status: "completed",
    },
  ];
  const renderCell = (item: ItemType, columnKey: React.Key) => {
    // @ts-ignore
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "item":
        return (
          <User src={item.imageUrl} name={cellValue} css={{ p: 0 }}>
            {item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name}
          </User>
        );
      case "priorPrice":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );

      case "awaitedPrice":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={item.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => window.open(item.url, "_blank")}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
             
                <Tooltip content="Edit user">
                  <IconButton>
                    <EditIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => console.log("Delete item", item.id)}>
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Typography>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none">
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={Items}>
          {(item: ItemType) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          noMargin
          align="center"
          rowsPerPage={2}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </Typography>
  );
}
