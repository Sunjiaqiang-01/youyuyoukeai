"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function YupanDashboardPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            🧠 预判军师 - 数据看板
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            实时数据分析与人群特征可视化
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-sm text-text-secondary mb-2">完整数据包人群</h3>
              <p className="text-3xl font-bold text-accent-teal">6000万</p>
              <p className="text-xs text-text-muted mt-2">持续增长中...</p>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-sm text-text-secondary mb-2">本地储存数据包</h3>
              <p className="text-3xl font-bold text-accent-cyan">100万</p>
              <p className="text-xs text-text-muted mt-2">实时同步</p>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-sm text-text-secondary mb-2">耦合数据进度</h3>
              <p className="text-3xl font-bold text-accent-bright">30.15%</p>
              <p className="text-xs text-text-muted mt-2">8000万数据</p>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-sm text-text-secondary mb-2">人群特征标签</h3>
              <p className="text-3xl font-bold text-accent-teal">30+</p>
              <p className="text-xs text-text-muted mt-2">多维度分析</p>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-dark-secondary border border-dark-light">
            <h3 className="text-xl font-semibold text-accent-teal mb-4">人群特征云图</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-text-secondary">人群特征可视化云图（待实现）</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

