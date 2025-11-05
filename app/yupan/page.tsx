"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function YupanPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            🧠 预判军师
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            AI人群特征私训模型
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">数据看板</h3>
              <p className="text-text-secondary">
                实时展示人群数据、耦合进度、特征云图等核心指标
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">自训练数据模型</h3>
              <p className="text-text-secondary">
                自定义人群特征、地域、消费能力等条件，生成专属数据包
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

