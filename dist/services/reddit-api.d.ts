/**
 * Reddit API client with built-in error handling and retries
 */
import { RedditPost, RedditComment, RedditUser, RedditSubreddit, RedditListing } from '../types/reddit.types.js';
import { AuthManager } from '../core/auth.js';
import { RateLimiter } from '../core/rate-limiter.js';
import { CacheManager } from '../core/cache.js';
export interface RedditAPIOptions {
    authManager: AuthManager;
    rateLimiter: RateLimiter;
    cacheManager: CacheManager;
    timeout?: number;
}
export declare class RedditAPI {
    private auth;
    private rateLimiter;
    private cache;
    private timeout;
    private baseUrl;
    private oauthUrl;
    private minDelay;
    private maxDelay;
    private enableDelay;
    private lastRequestTime;
    constructor(options: RedditAPIOptions);
    /**
     * ENHANCED: Random delay between requests to prevent rate limiting
     * Reddit API detects rapid bursts and blocks with "private/quarantined" errors
     */
    private randomDelay;
    /**
     * Browse a subreddit
     */
    browseSubreddit(subreddit: string, sort?: 'hot' | 'new' | 'top' | 'rising' | 'controversial', options?: {
        limit?: number;
        time?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
        after?: string;
    }): Promise<RedditListing<RedditPost>>;
    /**
     * Get post details with comments
     */
    getPost(postId: string, options?: {
        limit?: number;
        sort?: 'best' | 'top' | 'new' | 'controversial' | 'qa';
        depth?: number;
    }): Promise<[RedditListing<RedditPost>, RedditListing<RedditComment>]>;
    /**
     * Search Reddit
     */
    search(query: string, options?: {
        subreddit?: string;
        sort?: 'relevance' | 'hot' | 'top' | 'new' | 'comments';
        time?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
        limit?: number;
        after?: string;
        restrictSr?: boolean;
    }): Promise<RedditListing<RedditPost>>;
    /**
     * Get user information
     */
    getUser(username: string): Promise<RedditUser>;
    /**
     * Get user's recent posts
     */
    getUserPosts(username: string, type?: 'submitted' | 'comments', options?: {
        sort?: 'new' | 'top' | 'hot';
        time?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
        limit?: number;
    }): Promise<RedditListing<RedditPost | RedditComment>>;
    /**
     * Get subreddit information
     */
    getSubreddit(name: string): Promise<RedditSubreddit>;
    /**
     * Get trending subreddits
     */
    getTrending(): Promise<string[]>;
    /**
     * Private: Make GET request to Reddit API with retry logic
     * ENHANCED: Added random delay between requests to prevent rate limiting
     */
    private get;
}
//# sourceMappingURL=reddit-api.d.ts.map