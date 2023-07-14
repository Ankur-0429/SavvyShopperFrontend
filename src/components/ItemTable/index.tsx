import { Table, Row, Col, Tooltip, Image, Text, Spacer } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Typography } from "@mui/joy";
import PriceWithIndicator from "./PriceWithIndicator";

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
  nickname: string;
}

export default function App({ items }: { items: ItemType[] }) {
  const columns = [
    { name: "Item", uid: "item" },
    { name: "", uid: "title" },
    { name: "Current Price", uid: "priorPrice" },
    { name: "Awaited Price", uid: "awaitedPrice" },
    { name: "Price Change (Daily)", uid: "status" },
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
            {(item.nickname || item.item_name).length > 40
              ? (item.nickname || item.item_name).slice(0, 40) + "..."
              : item.nickname || item.item_name}
          </Typography>
        );
      case "priorPrice":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {item.price_data[item.price_data.length - 1]}
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
        if (item.status == 'processing') {
          return (
            <PriceWithIndicator price={(item.price_data[item.price_data.length - 1] - item.price_data[item.price_data.length - 2]) || 0} isIncreased={item.price_data[item.price_data.length - 1] > item.price_data[item.price_data.length - 2]} />
          )
        }
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
            <Spacer x={0.5} />
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit item">
                <IconButton>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Spacer x={0.5} />
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
        className="z-0"
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
