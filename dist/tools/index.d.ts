/**
 * MCP Tool implementations
 */
import { z } from 'zod';
import { RedditAPI } from '../services/reddit-api.js';
export declare const browseSubredditSchema: z.ZodObject<{
    subreddit: z.ZodString;
    sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<["hot", "new", "top", "rising", "controversial"]>>>;
    time: z.ZodOptional<z.ZodEnum<["hour", "day", "week", "month", "year", "all"]>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    include_nsfw: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    include_subreddit_info: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    subreddit: string;
    sort: "hot" | "new" | "top" | "rising" | "controversial";
    include_nsfw: boolean;
    include_subreddit_info: boolean;
    time?: "hour" | "day" | "week" | "month" | "year" | "all" | undefined;
}, {
    subreddit: string;
    limit?: number | undefined;
    time?: "hour" | "day" | "week" | "month" | "year" | "all" | undefined;
    sort?: "hot" | "new" | "top" | "rising" | "controversial" | undefined;
    include_nsfw?: boolean | undefined;
    include_subreddit_info?: boolean | undefined;
}>;
export declare const searchRedditSchema: z.ZodObject<{
    query: z.ZodString;
    subreddits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<["relevance", "hot", "top", "new", "comments"]>>>;
    time: z.ZodDefault<z.ZodOptional<z.ZodEnum<["hour", "day", "week", "month", "year", "all"]>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    author: z.ZodOptional<z.ZodString>;
    flair: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    time: "hour" | "day" | "week" | "month" | "year" | "all";
    sort: "hot" | "new" | "top" | "relevance" | "comments";
    query: string;
    subreddits?: string[] | undefined;
    author?: string | undefined;
    flair?: string | undefined;
}, {
    query: string;
    limit?: number | undefined;
    time?: "hour" | "day" | "week" | "month" | "year" | "all" | undefined;
    sort?: "hot" | "new" | "top" | "relevance" | "comments" | undefined;
    subreddits?: string[] | undefined;
    author?: string | undefined;
    flair?: string | undefined;
}>;
export declare const getPostDetailsSchema: z.ZodObject<{
    post_id: z.ZodOptional<z.ZodString>;
    subreddit: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    comment_limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    comment_sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<["best", "top", "new", "controversial", "qa"]>>>;
    comment_depth: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    extract_links: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    max_top_comments: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    include_full_content: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    comment_body_max_length: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    comment_limit: number;
    comment_sort: "new" | "top" | "controversial" | "best" | "qa";
    comment_depth: number;
    extract_links: boolean;
    max_top_comments: number;
    include_full_content: boolean;
    comment_body_max_length: number;
    subreddit?: string | undefined;
    post_id?: string | undefined;
    url?: string | undefined;
}, {
    subreddit?: string | undefined;
    post_id?: string | undefined;
    url?: string | undefined;
    comment_limit?: number | undefined;
    comment_sort?: "new" | "top" | "controversial" | "best" | "qa" | undefined;
    comment_depth?: number | undefined;
    extract_links?: boolean | undefined;
    max_top_comments?: number | undefined;
    include_full_content?: boolean | undefined;
    comment_body_max_length?: number | undefined;
}>;
export declare const userAnalysisSchema: z.ZodObject<{
    username: z.ZodString;
    posts_limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    comments_limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    time_range: z.ZodDefault<z.ZodOptional<z.ZodEnum<["day", "week", "month", "year", "all"]>>>;
    top_subreddits_limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    username: string;
    posts_limit: number;
    comments_limit: number;
    time_range: "day" | "week" | "month" | "year" | "all";
    top_subreddits_limit: number;
}, {
    username: string;
    posts_limit?: number | undefined;
    comments_limit?: number | undefined;
    time_range?: "day" | "week" | "month" | "year" | "all" | undefined;
    top_subreddits_limit?: number | undefined;
}>;
export declare const redditExplainSchema: z.ZodObject<{
    term: z.ZodString;
}, "strip", z.ZodTypeAny, {
    term: string;
}, {
    term: string;
}>;
/**
 * Tool implementations
 */
export declare class RedditTools {
    private api;
    constructor(api: RedditAPI);
    browseSubreddit(params: z.infer<typeof browseSubredditSchema>): Promise<any>;
    searchReddit(params: z.infer<typeof searchRedditSchema>): Promise<{
        results: {
            id: string;
            title: string;
            author: string;
            score: number;
            upvote_ratio: number | undefined;
            num_comments: number;
            created_utc: number;
            url: string;
            permalink: string;
            subreddit: string;
            is_video: boolean | undefined;
            is_text_post: boolean | undefined;
            content: string | undefined;
            nsfw: boolean | undefined;
            link_flair_text: string | undefined;
        }[];
        total_results: number;
    }>;
    getPostDetails(params: z.infer<typeof getPostDetailsSchema>): Promise<any>;
    userAnalysis(params: z.infer<typeof userAnalysisSchema>): Promise<any>;
    redditExplain(params: z.infer<typeof redditExplainSchema>): Promise<{
        definition: any;
        origin: any;
        usage: any;
        examples: any;
        relatedTerms: never[];
    }>;
    private extractPostIdFromUrl;
}
//# sourceMappingURL=index.d.ts.map