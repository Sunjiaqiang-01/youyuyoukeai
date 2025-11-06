"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge"
import {
  Blocks,
  ChevronsUpDown,
  Brain,
  Bot,
  Users,
  Sparkles,
  UserCog as UserAdmin,
  LogOut,
  Settings,
  Plus,
  Home,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"

const sidebarVariants = {
  open: {
    width: "15rem",
  },
  closed: {
    width: "3.05rem",
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};


export function SessionNavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  
  // 二级菜单数据
  const menuData = [
    {
      id: "yupan",
      name: "预判军师",
      icon: Brain,
      href: "/yupan",
      submenus: [
        { name: "数据看板", href: "/yupan/dashboard" },
        { name: "自训练数据模型", href: "/yupan/training" },
      ],
    },
    {
      id: "xiaozhi",
      name: "销智助理",
      icon: Bot,
      href: "/xiaozhi",
      submenus: [],
    },
    {
      id: "gongguan",
      name: "公关师",
      icon: Users,
      href: "/gongguan",
      submenus: [
        { name: "AI智能触达", href: "/gongguan/reach" },
        { name: "基础配置", href: "/gongguan/settings" },
      ],
    },
    {
      id: "chuangyi",
      name: "创意创作师",
      icon: Sparkles,
      href: "/chuangyi",
      submenus: [
        { name: "定向仿真人", href: "/chuangyi/digital-human" },
        { name: "创意爆款库", href: "/chuangyi/templates" },
      ],
    },
    {
      id: "zhuguan",
      name: "主管分身",
      icon: UserAdmin,
      href: "/zhuguan",
      submenus: [
        { name: "账号配置", href: "/zhuguan/account" },
        { name: "参数配置", href: "/zhuguan/params" },
      ],
    },
  ];
  
  return (
    <motion.div
      className={cn(
        "sidebar fixed left-0 z-40 h-full shrink-0 border-r fixed",
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className={`relative z-40 flex text-muted-foreground h-full shrink-0 flex-col bg-[#0d0d0d] transition-all`}
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            <div className="flex h-[54px] w-full shrink-0  border-b p-2">
              <div className=" mt-[1.5px] flex w-full">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="w-full" asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex w-fit items-center gap-2  px-2" 
                    >
                      <Avatar className='rounded size-4'>
                        <AvatarFallback>O</AvatarFallback>
                      </Avatar>
                      <motion.li
                        variants={variants}
                        className="flex w-fit items-center gap-2"
                      >
                        {!isCollapsed && (
                          <>
                            <p className="text-sm font-medium  ">
                              {"有鱼有客"}
                            </p>
                            <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />
                          </>
                        )}
                      </motion.li>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      asChild
                      className="flex items-center gap-2"
                    >
                      <Link href="/settings/members">
                        <Settings className="h-4 w-4" /> 团队管理
                      </Link>
                    </DropdownMenuItem>{" "}
                    <DropdownMenuItem
                      asChild
                      className="flex items-center gap-2"
                    >
                      <Link href="/settings/integrations">
                        <Blocks className="h-4 w-4" /> 系统集成
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/select-org"
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        创建或加入组织
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className=" flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-4">
                <ScrollArea className="h-16 grow p-2">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    <Link
                      href="/"
                      className={cn(
                        "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5   transition hover:bg-muted hover:text-primary",
                        pathname === "/" &&
                          "bg-[#1a1a1a] text-[#06d6a0]",
                      )}
                    >
                      <Home className="h-4 w-4" />{" "}
                      <motion.li variants={variants}>
                        {!isCollapsed && (
                          <p className="ml-2 text-sm font-medium">首页</p>
                        )}
                      </motion.li>
                    </Link>
                    <Separator className="w-full" />
                    
                    {menuData.map((menu) => {
                      const Icon = menu.icon;
                      const isActive = pathname?.includes(menu.id);
                      const isOpen = openSubmenu === menu.id;
                      
                      return (
                        <div key={menu.id} className="w-full">
                          {menu.submenus.length > 0 ? (
                            <button
                              onClick={() => setOpenSubmenu(isOpen ? null : menu.id)}
                              className={cn(
                                "flex h-8 w-full flex-row items-center justify-between rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                                isActive && "bg-[#1a1a1a] text-[#06d6a0]",
                              )}
                            >
                              <div className="flex items-center">
                                <Icon className="h-4 w-4" />
                                <motion.span variants={variants}>
                                  {!isCollapsed && (
                                    <p className="ml-2 text-sm font-medium">{menu.name}</p>
                                  )}
                                </motion.span>
                              </div>
                              <motion.span variants={variants}>
                                {!isCollapsed && (
                                  <ChevronDown 
                                    className={cn(
                                      "h-4 w-4 transition-transform duration-200",
                                      isOpen && "rotate-180"
                                    )} 
                                  />
                                )}
                              </motion.span>
                            </button>
                          ) : (
                            <Link
                              href={menu.href}
                              className={cn(
                                "flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                                isActive && "bg-[#1a1a1a] text-[#06d6a0]",
                              )}
                            >
                              <Icon className="h-4 w-4" />
                              <motion.li variants={variants}>
                                {!isCollapsed && (
                                  <p className="ml-2 text-sm font-medium">{menu.name}</p>
                                )}
                              </motion.li>
                            </Link>
                          )}
                          
                          {menu.submenus.length > 0 && (
                            <AnimatePresence>
                              {isOpen && !isCollapsed && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-[#2a2a2a] pl-2">
                                    {menu.submenus.map((submenu) => (
                                      <Link
                                        key={submenu.href}
                                        href={submenu.href}
                                        className={cn(
                                          "flex h-7 items-center rounded-md px-2 py-1 text-sm transition hover:bg-muted hover:text-primary",
                                          pathname === submenu.href && "bg-[#1a1a1a] text-[#06d6a0]"
                                        )}
                                      >
                                        {submenu.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
              <div className="flex flex-col p-2">
                <Link
                  href="/settings/integrations"
                  className="mt-auto flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5   transition hover:bg-muted hover:text-primary"
                >
                  <Settings className="h-4 w-4 shrink-0" />{" "}
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium"> 设置</p>
                    )}
                  </motion.li>
                </Link>
                <div>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-full">
                      <div className="flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5  transition hover:bg-muted hover:text-primary">
                        <Avatar className="size-4">
                          <AvatarFallback>
                            A
                          </AvatarFallback>
                        </Avatar>
                        <motion.li
                          variants={variants}
                          className="flex w-full items-center gap-2"
                        >
                          {!isCollapsed && (
                            <>
                              <p className="text-sm font-medium">账户</p>
                              <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
                            </>
                          )}
                        </motion.li>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={5}>
                      <div className="flex flex-row items-center gap-2 p-2">
                        <Avatar className="size-6">
                          <AvatarFallback>
                            AL
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-medium">
                            {`少辰大王`}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {`admin@youyu.ai`}
                          </span>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        asChild
                        className="flex items-center gap-2"
                      >
                        <Link href="/settings/profile">
                          <Settings className="h-4 w-4" /> 个人资料
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" /> 退出登录
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

