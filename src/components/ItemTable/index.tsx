import {
  Table,
  Row,
  Col,
  Tooltip,
  Image,
  Text,
  Spacer,
} from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Typography } from "@mui/joy";
import PriceWithIndicator from "./PriceWithIndicator";
import useList from "@/hook/AsyncList";
import Link from "next/link";
import { useRouter } from "next/router";

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

export default function App() {
  const columns = [
    { name: "Item", uid: "item" },
    { name: "Name", uid: "item_name" },
    { name: "Current Price", uid: "currentPrice" },
    { name: "Desired Price", uid: "desired_price" },
    { name: "Price Change (Daily)", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const list = useList();
  const router = useRouter();

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
      case "item_name":
        return (
          <Typography>
            {(item.nickname || item.item_name).length > 40
              ? (item.nickname || item.item_name).slice(0, 40) + "..."
              : item.nickname || item.item_name}
          </Typography>
        );
      case "currentPrice":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {item.price_data[item.price_data.length - 1]}
              </Text>
            </Row>
          </Col>
        );

      case "desired_price":
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
        if (item.status == "processing") {
          return (
            <PriceWithIndicator
              price={
                Math.abs(
                  item.price_data[item.price_data.length - 1] -
                    item.price_data[item.price_data.length - 2]
                ) || 0
              }
              isIncreased={
                item.price_data[item.price_data.length - 1] >
                item.price_data[item.price_data.length - 2]
              }
            />
          );
        }
        return <StyledBadge type={item.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <Link href={`/Dashboard/${item.id}`}>
                  <EyeIcon size={20} fill="#979797" />
                </Link>
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
  if (list !== undefined) {
    return (
      <Typography>
        <Table
          selectionMode="single"
          onSelectionChange={(keys:any) => {
            router.push(`/Dashboard/${keys['currentKey']}`)
          }}
          className="z-0"
          aria-label="Example table with custom cells"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
          css={{
            height: "auto",
            minWidth: "100%",
          }}>
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                allowsSorting={column.uid != "item" && column.uid != "actions"}
                key={column.uid}
                hideHeader={column.uid === "actions" || column.uid == "item"}
                align={column.uid === "actions" ? "center" : "start"}
                css={{ whiteSpace: "nowrap", paddingRight: 30 }}>
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body
            items={list.items as ItemType[]}
            loadingState={list.loadingState}
            onLoadMore={list.loadMore}>
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
  return null;
}
