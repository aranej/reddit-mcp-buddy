/**
 * Rate limiter with sliding window algorithm
 */
export interface RateLimiterOptions {
    limit: number;
    window: number;
    name?: string;
}
export declare class RateLimiter {
    private requests;
    private readonly limit;
    private readonly window;
    private readonly name;
    constructor(options: RateLimiterOptions);
    /**
     * Check if a request can be made
     */
    canMakeRequest(): boolean;
    /**
     * Record a request
     */
    recordRequest(): void;
    /**
     * Try to make a request (combines check and record)
     */
    tryRequest(): boolean;
    /**
     * Get time until next available request in seconds
     */
    timeUntilNextRequest(): number;
    /**
     * Get current usage stats
     */
    getStats(): {
        used: number;
        limit: number;
        available: number;
        percentUsed: string;
        timeUntilReset: number;
        window: number;
    };
    /**
     * Reset the rate limiter
     */
    reset(): void;
    /**
     * Get a formatted error message for rate limit exceeded
     */
    getErrorMessage(authenticated?: boolean): string;
    /**
     * Private: Remove expired requests from tracking
     */
    private cleanup;
}
/**
 * Compound rate limiter that checks multiple limits
 */
export declare class CompoundRateLimiter {
    private limiters;
    /**
     * Add a rate limiter
     */
    addLimiter(name: string, options: RateLimiterOptions): void;
    /**
     * Check if request can be made across all limiters
     */
    canMakeRequest(): boolean;
    /**
     * Record request across all limiters
     */
    recordRequest(): void;
    /**
     * Get the most restrictive time until next request
     */
    timeUntilNextRequest(): number;
    /**
     * Get stats for all limiters
     */
    getAllStats(): Record<string, any>;
    /**
     * Get the most restrictive limiter that's blocking
     */
    getBlockingLimiter(): {
        name: string;
        stats: any;
    } | null;
    /**
     * Reset all limiters
     */
    resetAll(): void;
}
//# sourceMappingURL=rate-limiter.d.ts.map