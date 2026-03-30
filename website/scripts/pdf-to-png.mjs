import fs from "fs";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const pdfPath = process.argv[2];
const outPath = process.argv[3];
const scale = parseFloat(process.argv[4] || "3");

if (!pdfPath || !outPath) {
  console.error("Usage: node pdf-to-png.mjs <input.pdf> <output.png> [scale]");
  process.exit(1);
}

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    return { canvas, context };
  }
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await getDocument({
  data,
  canvasFactory: new NodeCanvasFactory(),
}).promise;

console.log(`Pages: ${doc.numPages}`);
const page = await doc.getPage(1);
const viewport = page.getViewport({ scale });

const canvasFactory = new NodeCanvasFactory();
const { canvas, context } = canvasFactory.create(
  Math.floor(viewport.width),
  Math.floor(viewport.height)
);

// Fill white background
context.fillStyle = "#ffffff";
context.fillRect(0, 0, canvas.width, canvas.height);

await page.render({
  canvasContext: context,
  viewport,
  canvasFactory,
}).promise;

const png = canvas.toBuffer("image/png");
fs.writeFileSync(outPath, png);
console.log(`Saved ${outPath} (${canvas.width}x${canvas.height})`);
