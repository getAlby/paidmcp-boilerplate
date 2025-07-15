import { MemoryStorage, PaidMcpServer } from "@getalby/paidmcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetWeatherTool } from "./tools/get_weather.js";
import { registerGetFoodDeliveryMenuTool } from "./tools/get_food_delivery_menu.js";
import { registerOrderFoodDeliveryTool } from "./tools/order_food_delivery.js";

const storage = new MemoryStorage();

export function createMcpServer(): McpServer {
  if (!process.env.NWC_CONNECTION_STRING) {
    throw new Error("No NWC URL set");
  }

  const server = new PaidMcpServer(
    {
      name: "@getalby/boilerplate-paid-mcp",
      version: "1.0.0",
      title: "Boilerplate Paid MCP Server",
    },
    { nwcUrl: process.env.NWC_CONNECTION_STRING, storage }
  );

  registerGetFoodDeliveryMenuTool(server);
  registerOrderFoodDeliveryTool(server);
  registerGetWeatherTool(server);

  return server;
}
