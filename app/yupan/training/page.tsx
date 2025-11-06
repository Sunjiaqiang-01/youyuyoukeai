"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { StarRating } from "@/components/ui/star-rating";
import { HierarchicalTagsSelector } from "@/components/ui/hierarchical-tags-selector";
import { DraggableList, DraggableItem, DraggableItemProps } from "@/components/ui/draggable-list";
import { SimpleFileUpload } from "@/components/ui/simple-file-upload";
import { CompactChinaRegionSelector } from "@/components/ui/compact-china-region-selector";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { X, ChevronDown } from "lucide-react";

// 层级标签数据（支持展开/收起）
type TagItem = {
  id: string;
  label: string;
  parentLabel?: string;
};

type HierarchicalTag = {
  id: string;
  label: string;
  expandable: boolean;
  children?: TagItem[];
};

const CROWD_TAGS: HierarchicalTag[] = [
  // 可展开分类
  {
    id: "category-age",
    label: "年龄分层",
    expandable: true,
    children: [
      { id: "age-18-24", label: "18-24岁", parentLabel: "年龄分层" },
      { id: "age-25-34", label: "25-34岁", parentLabel: "年龄分层" },
      { id: "age-35-44", label: "35-44岁", parentLabel: "年龄分层" },
    ]
  },
  {
    id: "category-digital",
    label: "数码",
    expandable: true,
    children: [
      { id: "digital-phone", label: "手机", parentLabel: "数码" },
      { id: "digital-computer", label: "电脑", parentLabel: "数码" },
      { id: "digital-camera", label: "相机", parentLabel: "数码" },
    ]
  },
  {
    id: "category-interest",
    label: "兴趣爱好",
    expandable: true,
    children: [
      { id: "interest-travel", label: "旅游", parentLabel: "兴趣爱好" },
      { id: "interest-food", label: "美食", parentLabel: "兴趣爱好" },
      { id: "interest-fitness", label: "健身", parentLabel: "兴趣爱好" },
    ]
  },
  {
    id: "category-consumption",
    label: "消费层级",
    expandable: true,
    children: [
      { id: "consumption-high", label: "高消费力", parentLabel: "消费层级" },
      { id: "consumption-mid", label: "中消费力", parentLabel: "消费层级" },
      { id: "consumption-low", label: "低消费力", parentLabel: "消费层级" },
    ]
  },
  {
    id: "category-education",
    label: "学历",
    expandable: true,
    children: [
      { id: "edu-bachelor", label: "本科", parentLabel: "学历" },
      { id: "edu-master", label: "硕士及以上", parentLabel: "学历" },
    ]
  },
  {
    id: "category-career",
    label: "职业",
    expandable: true,
    children: [
      { id: "career-whitecollar", label: "白领", parentLabel: "职业" },
      { id: "career-student", label: "学生", parentLabel: "职业" },
      { id: "career-freelance", label: "自由职业", parentLabel: "职业" },
    ]
  },
  {
    id: "category-location",
    label: "城市等级",
    expandable: true,
    children: [
      { id: "location-tier1", label: "一线城市", parentLabel: "城市等级" },
      { id: "location-tier2", label: "新一线城市", parentLabel: "城市等级" },
    ]
  },
  {
    id: "category-time",
    label: "活跃时段",
    expandable: true,
    children: [
      { id: "time-morning", label: "早间活跃", parentLabel: "活跃时段" },
      { id: "time-evening", label: "晚间活跃", parentLabel: "活跃时段" },
    ]
  },
  // 独立标签（不可展开）
  { id: "gender-male", label: "男性", expandable: false },
  { id: "gender-female", label: "女性", expandable: false },
  { id: "married-yes", label: "已婚", expandable: false },
  { id: "married-no", label: "未婚", expandable: false },
  { id: "social-active", label: "社交活跃", expandable: false },
  { id: "social-influence", label: "社交影响力高", expandable: false },
  { id: "device-mobile", label: "手机偏好", expandable: false },
  { id: "brand-loyal", label: "品牌忠诚度高", expandable: false },
  { id: "price-sensitive", label: "价格敏感", expandable: false },
  { id: "online-shopping", label: "线上购物偏好", expandable: false },
  { id: "family-withkids", label: "有子女", expandable: false },
  { id: "income-high", label: "高收入", expandable: false },
];

