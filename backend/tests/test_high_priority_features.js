const app = require("../src/app");
const http = require("http");

async function testHighPriorityFeatures() {
  console.log("==================================================");
  console.log("  TEST SUITE: PRIORITAS TINGGI (SECURITY & ERROR) ");
  console.log("==================================================\n");

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  const logTest = (name, passed, detail = "") => {
    const symbol = passed ? "✅ [PASS]" : "❌ [FAIL]";
    console.log(`${symbol} ${name}`);
    if (detail) console.log(`   └─ ${detail}`);
  };

  try {
    // 1. Helmet Security Headers
    const resRoot = await fetch(`${baseUrl}/`);
    const headers = resRoot.headers;
    const hasHelmet = headers.has("x-content-type-options") || headers.has("x-frame-options");
    logTest("Helmet Security Headers (X-Content-Type-Options / Frame-Options)", hasHelmet, `Content-Type-Options: ${headers.get("x-content-type-options")}`);

    // 2. 404 Route Handler JSON Response
    const res404 = await fetch(`${baseUrl}/api/v1/non-existent-route`);
    const json404 = await res404.json();
    const isStructured404 = res404.status === 404 && json404.success === false && json404.message.includes("tidak ditemukan");
    logTest("Global 404 Handler (JSON response)", isStructured404, json404.message);

    // 3. Joi Input Validation (Invalid Email Login)
    const resValAuth = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "invalid-email-format", password: "" }),
    });
    const jsonValAuth = await resValAuth.json();
    const isValidationAuthOk = resValAuth.status === 400 && jsonValAuth.success === false && Array.isArray(jsonValAuth.errors);
    logTest("Joi Input Validation: Auth Login (Invalid Body)", isValidationAuthOk, `Pesan: ${jsonValAuth.message}, Errors: ${JSON.stringify(jsonValAuth.errors)}`);

    // 4. Joi Input Validation (Contact Form - Short Message)
    const resValContact = await fetch(`${baseUrl}/api/v1/contact-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: "", email: "test@example.com", pesan: "hi" }),
    });
    const jsonValContact = await resValContact.json();
    const isValidationContactOk = resValContact.status === 400 && jsonValContact.success === false && Array.isArray(jsonValContact.errors);
    logTest("Joi Input Validation: Contact Form (Short Message)", isValidationContactOk, `Errors count: ${jsonValContact.errors?.length}`);

    // 5. Rate Limiting Headers
    const hasRateLimitHeader = headers.has("ratelimit-limit") || headers.has("x-ratelimit-limit");
    logTest("Rate Limiter Headers Check", hasRateLimitHeader, "Rate limiting middleware active");

    console.log("\n==================================================");
    console.log("  Pengujian Prioritas Tinggi Selesai!             ");
    console.log("==================================================");
  } catch (err) {
    console.error("❌ Error saat pengujian:", err);
  } finally {
    server.close();
  }
}

testHighPriorityFeatures();
