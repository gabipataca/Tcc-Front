export interface PrivateTokenContextType {
    token: string;
    isLoading: boolean;
    fetchToken: () => Promise<void>;
    refreshToken: () => Promise<void>;
}