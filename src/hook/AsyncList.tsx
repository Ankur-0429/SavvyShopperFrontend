import fetchClient from "@/service/FetchClient";
import { useCollator, useAsyncList } from "@nextui-org/react";
import { createContext, useContext } from "react";

const AsyncListContext = createContext(undefined as any);

export default function useList() {
  return useContext(AsyncListContext);
}

export const AsyncListProvider = (props: any) => {
  const collator = useCollator({
    numeric: true,
    caseFirst: "upper",
    usage: "sort",
  });

  async function load({ signal }: any) {
    const res = await fetchClient("/findAllItemsOfUser", {
      signal,
    });

    if (res.status == 200) {
      const items = Array.isArray(res.data) ? res.data : [];
      return {
        items: items,
      };
    }
    return { items: [] };
  }
  async function sort({ items, sortDescriptor }: any) {
    return {
      items: items.sort((a: any, b: any) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];

        if (sortDescriptor.column == "item_name") {
          first = a["nickname"] || a[sortDescriptor.column];
          second = b["nickname"] || b[sortDescriptor.column];
        }

        if (sortDescriptor.column == "currentPrice") {
          let len1 = a["price_data"].length;
          let len2 = b["price_data"].length;
          first = a["price_data"][len1 - 1];
          second = b["price_data"][len2 - 1];
        }

        if (sortDescriptor.column == "status") {
          let len1 = a["price_data"].length;
          let len2 = b["price_data"].length;
          first = Math.abs(
            a["price_data"][len1 - 1] - a["price_data"][len1 - 2] || 0
          );
          second = Math.abs(
            b["price_data"][len2 - 1] - b["price_data"][len2 - 2] || 0
          );

          if (a["status"] !== "processing") {
            first = 1;
          }
          if (b["status"] !== "processing") {
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
  return <AsyncListContext.Provider value={list} {...props} />;
};
