import { Table, Row, Col, Tooltip, Image, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Typography } from "@mui/joy";

export interface ItemType {
  desired_price: number;
  item_name: string;
  price_data: number[];
  retailer: {
    icon: string;
    name: string;
  };
  start_date: string;
  uid: string;
  id: string;
  url: string;
  status: "processing" | "stopped" | "completed";
}

export default function App({ items }: { items: ItemType[] }) {
  const columns = [
    { name: "Item", uid: "item" },
    { name: "title", uid: "title" },
    { name: "Original Price", uid: "priorPrice" },
    { name: "Awaited Price", uid: "awaitedPrice" },
    { name: "Status", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (item: ItemType, columnKey: React.Key) => {
    // @ts-ignore
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "item":
        return (
          <Image
            objectFit="contain"
            src={item.retailer.icon}
            alt="retailer icon"
            width={50}
            height={50}
            className="rounded-full shrink-0"
          />
        );
      case "title":
        return (
          <Typography>
            {item.item_name}
          </Typography>
        )
      case "priorPrice":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {item.price_data[0]}
              </Text>
            </Row>
          </Col>
        );

      case "awaitedPrice":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {item.desired_price}
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
              <Tooltip content="Edit item">
                <IconButton>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete item"
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
        <Table.Body items={items}>
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
          rowsPerPage={10}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </Typography>
  );
}
