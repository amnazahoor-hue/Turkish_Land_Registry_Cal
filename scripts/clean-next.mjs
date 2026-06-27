import fs from "fs";
import path from "path";

const targets = [".next", path.join("node_modules", ".cache")];

for (const target of targets) {
  const fullPath = path.join(process.cwd(), target);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Removed ${target}`);
  }
}

console.log("Next.js cache cleared.");
