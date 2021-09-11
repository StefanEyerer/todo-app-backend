import jwt from 'jsonwebtoken';

type DecodedToken = {
    userId: number;
};

export default class RefreshTokenStore {
    private static refreshTokens: string[] = [];

    private constructor() {
        // pass
    }

    public static addRefreshToken(token: string): void {
        RefreshTokenStore.refreshTokens.push(token);
    }

    public static removeRefreshToken(token: string): void {
        RefreshTokenStore.refreshTokens = RefreshTokenStore.refreshTokens.filter((t) => t !== token);
    }

    public static checkRefreshToken(token: string): DecodedToken | null {
        const refreshToken = RefreshTokenStore.refreshTokens.find((t) => t === token);

        if (!refreshToken) return null;

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return decoded as DecodedToken;
    }
}
