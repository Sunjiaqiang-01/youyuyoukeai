"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function XiaozhiParamsPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            🤖 销智助理 - 参数调优
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            高级模型参数设置
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-lg font-semibold text-accent-teal mb-4">模型参数</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">生成多样性</label>
                  <div className="flex gap-2">
                    {["精确模式", "平衡模式", "创意模式"].map((mode) => (
                      <button
                        key={mode}
                        className="px-4 py-2 rounded-lg bg-dark-primary hover:bg-dark-light transition-colors text-sm"
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">生成随机性: 50</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-lg font-semibold text-accent-teal mb-4">输入输出设置</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">携带上下文轮数: 5</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    defaultValue="5"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">最大回复长度: 5000</label>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="100"
                    defaultValue="5000"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

