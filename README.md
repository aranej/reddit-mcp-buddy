# reddit-mcp-buddy-enhanced

🔧 **Enhanced fork of [reddit-mcp-buddy](https://github.com/karanb192/reddit-mcp-buddy)** with stability improvements and power user features for long-running server environments.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Original](https://img.shields.io/badge/Original-karanb192%2Freddit--mcp--buddy-green)](https://github.com/karanb192/reddit-mcp-buddy)

## 🎯 What's Different?

This enhanced version includes critical fixes and power user features:

| Enhancement | Description |
|-------------|-------------|
| ✅ **Zombie Process Prevention** | Proper SIGINT, SIGTERM, SIGHUP signal handlers |
| ✅ **Stdin Close Detection** | Server cleanly exits when parent process terminates |
| ✅ **Broken Pipe Handling** | EPIPE errors trigger graceful shutdown |
| ✅ **Random Request Delay** | Prevents Reddit rate limiting (burst detection) |
| ✅ **Full Content Mode** | Get complete post text without truncation |
| ✅ **Configurable Comment Length** | Adjust comment body limits for detailed analysis |

## 🚀 Power User Features

### Full Post Content

By default, post content is truncated to protect LLM context windows. Power users can request full content:

```javascript
// Default: content limited to 1000 characters
get_post_details({ post_id: "abc123" })

// Full content mode: no truncation
get_post_details({ post_id: "abc123", include_full_content: true })
```

### Extended Comment Bodies

Comment bodies default to 500 characters. Increase for detailed analysis:

```javascript
// Default: 500 character limit
get_post_details({ post_id: "abc123" })

// Extended: up to 5000 characters per comment
get_post_details({ post_id: "abc123", comment_body_max_length: 2000 })
```

### Rate Limit Protection

Random delays between API requests prevent Reddit's burst detection:

```bash
# Environment variables (all optional)
REDDIT_DELAY_MIN=2000    # Minimum delay in ms (default: 2000)
REDDIT_DELAY_MAX=4000    # Maximum delay in ms (default: 4000)
REDDIT_NO_DELAY=true     # Disable delays entirely (not recommended)
```

## ⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REDDIT_CLIENT_ID` | - | Reddit API client ID (required) |
| `REDDIT_CLIENT_SECRET` | - | Reddit API client secret (required) |
| `REDDIT_USERNAME` | - | Reddit username (for authenticated mode) |
| `REDDIT_PASSWORD` | - | Reddit password (for authenticated mode) |
| `REDDIT_DELAY_MIN` | `2000` | Minimum delay between requests (ms) |
| `REDDIT_DELAY_MAX` | `4000` | Maximum delay between requests (ms) |
| `REDDIT_NO_DELAY` | `false` | Set to `true` to disable rate limit delays |

## 🛠️ The Problems We Fixed

### Zombie Processes

When using the original `reddit-mcp-buddy` with Claude Desktop, Droid CLI, or other MCP clients, **zombie processes** were left running after the parent process terminated. This happened because:

1. The stdio transport waits for input on stdin
2. When the parent process dies, stdin closes but the server doesn't detect it
3. No signal handlers were registered to catch termination signals
4. Processes accumulate over time, consuming memory

### Rate Limiting False Positives

Reddit API detects rapid request bursts and returns false "private/quarantined" errors even for public subreddits. Our random delay feature prevents this.

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
        "REDDIT_PASSWORD": "your_password",
        "REDDIT_DELAY_MIN": "2000",
        "REDDIT_DELAY_MAX": "4000"
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

All original tools are preserved with enhancements:

| Tool | Description | Enhanced |
|------|-------------|----------|
| `browse_subreddit` | Browse posts from any subreddit (hot/new/top/rising) | |
| `search_reddit` | Search across Reddit or specific subreddits | |
| `get_post_details` | Get post with full comment threads | ✅ `include_full_content`, `comment_body_max_length` |
| `user_analysis` | Analyze user history, karma, activity | |
| `reddit_explain` | Explain Reddit terminology | |

### get_post_details Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `post_id` | string | - | Reddit post ID (e.g., "1abc2d3") |
| `subreddit` | string | - | Subreddit name (optional, improves efficiency) |
| `url` | string | - | Full Reddit URL (alternative to post_id) |
| `comment_limit` | number | 20 | Max comments to fetch (1-500) |
| `comment_sort` | string | "best" | Sort: best/top/new/controversial/qa |
| `comment_depth` | number | 3 | Comment nesting depth (1-10) |
| `max_top_comments` | number | 5 | Top comments to return (1-20) |
| `extract_links` | boolean | false | Extract URLs from comments |
| `include_full_content` | boolean | false | **NEW:** Return complete post text |
| `comment_body_max_length` | number | 500 | **NEW:** Max chars per comment (100-5000) |

## 📊 Rate Limits

| Mode | Rate Limit | Requirements |
|------|------------|--------------|
| Anonymous | 10 req/min | None |
| App-Only | 60 req/min | Client ID + Secret |
| Authenticated | 100 req/min | All 4 credentials |

## 🙏 Credits

**Original Project:** [reddit-mcp-buddy](https://github.com/karanb192/reddit-mcp-buddy) by [@karanb192](https://github.com/karanb192)

This fork adds stability improvements and power user features while maintaining full compatibility with the original. All credit for the core functionality goes to the original author.

## 📝 Changelog

### v1.3.0 (2025-11-30)
- **ADDED:** `include_full_content` parameter for complete post text
- **ADDED:** `comment_body_max_length` parameter (100-5000 chars)
- **DOCS:** Comprehensive README update with all features

### v1.2.1 (2025-11-26)
- **ADDED:** Random delay between API requests (2-4s default)
- **ADDED:** `REDDIT_DELAY_MIN`, `REDDIT_DELAY_MAX`, `REDDIT_NO_DELAY` env vars
- **FIXED:** False "private/quarantined" errors from burst detection

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

**Enhanced with ❤️ for stability and power users**
