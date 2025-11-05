"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function GongguanPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            👥 公关师
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            AI挖掘增量用户
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">AI智能触达</h3>
              <p className="text-text-secondary">
                智能维护私域群、高潜用户、粉丝行为学习等功能
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">基础配置</h3>
              <p className="text-text-secondary">
                Cookie设置、浏览器指纹配置等环境管理
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

