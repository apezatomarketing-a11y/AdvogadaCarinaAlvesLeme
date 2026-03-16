import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("Environment Secrets Validation", () => {
  it("should have GEMINI_API_KEY configured", () => {
    expect(ENV.geminiApiKey).toBeDefined();
    expect(ENV.geminiApiKey).toMatch(/^AIzaSy/);
  });

  it("should have RESEND_API_KEY configured", () => {
    expect(ENV.resendApiKey).toBeDefined();
    expect(ENV.resendApiKey).toMatch(/^re_/);
  });

  it("should have SUPABASE_URL configured", () => {
    expect(ENV.supabaseUrl).toBeDefined();
    expect(ENV.supabaseUrl).toMatch(/^https:\/\//);
  });

  it("should have SUPABASE_ANON_KEY configured", () => {
    expect(ENV.supabaseAnonKey).toBeDefined();
    expect(ENV.supabaseAnonKey).toMatch(/^eyJ/);
  });
});
