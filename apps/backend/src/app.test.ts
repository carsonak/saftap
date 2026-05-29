import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const handleCallbackMock = vi.fn(async () => undefined);

const envMock = vi.hoisted(() => ({
  env: {
    CDP_API_KEY_ID: "test-id",
    CDP_API_KEY_SECRET: "test-secret",
    CDP_APP_ID: "test-app-id",
    BASE_SEPOLIA_RPC_URL: "https://sepolia.base.org",
    USDC_CONTRACT_ADDRESS: "0x1234567890123456789012345678901234567890",
    TREASURY_WALLET_ADDRESS: "0x1234567890123456789012345678901234567890",
    TREASURY_PRIVATE_KEY: "0x1234567890123456789012345678901234567890",
    DARAJA_CONSUMER_KEY: "test-key",
    DARAJA_CONSUMER_SECRET: "test-secret",
    DARAJA_SHORTCODE: "600000",
    DARAJA_PASSKEY: "test-passkey",
    JWT_SECRET: "test-jwt-secret",
    DATABASE_URL: "postgresql://localhost/test",
    PORT: 3000,
  },
  getRequiredEnv: (name: string) => {
    const value = process.env[name];
    if (!value) {
      throw new Error(`${name} is required`);
    }
    return value;
  },
  getOptionalEnv: (name: string, fallback: string) => {
    return process.env[name] ?? fallback;
  },
}));

const walletServiceMock = vi.hoisted(() => ({
  createWallet: vi.fn(),
}));

const paymentServiceMock = vi.hoisted(() => ({
  sendToMpesa: vi.fn(),
  sendToTill: vi.fn(),
  getTransactionFee: vi.fn(),
}));

vi.mock("./config/env.js", () => envMock);

vi.mock("./modules/wallet/wallet.service.js", () => walletServiceMock);

vi.mock("./modules/payment/payment.service.js", () => paymentServiceMock);

vi.mock("./modules/mpesa/daraja.service.js", () => ({
  darajaService: {
    handleCallback: handleCallbackMock,
  },
}));

const { app } = await import("./app.js");

describe("backend app", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("serves health checks", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "ok",
        version: expect.any(String),
      })
    );
  });

  it("returns 404 for unknown routes", async () => {
    const response = await request(app).get("/does-not-exist");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ success: false, error: "Not Found" });
  });

  it("accepts M-Pesa webhook callback and processes it asynchronously", async () => {
    const callbackBody = {
      Result: {
        ResultCode: 0,
        ResultDesc: "Success",
        OriginatorConversationID: "tx-123",
        ConversationID: "conv-123",
        TransactionID: "trans-123",
      },
    };

    const response = await request(app).post("/webhooks/callback").send(callbackBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Callback received" });
    expect(handleCallbackMock).toHaveBeenCalledWith(callbackBody);
  });
});
