# 真机测试步骤（拍照三路径）

沙箱无法打开微信内置浏览器。下面步骤给制作人在真机勾选。代码路径三端都可降级：拍照、相册、页内摄像头。

## 共同前提

- 打开 https://tuzhi.asia/diagnose（或本预览的拍照页）
- 允许相机/相册权限
- 不要只靠「选择文件」在手机上完成首屏

## A. iPhone Safari

1. 用 Safari 打开拍照页，不要等很久。首屏就应看到「拍照 / 相册 / 页内摄像头」，不应先看到「选择文件」再跳变。
2. 点「拍照」：系统相机后置，拍一张整株。
3. 点「相册」：从照片库选一张，不要调起相机。
4. 点「页内摄像头」：页内预览，点快门。若拒绝权限，应出现人话提示，并可改走相册。
5. HEIC 照片应能用（能转成可上传）。
6. 桌面宽度（如外接键盘 iPad 横屏 ≥900px）应看到「选择文件」，这是桌面路径。

结果（沙箱 Playwright 390×844）：`.tz-cam-phone` / `.tz-alb-phone` / `.tz-live-phone` 为 `display:flex`，「拍照 / 相册 / 页内摄像头」在 `domcontentloaded` 即可见；`.tz-file-desk` 为 `display:none`。真机请制作人勾 □ 通过 / □ 失败。

## B. Android Chrome

1. Chrome 打开拍照页，首屏即「拍照 / 相册 / 页内摄像头」。
2. 「拍照」走 `capture=environment` 后置相机。
3. 「相册」无 capture，进图库。
4. 「页内摄像头」走 getUserMedia，拒绝时有提示。
5. 非 HTTPS 且非 localhost 时，页内摄像头应提示不安全并改走相册。

结果（沙箱 Playwright 1280×800）：拍照/相册/页内摄像头 `display:none`，「选择文件」`display:flex`。Android 真机请勾 □ 通过 / □ 失败。

## C. 微信内置浏览器

沙箱测不了微信。请制作人用微信打开同一地址：

1. 若微信拦相机：页面应出现人话，引导改用「相册」或系统浏览器打开。
2. 「相册」必须能选图，这是微信失败时的主降级。
3. 不要做成必须装 App 才能拍。

结果：□ 相册可用  □ 提示出现  □ 系统浏览器可用

## 代码路径（已实现）

| 路径 | 实现 | 首屏 |
| --- | --- | --- |
| 拍照 | `<label>` + `input capture=environment` | 手机 CSS `.tz-cam-phone` 显示，不靠 JS |
| 相册 | `<label>` + `input` 无 capture | 同上 `.tz-alb-phone` |
| 页内摄像头 | `getUserMedia({ facingMode: environment })` | `.tz-live-phone` |
| 桌面 | 「选择文件」 | `.tz-file-desk`，手机隐藏 |

hydration 只用于微信提示，不决定首屏按钮文案。
