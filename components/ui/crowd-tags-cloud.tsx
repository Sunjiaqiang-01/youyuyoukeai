"use client"

import { useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import {
  Cloud,
  ICloud,
} from "react-icon-cloud"

// 30个人群标签数据
const crowdTags = [
  // 基础属性类（8个）
  { id: "age", label: "年龄段", category: "基础属性", weight: 95, color: "#06d6a0" },
  { id: "gender", label: "性别比例", category: "基础属性", weight: 90, color: "#06d6a0" },
  { id: "location", label: "地域分布", category: "基础属性", weight: 88, color: "#06d6a0" },
  { id: "education", label: "学历层次", category: "基础属性", weight: 75, color: "#06d6a0" },
  { id: "career", label: "职业类型", category: "基础属性", weight: 82, color: "#06d6a0" },
  { id: "income", label: "收入水平", category: "基础属性", weight: 85, color: "#06d6a0" },
  { id: "marriage", label: "婚姻状况", category: "基础属性", weight: 65, color: "#06d6a0" },
  { id: "family", label: "家庭结构", category: "基础属性", weight: 70, color: "#06d6a0" },
  
  // 消费行为类（8个）
  { id: "consumption", label: "消费能力", category: "消费行为", weight: 98, color: "#ffa500" },
  { id: "purchase_freq", label: "购买频率", category: "消费行为", weight: 92, color: "#ffa500" },
  { id: "category_pref", label: "品类偏好", category: "消费行为", weight: 80, color: "#ffa500" },
  { id: "price_sense", label: "价格敏感度", category: "消费行为", weight: 78, color: "#ffa500" },
  { id: "payment", label: "支付偏好", category: "消费行为", weight: 72, color: "#ffa500" },
  { id: "channel", label: "购物渠道", category: "消费行为", weight: 68, color: "#ffa500" },
  { id: "brand_loyalty", label: "品牌忠诚度", category: "消费行为", weight: 75, color: "#ffa500" },
  { id: "promotion", label: "促销敏感度", category: "消费行为", weight: 70, color: "#ffa500" },
  
  // 社交行为类（5个）
  { id: "social_platform", label: "社交平台", category: "社交行为", weight: 86, color: "#1e90ff" },
  { id: "interaction", label: "互动频率", category: "社交行为", weight: 76, color: "#1e90ff" },
  { id: "influence", label: "社交影响力", category: "社交行为", weight: 64, color: "#1e90ff" },
  { id: "sharing", label: "分享倾向", category: "社交行为", weight: 58, color: "#1e90ff" },
  { id: "community", label: "社群参与度", category: "社交行为", weight: 62, color: "#1e90ff" },
  
  // 行为习惯类（6个）
  { id: "active_time", label: "活跃时段", category: "行为习惯", weight: 74, color: "#9370db" },
  { id: "device", label: "设备偏好", category: "行为习惯", weight: 66, color: "#9370db" },
  { id: "browse_depth", label: "浏览深度", category: "行为习惯", weight: 84, color: "#9370db" },
  { id: "stay_time", label: "停留时长", category: "行为习惯", weight: 78, color: "#9370db" },
  { id: "revisit", label: "复访频率", category: "行为习惯", weight: 62, color: "#9370db" },
  { id: "function", label: "功能偏好", category: "行为习惯", weight: 70, color: "#9370db" },
  
  // 兴趣偏好类（3个）
  { id: "content", label: "内容偏好", category: "兴趣偏好", weight: 88, color: "#ff6b6b" },
  { id: "entertainment", label: "娱乐偏好", category: "兴趣偏好", weight: 72, color: "#ff6b6b" },
  { id: "lifestyle", label: "生活方式", category: "兴趣偏好", weight: 82, color: "#ff6b6b" },
];

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "pointer",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
}

// 渲染自定义标签元素
const renderCustomTag = (tag: typeof crowdTags[0]) => {
  // 根据 weight 计算字体大小（weight 越高，字体越大）
  const fontSize = Math.max(12, Math.min(32, tag.weight / 3));
  
  return (
    <div
      key={tag.id}
      style={{
        fontSize: `${fontSize}px`,
        color: tag.color,
        fontWeight: 'bold',
        textShadow: `0 0 10px ${tag.color}80`,
        padding: '5px 10px',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      }}
      title={`${tag.category} - ${tag.label}`}
    >
      {tag.label}
    </div>
  );
};

export function CrowdTagsCloud() {
  const { theme } = useTheme()

  const renderedTags = useMemo(() => {
    return crowdTags.map((tag) => renderCustomTag(tag));
  }, [])

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedTags}</>
    </Cloud>
  )
}

