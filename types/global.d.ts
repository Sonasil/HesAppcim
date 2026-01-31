
export { };

declare global {
    interface Window {
        FlutterBridge?: {
            postMessage(message: string): void;
        };
        onNativeGoogleLoginResult?: (idToken: string) => void;
    }
}
