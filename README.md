# Boilerplate Paid MCP Server

An example paid MCP server using [PaidMCP](https://github.com/getAlby/paidmcp) and the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

This MCP server is designed to be used in combination with [Alby Bitcoin Payments MCP Server](https://github.com/getAlby/mcp) or another MCP Server that can make lightning payments.

## Tools

This boilerplate MCP server has 2 tools:

- `ask_riddle` is a free tool that returns a riddle
- `check_riddle` requires a payment of 21 sats to check your answer to a riddle

### Example

> Tell me an easy riddle

```
boilerplate_paid_mcp ask_riddle
{
  "tone": "easy"
}

-->

Here's an easy riddle for you:

What has to be broken before you can use it?

Take your time thinking about it! When you're ready with your answer, let me know and I can check if you got it right.
```

> an egg

```
boilerplate_paid_mcp check_riddle
{
  "riddle": "What has to be broken before you can use it?",
  "answer": "an egg"
}
-->

I see that checking your answer requires a Lightning payment! The riddle checking service is asking for a payment of 21 sats to verify your answer.
```

```
alby_mcp pay_invoice
{
  "invoice": "lnbc210n1p5xayredpggd5x2cmtypexjeryd3jjqctwwdmk2unpdcsx2em8np4q228a2ztxkwzaypvzrsh823qngmv97f2v9puwvtsadetypmutyscwpp5zqyd4rc55l9yux0qeau7plcjzp9ezyn695ld625jvwqxwa0c6d4qsp53cps0ra8qem9yswlr5unm0auuc3hlr8jmqsj48umcp3ayt4mastq9qyysgqcqpcxqyz5vqkxa73dcw49cckqcrh3kndnjhu4p2p8hyzvf0ymmvc3m4vtn6dp0sxcptmrqnd46ruau8k4pu3sg8yrz3yx608cxsfngv70hzxx00gggqw84ryn"
}
-->

Great! The payment was successful. Now let me check your riddle answer using the check riddle tool with the payment hash.
```

```
boilerplate_paid_mcp check_riddle
{
  "riddle": "What has to be broken before you can use it?",
  "answer": "an egg",
  "payment_hash": "1008da8f14a7ca4e19e0cf79e0ff12104b91127a2d3edd2a9263806775f8d36a"
}
-->

Perfect! The check riddle tool confirms that your answer is correct!

🎉 Congratulations! Your answer "an egg" is indeed the right solution to the riddle "What has to be broken before you can use it?"
```

## From Source

### Prerequisites

- Node.js 20+
- Yarn
- A connection string from a lightning wallet that supports NWC

### Installation

```bash
yarn install
```

### Building

```bash
yarn build
```

### Add your NWC connection

Copy `.env.example` to `.env` and update your NWC connection secret

### Inspect the tools (use/test without an LLM)

`yarn inspect`

## Troubleshooting

### Model Usage

Make sure you use a decent model (e.g. Claude Sonnet 3.7) otherwise the MCP server will not work.

### Contact Alby Support

Visit [support.getalby.com](https://support.getalby.com) and we're happy to help you get the MCP server working.
