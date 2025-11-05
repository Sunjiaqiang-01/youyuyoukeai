"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            有鱼有客AI同事
          </h1>
          <p className="text-xl text-text-secondary mb-12">
            AI驱动的全链路营销解决方案
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { name: "预判军师", desc: "AI人群特征私训模型", icon: "🧠", href: "/yupan" },
              { name: "销智助理", desc: "AI拟人化信任破冰", icon: "🤖", href: "/xiaozhi" },
              { name: "公关师", desc: "AI挖掘增量用户", icon: "👥", href: "/gongguan" },
              { name: "创意创作师", desc: "数字人与爆款创作", icon: "✨", href: "/chuangyi" },
              { name: "主管分身", desc: "24小时智能主管", icon: "👔", href: "/zhuguan" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group p-6 rounded-xl bg-dark-secondary border border-dark-light hover:border-accent-teal transition-all duration-300 hover:shadow-lg hover:shadow-accent-teal/20"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-teal transition-colors">
                  {item.name}
                </h3>
                <p className="text-text-secondary">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

