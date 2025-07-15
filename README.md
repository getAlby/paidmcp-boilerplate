# Boilerplate Paid MCP Server

An example paid MCP server using [PaidMCP](https://github.com/getAlby/paidmcp) and the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

This MCP server is designed to be used in combination with [Alby Bitcoin Payments MCP Server](https://github.com/getAlby/mcp) or another MCP Server that can make lightning payments.

## Tools

This boilerplate MCP server has 3 tools:

- `get_weather` is a paid tool to fetch the weather in a given city
- `ask_riddle` is a free tool that returns a riddle
- `check_riddle` requires a payment of 21 sats to check your answer to a riddle

### Examples

#### 1. Weather

> What's the weather in Wellington?

```
I'll get the current weather information for Wellington for you.
─── get_weather | weather ──────────────────────────
city: Wellington

It looks like this weather service requires a small Lightning payment to access the data. I can help you pay this invoice using your connected Lightning wallet if you'd like to proceed.

The invoice is for 21 sats to get weather data for Wellington. Let me pay this invoice and then get your weather information.
─── pay_invoice | alby-http ──────────────────────────
invoice: ...


◇  Goose would like to call the above tool, do you allow?
│  Allow
│

Great! Payment successful. Now let me get the weather information for Wellington using the payment hash.
─── get_weather | weather ──────────────────────────
city: Wellington
payment_hash: ...

## Weather in Wellington

The current temperature in Wellington is **14.2°C** (about 57.6°F).

*This weather data was obtained via a Lightning micropayment of 21 sats.*

```

#### 2. Riddle

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

## Get started

1. Follow the local development instructions below to build and inspect the MCP server
2. Replace the [tools](./src/tools) with your own
3. Deploy your MCP server with `fly launch`

## Local Development

### Prerequisites

- Node.js 20+
- Yarn
- A connection string from a lightning wallet that supports NWC

### Installation

```bash
yarn install
```

### Add your NWC connection

Copy `.env.example` to `.env` and update your NWC connection secret.

> Don't have one yet? check out [Alby Hub](https://albyhub.com)

### Configure in Roo code

Add to your MCP server list and update the `args` and `env`:

```json
{
  "mcpServers": {
    "boilerplate_paid_mcp": {
      "command": "node",
      "args": ["/YOUR_PATH_TO_REPOSITORY/boilerplate-paid-mcp/build/index.js"],
      "env": {
        "NWC_CONNECTION_STRING": "nostr+walletconnect://..."
      },
      "disabled": false,
      "autoApprove": [],
      "alwaysAllow": [],
      "disabledTools": []
    }
  }
}
```

### Building

```bash
yarn build
```

### Inspect the tools (use/test without an LLM)

`yarn inspect`

## Troubleshooting

### Model Usage

Make sure you use a decent model (e.g. Claude Sonnet 3.7) otherwise the MCP server will not work.

### Contact Alby Support

Visit [support.getalby.com](https://support.getalby.com) and we're happy to help you get the MCP server working.
