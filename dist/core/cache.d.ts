/**
 * Smart in-memory cache with LRU eviction and adaptive TTL
 */
interface CacheOptions {
    maxSize?: number;
    defaultTTL?: number;
    cleanupInterval?: number;
}
export declare class CacheManager {
    private cache;
    private sizeUsed;
    private readonly maxSize;
    private readonly defaultTTL;
    private cleanupTimer;
    private readonly ttlByPattern;
    constructor(options?: CacheOptions);
    /**
     * Get item from cache
     */
    get<T>(key: string): T | null;
    /**
     * Set item in cache with automatic size management
     */
    set<T>(key: string, data: T, _customTTL?: number): void;
    /**
     * Delete item from cache
     */
    delete(key: string): boolean;
    /**
     * Clear all cache
     */
    clear(): void;
    /**
     * Get cache statistics
     */
    getStats(): {
        entries: number;
        sizeUsed: number;
        maxSize: number;
        sizeUsedMB: string;
        maxSizeMB: string;
        hitRate: string | number;
        oldestEntry: string | null;
        mostUsed: string[];
    };
    /**
     * Generate cache key
     */
    static createKey(...parts: (string | number | boolean | undefined)[]): string;
    /**
     * Private: Get TTL for a specific key based on patterns
     */
    private getTTLForKey;
    /**
     * Private: Estimate size of data in bytes
     */
    private estimateSize;
    /**
     * Private: Evict least recently used entry
     */
    private evictLRU;
    /**
     * Private: Cleanup expired entries
     */
    private cleanup;
    /**
     * Private: Start cleanup timer
     */
    private startCleanup;
    /**
     * Private: Get oldest cache entry
     */
    private getOldestEntry;
    /**
     * Private: Get most used keys
     */
    private getMostUsedKeys;
    /**
     * Cleanup on destroy
     */
    destroy(): void;
}
export {};
//# sourceMappingURL=cache.d.ts.map