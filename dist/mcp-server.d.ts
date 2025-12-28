/**
 * Proper MCP Server implementation with stdio and streamable HTTP transports
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CacheManager } from './core/cache.js';
import { RedditTools } from './tools/index.js';
export declare const SERVER_NAME = "reddit-mcp-buddy";
export declare const SERVER_VERSION = "1.3.1";
/**
 * Create MCP server with proper protocol implementation
 */
export declare function createMCPServer(): Promise<{
    server: Server<{
        method: string;
        params?: {
            [x: string]: unknown;
            _meta?: {
                [x: string]: unknown;
                progressToken?: string | number | undefined;
            } | undefined;
        } | undefined;
    }, {
        method: string;
        params?: {
            [x: string]: unknown;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        } | undefined;
    }, {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    }>;
    cacheManager: CacheManager;
    tools: RedditTools;
    handlers: {
        'tools/list': () => Promise<{
            tools: {
                [x: string]: unknown;
                name: string;
                inputSchema: {
                    [x: string]: unknown;
                    type: "object";
                    properties?: {
                        [x: string]: unknown;
                    } | undefined;
                    required?: string[] | undefined;
                };
                title?: string | undefined;
                icons?: {
                    [x: string]: unknown;
                    src: string;
                    mimeType?: string | undefined;
                    sizes?: string | undefined;
                }[] | undefined;
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
                description?: string | undefined;
                outputSchema?: {
                    [x: string]: unknown;
                    type: "object";
                    properties?: {
                        [x: string]: unknown;
                    } | undefined;
                    required?: string[] | undefined;
                } | undefined;
                annotations?: {
                    [x: string]: unknown;
                    title?: string | undefined;
                    readOnlyHint?: boolean | undefined;
                    destructiveHint?: boolean | undefined;
                    idempotentHint?: boolean | undefined;
                    openWorldHint?: boolean | undefined;
                } | undefined;
            }[];
        }>;
        'tools/call': (params: any) => Promise<{
            content: {
                type: string;
                text: string;
            }[];
            isError?: undefined;
        } | {
            content: {
                type: string;
                text: string;
            }[];
            isError: boolean;
        }>;
    };
}>;
/**
 * Start server with stdio transport (for Claude Desktop)
 */
export declare function startStdioServer(): Promise<void>;
/**
 * Start server with streamable HTTP transport for Postman MCP
 */
export declare function startHttpServer(port?: number): Promise<void>;
//# sourceMappingURL=mcp-server.d.ts.map