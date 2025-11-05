"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function XiaozhiConfigPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            🤖 销智助理 - 系统绑定配置
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            配置系统基础信息与授权
          </p>
          
          <div className="max-w-2xl p-8 rounded-xl bg-dark-secondary border border-dark-light">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">输入抖音授权号</label>
                <input
                  type="text"
                  placeholder="请输入授权号"
                  className="w-full px-4 py-2 rounded-lg bg-dark-primary border border-dark-light text-text-primary focus:border-accent-teal outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">选择行业</label>
                <select className="w-full px-4 py-2 rounded-lg bg-dark-primary border border-dark-light text-text-primary focus:border-accent-teal outline-none">
                  <option>请选择</option>
                  <option>电商零售</option>
                  <option>教育培训</option>
                  <option>美妆护肤</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">上传广告视频ID</label>
                <input
                  type="text"
                  placeholder="请输入视频ID"
                  className="w-full px-4 py-2 rounded-lg bg-dark-primary border border-dark-light text-text-primary focus:border-accent-teal outline-none"
                />
              </div>
              
              {["上传销售话术", "上传销售百问百答", "上传产品介绍"].map((label) => (
                <div key={label}>
                  <label className="block text-sm font-semibold text-text-primary mb-2">{label}</label>
                  <button className="px-4 py-2 rounded-lg bg-accent-teal/20 text-accent-teal hover:bg-accent-teal/30 transition-colors">
                    选择文件
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

