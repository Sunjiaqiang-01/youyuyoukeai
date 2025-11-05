import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 当前主题：深海蓝绿暗黑版（2025-11-05）
        // 背景色
        'dark-primary': '#050a0f',      // 主背景（几乎纯黑）
        'dark-secondary': '#0a1420',    // 深海暗蓝
        'dark-light': '#162332',        // 中度暗蓝
        // 强调色
        'accent-teal': '#14b8a6',       // 青绿主色
        'accent-cyan': '#0891b2',       // 深青辅助
        'accent-bright': '#06b6d4',     // 亮青点缀
        // 文字色
        'text-primary': '#f0f9ff',      // 纯白
        'text-secondary': '#64748b',    // 中灰
        'text-muted': '#475569',        // 深灰
      },
    },
  },
  plugins: [],
};
export default config;

