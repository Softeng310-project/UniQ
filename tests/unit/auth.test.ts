jest.mock("jose", () => {
  const jwtInstance = {
    setProtectedHeader: jest.fn().mockReturnThis(),
    setSubject: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue("token-value"),
  };

  const SignJWT = jest.fn().mockReturnValue(jwtInstance);
  const jwtVerify = jest.fn().mockResolvedValue({
    payload: { sub: "user-123", email: "user@example.com" },
  });

  (globalThis as Record<string, unknown>).__JOSE_MOCKS__ = {
    jwtInstance,
    SignJWT,
    jwtVerify,
  };

  return {
    __esModule: true,
    SignJWT,
    jwtVerify,
  };
});

const getJoseMocks = () =>
  (globalThis as Record<string, unknown>).__JOSE_MOCKS__ as {
    jwtInstance: {
      setProtectedHeader: jest.Mock;
      setSubject: jest.Mock;
      setIssuedAt: jest.Mock;
      setExpirationTime: jest.Mock;
      sign: jest.Mock;
    };
    SignJWT: jest.Mock;
    jwtVerify: jest.Mock;
  };

import { signAuthToken, verifyAuthToken, getAuthCookieOptions } from "@/lib/auth";
import { SignJWT, jwtVerify } from "jose";

describe("auth helpers", () => {
  const originalSecret = process.env.AUTH_JWT_SECRET;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.AUTH_JWT_SECRET = "test-secret";
  });

  afterAll(() => {
    process.env.AUTH_JWT_SECRET = originalSecret;
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("creates tokens and verifies them via jose", async () => {
    const token = await signAuthToken({ id: "user-123", email: "user@example.com" });

    const { jwtInstance } = getJoseMocks();

    expect(SignJWT).toHaveBeenCalledWith({ email: "user@example.com" });
    expect(jwtInstance.setProtectedHeader).toHaveBeenCalledWith({ alg: "HS256", typ: "JWT" });
    expect(jwtInstance.setSubject).toHaveBeenCalledWith("user-123");
    expect(jwtInstance.sign).toHaveBeenCalled();
    expect(token).toBe("token-value");

    await expect(verifyAuthToken(token)).resolves.toEqual({
      sub: "user-123",
      email: "user@example.com",
    });

    const verifyArgs = (jwtVerify as jest.Mock).mock.calls[0];
    expect(verifyArgs[0]).toBe("token-value");
    expect(Array.from(verifyArgs[1])).toEqual(Array.from(new TextEncoder().encode("test-secret")));
    expect(verifyArgs[2]).toEqual({ algorithms: ["HS256"] });
  });

  it("throws when secret missing", async () => {
    process.env.AUTH_JWT_SECRET = "";

    await expect(signAuthToken({ id: "id", email: "user@example.com" })).rejects.toThrow(
      "Missing AUTH_JWT_SECRET environment variable."
    );
  });

  it("returns secure cookie options only in production", () => {
    process.env.NODE_ENV = "development";
    expect(getAuthCookieOptions().secure).toBe(false);

    process.env.NODE_ENV = "production";
    expect(getAuthCookieOptions().secure).toBe(true);
  });
});
