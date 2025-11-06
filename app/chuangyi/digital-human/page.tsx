"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import AnimatedInput from "@/components/ui/animated-input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectOption } from "@/components/ui/animated-select";
import RangeSlider from "@/components/ui/range-slider";
import { SingleSelectTags } from "@/components/ui/single-select-tags";
import { MultiSelectTags } from "@/components/ui/multi-select-tags";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-container";
import BasicModal from "@/components/ui/basic-modal";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Play, Save, Download, Briefcase, Heart, TrendingUp, Zap, Package, Video, Settings2, Sparkles, UserCircle2, Upload, Smile, Volume2, MessageCircle, Move, Eye, Footprints, Film, Monitor, Music, Type, Image, RotateCcw, Trash2, RefreshCw } from "lucide-react";

const STYLE_OPTIONS = [
  { id: "professional", label: "职场专业风", icon: Briefcase, color: "#0891b2" },
  { id: "friendly", label: "亲和邻家风", icon: UserCircle2, color: "#10b981" },
  { id: "cool", label: "潮流酷飒风", icon: TrendingUp, color: "#f59e0b" },
  { id: "sweet", label: "甜美少女风", icon: Heart, color: "#ec4899" },
  { id: "mature", label: "成熟稳重风", icon: Sparkles, color: "#6366f1" },
];

// 服饰标签组件
const ClothingTag = ({ 
  value, 
  label, 
  isSelected, 
  isRecommended = false, 
  onClick 
}: { 
  value: string; 
  label: string; 
  isSelected: boolean; 
  isRecommended?: boolean; 
  onClick: () => void;
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
        isSelected
          ? 'bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] shadow-lg'
          : 'bg-dark-primary border border-dark-light text-[#d0d0d0] hover:border-[#06d6a0]/50 hover:bg-dark-light'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
      {isRecommended && !isSelected && (
        <span className="absolute -top-1.5 -right-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-[#06d6a0] text-[#f0f9ff] font-bold shadow-lg">
          推荐
        </span>
      )}
    </motion.div>
  );
};

