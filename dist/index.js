/**
 * Reddit MCP Buddy Enhanced Server
 * Main entry point
 *
 * ENHANCED: Added proper signal handlers and stdin close detection
 * to prevent zombie processes when parent process terminates.
 *
 * Original: https://github.com/karanb192/reddit-mcp-buddy
 * Enhanced by: aranej (https://github.com/aranej)
 */
import { startStdioServer, startHttpServer } from './mcp-server.js';
// Determine transport mode from environment
const isHttpMode = process.env.REDDIT_BUDDY_HTTP === 'true';
const port = parseInt(process.env.REDDIT_BUDDY_PORT || '3000', 10);
// Track if we're already shutting down to prevent multiple cleanup calls
let isShuttingDown = false;
/**
 * Graceful shutdown handler
 * Ensures clean exit when parent process terminates
 */
function gracefulShutdown(signal) {
    if (isShuttingDown)
        return;
    isShuttingDown = true;
    if (signal) {
        console.error(`Received ${signal}, shutting down gracefully...`);
    }
    else {
        console.error('Shutting down gracefully...');
    }
    // Give a brief moment for any pending operations
    setTimeout(() => {
        process.exit(0);
    }, 100);
}
// Handle termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGHUP', () => gracefulShutdown('SIGHUP'));
// Handle stdin close - CRITICAL for stdio mode
// When parent process (droid/claude) terminates, stdin closes
// Without this handler, the process becomes a zombie
process.stdin.on('end', () => {
    console.error('stdin closed, parent process likely terminated');
    gracefulShutdown();
});
process.stdin.on('close', () => {
    console.error('stdin stream closed');
    gracefulShutdown();
});
// Handle pipe errors (broken pipe when parent dies)
process.stdout.on('error', (err) => {
    if (err.code === 'EPIPE') {
        gracefulShutdown('EPIPE');
    }
});
process.stderr.on('error', (err) => {
    if (err.code === 'EPIPE') {
        gracefulShutdown('EPIPE');
    }
});
// Handle unhandled errors
process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});
// Start the appropriate server
async function main() {
    try {
        if (isHttpMode) {
            await startHttpServer(port);
        }
        else {
            await startStdioServer();
        }
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map
