"use client";

import React, { useEffect, useRef } from 'react';

interface Bubble {
  id: string;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  label: string;
  color: string;
}

interface BubbleCloudProps {
  tags: string[];
  width?: number;
  height?: number;
}

export function BubbleCloud({ tags, width = 1200, height = 550 }: BubbleCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationFrameRef = useRef<number>();
  const isInitializedRef = useRef(false);

  // 统一的初始化和动画循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 只初始化一次气泡
    if (!isInitializedRef.current) {
      const colors = ['#06d6a0', '#00b4d8', '#00f5ff', '#14b8a6'];
      const newBubbles: Bubble[] = tags.map((tag, index) => {
        // 根据标签内容中的百分比决定大小
        const percentMatch = tag.match(/(\d+)%/);
        const percent = percentMatch ? parseInt(percentMatch[1]) : 20;
        const radius = Math.max(30, Math.min(80, percent * 1.5));

        return {
          id: `bubble-${index}`,
          x: Math.random() * (width - radius * 2) + radius,
          y: Math.random() * (height - radius * 2) + radius,
          radius,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          label: tag,
          color: colors[index % colors.length],
        };
      });
      bubblesRef.current = newBubbles;
      isInitializedRef.current = true;
    }

    if (bubblesRef.current.length === 0) return;

    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      // 清空画布
      ctx.clearRect(0, 0, width, height);

      // 更新和绘制气泡
      bubblesRef.current.forEach((bubble) => {
        // 更新位置
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // 边界碰撞检测
        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > width) {
          bubble.vx *= -1;
          bubble.x = Math.max(bubble.radius, Math.min(width - bubble.radius, bubble.x));
        }
        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > height) {
          bubble.vy *= -1;
          bubble.y = Math.max(bubble.radius, Math.min(height - bubble.radius, bubble.y));
        }

        // 绘制气泡主体
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, `${bubble.color}80`);
        gradient.addColorStop(1, `${bubble.color}20`);

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 绘制边框
        ctx.strokeStyle = bubble.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // 绘制光晕效果
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius + 5, 0, Math.PI * 2);
        ctx.strokeStyle = `${bubble.color}40`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // 绘制文字标签
        const fontSize = Math.max(10, Math.min(14, bubble.radius / 4));
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 处理文字换行
        const words = bubble.label.split(' ');
        let lines: string[] = [];
        
        if (words.length === 1) {
          // 单个词，不换行
          lines = [bubble.label];
        } else if (words.length === 2) {
          // 两个词，各占一行
          lines = words;
        } else {
          // 多个词，智能换行
          let currentLine = words[0];
          for (let i = 1; i < words.length; i++) {
            const testLine = currentLine + ' ' + words[i];
            const metrics = ctx.measureText(testLine);
            if (metrics.width < bubble.radius * 1.6) {
              currentLine = testLine;
            } else {
              lines.push(currentLine);
              currentLine = words[i];
            }
          }
          lines.push(currentLine);
        }

        // 绘制多行文字
        const lineHeight = fontSize * 1.2;
        const totalHeight = lines.length * lineHeight;
        const startY = bubble.y - totalHeight / 2 + lineHeight / 2;

        lines.forEach((line, index) => {
          const y = startY + index * lineHeight;
          
          // 文字描边（深色）
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 3;
          ctx.strokeText(line, bubble.x, y);
          
          // 文字填充（白色）
          ctx.fillStyle = '#ffffff';
          ctx.fillText(line, bubble.x, y);
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // 立即启动动画
    animate();

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 空依赖数组，只执行一次

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-default"
      />
    </div>
  );
}

