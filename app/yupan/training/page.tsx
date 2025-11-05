"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function YupanTrainingPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            🧠 预判军师 - 自训练数据模型
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            自定义人群特征，生成专属训练模型
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">特征选择工作区</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-dark-primary/50">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">自有年龄</h4>
                  <p className="text-xs text-text-secondary">双滑块选择区间（待实现）</p>
                </div>
                
                <div className="p-4 rounded-lg bg-dark-primary/50">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">自有地域数据</h4>
                  <p className="text-xs text-text-secondary">省市区三级联动选择器（待实现）</p>
                </div>
                
                <div className="p-4 rounded-lg bg-dark-primary/50">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">自有标签</h4>
                  <p className="text-xs text-text-secondary">标签云形式展示（待实现）</p>
                </div>

                <div className="p-4 rounded-lg bg-dark-primary/50">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">消费能力</h4>
                  <p className="text-xs text-text-secondary">星级选择（待实现）</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">数据预览区</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-dark-primary/50">
                  <p className="text-sm text-text-secondary mb-1">人群覆盖率预估</p>
                  <p className="text-2xl font-bold text-accent-teal">--</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">常用数据包</h4>
                  <div className="space-y-2">
                    {["加盟高接通特征包", "加盟转商机特征包", "获客需求特征包", "同城高消费特征包", "旅行群体特征包"].map((item) => (
                      <button 
                        key={item}
                        className="w-full p-2 text-left text-sm rounded-lg bg-dark-primary/30 hover:bg-dark-light transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

