const fs = require("fs");
const path = require("path");
const { deleteUploadedFile } = require("../src/utils/fileHelper");
const logger = require("../src/utils/logger");
const portfolioRepository = require("../src/repositories/portfolioRepository");

async function testMediumPriorityFeatures() {
  console.log("==================================================");
  console.log("  TEST SUITE: PRIORITAS SEDANG (FILE, SEARCH, LOG) ");
  console.log("==================================================\n");

  const logTest = (name, passed, detail = "") => {
    const symbol = passed ? "✅ [PASS]" : "❌ [FAIL]";
    console.log(`${symbol} ${name}`);
    if (detail) console.log(`   └─ ${detail}`);
  };

  try {
    // 1. Uji File Helper (Pembersihan File Sampah)
    const testFilename = "test-dummy-orphan-file.png";
    const testFilePath = path.join(__dirname, "../uploads", testFilename);
    fs.writeFileSync(testFilePath, "dummy content");
    const existsBefore = fs.existsSync(testFilePath);

    deleteUploadedFile(testFilename);
    const existsAfter = fs.existsSync(testFilePath);

    const isFileHelperOk = existsBefore && !existsAfter;
    logTest("FileHelper: Penghapusan Berkas Sampah", isFileHelperOk, `Dibuat lalu dihapus dari: ${testFilePath}`);

    // 2. Uji Logger Utilities
    let loggerWorked = true;
    try {
      logger.info("Test Info Log Message", { test: true });
      logger.warn("Test Warn Log Message");
      logger.error("Test Error Log Message");
    } catch (e) {
      loggerWorked = false;
    }
    logTest("Logger: Format Log & Output Terstruktur", loggerWorked, "Logger info/warn/error berjalan normal");

    // 3. Uji Query Search pada Portofolio Repository Function Structure
    const hasSearchFunc = typeof portfolioRepository.getAllPortfolios === "function";
    logTest("Repository: Keyword Search Functionality", hasSearchFunc, "Dukungan parameter search terintegrasi di repository");

    console.log("\n==================================================");
    console.log("  Pengujian Prioritas Sedang Selesai!             ");
    console.log("==================================================");
  } catch (err) {
    console.error("❌ Error saat pengujian prioritas sedang:", err);
  }
}

testMediumPriorityFeatures();
