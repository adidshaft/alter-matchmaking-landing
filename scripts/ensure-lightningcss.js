/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Ensures the platform-specific lightningcss native package is installed.
 *
 * Some environments install dependencies under a different platform/arch than
 * the one used at runtime. Installing the missing native package on demand
 * keeps `next build` working locally and in CI without pinning a single
 * platform-specific package in package.json.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function resolveVariant() {
  const parts = [process.platform, process.arch];

  if (process.platform === "linux") {
    const { MUSL, familySync } = require("detect-libc");
    const family = familySync();
    if (family === MUSL) {
      parts.push("musl");
    } else if (process.arch === "arm") {
      parts.push("gnueabihf");
    } else {
      parts.push("gnu");
    }
  } else if (process.platform === "win32") {
    parts.push("msvc");
  }

  return `lightningcss-${parts.join("-")}`;
}

function isInstalled(pkgName) {
  try {
    require.resolve(pkgName);
    return true;
  } catch {
    return false;
  }
}

const variant = resolveVariant();
const lightningcssEntry = require.resolve("lightningcss");
const lightningcssPkgPath = path.join(path.dirname(lightningcssEntry), "..", "package.json");
const lightningcssVersion = JSON.parse(fs.readFileSync(lightningcssPkgPath, "utf8")).version;

if (isInstalled(variant)) {
  console.log(`[ensure-lightningcss] ${variant} already installed`);
  process.exit(0);
}

console.log(`[ensure-lightningcss] Installing missing native package: ${variant}@${lightningcssVersion}`);

execFileSync(
  "npm",
  ["install", "--no-save", "--ignore-scripts", `${variant}@${lightningcssVersion}`],
  {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
  }
);
