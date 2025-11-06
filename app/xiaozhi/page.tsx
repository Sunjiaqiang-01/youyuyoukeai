"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function XiaozhiPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
            🤖 销智助理
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            AI拟人化信任破冰
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">系统绑定配置</h3>
              <p className="text-text-secondary">
                配置抖音授权、行业选择、广告视频、销售话术等基础信息
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">参数调优</h3>
              <p className="text-text-secondary">
                调整模型参数、输入输出设置、技能接入等高级配置
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

