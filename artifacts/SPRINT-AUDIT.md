# 本单开工审计（对照仓库 + 线上 tuzhi.asia）

对照日：2026-09-17。线上仍可能是较旧导出；本单以仓库为准并一次清零。

## 已完成（只回归）

| 项 | 仓库 | 本单 |
| --- | --- | --- |
| 单一 self-canonical、hreflang、sitemap 含 /en 与社区 | 有 | 未推倒 |
| 诊断出境勾选、隐私出境要素 | 有 | 未推倒 |
| pH 主图化验单示意；lab-good / lab-bad | 有 | 未推倒 |
| OG 本域 /og.jpg | 有 | 未推倒 |
| 拍照 label+capture / 相册 / getUserMedia / 微信提示 | 有 | 首屏改 CSS，不靠 hydration |

## 本单已清零

### A 工程
- 生产 CSP 已去掉第三方脚本/连接白名单里的无关域；frame-ancestors 仅 self
- 手机首屏即「拍照 / 相册 / 页内摄像头」（CSS，390 视口实测 display:flex）；桌面「选择文件」
- 联系页：站内服务端表单（田间主渠道）+ Gmail 备份
- /me：登录后云同步收藏与最近 20 次诊断结论文字（默认不存原图）
- 登录：自动重置链接邮件 + 注册验证信；手机号写清不能收重置信

### B 配图
- suan-hua-roots 换成洗根褐秃带尺（Wikimedia 6164），不再用整株紫茎
- suan-hua-field / wiki/ph-2 / diagnose/whole-bad 已拆成三张不同文件
- diagnose/whole-good 换成能看清整垄分布的示范地
- 冷害对照（花椰菜冻害）、中国盐霜土面（青海茶卡）、健康白根示意图已补
- 诊断六张 + 化验单正反例齐；36 条化验词各有独特单子图 + 地头/剖面对照

### C–F
- 100 篇中文：地里长什么样 ≥180；为什么会这样四段；混淆四句；用量数字未改
- 英文独立 overlay；标题 · Tuzhi；导航 Take photos / Lab sheet
- 472 条神经女声音频（100×4 + 36×2），缺失 0

### 制作人需提供（最短清单）
见 [LEFTOVERS.md](LEFTOVERS.md)：微信号、域名邮箱发信密钥、审校人署名。
