/**
 * Mobile/WebView Detection Utility
 * 
 * Detects if the current environment is a mobile device or WebView environment
 * where popup-based authentication might not work properly.
 */

/**
 * Checks if the current environment is a WebView
 * 
 * WebView environments MUST use redirect flow for OAuth
 * 
 * @returns true if WebView is detected, false otherwise
 */
export function isWebView(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false
    }

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || ''

    // Check for Flutter WebView
    if (userAgent.includes('Flutter')) {
        console.log('📱 Flutter WebView detected')
        return true
    }

    // Check for Android WebView
    if (userAgent.includes('wv') || userAgent.includes('WebView')) {
        console.log('📱 Android WebView detected')
        return true
    }

    // Check for iOS WKWebView or UIWebView
    if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent)) {
        console.log('📱 iOS WebView detected')
        return true
    }

    // Check for in-app browsers (Instagram, Facebook, LinkedIn, etc.)
    if (/(Instagram|FBAN|FBAV|LinkedIn)/i.test(userAgent)) {
        console.log('📱 In-app browser detected')
        return true
    }

    return false
}

/**
 * Checks if the current environment is likely a mobile device or WebView
 * 
 * This function detects:
 * - Mobile browsers (iOS Safari, Android Chrome, etc.)
 * - WebView environments (Flutter WebView, Android WebView, iOS WKWebView)
 * - In-app browsers (Instagram, Facebook, LinkedIn, etc.)
 * 
 * IMPORTANT: Uses touch capability detection to avoid false positives
 * in desktop browser responsive/mobile mode (DevTools)
 * 
 * @returns true if mobile/WebView is detected, false otherwise
 */
export function isMobileOrWebView(): boolean {
    // Server-side rendering check
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        console.log('🔍 SSR environment detected')
        return false
    }

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || ''

    // Debug log
    console.log('🔍 User Agent:', userAgent)

    // Check for WebView first (these MUST use redirect)
    if (isWebView()) {
        return true
    }

    // Check for touch capability (more reliable than screen size)
    const isTouchDevice = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
    )

    // Check for mobile user agent
    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

    // Only return true if BOTH mobile UA and touch capability present
    // This prevents DevTools responsive mode from being detected as mobile
    if (mobileCheck && isTouchDevice) {
        console.log('📱 Real mobile device detected (UA + Touch)')
        return true
    }

    if (mobileCheck && !isTouchDevice) {
        console.log('🖥️ Desktop browser in responsive mode (UA but no touch)')
    } else if (!mobileCheck) {
        console.log('🖥️ Desktop environment detected')
    }

    return false
}

/**
 * Gets a descriptive string of the current environment
 * Useful for debugging
 */
export function getEnvironmentInfo(): string {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return 'SSR (Server-Side Rendering)'
    }

    const userAgent = navigator.userAgent || ''

    if (userAgent.includes('Flutter')) return 'Flutter WebView'
    if (userAgent.includes('wv') || userAgent.includes('WebView')) return 'Android WebView'
    if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent)) return 'iOS WebView'
    if (/Instagram/i.test(userAgent)) return 'Instagram In-App Browser'
    if (/FBAN|FBAV/i.test(userAgent)) return 'Facebook In-App Browser'
    if (/LinkedIn/i.test(userAgent)) return 'LinkedIn In-App Browser'
    if (/Android/i.test(userAgent)) return 'Android Mobile Browser'
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS Mobile Browser'

    return 'Desktop Browser'
}
