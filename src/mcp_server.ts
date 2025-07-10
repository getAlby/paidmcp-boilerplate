import { MemoryStorage, PaidMcpServer } from "@getalby/paidmcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAskRiddleTool } from "./tools/ask_riddle.js";
import { registerCheckRiddleTool } from "./tools/check_riddle.js";
import { registerGetWeatherTool } from "./tools/get_weather.js";

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

  registerGetWeatherTool(server);
  registerAskRiddleTool(server);
  registerCheckRiddleTool(server);

  return server;
}