// 运营商选项
const CARRIERS = [
  { id: "china-mobile", label: "中国移动" },
  { id: "china-unicom", label: "中国联通" },
  { id: "china-telecom", label: "中国电信" },
  { id: "china-broadcast", label: "中国广电" },
];

// 行动轨迹地点选项
const LOCATIONS = [
  { id: "airport", label: "机场" },
  { id: "train", label: "高铁站" },
  { id: "bus", label: "汽车站" },
  { id: "university", label: "大学" },
  { id: "hospital", label: "医院" },
  { id: "cinema", label: "连锁电影院" },
  { id: "internet-cafe", label: "连锁网吧" },
  { id: "park", label: "公园" },
];

interface RegionItem {
  province: string;
  city: string;
  district: string;
}

interface Condition {
  id: string;
  type: 'age' | 'tag' | 'consumption' | 'carrier' | 'location' | 'region';
  label: string;
  summary: string;
}

export default function YupanTrainingPage() {
  // 年龄范围（默认不选择，使用完整范围）
  const [ageRange, setAgeRange] = useState<number[]>([18, 80]);
  
  // 选中的标签
  const [selectedTags, setSelectedTags] = useState<TagItem[]>([]);
  
  // 消费能力
  const [starRating, setStarRating] = useState(0);
  const [consumptionRange, setConsumptionRange] = useState<number[]>([0, 50000]);
  
  // 运营商
  const [selectedCarriers, setSelectedCarriers] = useState<string[]>([]);
  
  // 地域数据
  const [selectedRegions, setSelectedRegions] = useState<RegionItem[]>([]);
  
  // 行动轨迹
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [uploadedCoords, setUploadedCoords] = useState<File[]>([]);
  const [uploadedWifi, setUploadedWifi] = useState<File[]>([]);
  
  // 条件列表
  const [conditions, setConditions] = useState<DraggableItemProps[]>([]);
  const [logicOperator, setLogicOperator] = useState<'AND' | 'OR'>('AND');
  
  // 覆盖率
  const [estimatedCoverage, setEstimatedCoverage] = useState(100);
  
  // 生成状态
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // 更新条件列表
  useEffect(() => {
    const newConditions: Condition[] = [];
    
    // 年龄条件
    if (ageRange[0] !== 18 || ageRange[1] !== 80) {
      newConditions.push({
        id: 'age',
        type: 'age',
        label: '年龄范围',
        summary: `年龄：${ageRange[0]}-${ageRange[1]}岁`
      });
    }
    
    // 标签条件
    selectedTags.forEach((tag) => {
      const displayLabel = tag.parentLabel ? `${tag.parentLabel} > ${tag.label}` : tag.label;
      newConditions.push({
        id: `tag-${tag.id}`,
        type: 'tag',
        label: displayLabel,
        summary: `标签：${displayLabel}`
      });
    });
    
    // 消费能力条件
    if (starRating > 0) {
      newConditions.push({
        id: 'consumption',
        type: 'consumption',
        label: '消费能力',
        summary: `消费能力：${starRating}星 / ${consumptionRange[0]}-${consumptionRange[1]}元`
      });
    }
    
    // 运营商条件
    selectedCarriers.forEach((carrierId) => {
      const carrier = CARRIERS.find(c => c.id === carrierId);
      if (carrier) {
        newConditions.push({
          id: `carrier-${carrierId}`,
          type: 'carrier',
          label: carrier.label,
          summary: `运营商：${carrier.label}`
        });
      }
    });
    
    // 地域条件
    selectedRegions.forEach((region, index) => {
      newConditions.push({
        id: `region-${index}`,
        type: 'region',
        label: `${region.province}>${region.city}>${region.district}`,
        summary: `地域：${region.province}>${region.city}>${region.district}`
      });
    });
    
    // 行动轨迹条件
    selectedLocations.forEach((locationId) => {
      const location = LOCATIONS.find(l => l.id === locationId);
      if (location) {
        newConditions.push({
          id: `location-${locationId}`,
          type: 'location',
          label: location.label,
          summary: `行动轨迹：${location.label}`
        });
      }
    });
    
    // 转换为DraggableItemProps格式
    const draggableItems: DraggableItemProps[] = newConditions.map((cond) => ({
      id: cond.id,
      content: (
        <DraggableItem>
          <div className="flex-1 flex items-center justify-between">
            <span className="text-text-primary">{cond.summary}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡，避免触发拖拽
                removeCondition(cond.id);
              }}
              className="ml-4 p-1 rounded-full hover:bg-dark-light transition-colors"
            >
              <X className="size-4 text-text-secondary hover:text-accent-teal" />
            </button>
          </div>
        </DraggableItem>
      ),
    }));
    
    setConditions(draggableItems);
    
    // 计算覆盖率（简单算法：每个条件减少5-15%）
    const coverage = Math.max(10, 100 - newConditions.length * (Math.random() * 10 + 5));
    setEstimatedCoverage(parseFloat(coverage.toFixed(2)));
  }, [ageRange, selectedTags, starRating, consumptionRange, selectedCarriers, selectedRegions, selectedLocations]);

  const removeCondition = (id: string) => {
    if (id === 'age') {
      setAgeRange([18, 80]);
    } else if (id === 'consumption') {
      setStarRating(0);
      setConsumptionRange([0, 50000]);
    } else if (id.startsWith('tag-')) {
      const tagId = id.replace('tag-', '');
      setSelectedTags(selectedTags.filter(t => t.id !== tagId));
    } else if (id.startsWith('carrier-')) {
      const carrierId = id.replace('carrier-', '');
      setSelectedCarriers(selectedCarriers.filter(c => c !== carrierId));
    } else if (id.startsWith('region-')) {
      const index = parseInt(id.replace('region-', ''));
      setSelectedRegions(selectedRegions.filter((_, i) => i !== index));
    } else if (id.startsWith('location-')) {
      const locationId = id.replace('location-', '');
      setSelectedLocations(selectedLocations.filter(l => l !== locationId));
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // 模拟进度条（30秒）
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 100 / 30; // 每秒增加约3.33%
      });
    }, 1000);
  };

  const toggleCarrier = (carrierId: string) => {
    if (selectedCarriers.includes(carrierId)) {
      setSelectedCarriers(selectedCarriers.filter(c => c !== carrierId));
    } else {
      setSelectedCarriers([...selectedCarriers, carrierId]);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
            🧠 预判军师 - 自训练数据模型
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            自定义人群特征，生成专属训练模型
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：特征选择工作区 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 自有年龄 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <h4 className="text-sm font-semibold text-accent-teal mb-4">自有年龄</h4>
                <div className="px-4">
                  <DualRangeSlider
                    value={ageRange}
                    onValueChange={setAgeRange}
                    min={18}
                    max={80}
                    step={1}
                    label={(value) => <span className="text-xs text-accent-teal font-semibold">{value}岁</span>}
                    labelPosition="top"
                  />
                  <div className="mt-3 text-center">
                    <span className="text-xs text-[#d0d0d0]">
                      已选：<span className="text-[#06d6a0]">{ageRange[0]}岁 - {ageRange[1]}岁</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 自有地域数据 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <h4 className="text-sm font-semibold text-accent-teal mb-4">自有地域数据</h4>
                <CompactChinaRegionSelector
                  value={selectedRegions}
                  onChange={setSelectedRegions}
                />
              </motion.div>

              {/* 自有标签 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <h4 className="text-sm font-semibold text-accent-teal mb-4">自有标签</h4>
                <HierarchicalTagsSelector
                  tags={CROWD_TAGS}
                  onSelectionChange={setSelectedTags}
                />
              </motion.div>

              {/* 消费能力 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <h4 className="text-sm font-semibold text-accent-teal mb-4">消费能力</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#d0d0d0] mb-2 block">星级选择（1-5星）</label>
                    <StarRating
                      totalStars={5}
                      defaultValue={starRating}
                      onRate={setStarRating}
                      size="lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#d0d0d0] mb-2 block">
                      月均消费区间：{consumptionRange[0]}-{consumptionRange[1]}元
                    </label>
                    <div className="px-4">
                      <DualRangeSlider
                        value={consumptionRange}
                        onValueChange={setConsumptionRange}
                        min={0}
                        max={50000}
                        step={500}
                        label={(value) => <span className="text-xs text-accent-teal font-semibold">¥{value}</span>}
                        labelPosition="bottom"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 行动轨迹 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <h4 className="text-sm font-semibold text-accent-teal mb-4">行动轨迹</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#d0d0d0] mb-2 block">地点选择</label>
                    <div className="flex flex-wrap gap-2">
                      {LOCATIONS.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => {
                            if (selectedLocations.includes(location.id)) {
                              setSelectedLocations(selectedLocations.filter(id => id !== location.id));
                            } else {
                              setSelectedLocations([...selectedLocations, location.id]);
                            }
                          }}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                            selectedLocations.includes(location.id)
                              ? 'bg-gradient-to-r from-[#06d6a0]/20 to-[#00b4d8]/20 border-[#06d6a0] text-[#06d6a0] font-medium'
                              : 'bg-dark-primary border-dark-light text-[#d0d0d0] hover:border-[#2a2a2a]'
                          }`}
                        >
                          {location.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <SimpleFileUpload
                      label="上传坐标文件"
                      accept=".csv,.txt,.json"
                      maxFiles={1}
                      onFileSelect={setUploadedCoords}
                    />
                    <SimpleFileUpload
                      label="上传WIFI密匙"
                      accept=".csv,.txt,.json"
                      maxFiles={1}
                      onFileSelect={setUploadedWifi}
                    />
                  </div>
                </div>
              </motion.div>

              {/* 运营商数据覆盖 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
              >
                <h4 className="text-sm font-semibold text-accent-teal mb-4">运营商数据覆盖</h4>
                <div className="flex flex-wrap gap-3">
                  {CARRIERS.map((carrier) => (
                    <button
                      key={carrier.id}
                      onClick={() => toggleCarrier(carrier.id)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedCarriers.includes(carrier.id)
                          ? 'bg-gradient-to-r from-[#06d6a0]/20 to-[#00b4d8]/20 border-[#06d6a0] text-[#06d6a0] font-medium'
                          : 'bg-dark-primary border-dark-light text-[#d0d0d0] hover:border-[#2a2a2a]'
                      }`}
                    >
                      {carrier.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* 已选条件列表 */}
              {conditions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="p-6 rounded-xl bg-dark-secondary border border-dark-light"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-accent-teal">已选条件列表</h4>
                    <button
                      onClick={() => setLogicOperator(logicOperator === 'AND' ? 'OR' : 'AND')}
                      className="px-3 py-1 text-xs rounded-lg bg-dark-primary border border-dark-light text-text-secondary hover:border-accent-teal hover:text-accent-teal transition-colors"
                    >
                      逻辑：{logicOperator === 'AND' ? '且（AND）' : '或（OR）'}
                    </button>
                  </div>
                  <DraggableList
                    items={conditions}
                    onChange={setConditions}
                    className="space-y-2"
                  />
                </motion.div>
              )}

              {/* 生成按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || conditions.length === 0}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-white font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? '生成中...' : '生成训练模型'}
                </button>
                {isGenerating && (
                  <div className="mt-4 space-y-2">
                    <div className="w-full bg-dark-light rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#06d6a0] to-[#00b4d8]"
                        initial={{ width: 0 }}
                        animate={{ width: `${generationProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className="text-sm text-text-secondary text-center">
                      预计30分钟内，解压到对应的管理员加密邮箱
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* 右侧：数据预览区 */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl bg-dark-secondary border border-dark-light sticky top-0"
              >
                <h3 className="text-xl font-semibold text-accent-teal mb-6">数据预览区</h3>
                
                <div className="p-6 rounded-lg bg-dark-primary mb-6">
                  <p className="text-sm text-text-secondary mb-2">人群覆盖率预估</p>
                  <p className="text-4xl font-bold text-accent-teal">
                    <CountUp
                      end={estimatedCoverage}
                      duration={1}
                      decimals={2}
                      suffix="%"
                      preserveValue={true}
                    />
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3">常用数据包</h4>
                  <div className="space-y-2">
                    {["加盟高接通特征包", "加盟转商机特征包", "获客需求特征包", "同城高消费特征包", "旅行群体特征包"].map((item) => (
                      <button 
                        key={item}
                        className="w-full p-3 text-left text-sm rounded-lg bg-dark-primary hover:bg-dark-light text-text-secondary hover:text-accent-teal transition-all border border-transparent hover:border-accent-teal/30"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

