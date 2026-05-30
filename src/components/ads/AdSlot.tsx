'use client';

import { useEffect, useRef } from 'react';

export type AdSlotSize =
  | 'leaderboard'    // 728x90 - 工具页顶部/底部横幅
  | 'rectangle'      // 336x280 - 内容区中间
  | 'halfpage'       // 300x600 - 侧边栏
  | 'responsive';    // 自适应

interface AdSlotProps {
  /** 广告位唯一标识，用于区分同一页面的多个广告 */
  slotId: string;
  size?: AdSlotSize;
  className?: string;
  /** 广告描述，用于在无广告时显示占位 */
  label?: string;
}

const sizeConfig: Record<AdSlotSize, { width: number | string; height: number | string; className: string }> = {
  leaderboard:  { width: 728,  height: 90,  className: 'max-w-[728px] h-[90px]' },
  rectangle:    { width: 336,  height: 280, className: 'w-[336px] h-[280px]' },
  halfpage:     { width: 300,  height: 600, className: 'w-[300px] h-[600px]' },
  responsive:   { width: '100%', height: 90, className: 'w-full min-h-[90px]' },
};

/**
 * AdSlot - 统一广告位组件
 *
 * 使用方式:
 * 1. 设置环境变量 NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 * 2. 在 Cloudflare Pages → 变量和机密 里添加该环境变量
 * 3. 每个广告位需要一个唯一的 data-ad-slot 值 (从 AdSense 后台获取)
 *
 * 开发模式下显示占位框，生产模式且有 ADSENSE_CLIENT 时渲染真实广告
 */
export function AdSlot({ slotId, size = 'responsive', className = '', label }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isDev = process.env.NODE_ENV === 'development';
  const config = sizeConfig[size];

  useEffect(() => {
    if (!adsenseClient || isDev) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded yet
    }
  }, [adsenseClient, isDev]);

  // Dev mode or no AdSense client: show placeholder
  if (isDev || !adsenseClient) {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-[hsl(var(--color-border))] rounded-lg bg-[hsl(var(--color-muted))/0.3] text-[hsl(var(--color-muted-foreground))] text-xs ${config.className} ${className}`}
        style={{ maxWidth: '100%' }}
        data-ad-placeholder={slotId}
      >
        <span>Ad: {label || slotId} ({size})</span>
      </div>
    );
  }

  // Production: render real AdSense ad
  return (
    <div ref={adRef} className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseClient}
        data-ad-slot={slotId}
        data-ad-format={size === 'responsive' ? 'auto' : undefined}
        data-full-width-responsive={size === 'responsive' ? 'true' : undefined}
      />
    </div>
  );
}
