"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Cookie, Fingerprint } from "lucide-react";

export default function GongguanSettingsPage() {
  // Cookie状态
  const [cookieSaved, setCookieSaved] = useState(false);
  const [showCookieSuccess, setShowCookieSuccess] = useState(false);

  // 浏览器指纹状态
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'loaded' | 'success' | 'idle'>('loaded');

  // Cookie获取
  const handleGetCookie = () => {
    // 模拟获取Cookie操作
    setTimeout(() => {
      setShowCookieSuccess(true);
      setTimeout(() => setShowCookieSuccess(false), 3000);
    }, 500);
  };

  // Cookie保存
  const handleSaveCookie = () => {
    setCookieSaved(true);
    setShowCookieSuccess(true);
    setTimeout(() => setShowCookieSuccess(false), 3000);
  };

  // 重置环境
  const handleResetEnvironment = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    setConnectionStatus('idle');

    // 模拟15秒加载过程
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setConnectionStatus('success');
          // 3秒后恢复到loaded状态
          setTimeout(() => {
            setConnectionStatus('loaded');
          }, 3000);
          return 100;
        }
        return prev + (100 / 15); // 每秒增加约6.67%
      });
    }, 1000);
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
            👥 公关师 - 基础配置
          </h1>
          <p className="text-lg text-[#d0d0d0] mb-8">
            Cookie设置与浏览器指纹配置
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cookie设置 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-dark-primary">
                  <Cookie className="size-6 text-[#06d6a0]" />
                </div>
                <h3 className="text-xl font-bold text-[#06d6a0]">Cookie设置</h3>
              </div>

              <div className="space-y-4">
                {/* Cookie状态 */}
                <div className="p-4 rounded-lg bg-dark-primary">
                  <div className="flex items-center justify-between">
                    <span className="text-[#d0d0d0]">状态：</span>
                    <div className="flex items-center gap-2">
                      {cookieSaved ? (
                        <>
                          <CheckCircle2 className="size-4 text-[#06d6a0]" />
                          <span className="text-[#06d6a0] font-medium">已保存</span>
                        </>
                      ) : (
                        <span className="text-[#a0a0a0]">未保存</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleGetCookie}
                    className="py-3 rounded-lg bg-dark-primary border border-dark-light text-[#f0f9ff] font-semibold hover:border-[#06d6a0] hover:bg-dark-hover transition-all"
                  >
                    获取Cookie
                  </button>
                  <button
                    onClick={handleSaveCookie}
                    className="py-3 rounded-lg bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] font-semibold hover:opacity-90 transition-opacity"
                  >
                    保存Cookie
                  </button>
                </div>

                {/* 成功提示 */}
                {showCookieSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-lg bg-[#06d6a0]/10 border border-[#06d6a0]/30"
                  >
                    <div className="flex items-center gap-2 text-[#06d6a0]">
                      <CheckCircle2 className="size-4" />
                      <span className="text-sm font-medium">操作成功</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* 浏览器指纹设置 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-dark-primary">
                  <Fingerprint className="size-6 text-[#06d6a0]" />
                </div>
                <h3 className="text-xl font-bold text-[#06d6a0]">浏览器指纹设置</h3>
              </div>

              <div className="space-y-4">
                {/* 环境加载状态 */}
                <div className="p-4 rounded-lg bg-dark-primary">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#d0d0d0]">环境状态：</span>
                    <div className="flex items-center gap-2">
                      {connectionStatus === 'loaded' && (
                        <>
                          <div className="size-2 rounded-full bg-[#06d6a0] animate-pulse" />
                          <span className="text-[#06d6a0] font-medium">环境已加载</span>
                        </>
                      )}
                      {connectionStatus === 'success' && (
                        <>
                          <CheckCircle2 className="size-4 text-[#06d6a0]" />
                          <span className="text-[#06d6a0] font-medium">连接成功</span>
                        </>
                      )}
                      {connectionStatus === 'idle' && (
                        <span className="text-[#a0a0a0]">加载中...</span>
                      )}
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#a0a0a0]">加载进度</span>
                      <span className="text-[#06d6a0] font-semibold">
                        {Math.round(loadingProgress)}%
                      </span>
                    </div>
                    <div className="w-full bg-dark-light rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#06d6a0] to-[#00b4d8]"
                        initial={{ width: '100%' }}
                        animate={{ width: `${loadingProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* 重置按钮 */}
                <button
                  onClick={handleResetEnvironment}
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg bg-dark-primary border border-dark-light text-[#f0f9ff] font-semibold hover:border-[#06d6a0] hover:bg-dark-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '重置中...' : '重置环境'}
                </button>

                {/* 说明文字 */}
                <div className="p-3 rounded-lg bg-dark-primary border border-dark-light">
                  <p className="text-xs text-[#a0a0a0] leading-relaxed">
                    点击"重置环境"后，系统将重新加载浏览器指纹环境，预计耗时15秒。完成后显示"连接成功"。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
