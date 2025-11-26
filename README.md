# reddit-mcp-buddy-enhanced

🔧 **Enhanced fork of [reddit-mcp-buddy](https://github.com/karanb192/reddit-mcp-buddy)** with stability improvements for long-running server environments.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Original](https://img.shields.io/badge/Original-karanb192%2Freddit--mcp--buddy-green)](https://github.com/karanb192/reddit-mcp-buddy)

## 🎯 What's Different?

This enhanced version includes critical fixes for server stability:

| Fix | Description |
|-----|-------------|
| ✅ **Zombie Process Prevention** | Added proper SIGINT, SIGTERM, SIGHUP signal handlers |
| ✅ **Stdin Close Detection** | Server cleanly exits when parent process terminates |
| ✅ **Broken Pipe Handling** | EPIPE errors trigger graceful shutdown |
| ✅ **Graceful Shutdown** | Prevents multiple cleanup calls, ensures clean exit |

### The Problem We Fixed

When using the original `reddit-mcp-buddy` with Claude Desktop, Droid CLI, or other MCP clients, **zombie processes** were left running after the parent process terminated. This happened because:

1. The stdio transport waits for input on stdin
2. When the parent process dies, stdin closes but the server doesn't detect it
3. No signal handlers were registered to catch termination signals
4. Processes accumulate over time, consuming memory

### Our Solution

```typescript
// Added in src/index.ts:

// Handle termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGHUP', () => gracefulShutdown('SIGHUP'));

// Handle stdin close - CRITICAL for stdio mode
process.stdin.on('end', () => gracefulShutdown());
process.stdin.on('close', () => gracefulShutdown());

// Handle broken pipe
process.stdout.on('error', (err) => {
  if (err.code === 'EPIPE') gracefulShutdown('EPIPE');
});
```

## 📦 Installation

### For Droid CLI / Factory.ai

Update your `~/.factory/mcp.json`:

```json
{
  "mcpServers": {
    "reddit-mcp-buddy": {
      "command": "npx",
      "args": ["-y", "github:aranej/reddit-mcp-buddy"],
      "env": {
        "REDDIT_CLIENT_ID": "your_client_id",
        "REDDIT_CLIENT_SECRET": "your_client_secret",
        "REDDIT_USERNAME": "your_username",
        "REDDIT_PASSWORD": "your_password"
      }
    }
  }
}
```

### For Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "reddit": {
      "command": "npx",
      "args": ["-y", "github:aranej/reddit-mcp-buddy"],
      "env": {
        "REDDIT_CLIENT_ID": "your_client_id",
        "REDDIT_CLIENT_SECRET": "your_client_secret"
      }
    }
  }
}
```

### From Source

```bash
git clone https://github.com/aranej/reddit-mcp-buddy.git
cd reddit-mcp-buddy
npm install
npm run build
```

## 🛠️ Available Tools

All original tools are preserved:

| Tool | Description |
|------|-------------|
| `browse_subreddit` | Browse posts from any subreddit (hot/new/top/rising) |
| `search_reddit` | Search across Reddit or specific subreddits |
| `get_post_details` | Get post with full comment threads |
| `user_analysis` | Analyze user history, karma, activity |
| `reddit_explain` | Explain Reddit terminology |

## 📊 Rate Limits

| Mode | Rate Limit | Requirements |
|------|------------|--------------|
| Anonymous | 10 req/min | None |
| App-Only | 60 req/min | Client ID + Secret |
| Authenticated | 100 req/min | All 4 credentials |

## 🙏 Credits

**Original Project:** [reddit-mcp-buddy](https://github.com/karanb192/reddit-mcp-buddy) by [@karanb192](https://github.com/karanb192)

This fork adds stability improvements while maintaining full compatibility with the original. All credit for the core functionality goes to the original author.

## 📝 Changelog

### v1.2.0 (2025-11-26)
- **FIXED:** Zombie process issue - added proper signal handlers
- **FIXED:** Stdin close detection for stdio mode
- **FIXED:** Broken pipe handling (EPIPE)
- **ADDED:** Graceful shutdown mechanism
- **RENAMED:** Package to `reddit-mcp-buddy-enhanced`

### v1.1.10 (upstream)
- Original version from karanb192

## 📄 License

MIT - Same as original project.

---

**Enhanced with ❤️ for stability**
