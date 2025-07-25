# Firebase 设置指南

## 1. 创建 Firebase 项目

1. 访问 [Firebase 控制台](https://console.firebase.google.com/)
2. 点击"创建项目"
3. 输入项目名称（例如：creative-hub）
4. 选择是否启用 Google Analytics（推荐启用）
5. 完成项目创建

## 2. 启用身份验证

1. 在 Firebase 控制台中，转到"Authentication"
2. 点击"开始使用"
3. 转到"Sign-in method"标签
4. 启用以下登录方式：
   - **电子邮件/密码**：点击启用
   - **Google**：点击启用，设置项目支持电子邮件

## 3. 设置 Firestore 数据库

1. 在 Firebase 控制台中，转到"Firestore Database"
2. 点击"创建数据库"
3. 选择"以测试模式启动"（稍后可修改规则）
4. 选择数据库位置（推荐选择离您最近的区域）

## 4. 获取 Firebase 配置

1. 在 Firebase 控制台中，点击项目设置（齿轮图标）
2. 滚动到"您的应用"部分
3. 点击"添加应用"，选择"Web"
4. 注册应用（输入应用昵称）
5. 复制配置对象

## 5. 更新项目配置

将获取的 Firebase 配置替换到 `src/config/firebase.ts` 文件中：

```typescript
const firebaseConfig = {
  apiKey: "您的-api-key",
  authDomain: "您的项目ID.firebaseapp.com",
  projectId: "您的项目ID",
  storageBucket: "您的项目ID.appspot.com",
  messagingSenderId: "您的发送者ID",
  appId: "您的应用ID",
  measurementId: "您的测量ID"
};
```

## 6. 启动应用

完成配置后，启动开发服务器：

```bash
npm start
```

现在您可以：
- 使用邮箱和密码注册/登录
- 使用 Google 账户登录
- 编辑个人资料
- 查看受保护的页面

## 故障排除

### 常见问题

1. **Firebase 配置错误**
   - 确保配置对象中的所有字段都正确填写
   - 检查项目 ID 是否匹配

2. **身份验证失败**
   - 确保在 Firebase 控制台中启用了相应的登录方式
   - 检查域名是否已添加到授权域名列表

### 获取帮助

如果遇到问题，请查看：
- [Firebase 文档](https://firebase.google.com/docs)
- [Firebase 身份验证指南](https://firebase.google.com/docs/auth) 