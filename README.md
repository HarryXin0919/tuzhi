# 土知

看懂土地，种好地。面向农民的土壤科普：拍照对照、农业知识、化验知识、问答。

站点：https://tuzhi.asia  
联系：g17612121666@gmail.com（优先用该邮箱写信；地址里的数字不是客服电话）

诊断仅供学习，不替代农技站或化验室。

## 上线后人工要做

这些事代码里做不了，也不要假装已经完成。

1. DNS：给 `www.tuzhi.asia` 做 CNAME/A，并 301 到 `https://tuzhi.asia`；证书 SAN 加上 www。
2. 国内加速：Vercel 美东对田间用户不友好，考虑国内 CDN 或国内静态托管。
3. 提交百度搜索资源平台 + Google Search Console + Bing Webmaster 的 sitemap（`https://tuzhi.asia/sitemap.xml`）。
4. 联系方式若有微信/公众号，再写进联系页（没有就别编）。
5. 确认诊断照片实际发往哪个模型、是否出境，并与隐私页逐字一致（当前实现：服务器转发到 xAI `api.x.ai`，服务在境外）。
6. Let’s Encrypt 到期日约 2026-11-30，确认平台自动续期。
7. 用微信分享调试工具核对 `https://tuzhi.asia/og.jpg` 卡片：中文口号必须是「看懂土地，种好地」，不要英文撇号。
8. Lighthouse（手机）看首页、农业知识、拍照识别：标题、清单、相机/相册按钮。
9. 确认 `g17612121666@gmail.com` 能收到信，并把垃圾箱规则设好。
