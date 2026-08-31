const BASE_URL = "http://localhost:3000/api/v1";

async function testAllApis() {
  console.log("==================================================");
  console.log("  BE WEB DIGITAK - E2E API AUTOMATED TEST SUITE   ");
  console.log("==================================================\n");

  let token = "";

  const logTest = (name, passed, detail = "") => {
    const symbol = passed ? "✅ [PASS]" : "❌ [FAIL]";
    console.log(`${symbol} ${name}`);
    if (detail) console.log(`   └─ ${detail}`);
  };

  try {
    // 1. Health check
    const resRoot = await fetch("http://localhost:3000/");
    const jsonRoot = await resRoot.json();
    logTest("Health Check (GET /)", resRoot.status === 200, jsonRoot.message);

    // 2. Auth Login
    const resLogin = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@company.com", password: "Passw0rd!" }),
    });
    const jsonLogin = await resLogin.json();
    if (jsonLogin.success && jsonLogin.data?.token) {
      token = jsonLogin.data.token;
      logTest("Auth: Login (POST /auth/login)", true, "JWT Token received successfully");
    } else {
      logTest("Auth: Login (POST /auth/login)", false, jsonLogin.message || "Failed to login");
    }

    const authHeader = { Authorization: `Bearer ${token}` };

    // 3. Auth Me
    if (token) {
      const resMe = await fetch(`${BASE_URL}/auth/me`, { headers: authHeader });
      const jsonMe = await resMe.json();
      logTest("Auth: Get Profile (GET /auth/me)", jsonMe.success, `Username: ${jsonMe.data?.username}`);
    }

    // 4. Company Info
    const resComp = await fetch(`${BASE_URL}/company-info`);
    const jsonComp = await resComp.json();
    logTest("Info Perusahaan: Get (GET /company-info)", jsonComp.success, `Values count: ${jsonComp.data?.values?.length || 0}`);

    // 5. Layanan
    const resServices = await fetch(`${BASE_URL}/services`);
    const jsonServices = await resServices.json();
    logTest("Layanan: Get All (GET /services)", jsonServices.success, `Total services: ${jsonServices.meta?.total || jsonServices.data?.length || 0}`);

    // 6. Contact Messages
    const resContactPost = await fetch(`${BASE_URL}/contact-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: "Test User", email: "test@example.com", pesan: "Pengujian otomatis API" }),
    });
    const jsonContactPost = await resContactPost.json();
    logTest("Pesan Kontak: Kirim Pesan (POST /contact-messages)", jsonContactPost.success, jsonContactPost.message);

    // 7. Testimoni
    const resTesti = await fetch(`${BASE_URL}/testimonials`, { headers: authHeader });
    const jsonTesti = await resTesti.json();
    logTest("Testimoni: Get All (GET /testimonials)", jsonTesti.success, `Total testimoni: ${jsonTesti.data?.length || 0}`);

    // 8. Portofolio
    const resPorto = await fetch(`${BASE_URL}/portfolios`);
    const jsonPorto = await resPorto.json();
    logTest("Portofolio: Get All (GET /portfolios)", jsonPorto.success, `Total portfolios: ${jsonPorto.meta?.total || jsonPorto.data?.length || 0}`);

    console.log("\n==================================================");
    console.log("  Pengujian Selesai!                             ");
    console.log("==================================================");
  } catch (err) {
    console.error("\n❌ Error saat menjalankan skrip pengujian:", err.message);
    console.log("Pastikan server backend sudah dinyalakan (`npm run dev`) dan MySQL aktif.");
  }
}

testAllApis();
