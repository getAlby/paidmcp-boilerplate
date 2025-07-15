# Boilerplate Paid MCP Server

An example paid MCP server using [PaidMCP](https://github.com/getAlby/paidmcp) and the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

This MCP server is designed to be used in combination with [Alby Bitcoin Payments MCP Server](https://github.com/getAlby/mcp) or another MCP Server that can make lightning payments.

## Tools

This boilerplate MCP server has 3 tools:

- `get_weather` is a paid tool to fetch the weather in a given city
- `get_food_delivery_menu` is a free tool that returns food items that can be purchased
- `order_food_delivery` order one or more items from the menu

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

#### 2. Food Delivery

> Order me 2 pizzas

```
The user wants to order 2 pizzas. Looking at the environment details, I can see this is a boilerplate MCP project with food delivery functionality. I can see there are food delivery tools available:

food_delivery_menu.ts
food_delivery_order.ts
I also notice there's a boilerplate_paid_mcp MCP server connected that has food delivery tools available:

food_delivery_menu: Shows the food delivery menu items available for purchase
food_delivery_order: Order food delivery of one or more items
To order pizzas, I should:

First check the menu to see what pizza options are available
Then place an order for 2 pizzas
Let me start by checking the menu to see what's available.

I'll help you order 2 pizzas. Let me first check the food delivery menu to see what pizza options are available.

─── boilerplate_paid_mcp | get_food_delivery_menu ──────────────────────────

{}

Perfect! I can see there's Pizza available on the menu for 21 sats each. Now I'll place an order for 2 pizzas.

─── boilerplate_paid_mcp | order_food_delivery ──────────────────────────

Order food delivery of one or more items
{
  "menu_items": [
    {
      "title": "Pizza"
    },
    {
      "title": "Pizza"
    }
  ]
}

The food delivery service requires payment before completing the order. I need to pay the lightning invoice first. Let me pay the invoice for 42 sats (21 sats × 2 pizzas) using the Alby MCP server.


─── alby_mcp | pay_invoice ──────────────────────────

{
  "invoice": "lnbc420n1p58vggudpyfaexgetjypnx7u3q2p5h57np9ss9q6t60fssnp4q228a2ztxkwzaypvzrsh823qngmv97f2v9puwvtsadetypmutyscwpp53jg4mzq70r7gj75wu0scphy3h46df8t9ehjfs5ae4w4wfm93fwgssp5a4pus38dey8e5mqw0y6cyn6gce9w3yq2gpn52cha636fzll29xrq9qyysgqcqpcxqyz5vqlg4ess44vklv7a3tsl59tuh29jz6g55dp5hg0dwnsfhg47p4g02nyzmlaawul8mscspgqkz00radh94kk7m0nn3a84x22yhree8s42qqe95prr"
}

Great! The payment was successful with no fees. Now I'll complete the pizza order by providing the payment hash.

─── boilerplate_paid_mcp | order_food_delivery ──────────────────────────

{
  "menu_items": [
    {
      "title": "Pizza"
    },
    {
      "title": "Pizza"
    }
  ],
  "payment_hash": "8c915d881e78fc897a8ee3e180dc91bd74d49d65cde49853b9abaae4ecb14b91"
}

Task Completed
Your order for 2 pizzas has been successfully placed!

Order details:

Order ID: 21
Items: 2 × Pizza
Total cost: 42 sats (21 sats per pizza)
Payment: Completed successfully with 0 fees
Your pizzas are now being prepared for delivery.
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

> Also it's recommended to install [Alby MCP](https://github.com/getalby/mcp) to test making payments.

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
