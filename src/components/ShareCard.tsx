export async function downloadShareCard(opts: {
  title: string;
  dont: string[];
  next: string[];
  lang: "zh" | "en";
}) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#F4EFE6";
  ctx.fillRect(0, 0, 1080, 1350);
  ctx.fillStyle = "#1F6B4A";
  ctx.fillRect(0, 0, 1080, 180);
  ctx.fillStyle = "#F4EFE6";
  ctx.font = "700 54px serif";
  ctx.fillText(opts.lang === "en" ? "Tuzhi" : "土知", 64, 80);
  ctx.font = "28px sans-serif";
  ctx.fillText(opts.lang === "en" ? "Photo check · for learning" : "拍照识别 · 仅供学习", 64, 130);
  ctx.fillStyle = "#1C1612";
  wrap(ctx, opts.title, 64, 260, 952, 48);
  ctx.fillStyle = "#1F6B4A";
  ctx.font = "700 32px sans-serif";
  ctx.fillText(opts.lang === "en" ? "Don’t do this first" : "先别做", 64, 520);
  ctx.fillStyle = "#1C1612";
  ctx.font = "32px sans-serif";
  let y = 580;
  for (const line of opts.dont.slice(0, 3)) {
    y = wrap(ctx, "· " + line, 64, y, 952, 40) + 16;
  }
  ctx.fillStyle = "#1F6B4A";
  ctx.font = "700 32px sans-serif";
  ctx.fillText(opts.lang === "en" ? "What to test" : "建议测哪几项", 64, y + 24);
  ctx.fillStyle = "#1C1612";
  ctx.font = "32px sans-serif";
  y += 80;
  for (const line of opts.next.slice(0, 3)) {
    y = wrap(ctx, "· " + line, 64, y, 952, 40) + 16;
  }
  ctx.fillStyle = "#5c5348";
  ctx.font = "26px sans-serif";
  wrap(ctx, opts.lang === "en" ? "For learning only. Not a prescription." : "仅供学习对照，不能替代农技站或化验室。", 64, 1240, 952, 36);
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = opts.lang === "en" ? "tuzhi-photo-check.png" : "tuzhi-diagnose.png";
  a.click();
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, lineH: number) {
  const chars = [...text];
  let line = "";
  let cy = y;
  for (const ch of chars) {
    const next = line + ch;
    if (ctx.measureText(next).width > max && line) {
      ctx.fillText(line, x, cy);
      line = ch;
      cy += lineH;
    } else line = next;
  }
  if (line) {
    ctx.fillText(line, x, cy);
    cy += lineH;
  }
  return cy;
}
