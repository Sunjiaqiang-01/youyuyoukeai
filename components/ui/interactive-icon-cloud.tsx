"use client"

import { useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud"

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
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
}

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = "#000000"  // 纯黑背景
  const fallbackHex = "#06d6a0"  // 青绿色作为后备色
  const minContrastRatio = 2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  })
}

export type DynamicCloudProps = {
  iconSlugs?: string[]
  tags?: string[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

const renderTagBubble = (tag: string, index: number) => {
  return (
    <div
      key={`tag-${index}`}
      className="px-4 py-2 rounded-full 
                 bg-gradient-to-r from-[#06d6a0]/20 to-[#00b4d8]/20 
                 border border-[#06d6a0]/60 
                 backdrop-blur-sm
                 text-white text-sm font-semibold 
                 shadow-[0_0_15px_rgba(6,214,160,0.25)]
                 hover:scale-110 hover:shadow-[0_0_25px_rgba(6,214,160,0.4)]
                 hover:border-[#06d6a0]
                 transition-all duration-300
                 cursor-pointer
                 whitespace-nowrap"
      title={tag}
    >
      {tag}
    </div>
  )
}

export function IconCloud({ iconSlugs, tags }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (iconSlugs) {
      fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
    }
  }, [iconSlugs])

  const renderedIcons = useMemo(() => {
    if (!data) return null

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light"),
    )
  }, [data, theme])

  const renderedTags = useMemo(() => {
    if (!tags) return null
    return tags.map((tag, index) => renderTagBubble(tag, index))
  }, [tags])

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{tags ? renderedTags : renderedIcons}</>
    </Cloud>
  )
}

