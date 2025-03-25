import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "reelWinToken";

export interface DecodedToken {
  userId: string;
  role: string;
  exp: number;
  iat: number;
}

/**
 * Sets the authentication token in local storage
 */
export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Gets the authentication token from local storage
 */
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

/**
 * Removes the authentication token from local storage
 */
export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Checks if there is a valid authentication token in local storage
 */
export const hasValidToken = (): boolean => {
  try {
    const token = getToken();
    if (!token) return false;

    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.log(error);

    removeToken();
    return false;
  }
};

/**
 * Gets the decoded token payload
 */
export const getDecodedToken = (): DecodedToken | null => {
  try {
    const token = getToken();
    if (!token) return null;

    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.log(error);

    return null;
  }
};
