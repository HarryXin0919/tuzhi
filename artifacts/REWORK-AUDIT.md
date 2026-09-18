# 土知生产返工审计（对照 https://tuzhi.asia）

抓取时间：2026-09-18 11:08–11:30 HKT。User-Agent：TuzhiAudit/1.0。**www DNS 本单不做。**

## 返工表（开工时线上证据）

| 项 | 对方宣称 | 线上实测 | 状态 |
| --- | --- | --- | --- |
| og:image | 本域 tuzhi.asia | 首页源码：`<meta property="og:image" content="https://wave-solar-harbor-river.grok.me/og.jpg">` | 开工时错 |
| 平台注入 | 已清 | 首页：`grok-project-id`、`grok:app_id`、`/__grok/manifest.webmanifest`、`https://grok.com/grok-app-builder/extensions.js` | 开工时错 |
| suan-hua-roots | 褐秃带尺教学特写 | 线上 281130 B，混有偏白根 | 开工时半对 |
| suan-hua-field | 酸化苗情、无人脸 | 线上 477781 B，可辨认微笑人物正脸 | 开工时错 |
| whole-good | 点片/整块可辨、无人脸 | 线上 585441 B，示范小区有站立人物 | 开工时错 |
| 联系表单 | 写入服务器 | `/contact` 有 `<form>` 与「提交留言」，兼 mailto | 表单在；收件箱待实测 |
| /me 云同步 | 登录后跟账号 | 页面有登录入口与云同步文案；依赖 DATABASE_URL | 待登录实测 |
| 重置邮件 | 自动链接真发出 | UI 曾说「已经排队发出」；仓库无 Resend 密钥 | 假成功风险 |
| 音频 | 472 | 公开路径 `/audio/{id}.zh.mp3` 等，HEAD 样例 200。公开可拉 mp3 = **472**（100×4 + 36×2） | 对（路径不是 /audio/knowledge/） |

首页源码片段（开工证据）：

```
<meta property="og:image" content="https://wave-solar-harbor-river.grok.me/og.jpg">
<link rel="manifest" href="/__grok/manifest.webmanifest">
<meta name="grok-project-id" content="01a03c0b-c703-70b3-bb79-18eed359c756">
<script src="https://grok.com/grok-app-builder/extensions.js" ... defer></script>
<meta property="grok:app_id" content="01a03c0b-c703-70b3-bb79-18eed359c756">
```

响应头 `Server: Vercel`。CSP 未放行 grok.com，脚本标签仍在 HTML 里。分享卡片走 grok.me。

## 本单改法（不重写 100 篇）

1. Nitro 中间件对生产 HTML **一律剥平台壳**（Host 不论 grok.me / vercel.app / tuzhi.asia）。`injectGrokPwaHead` 单测仍按 host 注入，grok.me 测试保持。
2. `transformIndexHtml` 不再把 grok.me OG / extensions.js 烤进 HTML 壳。
3. 酸化田换成 Wikimedia 6161 发僵玉米（无人脸）；褐根再裁掉偏白根；整垄裁到前景小区、去掉站立人物。
4. 化验 cl 主对照图改为 `cl-2.jpg` 盐壳，不再用 `ec-2.jpg`。
5. 未配 `RESEND_API_KEY` 时，重置 UI 只说「发信通道还没开通」。
6. 关于页：农艺审校待聘，不编姓名。

## 抽检（仓库，非全盘重写）

- 知识 15 篇非头部 slug（20260918 种子）：appearance 汉字 ≥206，机制 8 段无「水稻上这件事」胶水，易混 2 条含四段结构，相关 ≥3。未改剂量。
- 化验 10 条：sheet+field 各一，src 全站不复用，内链无死链。
- 英文 10 页：无 five point five、无 Translation pending。suan-hua 英文仍有 5.5。

## 部署后线上验收（本栏部署后填写）

见同目录部署证据段；以 `curl -sL https://tuzhi.asia` 为准。
