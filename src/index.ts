import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchCatImage } from "./fetchCatImage";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "cat-image",
  version: "1.0.0",
});

server.tool("get-cat-image", "Get a random cat image", async () => {
  const data = await fetchCatImage();
  return {
    content: [
      {
        type: "image",
        data,
        mimeType: "image/jpeg",
      },
    ],
  };
});

async function main() {
  const tranport = new StdioServerTransport();
  await server.connect(tranport);
  console.error("Cat Image MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal eror in main():", error);
  process.exit(1);
});
