"use client";

import { useState } from "react";
import { SessionNavBar } from "@/components/ui/sidebar";
import { Select, SelectOption } from "@/components/ui/animated-select";
import { Search, Sparkles, Eye, Download, Heart, TrendingUp, Lightbulb, Play, Upload, Settings, Users, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import BasicModal from "@/components/ui/basic-modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BasicToast } from "@/components/ui/toast";

// 模拟数据
const templates = [
  {
    id: "1",
    title: "七夕礼盒开箱爆款模板",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数9.2", "3天涨粉10w+", "情感共鸣", "低成本可复制"],
    duration: "45s",
    platforms: ["抖音", "小红书"],
    generateCount: 1234,
  },
  {
    id: "2",
    title: "职场逆袭剧情模板",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数8.8", "周增长最快", "剧情反转", "高互动率"],
    duration: "60s",
    platforms: ["快手", "视频号"],
    generateCount: 856,
  },
  {
    id: "3",
    title: "美妆测评无广实测",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数9.5", "1周涨粉5w+", "真实测评", "信任度高"],
    duration: "38s",
    platforms: ["抖音", "B站"],
    generateCount: 2103,
  },
  {
    id: "4",
    title: "零食翻车vs真香对比",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数8.9", "高完播率", "搞笑反转", "易复制"],
    duration: "52s",
    platforms: ["抖音", "快手"],
    generateCount: 1567,
  },
  {
    id: "5",
    title: "AI绘画变装创意",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数9.1", "热点借势", "科技感", "视觉冲击"],
    duration: "35s",
    platforms: ["抖音", "小红书", "B站"],
    generateCount: 2890,
  },
  {
    id: "6",
    title: "萌宠日常治愈系",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数8.6", "高互动", "温馨治愈", "全平台适用"],
    duration: "42s",
    platforms: ["抖音", "快手", "小红书"],
    generateCount: 1823,
  },
  {
    id: "7",
    title: "知识干货快速教学",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数8.7", "高收藏", "实用价值", "专业感"],
    duration: "55s",
    platforms: ["B站", "视频号"],
    generateCount: 1456,
  },
  {
    id: "8",
    title: "沉浸式开箱体验",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数9.0", "视觉享受", "ASMR", "高留存"],
    duration: "48s",
    platforms: ["抖音", "小红书"],
    generateCount: 2234,
  },
  {
    id: "9",
    title: "反套路剧情短片",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数8.9", "创意十足", "意外结局", "高转发"],
    duration: "58s",
    platforms: ["抖音", "快手"],
    generateCount: 1678,
  },
  {
    id: "10",
    title: "美食制作教程",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数8.5", "实用教学", "简单易学", "高完播"],
    duration: "50s",
    platforms: ["抖音", "小红书", "B站"],
    generateCount: 1923,
  },
  {
    id: "11",
    title: "穿搭灵感分享",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数8.8", "时尚潮流", "实用搭配", "高保存"],
    duration: "40s",
    platforms: ["小红书", "抖音"],
    generateCount: 2456,
  },
  {
    id: "12",
    title: "情感治愈文案",
    thumbnail: "/placeholder-video.jpg",
    tags: ["爆款指数9.3", "共鸣强烈", "温暖治愈", "高评论"],
    duration: "32s",
    platforms: ["抖音", "视频号"],
    generateCount: 3120,
  },
];

const industryTags = [
  "美妆爆款",
  "零食测评",
  "剧情反转",
  "知识干货",
  "萌宠日常",
  "职场技能",
  "情感共鸣",
  "搞笑娱乐",
];

const trendingThemes = [
  { name: "AI绘画变装", growth: "200%" },
  { name: "沉浸式开箱", growth: "180%" },
  { name: "反套路剧情", growth: "150%" },
];

const industryInsights = [
  { industry: "美妆", idea: "无广实测" },
  { industry: "零食", idea: "翻车vs真香" },
  { industry: "职场", idea: "逆袭故事" },
];

export default function TemplatesPage() {
  const [platform, setPlatform] = useState("全平台");
  const [sortBy, setSortBy] = useState("最新上线");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const openTemplateDetail = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const toggleFavorite = (templateId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
  };

  const addToQueue = (templateId: string) => {
    if (!queue.includes(templateId)) {
      setQueue((prev) => [...prev, templateId]);
    }
  };

  // 过滤模板
  const filteredTemplates = templates.filter((template) => {
    if (showFavorites && !favoriteIds.includes(template.id)) return false;
    if (platform !== "全平台" && !template.platforms.includes(platform)) return false;
    if (selectedTags.length > 0) {
      const hasTag = template.tags.some((tag) =>
        selectedTags.some((selectedTag) => tag.includes(selectedTag))
      );
      if (!hasTag) return false;
    }
    if (searchQuery) {
      if (!template.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />

      <main className="flex h-screen grow flex-col overflow-hidden ml-[3.05rem]">
        {/* 顶部筛选区 */}
        <div className="sticky top-0 z-10 bg-dark-primary/95 backdrop-blur-sm border-b border-dark-light">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-[#f0f9ff]">创意爆款库</h1>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setShowFavorites(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      !showFavorites
                        ? "bg-[#06d6a0] text-dark-primary hover:bg-[#06d6a0]/90"
                        : "bg-dark-secondary text-[#d0d0d0] hover:bg-dark-light border border-dark-light"
                    }`}
                    variant="ghost"
                  >
                    全部模板
                  </Button>
                  <Button
                    onClick={() => setShowFavorites(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      showFavorites
                        ? "bg-[#06d6a0] text-dark-primary hover:bg-[#06d6a0]/90"
                        : "bg-dark-secondary text-[#d0d0d0] hover:bg-dark-light border border-dark-light"
                    }`}
                    variant="ghost"
                  >
                    我的收藏 ({favoriteIds.length})
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Button className="px-4 py-2 rounded-lg bg-dark-secondary border border-dark-light text-[#d0d0d0] hover:border-[#06d6a0] hover:text-[#06d6a0] transition-colors flex items-center gap-2" variant="outline">
                    <Download className="w-4 h-4" />
                    待生成队列
                    {queue.length > 0 && (
                      <span className="ml-1 px-2 py-0.5 rounded-full bg-[#06d6a0] text-dark-primary text-xs font-bold">
                        {queue.length}
                      </span>
                    )}
                  </Button>
                </div>
                <Button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-[#f0f9ff] font-semibold hover:opacity-90 transition-opacity">
                  模板广场
                </Button>
              </div>
            </div>

            {/* 筛选控件 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* 平台筛选 */}
              <Select
                placeholder="选择平台"
                setValue={setPlatform}
                className="w-full"
              >
                <SelectOption value="全平台">全平台</SelectOption>
                <SelectOption value="抖音">抖音</SelectOption>
                <SelectOption value="快手">快手</SelectOption>
                <SelectOption value="小红书">小红书</SelectOption>
                <SelectOption value="视频号">视频号</SelectOption>
                <SelectOption value="B站">B站</SelectOption>
              </Select>

              {/* 热度排序 */}
              <Select
                placeholder="热度排序"
                setValue={setSortBy}
                className="w-full"
              >
                <SelectOption value="最新上线">最新上线</SelectOption>
                <SelectOption value="播放量最高">播放量最高</SelectOption>
                <SelectOption value="周增长最快">周增长最快</SelectOption>
                <SelectOption value="收藏最多">收藏最多</SelectOption>
              </Select>

              {/* 搜索框 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a0a0] z-10" />
                <input
                  type="text"
                  placeholder="搜索模板关键词，如'七夕礼盒开箱'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[42px] pl-10 pr-4 rounded-lg bg-dark-primary text-[#d0d0d0] border border-dark-light outline-none hover:bg-[#1a1a1a] transition focus:ring-1 focus:ring-[#06d6a0] focus:border-[#06d6a0] text-sm placeholder:text-[#a0a0a0]"
                />
              </div>
            </div>

            {/* 行业标签横向滚动 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {industryTags.map((tag) => (
                <Button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-[#06d6a0] text-dark-primary hover:bg-[#06d6a0]/90"
                      : "bg-dark-secondary text-[#d0d0d0] hover:bg-dark-light border border-dark-light"
                  }`}
                  variant="ghost"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* 主内容区 - 模板预览网格 */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredTemplates.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Sparkles className="w-16 h-16 text-[#a0a0a0] mb-4" />
                <p className="text-[#d0d0d0] text-lg">暂无符合条件的模板</p>
                <p className="text-[#a0a0a0] text-sm mt-2">
                  试试调整筛选条件或搜索关键词
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-dark-secondary rounded-xl border border-dark-light overflow-hidden hover:border-[#06d6a0] transition-all cursor-pointer"
                  onClick={() => openTemplateDetail(template)}
                >
                  {/* 缩略图 */}
                  <div className="relative w-full h-[220px] bg-gradient-to-br from-dark-light to-dark-secondary overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#a0a0a0] gap-2">
                      <Sparkles className="w-8 h-8" />
                      <span className="text-xs text-center px-2">视频模板预览</span>
                    </div>
                    {/* hover放大效果 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* 悬浮操作按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          openTemplateDetail(template);
                        }}
                        className="p-3 rounded-full bg-dark-primary/90 hover:bg-[#06d6a0] text-[#f0f9ff] transition-colors"
                        size="icon"
                        variant="ghost"
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          // 一键生成逻辑
                        }}
                        className="p-3 rounded-full bg-dark-primary/90 hover:bg-[#06d6a0] text-[#f0f9ff] transition-colors"
                        size="icon"
                        variant="ghost"
                      >
                        <Download className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(template.id);
                        }}
                        className={`p-3 rounded-full transition-colors ${
                          favoriteIds.includes(template.id)
                            ? "bg-[#06d6a0] text-dark-primary hover:bg-[#06d6a0]/90"
                            : "bg-dark-primary/90 hover:bg-[#06d6a0] text-[#f0f9ff]"
                        }`}
                        size="icon"
                        variant="ghost"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favoriteIds.includes(template.id) ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>

                  {/* 卡片信息 */}
                  <div className="p-3 space-y-2">
                    <h3 className="text-[#f0f9ff] font-semibold text-sm line-clamp-2 min-h-[40px]">
                      {template.title}
                    </h3>

                    {/* 核心标签 */}
                    <div className="flex flex-wrap gap-1 min-h-[20px]">
                      {template.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 text-[10px] rounded bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 基础信息 */}
                    <div className="flex items-center justify-between text-xs text-[#a0a0a0]">
                      <span>{template.duration}</span>
                      <span>{template.generateCount}次</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            )}
          </div>

          {/* 右侧热门趋势榜 */}
          <aside className="w-80 border-l border-dark-light overflow-y-auto p-6 space-y-6">
            {/* 本周爆款主题 */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#f0f9ff] mb-4">
                <TrendingUp className="w-5 h-5 text-[#06d6a0]" />
                本周爆款主题
              </h3>
              <div className="space-y-3">
                {trendingThemes.map((theme) => (
                  <div
                    key={theme.name}
                    className="p-3 rounded-lg bg-dark-secondary border border-dark-light hover:border-[#06d6a0] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#f0f9ff] font-medium">
                        {theme.name}
                      </span>
                      <span className="text-[#06d6a0] text-sm font-semibold">
                        +{theme.growth}
                      </span>
                    </div>
                    <p className="text-xs text-[#a0a0a0]">
                      近7天搜索量增长{theme.growth}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 行业灵感库 */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#f0f9ff] mb-4">
                <Lightbulb className="w-5 h-5 text-[#06d6a0]" />
                行业灵感库
              </h3>
              <div className="space-y-3">
                {industryInsights.map((insight) => (
                  <div
                    key={insight.industry}
                    className="p-3 rounded-lg bg-dark-secondary border border-dark-light hover:border-[#06d6a0] transition-colors cursor-pointer"
                  >
                    <div className="text-[#06d6a0] font-semibold mb-1">
                      {insight.industry}
                    </div>
                    <div className="text-[#d0d0d0] text-sm">
                      → "{insight.idea}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* 悬浮的创作灵感按钮 */}
        <Button className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-[#f0f9ff] shadow-lg hover:scale-110 transition-transform z-20" size="icon">
          <Sparkles className="w-6 h-6" />
        </Button>

        {/* 模板详情模态框 */}
        <BasicModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedTemplate?.title}
          size="full"
        >
          {selectedTemplate && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
              {/* 左侧：视频预览区 */}
              <div className="space-y-4">
                <div className="relative w-full aspect-[9/16] bg-gradient-to-br from-dark-light to-dark-secondary rounded-lg overflow-hidden max-h-[500px] max-w-[280px] mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Play className="w-12 h-12 text-[#06d6a0] mx-auto" />
                      <p className="text-[#a0a0a0] text-sm">完整视频预览</p>
                    </div>
                  </div>
                </div>

                {/* 创意亮点解析 */}
                <div className="p-4 bg-dark-primary rounded-lg border border-dark-light">
                  <h4 className="text-lg font-semibold text-[#06d6a0] mb-2">
                    创意亮点解析
                  </h4>
                  <ul className="space-y-2 text-[#d0d0d0] text-sm">
                    <li>• 前3秒抓眼球：强反差开场，用户停留率高达85%</li>
                    <li>• 情感共鸣点：礼物惊喜瞬间，引发强烈代入感</li>
                    <li>• 节奏把控：每15秒一个小高潮，保持用户注意力</li>
                    <li>• 评论引导：开放式结尾，促进互动评论</li>
                  </ul>
                </div>
              </div>

              {/* 右侧：参数编辑区 */}
              <div className="space-y-6">
                {/* 核心标签 */}
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 可修改参数 */}
                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-[#f0f9ff]">
                    自定义参数
                  </h4>

                  {/* 替换产品图片 */}
                  <div className="space-y-1.5">
                    <label className="text-sm text-[#d0d0d0]">
                      替换产品图片
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 px-4 py-3 rounded-lg bg-dark-primary border border-dark-light text-[#a0a0a0] text-sm">
                        未选择文件
                      </div>
                      <Button className="px-4 py-3 rounded-lg bg-[#06d6a0]/10 border border-[#06d6a0]/30 text-[#06d6a0] hover:bg-[#06d6a0]/20 transition-colors flex items-center gap-2" variant="outline">
                        <Upload className="w-4 h-4" />
                        上传
                      </Button>
                    </div>
                  </div>

                  {/* 修改文案 */}
                  <div className="space-y-1.5">
                    <label className="text-sm text-[#d0d0d0]">修改文案</label>
                    <Textarea
                      className="w-full text-sm"
                      rows={2}
                      placeholder="输入自定义文案..."
                      defaultValue="这个礼盒太惊喜了！每一件都戳中我的心！"
                    />
                  </div>

                  {/* 调整BGM */}
                  <div className="space-y-1.5">
                    <label className="text-sm text-[#d0d0d0]">
                      调整背景音乐
                    </label>
                    <Select placeholder="选择BGM" setValue={() => {}}>
                      <SelectOption value="romantic">浪漫温馨</SelectOption>
                      <SelectOption value="energetic">活力动感</SelectOption>
                      <SelectOption value="calm">舒缓平静</SelectOption>
                    </Select>
                  </div>
                </div>

                {/* 主功能按钮组 */}
                <div className="space-y-2 pt-3 border-t border-dark-light">
                  <Button
                    onClick={() => {
                      addToQueue(selectedTemplate.id);
                      setToastMessage("已添加到生成队列！");
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                    }}
                    className="w-full h-10 rounded-lg bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-[#f0f9ff] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    一键生成视频
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button className="h-9 rounded-lg bg-dark-primary border border-dark-light text-[#d0d0d0] hover:border-[#06d6a0] hover:text-[#06d6a0] transition-colors flex items-center justify-center gap-1.5 text-sm" variant="outline">
                      <Settings className="w-3.5 h-3.5" />
                      微调创意
                    </Button>
                    <Button className="h-9 rounded-lg bg-dark-primary border border-dark-light text-[#d0d0d0] hover:border-[#06d6a0] hover:text-[#06d6a0] transition-colors flex items-center justify-center gap-1.5 text-sm" variant="outline">
                      <Users className="w-3.5 h-3.5" />
                      批量生成
                    </Button>
                  </div>

                  <Button className="w-full h-9 rounded-lg bg-dark-primary border border-dark-light text-[#d0d0d0] hover:border-[#06d6a0] hover:text-[#06d6a0] transition-colors flex items-center justify-center gap-1.5 text-sm" variant="outline">
                    <BarChart3 className="w-4 h-4" />
                    查看爆款分析
                  </Button>

                  <Button
                    onClick={() => {
                      toggleFavorite(selectedTemplate.id);
                    }}
                    className={`w-full h-9 rounded-lg border transition-colors flex items-center justify-center gap-1.5 text-sm ${
                      favoriteIds.includes(selectedTemplate.id)
                        ? "bg-[#06d6a0]/10 border-[#06d6a0] text-[#06d6a0] hover:bg-[#06d6a0]/20"
                        : "bg-dark-primary border-dark-light text-[#d0d0d0] hover:border-[#06d6a0] hover:text-[#06d6a0]"
                    }`}
                    variant="outline"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        favoriteIds.includes(selectedTemplate.id) ? "fill-current" : ""
                      }`}
                    />
                    {favoriteIds.includes(selectedTemplate.id) ? "已收藏" : "添加收藏"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </BasicModal>

        {/* Toast通知 */}
        <div className="fixed top-4 right-4 z-50">
          {showToast && (
            <BasicToast
              message={toastMessage}
              type="success"
              duration={3000}
              onClose={() => setShowToast(false)}
              isVisible={showToast}
            />
          )}
        </div>
      </main>
    </div>
  );
}
