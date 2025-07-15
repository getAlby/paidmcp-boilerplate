import { z } from "zod";
import { PaidMcpServer } from "@getalby/paidmcp";
import { menuItems } from "../food_delivery_menu_items.js";

export function registerOrderFoodDeliveryTool(server: PaidMcpServer) {
  server.registerPaidTool(
    "order_food_delivery",
    {
      title: "Order Food Delivery",
      description: "Order food delivery of one or more items",
      inputSchema: {
        menu_items: z.array(
          z.object({
            title: z.string(),
          })
        ),
      },
      outputSchema: {
        order_id: z
          .number()
          .describe("The ID of the created food delivery order"),
      },
    },
    (params) =>
      Promise.resolve({
        satoshi: params.menu_items
          .map(
            (requestedItem) =>
              menuItems.find(
                (menuItem) => menuItem.title === requestedItem.title
              )!
          )
          .map((item) => item?.price_in_sats)
          .reduce((a, b) => a + b, 0),
        description:
          "Order for " + params.menu_items.map((item) => item.title).join(", "),
      }),
    async (params) => {
      const result = {
        order_id: 21,
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
        structuredContent: result,
      };
    }
  );
}