export default function DigitalHumanPage() {
  // Toast通知
  const { showToast } = useToast();
  
  // Modal状态
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [inputModalValue, setInputModalValue] = useState("");
  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // 产品信息
  const [productIntro, setProductIntro] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [priceLevel, setPriceLevel] = useState("100-500");
  const [applicationScenes, setApplicationScenes] = useState<string[]>([]);

  // 数字人外观
  const [digitalHumanType, setDigitalHumanType] = useState("2d");
  const [gender, setGender] = useState<"female" | "male" | "neutral">("female");
  const [ageRange, setAgeRange] = useState(28);
  const [selectedStyle, setSelectedStyle] = useState("professional");
  const [clothingStyle, setClothingStyle] = useState("");
  const [customClothing, setCustomClothing] = useState<File | null>(null);

  // 行为表达
  const [expressionStyle, setExpressionStyle] = useState("enthusiastic");
  const [voiceType, setVoiceType] = useState("");
  const [speechRate, setSpeechRate] = useState(50);
  const [toneStyle, setToneStyle] = useState("natural");
  const [bodyActions, setBodyActions] = useState<string[]>([]);
  const [customMotion, setCustomMotion] = useState<File | null>(null);
  const [facialExpression, setFacialExpression] = useState("smile-always");

  // 输出设置
  const [videoType, setVideoType] = useState("flat");
  const [virtualBackground, setVirtualBackground] = useState("");
  const [duration, setDuration] = useState(30);
  const [resolution, setResolution] = useState("1080p");
  const [platformAdapt, setPlatformAdapt] = useState("");
  const [additionalElements, setAdditionalElements] = useState<string[]>([]);
  const [customBgm, setCustomBgm] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("MP4");

  // 交互状态
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewType, setPreviewType] = useState<'face' | 'voice' | 'body' | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [generateStage, setGenerateStage] = useState("");

  // 默认值配置
  const DEFAULT_VALUES = {
    productIntro: "",
    productCategory: "",
    customCategory: "",
    priceLevel: "100-500",
    applicationScenes: [] as string[],
    digitalHumanType: "2d",
    gender: "female" as "female" | "male" | "neutral",
    ageRange: 28,
    selectedStyle: "professional",
    clothingStyle: "",
    customClothing: null,
    expressionStyle: "enthusiastic",
    voiceType: "sweet-female",
    speechRate: 50,
    toneStyle: "natural",
    bodyActions: [] as string[],
    customMotion: null,
    facialExpression: "smile-always",
    videoType: "flat",
    virtualBackground: "",
    duration: 30,
    resolution: "1080p",
    platformAdapt: "",
    additionalElements: [] as string[],
    customBgm: null,
    outputFormat: "MP4",
  };

  // 重置所有参数
  const resetAllParams = () => {
    setProductIntro(DEFAULT_VALUES.productIntro);
    setProductCategory(DEFAULT_VALUES.productCategory);
    setCustomCategory(DEFAULT_VALUES.customCategory);
    setPriceLevel(DEFAULT_VALUES.priceLevel);
    setApplicationScenes(DEFAULT_VALUES.applicationScenes);
    setDigitalHumanType(DEFAULT_VALUES.digitalHumanType);
    setGender(DEFAULT_VALUES.gender);
    setAgeRange(DEFAULT_VALUES.ageRange);
    setSelectedStyle(DEFAULT_VALUES.selectedStyle);
    setClothingStyle(DEFAULT_VALUES.clothingStyle);
    setCustomClothing(DEFAULT_VALUES.customClothing);
    setExpressionStyle(DEFAULT_VALUES.expressionStyle);
    setVoiceType(DEFAULT_VALUES.voiceType);
    setSpeechRate(DEFAULT_VALUES.speechRate);
    setToneStyle(DEFAULT_VALUES.toneStyle);
    setBodyActions(DEFAULT_VALUES.bodyActions);
    setCustomMotion(DEFAULT_VALUES.customMotion);
    setFacialExpression(DEFAULT_VALUES.facialExpression);
    setVideoType(DEFAULT_VALUES.videoType);
    setVirtualBackground(DEFAULT_VALUES.virtualBackground);
    setDuration(DEFAULT_VALUES.duration);
    setResolution(DEFAULT_VALUES.resolution);
    setPlatformAdapt(DEFAULT_VALUES.platformAdapt);
    setAdditionalElements(DEFAULT_VALUES.additionalElements);
    setCustomBgm(DEFAULT_VALUES.customBgm);
    setOutputFormat(DEFAULT_VALUES.outputFormat);
  };

  // 获取当前所有参数
  const getCurrentParams = () => ({
    productIntro,
    productCategory,
    customCategory,
    priceLevel,
    applicationScenes,
    digitalHumanType,
    gender,
    ageRange,
    selectedStyle,
    clothingStyle,
    expressionStyle,
    voiceType,
    speechRate,
    toneStyle,
    bodyActions,
    facialExpression,
    videoType,
    virtualBackground,
    duration,
    resolution,
    platformAdapt,
    additionalElements,
    outputFormat,
  });

  // 保存模板到localStorage
  const saveTemplate = (templateName: string) => {
    const templates = JSON.parse(localStorage.getItem('digitalHumanTemplates') || '[]');
    const newTemplate = {
      id: Date.now().toString(),
      name: templateName,
      createdAt: new Date().toISOString(),
      params: getCurrentParams(),
    };
    templates.push(newTemplate);
    localStorage.setItem('digitalHumanTemplates', JSON.stringify(templates));
    return newTemplate;
  };

  // 生成完整视频（模拟进度）
  const handleGenerateVideo = () => {
    setIsGenerating(true);
    setGenerateProgress(0);
    setGenerateStage("正在分析产品信息...");
    
    const stages = [
      { progress: 30, text: "正在分析产品信息..." },
      { progress: 60, text: "AI正在训练数字人动作..." },
      { progress: 90, text: "渲染视频场景..." },
      { progress: 100, text: "最后优化处理..." },
    ];
    
    let currentStage = 0;
    const interval = setInterval(() => {
      setGenerateProgress(prev => {
        const nextProgress = prev + 2;
        
        // 更新阶段文案
        if (currentStage < stages.length && nextProgress >= stages[currentStage].progress) {
          setGenerateStage(stages[currentStage].text);
          currentStage++;
        }
        
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            showToast('🎉 视频生成完成！已自动添加到历史记录', 'success', 1500);
          }, 500);
          return 100;
        }
        return nextProgress;
      });
    }, 60);
  };

  // 实时预览处理
  const handlePreview = (type: 'face' | 'voice' | 'body') => {
    setPreviewType(type);
    setIsPreviewLoading(true);
    
    // 模拟加载3秒
    setTimeout(() => {
      setIsPreviewLoading(false);
    }, 3000);
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
            ✨ 创意创作师 - 定向仿真人
          </h1>
          <p className="text-lg text-[#d0d0d0] mb-8">
            通过参数定制，生成适配产品场景的数字人视频
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* 左侧：配置表单区域 (2/3宽度) */}
            <div className="xl:col-span-2 space-y-6">
              {/* 1. 产品信息配置 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Package className="size-5 text-[#06d6a0]" />
                  <h3 className="text-xl font-bold text-[#06d6a0]">产品信息配置</h3>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-2">产品介绍</label>
                  <Textarea
                    value={productIntro}
                    onChange={(e) => setProductIntro(e.target.value)}
                    placeholder="请描述产品核心卖点、用途或优势，如'XX品牌防晒霜，SPF50+防水防汗'"
                    className="min-h-[100px] bg-dark-primary border-dark-light text-[#f0f9ff] focus:ring-1 focus:ring-[#06d6a0] focus:border-[#06d6a0]"
                  />
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <label className="absolute -top-2 left-3 bg-dark-secondary px-1 text-xs text-[#06d6a0] z-10">
                      所属行业
                    </label>
                    <Select
                      value={productCategory}
                      setValue={setProductCategory}
                      placeholder="选择所属行业"
                      className="w-full text-sm"
                    >
                      <SelectOption value="retail">电商零售</SelectOption>
                      <SelectOption value="education">教育培训</SelectOption>
                      <SelectOption value="beauty">美妆护肤</SelectOption>
                      <SelectOption value="digital">3C数码</SelectOption>
                      <SelectOption value="food">餐饮服务</SelectOption>
                      <SelectOption value="custom">自定义行业</SelectOption>
                    </Select>
                  </div>
                  
                  {/* 自定义行业输入框 */}
                  {productCategory === "custom" && (
                    <div className="mt-3">
                      <AnimatedInput
                        label="自定义行业"
                        value={customCategory}
                        onChange={setCustomCategory}
                        placeholder="请输入您的行业类别"
                      />
                    </div>
                  )}
                </div>

                {/* 客单价区间 */}
                <div className="mt-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">客单价区间</label>
                  <SingleSelectTags
                    tags={[
                      { key: "0-99", name: "0-99元" },
                      { key: "100-500", name: "100-500元" },
                      { key: "501-2000", name: "501-2000元" },
                      { key: "2000+", name: "2000元以上" },
                    ]}
                    defaultValue={priceLevel}
                    onChange={setPriceLevel}
                  />
                  <p className="text-xs text-[#a0a0a0] mt-2">💡 影响数字人话术风格：低价侧重"性价比"，高价侧重"品质感"</p>
                </div>

                {/* 应用场景 */}
                <div className="mt-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">应用场景</label>
                  <MultiSelectTags
                    tags={[
                      { key: "short-video", name: "短视频带货" },
                      { key: "live-clip", name: "直播间切片" },
                      { key: "corporate", name: "企业官网宣传" },
                      { key: "wechat", name: "朋友圈种草" },
                      { key: "exhibition", name: "展会投屏" },
                    ]}
                    defaultValue={applicationScenes}
                    onChange={setApplicationScenes}
                  />
                  <p className="text-xs text-[#a0a0a0] mt-2">💡 影响数字人动作/背景适配</p>
                </div>
              </motion.div>

              {/* 2. 数字人外观定制 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <div className="flex items-center gap-2 mb-6">
                  <User className="size-5 text-[#06d6a0]" />
                  <h3 className="text-xl font-bold text-[#06d6a0]">数字人外观定制</h3>
                </div>

                {/* 数字人类型 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">数字人类型</label>
                  <div className="flex flex-wrap gap-3">
                    <motion.div
                      onClick={() => setDigitalHumanType("2d")}
                      className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                        digitalHumanType === "2d"
                          ? 'bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] shadow-lg'
                          : 'bg-dark-primary border border-dark-light text-[#d0d0d0] hover:border-[#06d6a0]/50 hover:bg-dark-light'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      平面2D数字人
                    </motion.div>
                    
                    <motion.div
                      onClick={() => setDigitalHumanType("3d")}
                      className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${
                        digitalHumanType === "3d"
                          ? 'bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] shadow-lg'
                          : 'bg-dark-primary border border-dark-light text-[#d0d0d0] hover:border-[#06d6a0]/50 hover:bg-dark-light'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>3D超写实数字人</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        digitalHumanType === "3d"
                          ? 'bg-[#f0f9ff] text-[#00b4d8]'
                          : 'bg-[#06d6a0]/20 text-[#06d6a0] border border-[#06d6a0]/30'
                      }`}>
                        高精度渲染
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* 性别选择 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">性别</label>
                  <SingleSelectTags
                    tags={[
                      { key: "female", name: "女性" },
                      { key: "male", name: "男性" },
                      { key: "neutral", name: "中性" },
                    ]}
                    defaultValue={gender}
                    onChange={(value) => setGender(value as "female" | "male" | "neutral")}
                  />
                </div>

                {/* 年龄范围 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-2">
                    年龄范围：<span className="text-[#06d6a0]">{ageRange}岁</span>
                  </label>
                  <RangeSlider
                    min={18}
                    max={60}
                    value={ageRange}
                    onChange={setAgeRange}
                  />
                  <div className="flex justify-between text-xs text-[#a0a0a0] mt-1">
                    <span>18岁</span>
                    <span>60岁</span>
                  </div>
                  <p className="text-xs text-[#a0a0a0] mt-2">💡 影响面部特征和语音成熟度</p>
                </div>

                {/* 形象风格 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">形象风格</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {STYLE_OPTIONS.map((style) => {
                      const Icon = style.icon;
                      return (
                        <div
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedStyle(style.id);
                            }
                          }}
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            selectedStyle === style.id
                              ? "bg-[#06d6a0]/10 border-[#06d6a0]"
                              : "bg-dark-primary border-dark-light hover:border-[#2a2a2a]"
                          }`}
                        >
                          <Icon
                            className="size-6 mx-auto mb-2"
                            style={{ color: selectedStyle === style.id ? "#06d6a0" : "#a0a0a0" }}
                          />
                          <p
                            className="text-xs text-center"
                            style={{ color: selectedStyle === style.id ? "#06d6a0" : "#d0d0d0" }}
                          >
                            {style.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 服饰搭配 */}
                <div>
                  <label className="block text-sm text-[#d0d0d0] mb-3">
                    服饰搭配
                    {applicationScenes.length > 0 && (
                      <span className="ml-2 text-xs text-[#06d6a0]">
                        (根据应用场景智能推荐)
                      </span>
                    )}
                  </label>
                  
                  {/* 智能推荐标签云 */}
                  <div className="flex flex-wrap gap-3">
                    {/* 电商带货场景推荐 */}
                    {(applicationScenes.includes("short-video") || applicationScenes.includes("live-clip")) && (
                      <>
                        <ClothingTag
                          value="casual"
                          label="休闲穿搭"
                          isSelected={clothingStyle === "casual"}
                          isRecommended={true}
                          onClick={() => setClothingStyle("casual")}
                        />
                        <ClothingTag
                          value="business"
                          label="职业套装"
                          isSelected={clothingStyle === "business"}
                          isRecommended={true}
                          onClick={() => setClothingStyle("business")}
                        />
                      </>
                    )}
                    
                    {/* 企业宣传场景推荐 */}
                    {applicationScenes.includes("corporate") && (
                      <>
                        <ClothingTag
                          value="suit"
                          label="西装正装"
                          isSelected={clothingStyle === "suit"}
                          isRecommended={true}
                          onClick={() => setClothingStyle("suit")}
                        />
                        <ClothingTag
                          value="formal"
                          label="商务正装"
                          isSelected={clothingStyle === "formal"}
                          isRecommended={true}
                          onClick={() => setClothingStyle("formal")}
                        />
                      </>
                    )}
                    
                    {/* 美妆/朋友圈种草场景推荐 */}
                    {applicationScenes.includes("wechat") && (
                      <>
                        <ClothingTag
                          value="fashion"
                          label="时尚潮服"
                          isSelected={clothingStyle === "fashion"}
                          isRecommended={true}
                          onClick={() => setClothingStyle("fashion")}
                        />
                        <ClothingTag
                          value="trendy"
                          label="街头潮流"
                          isSelected={clothingStyle === "trendy"}
                          isRecommended={true}
                          onClick={() => setClothingStyle("trendy")}
                        />
                      </>
                    )}
                    
                    {/* 展会投屏场景 */}
                    {applicationScenes.includes("exhibition") && (
                      <>
                        <ClothingTag
                          value="formal"
                          label="商务正装"
                          isSelected={clothingStyle === "formal"}
                          isRecommended={true}
                          onClick={() => setClothingStyle("formal")}
                        />
                        <ClothingTag
                          value="business"
                          label="职业套装"
                          isSelected={clothingStyle === "business"}
                          isRecommended={true}
                          onClick={() => setClothingStyle("business")}
                        />
                      </>
                    )}
                    
                    {/* 通用选项（无场景时显示所有） */}
                    {applicationScenes.length === 0 && (
                      <>
                        <ClothingTag
                          value="casual"
                          label="休闲穿搭"
                          isSelected={clothingStyle === "casual"}
                          onClick={() => setClothingStyle("casual")}
                        />
                        <ClothingTag
                          value="business"
                          label="职业套装"
                          isSelected={clothingStyle === "business"}
                          onClick={() => setClothingStyle("business")}
                        />
                        <ClothingTag
                          value="suit"
                          label="西装正装"
                          isSelected={clothingStyle === "suit"}
                          onClick={() => setClothingStyle("suit")}
                        />
                        <ClothingTag
                          value="formal"
                          label="商务正装"
                          isSelected={clothingStyle === "formal"}
                          onClick={() => setClothingStyle("formal")}
                        />
                        <ClothingTag
                          value="fashion"
                          label="时尚潮服"
                          isSelected={clothingStyle === "fashion"}
                          onClick={() => setClothingStyle("fashion")}
                        />
                        <ClothingTag
                          value="trendy"
                          label="街头潮流"
                          isSelected={clothingStyle === "trendy"}
                          onClick={() => setClothingStyle("trendy")}
                        />
                      </>
                    )}
                  </div>

                  {/* 自定义服饰上传 */}
                  <div className="mt-4 p-4 rounded-lg border border-dashed border-dark-light bg-dark-primary hover:border-[#06d6a0]/50 transition-colors">
                    <label className="flex flex-col items-center gap-2 cursor-pointer">
                      <Upload className="size-6 text-[#a0a0a0]" />
                      <span className="text-sm text-[#d0d0d0]">
                        {customClothing ? customClothing.name : "上传自定义服饰参考图"}
                      </span>
                      <span className="text-xs text-[#a0a0a0]">支持 JPG、PNG，最大 5MB</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && file.size <= 5 * 1024 * 1024) {
                            setCustomClothing(file);
                          } else {
                            showToast("文件大小不能超过5MB", "error", 1500);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* 3. 行为表达设置 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Video className="size-5 text-[#06d6a0]" />
                  <h3 className="text-xl font-bold text-[#06d6a0]">行为表达设置</h3>
                </div>

                {/* 表达风格 */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <label className="block text-sm text-[#d0d0d0]">表达风格</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs text-[#06d6a0] hover:text-[#00b4d8] hover:bg-[#06d6a0]/10"
                      onClick={() => showToast('播放10秒风格示例视频', 'info', 1500)}
                    >
                      <Play className="size-3 mr-1" />
                      风格示例
                    </Button>
                  </div>
                  <SingleSelectTags
                    tags={[
                      { key: "enthusiastic", name: "热情活泼" },
                      { key: "professional", name: "专业严谨" },
                      { key: "gentle", name: "温柔耐心" },
                      { key: "humorous", name: "幽默风趣" },
                      { key: "concise", name: "简洁干练" },
                    ]}
                    defaultValue={expressionStyle}
                    onChange={setExpressionStyle}
                  />
                </div>

                {/* 音色选择 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-2">音色选择</label>
                  <div className="flex gap-2">
                    <Select
                      value={voiceType}
                      setValue={setVoiceType}
                      placeholder="选择音色"
                      className="flex-1 text-sm"
                    >
                      <SelectOption value="sweet-female">甜美女声</SelectOption>
                      <SelectOption value="mature-male">沉稳男声</SelectOption>
                      <SelectOption value="neutral">中性播音腔</SelectOption>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="px-4 border-[#06d6a0] text-[#06d6a0] hover:bg-[#06d6a0]/10"
                      onClick={() => showToast('试听功能：播放音色示例', 'info', 1500)}
                    >
                      <Volume2 className="size-4 mr-1" />
                      试听
                    </Button>
                  </div>
                </div>

                {/* 语速调节 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-2">
                    语速调节：<span className="text-[#06d6a0]">{speechRate > 66 ? "快速" : speechRate > 33 ? "正常" : "慢速"}</span>
                  </label>
                  <RangeSlider
                    min={0}
                    max={100}
                    value={speechRate}
                    onChange={setSpeechRate}
                  />
                  <div className="flex justify-between text-xs text-[#a0a0a0] mt-1">
                    <span>慢速</span>
                    <span>正常</span>
                    <span>快速</span>
                  </div>
                </div>

                {/* 语调风格 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">语调风格</label>
                  <SingleSelectTags
                    tags={[
                      { key: "natural", name: "平缓自然" },
                      { key: "dynamic", name: "抑扬顿挫" },
                      { key: "emphasize", name: "强调重点" },
                    ]}
                    defaultValue={toneStyle}
                    onChange={setToneStyle}
                  />
                  <p className="text-xs text-[#a0a0a0] mt-2">💡 影响情感起伏表达</p>
                </div>

                {/* 肢体动作 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">肢体动作</label>
                  <MultiSelectTags
                    tags={[
                      { key: "gesture", name: "手势比划产品" },
                      { key: "nod", name: "微笑点头" },
                      { key: "eye-contact", name: "眼神互动" },
                      { key: "walk", name: "走动展示" },
                    ]}
                    defaultValue={bodyActions}
                    onChange={setBodyActions}
                  />

                  {/* 3D自定义动作上传 */}
                  <div className={`mt-3 p-4 rounded-lg border border-dashed transition-colors ${
                    digitalHumanType === "3d"
                      ? "border-dark-light bg-dark-primary hover:border-[#06d6a0]/50 cursor-pointer"
                      : "border-[#2a2a2a] bg-[#0a0a0a] cursor-not-allowed opacity-50"
                  }`}>
                    <label className={`flex flex-col items-center gap-2 ${digitalHumanType === "3d" ? "cursor-pointer" : "cursor-not-allowed"}`}>
                      <Move className={`size-6 ${digitalHumanType === "3d" ? "text-[#a0a0a0]" : "text-[#5a5a5a]"}`} />
                      <span className={`text-sm ${digitalHumanType === "3d" ? "text-[#d0d0d0]" : "text-[#5a5a5a]"}`}>
                        {digitalHumanType === "3d"
                          ? (customMotion ? customMotion.name : "上传自定义动作路径")
                          : "上传自定义动作路径"}
                      </span>
                      <span className={`text-xs ${digitalHumanType === "3d" ? "text-[#a0a0a0]" : "text-[#5a5a5a]"}`}>
                        {digitalHumanType === "3d"
                          ? "3D数字人专属，支持 FBX、BVH 格式"
                          : "⚠️ 仅3D数字人支持"}
                      </span>
                      {digitalHumanType === "3d" && (
                        <input
                          type="file"
                          accept=".fbx,.bvh"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setCustomMotion(file);
                            }
                          }}
                        />
                      )}
                    </label>
                  </div>
                </div>

                {/* 表情管理 */}
                <div>
                  <label className="block text-sm text-[#d0d0d0] mb-3">表情管理</label>
                  <SingleSelectTags
                    tags={[
                      { key: "smile-always", name: "全程微笑" },
                      { key: "dynamic", name: "随内容变化" },
                      { key: "serious", name: "严肃专业" },
                    ]}
                    defaultValue={facialExpression}
                    onChange={setFacialExpression}
                  />
                  <p className="text-xs text-[#a0a0a0] mt-2">💡 避免数字人表情僵硬</p>
                </div>
              </motion.div>

              {/* 4. 输出规格配置 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Settings2 className="size-5 text-[#06d6a0]" />
                  <h3 className="text-xl font-bold text-[#06d6a0]">输出规格配置</h3>
                </div>

                {/* 视频类型 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">视频类型</label>
                  <SingleSelectTags
                    tags={[
                      { key: "flat", name: "平面数字人视频" },
                      { key: "3d-scene", name: "3D数字人场景化视频" },
                    ]}
                    defaultValue={videoType}
                    onChange={setVideoType}
                  />

                  {/* 虚拟背景（仅3D） */}
                  {videoType === "3d-scene" && (
                    <div className="mt-3">
                      <label className="block text-sm text-[#d0d0d0] mb-3">虚拟背景</label>
                      <SingleSelectTags
                        tags={[
                          { key: "live-room", name: "直播间" },
                          { key: "office", name: "办公室" },
                          { key: "outdoor", name: "户外场景" },
                        ]}
                        defaultValue={virtualBackground}
                        onChange={setVirtualBackground}
                      />
                    </div>
                  )}
                </div>

                {/* 时长 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-2">
                    视频时长：<span className="text-[#06d6a0]">{duration}秒</span>
                    {duration >= 15 && duration <= 60 && (
                      <span className="ml-2 text-xs text-[#06d6a0]">(短视频平台推荐)</span>
                    )}
                  </label>
                  <RangeSlider
                    min={15}
                    max={180}
                    value={duration}
                    onChange={setDuration}
                  />
                  <div className="flex justify-between text-xs text-[#a0a0a0] mt-1">
                    <span>15秒</span>
                    <span>3分钟</span>
                  </div>
                </div>

                {/* 分辨率 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-2">分辨率</label>
                  <div className="grid grid-cols-3 gap-3">
                    <SingleSelectTags
                      tags={[
                        { key: "720p", name: "720P" },
                        { key: "1080p", name: "1080P" },
                        { key: "4k", name: "4K" },
                      ]}
                      defaultValue={resolution}
                      onChange={setResolution}
                    />
                  </div>
                </div>

                {/* 平台自动适配 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">平台自动适配</label>
                  <SingleSelectTags
                    tags={[
                      { key: "", name: "不适配" },
                      { key: "douyin", name: "抖音 (9:16)" },
                      { key: "wechat-video", name: "视频号 (16:9)" },
                    ]}
                    defaultValue={platformAdapt}
                    onChange={setPlatformAdapt}
                  />
                </div>

                {/* 附加元素 */}
                <div className="mb-4">
                  <label className="block text-sm text-[#d0d0d0] mb-3">附加元素</label>
                  <MultiSelectTags
                    tags={[
                      { key: "subtitle", name: "自动字幕" },
                      { key: "logo", name: "品牌logo水印" },
                      { key: "product-image", name: "产品图片嵌入" },
                      { key: "bgm", name: "背景音乐" },
                    ]}
                    defaultValue={additionalElements}
                    onChange={setAdditionalElements}
                  />

                  {/* BGM上传 */}
                  {additionalElements.includes("bgm") && (
                    <div className="mt-3 p-4 rounded-lg border border-dashed border-dark-light bg-dark-primary hover:border-[#06d6a0]/50 transition-colors">
                      <label className="flex flex-col items-center gap-2 cursor-pointer">
                        <Music className="size-6 text-[#a0a0a0]" />
                        <span className="text-sm text-[#d0d0d0]">
                          {customBgm ? customBgm.name : "上传自有BGM"}
                        </span>
                        <span className="text-xs text-[#a0a0a0]">支持 MP3、WAV 格式，最大 10MB</span>
                        <input
                          type="file"
                          accept=".mp3,.wav,audio/mpeg,audio/wav"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && file.size <= 10 * 1024 * 1024) {
                              setCustomBgm(file);
                            } else {
                              showToast("文件大小不能超过10MB", "error", 1500);
                            }
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* 输出格式 */}
                <div>
                  <label className="block text-sm text-[#d0d0d0] mb-2">输出格式</label>
                  <Select
                    value={outputFormat}
                    setValue={setOutputFormat}
                    placeholder="选择格式"
                    className="w-full text-sm"
                  >
                    <SelectOption value="MP4">MP4</SelectOption>
                    <SelectOption value="MOV">MOV</SelectOption>
                    <SelectOption value="AVI">AVI</SelectOption>
                  </Select>
                </div>
              </motion.div>
            </div>

            {/* 右侧：预览与操作区域 (1/3宽度) - 粘性定位 */}
            <div className="sticky top-6 self-start space-y-4 max-h-[calc(100vh-3rem)] overflow-y-auto">
              {/* 实时预览 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-xl bg-dark-secondary border border-dark-light flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-2 rounded-full bg-[#06d6a0] animate-pulse" />
                  <h3 className="text-base font-bold text-[#06d6a0]">实时预览</h3>
                </div>

                {/* 预览区域 - 填充剩余空间 */}
                <div className="flex-1 min-h-[280px] bg-dark-primary rounded-lg border border-dashed border-dark-light flex items-center justify-center mb-3">
                  <div className="text-center">
                    <User className="size-14 text-[#2a2a2a] mx-auto mb-2" />
                    <p className="text-xs text-[#5a5a5a]">数字人预览</p>
                  </div>
                </div>

                {/* 生成预览按钮 */}
                <Button 
                  className="w-full py-2.5 text-sm rounded-lg bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  onClick={() => setShowPreviewModal(true)}
                >
                  <Play className="size-4" />
                  生成预览
                </Button>
              </motion.div>

              {/* 操作按钮 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <h3 className="text-base font-bold text-[#06d6a0] mb-3">操作</h3>
                
                <div className="space-y-2.5">
                  {/* 生成完整视频 */}
                  <Button 
                    className="w-full py-3 text-sm rounded-lg bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleGenerateVideo}
                    disabled={isGenerating}
                  >
                    <Film className="size-4" />
                    {isGenerating ? '生成中...' : '生成完整视频'}
                  </Button>

                  {/* 生成进度条 */}
                  {isGenerating && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-3 rounded-lg bg-dark-primary border border-[#06d6a0]/20"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-[#06d6a0] font-medium">{generateStage}</span>
                        <span className="text-xs text-[#00b4d8] font-bold">{generateProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden mb-1.5">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] shadow-lg shadow-[#06d6a0]/30"
                          initial={{ width: 0 }}
                          animate={{ width: `${generateProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-[10px] text-[#a0a0a0] text-center flex items-center justify-center gap-1">
                        <span className="inline-block size-0.5 rounded-full bg-[#06d6a0] animate-pulse" />
                        预计1-3分钟
                      </p>
                    </motion.div>
                  )}

                  {/* 保存参数模板 */}
                  <Button 
                    className="w-full py-2.5 text-sm rounded-lg bg-dark-primary border border-dark-light text-[#d0d0d0] font-semibold flex items-center justify-center gap-2 hover:border-[#06d6a0] hover:text-[#06d6a0] transition-all"
                    onClick={() => {
                      setInputModalValue("");
                      setShowInputModal(true);
                    }}
                  >
                    <Save className="size-3.5" />
                    保存为模板
                  </Button>

                  {/* 重置参数 */}
                  <Button 
                    className="w-full py-2.5 text-sm rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-[#a0a0a0] font-semibold flex items-center justify-center gap-2 hover:border-[#5a5a5a] hover:text-[#d0d0d0] transition-all"
                    onClick={() => {
                      setConfirmModalConfig({
                        title: "确认重置",
                        message: "确定要重置所有参数吗？此操作不可恢复。",
                        onConfirm: () => {
                          resetAllParams();
                          showToast('✅ 所有参数已重置为默认值', 'success', 1500);
                          setShowConfirmModal(false);
                        }
                      });
                      setShowConfirmModal(true);
                    }}
                  >
                    <RotateCcw className="size-3.5" />
                    重置参数
                  </Button>
                </div>
              </motion.div>

              {/* 历史生成 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <h3 className="text-base font-bold text-[#06d6a0] mb-3">历史生成</h3>
                
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-dark-primary border border-dark-light hover:border-[#06d6a0]/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-10 bg-dark-light rounded flex items-center justify-center flex-shrink-0">
                        <Play className="size-4 text-[#5a5a5a]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#f0f9ff] truncate">商务女性-产品介绍</p>
                        <p className="text-[10px] text-[#a0a0a0]">2分钟前 · 60秒 · 1080P</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 h-7 text-[10px] border border-dark-light hover:border-[#06d6a0] hover:text-[#06d6a0] transition-all"
                        onClick={() => showToast('查看完整视频', 'info', 1500)}
                      >
                        <Eye className="size-3 mr-0.5" />
                        查看
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 h-7 text-[10px] border border-dark-light hover:border-[#00b4d8] hover:text-[#00b4d8] transition-all"
                        onClick={() => showToast('重新生成中...', 'info', 1500)}
                      >
                        <RefreshCw className="size-3 mr-0.5" />
                        重新生成
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 border border-dark-light hover:border-red-500 hover:text-red-500 transition-all"
                        onClick={() => {
                          setConfirmModalConfig({
                            title: "确认删除",
                            message: "确定要删除此记录吗？",
                            onConfirm: () => {
                              showToast('已删除', 'success', 1500);
                              setShowConfirmModal(false);
                            }
                          });
                          setShowConfirmModal(true);
                        }}
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-dark-primary border border-dark-light hover:border-[#06d6a0]/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-10 bg-dark-light rounded flex items-center justify-center flex-shrink-0">
                        <Play className="size-4 text-[#5a5a5a]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#f0f9ff] truncate">时尚男性-品牌宣传</p>
                        <p className="text-[10px] text-[#a0a0a0]">1小时前 · 30秒 · 4K</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 h-7 text-[10px] border border-dark-light hover:border-[#06d6a0] hover:text-[#06d6a0] transition-all"
                        onClick={() => showToast('查看完整视频', 'info', 1500)}
                      >
                        <Eye className="size-3 mr-0.5" />
                        查看
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 h-7 text-[10px] border border-dark-light hover:border-[#00b4d8] hover:text-[#00b4d8] transition-all"
                        onClick={() => showToast('重新生成中...', 'info', 1500)}
                      >
                        <RefreshCw className="size-3 mr-0.5" />
                        重新生成
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 border border-dark-light hover:border-red-500 hover:text-red-500 transition-all"
                        onClick={() => {
                          setConfirmModalConfig({
                            title: "确认删除",
                            message: "确定要删除此记录吗？",
                            onConfirm: () => {
                              showToast('已删除', 'success', 1500);
                              setShowConfirmModal(false);
                            }
                          });
                          setShowConfirmModal(true);
                        }}
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 实时预览Modal */}
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90%] max-w-3xl bg-dark-secondary border border-dark-light rounded-xl p-6 shadow-2xl"
            >
              {/* 关闭按钮 */}
              <motion.button
                onClick={() => {
                  setShowPreviewModal(false);
                  setPreviewType(null);
                  setIsPreviewLoading(false);
                }}
                className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-lg bg-dark-light border border-dark-light text-[#a0a0a0] hover:text-[#f0f9ff] hover:bg-[#2a2a2a] hover:border-[#5a5a5a] transition-all z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* 标题 */}
              <div className="flex items-center gap-2 mb-4">
                <div className="size-2 rounded-full bg-[#06d6a0] animate-pulse" />
                <h3 className="text-xl font-bold text-[#06d6a0]">实时预览</h3>
                <span className="text-xs text-[#a0a0a0] ml-auto">避免全流程等待，快速验证参数效果</span>
              </div>

              {/* 预览区域 */}
              <div className="aspect-video bg-dark-primary rounded-lg border border-dashed border-dark-light flex items-center justify-center mb-4 relative overflow-hidden">
                {isPreviewLoading ? (
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="size-16 border-4 border-[#06d6a0] border-t-transparent rounded-full mx-auto mb-3"
                    />
                    <p className="text-sm text-[#06d6a0] font-medium">正在生成预览...</p>
                    <p className="text-xs text-[#a0a0a0] mt-1">预计3-5秒</p>
                  </div>
                ) : previewType ? (
                  <div className="text-center">
                    <div className="size-20 bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] rounded-full flex items-center justify-center mx-auto mb-3">
                      {previewType === 'face' && <Smile className="size-10 text-[#f0f9ff]" />}
                      {previewType === 'voice' && <Volume2 className="size-10 text-[#f0f9ff]" />}
                      {previewType === 'body' && <Move className="size-10 text-[#f0f9ff]" />}
                    </div>
                    <p className="text-sm text-[#d0d0d0]">
                      {previewType === 'face' && '面部表情预览完成'}
                      {previewType === 'voice' && '语音片段预览完成'}
                      {previewType === 'body' && '肢体动作预览完成'}
                    </p>
                    <p className="text-xs text-[#06d6a0] mt-2">✓ 参数配置正常</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <User className="size-20 text-[#2a2a2a] mx-auto mb-3" />
                    <p className="text-sm text-[#5a5a5a]">选择预览类型</p>
                    <p className="text-xs text-[#a0a0a0] mt-2">点击下方按钮快速预览</p>
                  </div>
                )}
              </div>

              {/* 快速预览选项 */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className={`border-dark-light hover:border-[#06d6a0] hover:text-[#06d6a0] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    previewType === 'face' ? 'border-[#06d6a0] text-[#06d6a0] bg-[#06d6a0]/10' : ''
                  }`}
                  onClick={() => handlePreview('face')}
                  disabled={isPreviewLoading}
                >
                  <Smile className="size-4 mr-2" />
                  面部表情
                </Button>
                <Button
                  variant="outline"
                  className={`border-dark-light hover:border-[#06d6a0] hover:text-[#06d6a0] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    previewType === 'voice' ? 'border-[#06d6a0] text-[#06d6a0] bg-[#06d6a0]/10' : ''
                  }`}
                  onClick={() => handlePreview('voice')}
                  disabled={isPreviewLoading}
                >
                  <Volume2 className="size-4 mr-2" />
                  语音片段
                </Button>
                <Button
                  variant="outline"
                  className={`border-dark-light hover:border-[#06d6a0] hover:text-[#06d6a0] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    previewType === 'body' ? 'border-[#06d6a0] text-[#06d6a0] bg-[#06d6a0]/10' : ''
                  }`}
                  onClick={() => handlePreview('body')}
                  disabled={isPreviewLoading}
                >
                  <Move className="size-4 mr-2" />
                  肢体动作
                </Button>
              </div>

              {/* 提示 */}
              <div className="mt-4 p-3 rounded-lg bg-[#06d6a0]/5 border border-[#06d6a0]/20">
                <p className="text-xs text-[#06d6a0] flex items-center gap-2">
                  <Sparkles className="size-3" />
                  实时预览功能让您快速验证数字人参数效果，无需等待完整视频生成
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* 确认对话框 Modal */}
        <BasicModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title={confirmModalConfig?.title || ""}
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-sm text-[#d0d0d0]">{confirmModalConfig?.message}</p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm border-dark-light hover:border-[#5a5a5a] hover:bg-dark-light"
              >
                取消
              </Button>
              <Button
                onClick={() => confirmModalConfig?.onConfirm()}
                className="px-4 py-2 text-sm bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] hover:opacity-90"
              >
                确认
              </Button>
            </div>
          </div>
        </BasicModal>

        {/* 输入对话框 Modal */}
        <BasicModal
          isOpen={showInputModal}
          onClose={() => setShowInputModal(false)}
          title="保存为模板"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#d0d0d0] mb-2">
                模板名称
              </label>
              <input
                type="text"
                placeholder="如：商务女性-产品介绍"
                value={inputModalValue}
                onChange={(e) => setInputModalValue(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark-primary border border-dark-light text-[#d0d0d0] placeholder:text-[#5a5a5a] focus:outline-none focus:border-[#06d6a0] transition-colors"
                autoFocus
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowInputModal(false)}
                className="px-4 py-2 text-sm border-dark-light hover:border-[#5a5a5a] hover:bg-dark-light"
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  if (inputModalValue && inputModalValue.trim()) {
                    try {
                      saveTemplate(inputModalValue.trim());
                      showToast(`✅ 模板 "${inputModalValue}" 已保存！\n下次可在"我的模板"中快速调用`, 'success', 1500);
                      setShowInputModal(false);
                      setInputModalValue("");
                    } catch (error) {
                      showToast('保存失败，请重试', 'error', 1500);
                    }
                  } else {
                    showToast('模板名称不能为空', 'warning', 1500);
                  }
                }}
                className="px-4 py-2 text-sm bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] hover:opacity-90"
              >
                保存
              </Button>
            </div>
          </div>
        </BasicModal>
      </main>
    </div>
  );
}
