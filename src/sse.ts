import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Express } from "express";
import { createMcpServer } from "./mcp_server.js";

export function addSSEEndpoints(app: Express) {
  // Store transports for each session type
  // SSE is deprecated so we do not put much effort in here (e.g. cleaning up unused sessions)
  const sessions: Record<
    string,
    {
      server: McpServer;
      transport: SSEServerTransport;
    }
  > = {};

  app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport("/messages", res);
    const server = createMcpServer();
    sessions[transport.sessionId] = {
      server,
      transport,
    };
    console.info("Created new SSE session", transport.sessionId);
    if (req.query.sessionId) {
      console.info(
        "Request provided its own session ID: " + req.query.sessionId
      );
      sessions[req.query.sessionId as string] = {
        server,
        transport,
      };
    }
    server.connect(transport);
  });

  app.post("/messages", (req, res) => {
    const sessionId = req.query.sessionId as string;
    console.info("SSE messages request", sessionId);
    const session = sessions[sessionId];
    if (session) {
      console.info("Found session for messages request", sessionId);

      session.transport.handlePostMessage(req, res);
    } else {
      res
        .status(400)
        .send("No transport found for sessionId: " + req.query.sessionId);
    }
  });
}
