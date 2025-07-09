import { z } from "zod";
import { PaidMcpServer } from "@getalby/paidmcp";
import { getRiddle } from "../riddles.js";

export function registerAskRiddleTool(server: PaidMcpServer) {
  server.registerTool(
    "ask_riddle",
    {
      title: "Ask Riddle",
      description: "Tells you a riddle",
      inputSchema: {
        tone: z
          .enum(["super-easy", "easy", "medium", "hard", "extra-hard"])
          .describe(
            "The difficulty of the riddle. Choose from super-easy, easy, medium, hard, or extra-hard. You can use the check_riddle tool to check your answer."
          ),
      },
      outputSchema: {
        riddle: z.string().describe("The riddle"),
      },
    },
    async (params) => {
      const result = {
        riddle: getRiddle(params.tone).riddle,
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
