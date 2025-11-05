# 有鱼有客AI同事 - 演示网站

## 项目简介

这是一个面向高端客户展示的AI工具管理后台演示网站，采用暗黑渐变色主题，展示AI驱动的全链路营销解决方案。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 3.4.17
- **动画**: Framer Motion
- **UI组件**: Radix UI + 自定义组件
- **图标**: Lucide React

## 功能模块

1. **预判军师** (`/yupan`) - AI人群特征私训模型
2. **销智助理** (`/xiaozhi`) - AI拟人化信任破冰
3. **公关师** (`/gongguan`) - AI挖掘增量用户
4. **创意创作师** (`/chuangyi`) - 数字人与爆款创作
5. **主管分身** (`/zhuguan`) - 24小时智能主管

## 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行生产版本
npm start
```

访问 http://localhost:3000 查看网站

## 主题配色

项目采用深海蓝绿暗黑主题：

- 主背景: `#050a0f` (几乎纯黑)
- 卡片背景: `#0a1420` (深海暗蓝)
- 浅色背景: `#162332` (中度暗蓝)
- 主强调色: `#14b8a6` (青绿色)
- 辅助强调: `#0891b2` (深青色)
- 亮色点缀: `#06b6d4` (亮青色)

## 项目结构

```
youyu-AI/
├── app/                    # Next.js应用目录
│   ├── yupan/             # 预判军师
│   ├── xiaozhi/           # 销智助理
│   ├── gongguan/          # 公关师
│   ├── chuangyi/          # 创意创作师
│   ├── zhuguan/           # 主管分身
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # 组件目录
│   └── ui/               # UI组件
│       ├── sidebar.tsx   # 侧边栏导航
│       ├── button.tsx    # 按钮组件
│       ├── badge.tsx     # 标签组件
│       └── ...           # 其他UI组件
├── lib/                  # 工具函数
│   └── utils.ts          # 通用工具
└── tailwind.config.ts    # Tailwind配置

```

## 开发规范

- 遵循21st.dev组件使用标准流程
- 字符级复刻组件，不做任何优化或简化
- 只修改数据层（文本、颜色值），不改视觉层（结构、动画参数）
- 保持暗黑渐变主题色一致性

## 注意事项

- Tailwind版本锁定在3.4.17，禁止升级到v4
- 修改Tailwind配置后必须重启开发服务器
- 所有组件严格遵循项目主题配色规范

## 许可证

私有项目，仅供演示使用

