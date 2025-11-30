/**
 * Reddit authentication manager
 */
export interface AuthConfig {
    clientId: string;
    clientSecret: string;
    username?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    scope?: string;
    userAgent?: string;
}
export declare class AuthManager {
    private config;
    private configPath;
    constructor();
    /**
     * Load authentication configuration
     */
    load(): Promise<AuthConfig | null>;
    /**
     * Load configuration from environment variables
     */
    private loadFromEnv;
    /**
     * Clean environment variable value
     * Handles empty strings, undefined, and unresolved template strings
     */
    private cleanEnvVar;
    /**
     * Save authentication configuration
     */
    save(config: AuthConfig): Promise<void>;
    /**
     * Get current configuration
     */
    getConfig(): AuthConfig | null;
    /**
     * Check if authenticated
     */
    isAuthenticated(): boolean;
    /**
     * Check if token is expired
     */
    isTokenExpired(): boolean;
    /**
     * Get access token for Reddit OAuth
     */
    getAccessToken(): Promise<string | null>;
    /**
     * Refresh access token using client credentials
     */
    refreshAccessToken(): Promise<void>;
    /**
     * Clear authentication
     */
    clear(): Promise<void>;
    /**
     * Get headers for Reddit API requests
     */
    getHeaders(): Promise<Record<string, string>>;
    /**
     * Get rate limit based on auth status
     */
    getRateLimit(): number;
    /**
     * Get cache TTL based on auth status (in ms)
     */
    getCacheTTL(): number;
    /**
     * Check if we have full authentication (with user credentials)
     */
    hasFullAuth(): boolean;
    /**
     * Get auth mode string for display
     */
    getAuthMode(): string;
    /**
     * Private: Get configuration directory path based on OS
     */
    private getConfigPath;
    /**
     * Private: Validate configuration
     */
    private isValidConfig;
    /**
     * Setup wizard for authentication
     */
    static runSetupWizard(): Promise<AuthConfig>;
}
//# sourceMappingURL=auth.d.ts.map