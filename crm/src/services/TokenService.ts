import { jwtDecode } from "jwt-decode";


class TokenService {

    Token: string | undefined;


    setToken(token: string): void {
        this.Token = token;
    }

    getToken(): string | undefined {
        return this.Token;
    }

    removeToken(): void {
        this.Token = undefined;
    }

    isTokenValid(): boolean {
        const token = this.getToken();

        if (!token) {
            return false;
        }

        const parsedToken = jwtDecode(token);

        return tokenValid(parsedToken);
    }
}

function tokenValid(token: any = {}) {
    const now = Date.now() / 1000;
    return token.exp > now;
}

const tokenService = new TokenService();

export default tokenService;