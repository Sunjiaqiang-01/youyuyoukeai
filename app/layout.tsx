"use client";

import "./globals.css";
import { ToastProvider } from "@/components/ui/toast-container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <title>有鱼有客AI同事 - 演示网站</title>
        <meta name="description" content="AI工具管理后台演示网站" />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

