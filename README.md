# mcp-spacenews

MCP server for spaceflight news via the [Spaceflight News API](https://api.spaceflightnewsapi.net/v4). Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `get_articles` | Fetch the latest spaceflight news articles |
| `search_articles` | Search articles by keyword |
| `get_blogs` | Fetch the latest spaceflight blog posts |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "spacenews_search_articles",
      "arguments": { "query": "SpaceX Starship" }
    },
    "id": 1
  }'
```

## License

MIT
