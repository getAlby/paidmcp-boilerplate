import { z } from "zod";
import { PaidMcpServer } from "@getalby/paidmcp";
import { menuItems } from "../food_delivery_menu_items.js";

export function registerGetFoodDeliveryMenuTool(server: PaidMcpServer) {
  server.registerTool(
    "get_food_delivery_menu",
    {
      title: "Get Food Delivery Menu",
      description: "Shows the food delivery menu items available for purchase",
      inputSchema: {},
      outputSchema: {
        menu_items: z.array(
          z.object({
            title: z.string(),
            price_in_sats: z.number(),
          })
        ),
      },
    },
    async (params) => {
      const result = {
        menu_items: menuItems,
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
