# 账号 / 留言 / 重置邮件

制作人侧只收三样：微信号、发信密钥、审校人。本页是工程怎么验。

## 1. 站内留言（已接线）

路径：https://tuzhi.asia/contact

- 空称呼 / 空邮箱 / 空内容：中文提示「请写下称呼 / 请写下能收到回信的邮箱 / 请写下要说的内容」。
- 内容短于 4 字：同样拦下。
- 提交成功：写入 Postgres 表 `contact_messages`，并尝试给 `g17612121666@gmail.com` 发一封备份（只有配了 Resend 才真发出）。
- 蜜罐字段 `company` 有值则静默丢弃。

### 制作人如何查看收件箱

1. 打开项目用的 Neon / Vercel Postgres 控制台（环境变量 `DATABASE_URL` 那一套，不要把密钥贴进仓库）。
2. 跑：

```sql
select id, name, email, left(body, 200) as body, created_at
from contact_messages
order by created_at desc
limit 50;

select id, to_addr, subject, sent_at, error, created_at
from mail_outbox
order by created_at desc
limit 50;
```

3. 没有 SQL 控制台时，看备份邮箱 `g17612121666@gmail.com`（须已配 `RESEND_API_KEY` + `MAIL_FROM`）。
4. 没有公开管理后台，避免把农民留言挂到公网。

沙箱验收：空提交被拦；有库时插入成功。生产提交见部署后证据。

## 2. 忘记密码

- 未配 `RESEND_API_KEY`：点「发重置链接」只显示「发信通道还没开通……请到联系页留言」。**不得**显示「已经发出」。
- 已配密钥：才说「如果这个邮箱有账号，重置信已经发出」。
- 手机号登录名（`*@phone.tuzhi.local`）走「收不到重置信」提示。
- `SMTP_URL` 目前**没有**真正发信实现，不算通道开通，避免假成功。

制作人提供密钥后，在 Vercel 环境变量写入：

- `RESEND_API_KEY`
- `MAIL_FROM`（建议 `土知 <noreply@tuzhi.asia>`，域名邮箱开通后改）

不要把密钥提交进 git。

## 3. /me 云同步

1. 用测试邮箱注册/登录 https://tuzhi.asia/login
2. 打开一篇农业知识，点收藏。
3. 去做一次拍照识别，得到结论（默认不存原图）。
4. 打开 https://tuzhi.asia/me ，应看到收藏和最近诊断结论文字。
5. 换浏览器或清缓存后再登录，收藏和结论文字仍在。
6. 未登录时文案：只在这台手机；登录后跟账号。

实现：`user_favorites` + `diagnose_history`（最多 20 条结论文字）。原图不入库。

沙箱无生产账号密钥，登录实测勾在制作人侧。代码路径已接 `listLibrary` / `mergeFavorites`。

## 4. 结果（本单）

| 项 | 结果 |
| --- | --- |
| 空提交中文校验 | 代码已拦 |
| 留言写入 contact_messages | 有库则写入 |
| 未配密钥时重置 UI | 「通道还没开通」 |
| 配密钥后真发出 | 待制作人提供 RESEND_API_KEY |
| /me 云同步 | 代码已接；真机登录待制作人 |
