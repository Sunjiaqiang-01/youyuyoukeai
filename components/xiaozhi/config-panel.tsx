"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Sliders, Settings, Zap, Loader2 } from "lucide-react";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleFileUpload } from "@/components/ui/simple-file-upload";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-gradient-button";

interface ConfigPanelProps {
  currentStage: 'stage1' | 'stage2' | 'stage3';
}

export function ConfigPanel({ currentStage }: ConfigPanelProps) {
  // 配置状态
  const [douyinAuth, setDouyinAuth] = useState("");
  const [industry, setIndustry] = useState("");
  const [adVideoId, setAdVideoId] = useState("");
  const [salesScript, setSalesScript] = useState<File | null>(null);
  const [salesQA, setSalesQA] = useState<File | null>(null);
  const [productIntro, setProductIntro] = useState<File | null>(null);

  // 参数调优状态
  const [diversity, setDiversity] = useState("medium");
  const [randomness, setRandomness] = useState([0.7]);
  const [contextRounds, setContextRounds] = useState([5]);
  const [outputFormat, setOutputFormat] = useState("text");
  const [maxReplyLength, setMaxReplyLength] = useState([512]);
  const [workflows, setWorkflows] = useState({
    COZE: false,
    KEDO: false,
    FLOWISE: false,
    DIFY: false,
    yanxi: false,
    yunailian: false,
    yuanbao: false,
  });
  const [triggerEnabled, setTriggerEnabled] = useState(false);

  // 训练状态
  const [isTraining, setIsTraining] = useState(false);
  const [trainingStatus, setTrainingStatus] = useState("");

  const handleTrain = () => {
    setIsTraining(true);
    setTrainingStatus("正在初始化训练环境...");
    
    setTimeout(() => {
      setTrainingStatus("正在加载销售话术和知识库...");
    }, 1000);

    setTimeout(() => {
      setTrainingStatus("正在训练模型...");
    }, 2000);

    setTimeout(() => {
      setTrainingStatus("训练完成！模型已就绪");
      setIsTraining(false);
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="w-[440px] h-full flex flex-col overflow-y-auto bg-[#0a0a0a] border-l border-[#1a1a1a] py-6 px-4 scrollbar-thin scrollbar-thumb-accent-teal/30 scrollbar-track-transparent hover:scrollbar-thumb-accent-teal/60"
    >
      {/* 系统绑定配置 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative border border-[#1a1a1a] rounded-2xl p-8 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl shadow-[#06d6a0]/5 space-y-6 hover:border-[#262626] transition-all duration-300 mt-0"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#06d6a0]/3 to-transparent opacity-50" />
        
        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#06d6a0]" />
            <h3 className="text-xl text-[#06d6a0] font-bold">系统绑定配置</h3>
          </div>

          <div className="space-y-3">
            <Label className="text-sm text-[#d0d0d0] font-medium">抖音授权号</Label>
            <input
              type="text"
              value={douyinAuth}
              onChange={(e) => setDouyinAuth(e.target.value)}
              placeholder="请输入抖音授权号"
              className="w-full px-4 py-3 bg-[#121212] border border-[#1a1a1a] rounded-xl text-[#f0f9ff] text-sm placeholder:text-[#606060] focus:outline-none focus:ring-2 focus:ring-[#06d6a0]/40 focus:border-[#06d6a0] hover:border-[#262626] transition-all duration-200"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm text-[#d0d0d0] font-medium">行业选择</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-[#121212] border-[#1a1a1a] text-[#f0f9ff] h-12 rounded-xl hover:border-[#262626] transition-all duration-200">
                <SelectValue placeholder="请选择行业" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] border-[#1a1a1a]">
                <SelectItem value="education" className="text-[#f0f9ff] hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] transition-colors">教育培训</SelectItem>
                <SelectItem value="ecommerce" className="text-[#f0f9ff] hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] transition-colors">电商零售</SelectItem>
                <SelectItem value="finance" className="text-[#f0f9ff] hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] transition-colors">金融服务</SelectItem>
                <SelectItem value="real_estate" className="text-[#f0f9ff] hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] transition-colors">房地产</SelectItem>
                <SelectItem value="healthcare" className="text-[#f0f9ff] hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] transition-colors">医疗健康</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm text-[#d0d0d0] font-medium">广告视频ID</Label>
            <input
              type="text"
              value={adVideoId}
              onChange={(e) => setAdVideoId(e.target.value)}
              placeholder="请输入视频ID"
              className="w-full px-4 py-3 bg-[#121212] border border-[#1a1a1a] rounded-xl text-[#f0f9ff] text-sm placeholder:text-[#606060] focus:outline-none focus:ring-2 focus:ring-[#06d6a0]/40 focus:border-[#06d6a0] hover:border-[#262626] transition-all duration-200"
            />
          </div>

          <div className="space-y-3">
            <SimpleFileUpload 
              label="销售话术"
              onFileSelect={(files) => setSalesScript(files[0] || null)}
            />
          </div>

          <div className="space-y-3">
            <SimpleFileUpload 
              label="销售百问百答"
              onFileSelect={(files) => setSalesQA(files[0] || null)}
            />
          </div>

          <div className="space-y-3">
            <SimpleFileUpload 
              label="产品介绍"
              onFileSelect={(files) => setProductIntro(files[0] || null)}
            />
          </div>
        </div>
      </motion.div>

      {/* 快捷参数调优 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative border border-[#1a1a1a] rounded-2xl p-8 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl shadow-[#06d6a0]/5 space-y-5 hover:border-[#262626] transition-all duration-300 mt-6"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-[#14b8a6]/3 to-transparent opacity-50" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[#06d6a0]" />
            <h3 className="text-xl text-[#06d6a0] font-bold">快捷参数</h3>
          </div>

          {/* 生成模式 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-[#d0d0d0] font-medium">生成模式</Label>
              <span className="text-xs text-[#06d6a0] font-semibold">{diversity === 'low' ? '精确' : diversity === 'medium' ? '平衡' : '创意'}</span>
            </div>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDiversity(mode)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    diversity === mode
                      ? 'bg-[#06d6a0] text-[#0a0a0a]'
                      : 'bg-[#1a1a1a] text-[#a0a0a0] hover:bg-[#262626]'
                  }`}
                >
                  {mode === 'low' ? '精确' : mode === 'medium' ? '平衡' : '创意'}
                </button>
              ))}
            </div>
          </div>

          {/* 随机性 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-[#d0d0d0] font-medium">随机性</Label>
              <span className="text-sm text-[#06d6a0] font-bold">{(randomness[0] * 100).toFixed(0)}</span>
            </div>
            <Slider
              value={randomness}
              onValueChange={setRandomness}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* 上下文轮数 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-[#d0d0d0] font-medium">上下文轮数</Label>
              <span className="text-sm text-[#06d6a0] font-bold">{contextRounds[0]}</span>
            </div>
            <Slider
              value={contextRounds}
              onValueChange={setContextRounds}
              min={0}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* 详细设置按钮 */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full justify-center gap-2 h-10 bg-[#121212] text-[#f0f9ff] font-medium hover:bg-[#1a1a1a] hover:border-[#06d6a0]/40 transition-all duration-200 border border-[#1a1a1a] rounded-xl">
                <Settings className="h-4 w-4" />
                详细参数设置
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#0a0a0a] backdrop-blur-xl border-[#1a1a1a] overflow-y-auto scrollbar-thin scrollbar-thumb-accent-teal/30 scrollbar-track-transparent">
              <SheetHeader>
                <SheetTitle className="text-[#06d6a0] text-xl">详细参数配置</SheetTitle>
                <SheetDescription className="text-[#a0a0a0]">
                  配置完整的模型参数和技能设置
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-8 mt-8">
                {/* 输出格式 */}
                <div className="space-y-3">
                  <Label className="text-base text-[#d0d0d0] font-medium">输出格式</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger className="bg-[#121212] border-[#1a1a1a] text-[#f0f9ff] h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-[#1a1a1a]">
                      <SelectItem value="text" className="text-[#f0f9ff]">文本</SelectItem>
                      <SelectItem value="sentence" className="text-[#f0f9ff]">句子</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 最大回复长度 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base text-[#d0d0d0] font-medium">最大回复长度</Label>
                    <span className="text-base text-[#06d6a0] font-bold">{maxReplyLength[0]}</span>
                  </div>
                  <Slider
                    value={maxReplyLength}
                    onValueChange={setMaxReplyLength}
                    min={1000}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* 工作流接入 */}
                <div className="space-y-4 pt-4 border-t border-[#1a1a1a]">
                  <Label className="text-base text-[#d0d0d0] font-medium">工作流接入</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries({
                      COZE: "COZE",
                      KEDO: "KEDO",
                      FLOWISE: "FLOWISE",
                      DIFY: "DIFY",
                      yanxi: "言犀",
                      yunailian: "云百炼",
                      yuanbao: "元宝",
                    }).map(([key, label]) => {
                      const isActive = workflows[key as keyof typeof workflows];
                      return (
                        <motion.button
                          key={key}
                          onClick={() =>
                            setWorkflows((prev) => ({ ...prev, [key]: !prev[key as keyof typeof workflows] }))
                          }
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            relative h-20 rounded-xl border transition-all duration-300 cursor-pointer
                            flex items-center justify-center
                            ${
                              isActive
                                ? "bg-[#121212] border-[#06d6a0] shadow-lg shadow-[#06d6a0]/50"
                                : "bg-[#121212] border-[#1a1a1a] hover:border-[#262626]"
                            }
                          `}
                        >
                          {/* 已连接徽章 */}
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute top-2 right-2 flex items-center gap-1"
                            >
                              <div className="h-2 w-2 rounded-full bg-[#06d6a0] animate-pulse shadow-lg shadow-[#06d6a0]/50" />
                            </motion.div>
                          )}
                          
                          {/* 平台名称 */}
                          <span
                            className={`
                              text-sm font-semibold transition-colors duration-300
                              ${isActive ? "text-[#06d6a0]" : "text-[#a0a0a0]"}
                            `}
                          >
                            {label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* 触发器 */}
                <div
                  className={`
                    space-y-3 pt-4 border-t transition-all duration-300
                    ${triggerEnabled ? "border-[#06d6a0]/30" : "border-[#1a1a1a]"}
                  `}
                >
                  <Label className="text-base text-[#d0d0d0] font-medium">触发器创建</Label>
                  <div
                    className={`
                      py-4 px-4 rounded-xl transition-all duration-300
                      ${
                        triggerEnabled
                          ? "bg-[#06d6a0]/5 border border-[#06d6a0]/30"
                          : "bg-[#1a1a1a]/30 border border-transparent hover:bg-[#1a1a1a]/50"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          {/* 脉动指示器 */}
                          {triggerEnabled && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="h-2 w-2 rounded-full bg-[#06d6a0] animate-pulse shadow-lg shadow-[#06d6a0]/50"
                            />
                          )}
                          <Label className="text-sm text-[#d0d0d0] font-medium cursor-pointer">
                            自动触发响应
                          </Label>
                        </div>
                        <p className="text-xs text-[#808080] leading-relaxed">
                          启用后，AI将根据配置的工作流自动响应用户行为
                        </p>
                      </div>
                      <Switch
                        checked={triggerEnabled}
                        onCheckedChange={setTriggerEnabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>

      {/* 开始训练按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6"
      >
        <AnimatedButton
          label={isTraining ? "自训练中..." : "开始训练"}
          variant="gradient"
          size="lg"
          loading={isTraining}
          onClick={handleTrain}
          iconLeft={!isTraining ? <Sparkles className="h-5 w-5" /> : undefined}
          className="w-full"
        />
      </motion.div>

      {/* 训练状态提示 */}
      {trainingStatus && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative border border-[#06d6a0]/30 rounded-xl p-5 bg-[#0a0a0a]/80 backdrop-blur-sm mt-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#06d6a0] animate-pulse shadow-lg shadow-[#06d6a0]/50" />
            <p className="text-sm text-[#d0d0d0] font-normal">{trainingStatus}</p>
          </div>
        </motion.div>
      )}

      {/* 底部占位空间 */}
      <div className="h-4" />
    </motion.div>
  );
}

