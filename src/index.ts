/**
 * Spacenews MCP — wraps the Spaceflight News API v4 (free, no auth)
 * https://api.spaceflightnewsapi.net/v4
 *
 * Tools:
 * - get_articles: fetch latest spaceflight news articles
 * - search_articles: search articles by keyword
 * - get_blogs: fetch latest spaceflight blog posts
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.spaceflightnewsapi.net/v4';

const tools: McpToolExport['tools'] = [
  {
    name: 'get_articles',
    description:
      'Fetch the latest spaceflight news articles sorted by publication date. Returns title, summary, URL, image, and source.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Number of articles to return (default 10, max 100)',
        },
      },
      required: [],
    },
  },
  {
    name: 'search_articles',
    description:
      'Search spaceflight news articles by keyword. Returns matching articles with title, summary, URL, and publication date.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query (e.g. "SpaceX Starship launch")' },
        limit: {
          type: 'number',
          description: 'Number of results to return (default 10, max 100)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_blogs',
    description:
      'Fetch the latest spaceflight blog posts sorted by publication date. Returns title, summary, URL, image, and source.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Number of blog posts to return (default 10, max 100)',
        },
      },
      required: [],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'get_articles':
      return getArticles((args.limit as number) ?? 10);
    case 'search_articles':
      return searchArticles(args.query as string, (args.limit as number) ?? 10);
    case 'get_blogs':
      return getBlogs((args.limit as number) ?? 10);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

interface NewsItem {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
}

interface ApiResponse {
  count: number;
  results: NewsItem[];
}

function formatItem(item: NewsItem) {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    url: item.url,
    image_url: item.image_url,
    source: item.news_site,
    published_at: item.published_at,
  };
}

async function getArticles(limit: number) {
  const params = new URLSearchParams({
    limit: String(Math.min(100, Math.max(1, limit))),
    ordering: '-published_at',
  });

  const res = await fetch(`${BASE_URL}/articles/?${params}`);
  if (!res.ok) throw new Error(`Spaceflight News API error: ${res.status}`);

  const data = (await res.json()) as ApiResponse;

  return {
    total: data.count,
    returned: data.results.length,
    articles: data.results.map(formatItem),
  };
}

async function searchArticles(query: string, limit: number) {
  const params = new URLSearchParams({
    search: query,
    limit: String(Math.min(100, Math.max(1, limit))),
  });

  const res = await fetch(`${BASE_URL}/articles/?${params}`);
  if (!res.ok) throw new Error(`Spaceflight News API error: ${res.status}`);

  const data = (await res.json()) as ApiResponse;

  return {
    query,
    total: data.count,
    returned: data.results.length,
    articles: data.results.map(formatItem),
  };
}

async function getBlogs(limit: number) {
  const params = new URLSearchParams({
    limit: String(Math.min(100, Math.max(1, limit))),
    ordering: '-published_at',
  });

  const res = await fetch(`${BASE_URL}/blogs/?${params}`);
  if (!res.ok) throw new Error(`Spaceflight News API error: ${res.status}`);

  const data = (await res.json()) as ApiResponse;

  return {
    total: data.count,
    returned: data.results.length,
    blogs: data.results.map(formatItem),
  };
}

export default { tools, callTool } satisfies McpToolExport;
