"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import IOSSwitch from "@/components/ui/ios-switch";
import { SimpleFileUpload } from "@/components/ui/simple-file-upload";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function GongguanReachPage() {
  // 智能维护选项状态
  const [privateGroupMaintenance, setPrivateGroupMaintenance] = useState(false);
  const [highPotentialComments, setHighPotentialComments] = useState(false);
  const [overlappingBrowsing, setOverlappingBrowsing] = useState(false);
  const [highVisit, setHighVisit] = useState(false);
  const [fansBehavior, setFansBehavior] = useState(false);

  // 触发动作状态
  const [aiContentIdentify, setAiContentIdentify] = useState(false);
  const [continuousCare, setContinuousCare] = useState(false);
  const [uploadedSOPFiles, setUploadedSOPFiles] = useState<File[]>([]);

  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
            👥 公关师 - AI智能触达
          </h1>
          <p className="text-lg text-[#d0d0d0] mb-8">
            智能化用户触达与维护
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 智能维护选项 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
            >
              <h3 className="text-xl font-bold text-[#06d6a0] mb-6">智能维护选项</h3>
              <div className="space-y-4">
                {/* 自媒体平台私人群维护 */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-dark-primary hover:bg-dark-hover transition-colors">
                  <div className="flex-1">
                    <label className="text-[#f0f9ff] font-semibold cursor-pointer">
                      自媒体平台私人群维护
                    </label>
                    <p className="text-xs text-[#a0a0a0] mt-1">自动维护私域社群活跃度</p>
                  </div>
                  <IOSSwitch
                    checked={privateGroupMaintenance}
                    onCheckedChange={setPrivateGroupMaintenance}
                  />
                </div>

                {/* 高潜评论人群维护 */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-dark-primary hover:bg-dark-hover transition-colors">
                  <div className="flex-1">
                    <label className="text-[#f0f9ff] font-semibold cursor-pointer">
                      高潜评论人群维护
                    </label>
                    <p className="text-xs text-[#a0a0a0] mt-1">识别并维护高价值评论用户</p>
                  </div>
                  <IOSSwitch
                    checked={highPotentialComments}
                    onCheckedChange={setHighPotentialComments}
                  />
                </div>

                {/* 主页与作品重合浏览人群 */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-dark-primary hover:bg-dark-hover transition-colors">
                  <div className="flex-1">
                    <label className="text-[#f0f9ff] font-semibold cursor-pointer">
                      主页与作品重合浏览人群
                    </label>
                    <p className="text-xs text-[#a0a0a0] mt-1">追踪深度浏览用户</p>
                  </div>
                  <IOSSwitch
                    checked={overlappingBrowsing}
                    onCheckedChange={setOverlappingBrowsing}
                  />
                </div>

                {/* 高访问人群 */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-dark-primary hover:bg-dark-hover transition-colors">
                  <div className="flex-1">
                    <label className="text-[#f0f9ff] font-semibold cursor-pointer">
                      高访问人群
                    </label>
                    <p className="text-xs text-[#a0a0a0] mt-1">监控高频访问用户</p>
                  </div>
                  <IOSSwitch
                    checked={highVisit}
                    onCheckedChange={setHighVisit}
                  />
                </div>

                {/* 粉丝行为学习 */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-dark-primary hover:bg-dark-hover transition-colors border border-transparent hover:border-[#06d6a0]/30">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <label className="text-[#f0f9ff] font-semibold cursor-pointer">
                        粉丝行为学习
                      </label>
                      <a
                        href="https://console.volcengine.com/ml-platform/region:ml-platform+cn-beijing/dashboard?guideTab=mlDevelopment"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#06d6a0] hover:text-[#00b4d8] transition-colors"
                        title="查看火山引擎ML平台"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </div>
                    <p className="text-xs text-[#a0a0a0] mt-1">AI分析粉丝行为模式</p>
                  </div>
                  <IOSSwitch
                    checked={fansBehavior}
                    onCheckedChange={setFansBehavior}
                  />
                </div>
              </div>
            </motion.div>

            {/* 触发动作 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
            >
              <h3 className="text-xl font-bold text-[#06d6a0] mb-6">触发动作</h3>
              <div className="space-y-6">
                {/* 群触达SOP */}
                <div className="p-4 rounded-lg bg-dark-primary">
                  <label className="text-[#f0f9ff] font-semibold block mb-3">
                    群触达SOP
                  </label>
                  <SimpleFileUpload
                    label="上传SOP文件"
                    accept=".pdf,.doc,.docx,.txt"
                    maxFiles={3}
                    onFileSelect={setUploadedSOPFiles}
                  />
                  <p className="text-xs text-[#a0a0a0] mt-2">
                    支持PDF、Word、TXT格式，最多3个文件
                  </p>
                </div>

                {/* AI识别作品内容制造话题 */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-dark-primary hover:bg-dark-hover transition-colors">
                  <div className="flex-1">
                    <label className="text-[#f0f9ff] font-semibold cursor-pointer">
                      AI识别作品内容制造话题
                    </label>
                    <p className="text-xs text-[#a0a0a0] mt-1">自动生成互动话题</p>
                  </div>
                  <IOSSwitch
                    checked={aiContentIdentify}
                    onCheckedChange={setAiContentIdentify}
                  />
                </div>

                {/* 连续关心点赞 */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-dark-primary hover:bg-dark-hover transition-colors">
                  <div className="flex-1">
                    <label className="text-[#f0f9ff] font-semibold cursor-pointer">
                      连续关心点赞
                    </label>
                    <p className="text-xs text-[#a0a0a0] mt-1">持续互动增强用户粘性</p>
                  </div>
                  <IOSSwitch
                    checked={continuousCare}
                    onCheckedChange={setContinuousCare}
                  />
                </div>

                {/* 手动关怀 */}
                <div className="p-4 rounded-lg bg-dark-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <label className="text-[#f0f9ff] font-semibold">
                        手动关怀
                      </label>
                      <p className="text-xs text-[#a0a0a0] mt-1">填写用户关怀表单</p>
                    </div>
                    <a
                      href="https://f.wps.cn/ksform/w/write/6qKRfkqm#routePromt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      <span>打开表单</span>
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

