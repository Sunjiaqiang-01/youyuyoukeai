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
        // 纯黑高对比度主题（2025-11-05 v2.0）
        // 背景层次 - 纯黑系
        'dark-primary': '#000000',      // 纯黑主背景
        'dark-secondary': '#0d0d0d',    // 卡片背景（微提亮）
        'dark-light': '#2a2a2a',        // 边框/分割线（更明显）
        'dark-hover': '#1a1a1a',        // 悬停态背景
        
        // 强调色 - 增强青绿系（亮度+25-30%）
        'accent-teal': '#06d6a0',       // 青绿主色（提亮30%）
        'accent-cyan': '#00b4d8',       // 天蓝辅助（提亮25%）
        'accent-bright': '#00f5ff',     // 霓虹蓝点缀（极亮）
        
        // 暖色点缀（用于进度/警示）
        'accent-warm': '#ff6b6b',       // 温暖红
        
        // 文字色 - 高对比度
        'text-primary': '#ffffff',      // 纯白（最高对比）
        'text-secondary': '#8c8c8c',    // 中灰（提亮）
        'text-muted': '#5a5a5a',        // 深灰（提亮）
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
export default config;

