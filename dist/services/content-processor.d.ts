/**
 * Content processor for intelligent summarization and analysis
 */
import { RedditPost, RedditComment, RedditListing } from '../types/reddit.types.js';
import { ProcessedPost, SubredditSummary, UserSummary, TrendingAnalysis, SentimentComparison } from '../types/mcp.types.js';
export declare class ContentProcessor {
    /**
     * Process and summarize subreddit posts
     */
    static processSubredditPosts(listing: RedditListing<RedditPost>): SubredditSummary;
    /**
     * Process individual post
     */
    static processPost(post: RedditPost): ProcessedPost;
    /**
     * Generate insight for a post
     */
    static generateInsight(post: RedditPost): string;
    /**
     * Analyze overall vibe of posts
     */
    static analyzeVibe(posts: RedditPost[]): string;
    /**
     * Generate TLDR summary
     */
    static generateTLDR(posts: RedditPost[]): string;
    /**
     * Extract main topics from posts
     */
    static extractTopics(posts: RedditPost[]): string[];
    /**
     * Analyze sentiment of text
     */
    static analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' | 'mixed';
    /**
     * Calculate trending velocity
     */
    static calculateVelocity(post: RedditPost): number;
    /**
     * Process trending analysis
     */
    static processTrendingPosts(listings: RedditListing<RedditPost>[], options?: {
        maxPosts?: number;
        maxCrossPosts?: number;
    }): TrendingAnalysis;
    /**
     * Compare sentiment across subreddits
     */
    static compareSentiments(topic: string, subredditData: Map<string, RedditListing<RedditPost>>): SentimentComparison;
    /**
     * Format score for display
     */
    static formatScore(score: number): string;
    /**
     * Truncate long titles
     */
    static truncateTitle(title: string, maxLength?: number): string;
    /**
     * Process user summary
     */
    static processUserSummary(user: any, posts: RedditListing<RedditPost | RedditComment>, options?: {
        maxTopSubreddits?: number;
        comments?: RedditListing<any>;
    }): UserSummary;
    /**
     * Detect user interests from subreddit activity
     */
    static detectInterests(subreddits: string[]): string[];
}
//# sourceMappingURL=content-processor.d.ts.map