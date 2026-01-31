/**
 * Logger utility for consistent logging across the application.
 * In development mode, all logs are shown.
 * In production mode, only errors are logged.
 */

/* eslint-disable no-console */
export const logger = {
    /**
     * Log informational messages (only in development)
     */
    log: (...args: any[]) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(...args)
        }
    },

    /**
     * Log errors (always logged, even in production)
     */
    error: (...args: any[]) => {
        console.error(...args)
    },

    /**
     * Log warnings (only in development)
     */
    warn: (...args: any[]) => {
        if (process.env.NODE_ENV === 'development') {
            console.warn(...args)
        }
    },

    /**
     * Log debug information (only in development)
     */
    debug: (...args: any[]) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(...args)
        }
    }
}
