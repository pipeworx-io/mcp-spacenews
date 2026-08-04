# mcp-spacenews

Spacenews MCP — wraps the Spaceflight News API v4 (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `get_articles` | Fetch the latest spaceflight news articles sorted by publication date. Returns title, summary, URL, image, and source. |
| `search_articles` | Search spaceflight news articles by keyword. Returns matching articles with title, summary, URL, and publication date. |
| `get_blogs` | Fetch the latest spaceflight blog posts sorted by publication date. Returns title, summary, URL, image, and source. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "spacenews": {
      "url": "https://gateway.pipeworx.io/spacenews/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Spacenews data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
