import {
  Table,
  Row,
  Col,
  Tooltip,
  Image,
  Text,
  Spacer,
  useCollator,
  useAsyncList,
} from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Typography } from "@mui/joy";
import PriceWithIndicator from "./PriceWithIndicator";
import fetchClient from "@/service/FetchClient";

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

  const collator = useCollator({ numeric: true, caseFirst: "upper", usage: "sort" });
  async function load({ signal }: any) {
    const res = await fetchClient("/findAllItemsOfUser", {
      signal,
    });

    if (res.status == 200) {
      return {
        items: res.data,
      };
    }
    return { items: [] };
  }
  async function sort({ items, sortDescriptor }: any) {
    return {
      items: items.sort((a: any, b: any) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        
        if (sortDescriptor.column == 'item_name') {
          first = a['nickname'] || a[sortDescriptor.column];
          second = b['nickname'] || b[sortDescriptor.column];
        }

        if (sortDescriptor.column == 'currentPrice') {
          let len1 = a['price_data'].length;
          let len2 = b['price_data'].length;
          first = a['price_data'][len1-1];
          second = b['price_data'][len2-1];
        }

        if (sortDescriptor.column == 'status') {
          let len1 = a['price_data'].length;
          let len2 = b['price_data'].length;
          first = Math.abs((a['price_data'][len1-1] - a['price_data'][len1-2]) || 0);
          second = Math.abs((b['price_data'][len2-1] - b['price_data'][len2-2]) || 0);

          if (a['status'] !== 'processing') {
            first = 1;
          }
          if (b['status'] !== 'processing') {
            second = 1;
          }
        }

        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }
  const list = useAsyncList({ load, sort });

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
                Math.abs(item.price_data[item.price_data.length - 1] -
                  item.price_data[item.price_data.length - 2]) || 0
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
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none">
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
        <Table.Body items={list.items as ItemType[]}>
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
