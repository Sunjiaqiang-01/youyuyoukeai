"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function ChuangyiPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            ✨ 创意创作师
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            数字人视频与爆款内容创作
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">定向仿真人</h3>
              <p className="text-text-secondary">
                通过参数定制，生成适配产品场景的平面/3D数字人视频
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-dark-secondary border border-dark-light">
              <h3 className="text-xl font-semibold text-accent-teal mb-4">创意爆款库</h3>
              <p className="text-text-secondary">
                聚合高热度创意模板，降低创作门槛，快速产出爆款内容
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

