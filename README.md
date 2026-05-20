# 購物天地 - 電商購物平台

一個使用 React + Vite + TailwindCSS 打造的現代電商網站。

## 功能特色

- 🏠 **首頁** - Hero 橫幅、商品分類、精選商品、電子報訂閱
- 🛍️ **商店頁面** - 完整商品列表、搜尋、分類篩選
- 📦 **商品詳情** - 詳細商品資訊、評分、數量選擇、加入購物車
- 🛒 **購物車** - 商品管理、數量調整、訂單摘要
- 💳 **結帳** - 收件人資料填寫、多種付款方式

## 商品分類

- 電子產品
- 服飾
- 家居生活
- 美妝保養

## 技術棧

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)（`BrowserRouter`）
- [Lucide React](https://lucide.dev/)

## Clean URL / Fallback

- 使用 `BrowserRouter` 提供乾淨網址路由
- 提供 `404.html` 作為 SPA fallback
- 提供 `public/_redirects` 與 `vercel.json` 以支援常見靜態部署平台的 rewrite/fallback

## 開始使用

```bash
npm install
npm run dev
```

Build 生產版本：

```bash
npm run build
```
