import { z } from "zod";
import { PaidMcpServer } from "@getalby/paidmcp";
import { getRiddle } from "../riddles.js";

export function registerCheckRiddleTool(server: PaidMcpServer) {
  server.registerPaidTool(
    "check_riddle",
    {
      title: "Check Riddle",
      description: "Check if the riddle was correct",
      inputSchema: {
        riddle: z.string().describe("The riddle."),
        answer: z.string().describe("The answer to the riddle."),
      },
      outputSchema: {
        result: z
          .enum(["correct", "incorrect"])
          .optional() // will not be specified if the payment has not been set yet
          .describe("Whether your answer is correct or incorrect"),
      },
    },
    async (params) => {
      return {
        satoshi: 21,
        description: "Check riddle answer: " + params.answer,
      };
    },
    async (params) => {
      const riddle = getRiddle(params.riddle);
      const result = {
        result:
          riddle.answer &&
          params.answer.trim().toLowerCase().includes(riddle.answer)
            ? "correct"
            : "incorrect",
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
