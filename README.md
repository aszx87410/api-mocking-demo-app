# API Mocking demo app

此專案使用 [Create React App](https://github.com/facebook/create-react-app) 建置.

## 介紹

這個專案模擬一個簡單的登入功能，並示範 mirage 與 msw 兩種不同的 API mocking。

## MSW(Mock Service Worker)

官網：https://mswjs.io/

可以用以下指令開啟前端網頁：

```
npm run start:msw
```

主要的 handler 在這裡：https://github.com/aszx87410/api-mocking-demo-app/blob/main/src/mocks/handlers.js

### 測試

請先確定執行測試前有把專案跑起來。

相關的測試檔案在這：https://github.com/aszx87410/api-mocking-demo-app/tree/main/cypress/integration/msw

```
npm run cypress:run:msw
```

## Mirage

官網：https://miragejs.com/

可以用以下指令開啟前端網頁：

```
npm run start:mirage
```

有分兩個 mirage server，一個是像 msw 那樣簡單的 mock 版本：https://github.com/aszx87410/api-mocking-demo-app/blob/main/src/mirageServerBasic.js

另外一個則是用內建 ORM 寫的版本：https://github.com/aszx87410/api-mocking-demo-app/blob/main/src/mirageServer.js

### 測試

請先確定執行測試前有把專案跑起來。

```
npm run cypress:run:mirage
```

測試在這邊：https://github.com/aszx87410/api-mocking-demo-app/tree/main/cypress/integration/mirage

有一個 [mirage-sign-in-orm.spec.js](https://github.com/aszx87410/api-mocking-demo-app/blob/main/cypress/integration/mirage/mirage-sign-in-orm.spec.js) 是用 ORM 版本的測試，其他兩個都是用動態 mock 的方式來測試。
