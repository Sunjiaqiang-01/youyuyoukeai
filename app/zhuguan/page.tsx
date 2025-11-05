"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function ZhuguanPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            👔 主管分身
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            24小时在一线倾听的智能主管
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">账号配置</h3>
              <p className="text-text-secondary">
                配置飞鱼/厅卡账号、意向度评判标准、销售话术等
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">参数配置</h3>
              <p className="text-text-secondary">
                企业微信机器人webhook、广告授权ID等参数设置
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

