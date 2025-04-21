import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { UserRole } from '@/types';
import {
  BookOpen,
  Home,
  LayoutDashboard,
  Calendar,
  User,
  Users,
  FileText,
  Settings,
  Menu,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import SidebarLink from './SidebarLink';

interface SidebarSubmenuProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  label,
  icon,
  children,
  active = false,
  collapsed = false,
}) => {
  const [isOpen, setIsOpen] = useState(active);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "transition-all duration-200 hover:scale-[1.02]",
            collapsed ? "hover:translate-x-0" : "hover:translate-x-[3px]"
          )}
        >
          <Button
            variant="ghost"
            className={cn(
              "flex w-full items-center px-3 py-2 rounded-xl transition-all text-[1rem]",
              "hover:bg-[#1a4480]/10",
              active && "bg-[#1a4480]/15 text-[#1a4480] font-semibold",
              collapsed ? "justify-center px-0 py-3 rounded-2xl" : "justify-start px-3"
            )}
            style={{
              minHeight: collapsed ? 48 : 42,
              width: "100%",
            }}
          >
            <span className={cn(
              "flex items-center justify-center",
              active ? "text-[#1a4480]" : "text-foreground/70",
              collapsed && "mx-auto"
            )}>
              {icon}
            </span>
            {!collapsed && (
              <>
                <span
                  className={cn(
                    "ml-3 font-medium whitespace-nowrap",
                    active ? "text-[#1a4480]" : "text-foreground/90"
                  )}
                >
                  {label}
                </span>
                <div
                  className="transform transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <ChevronDown className="ml-auto h-4 w-4 text-foreground/60" />
                </div>
              </>
            )}
          </Button>
        </div>
      </CollapsibleTrigger>
      {!collapsed && isOpen && (
        <CollapsibleContent forceMount>
          <div className="pl-7 pt-1 space-y-1 animate-slideDown">
            {children}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapseChange }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Notify parent component when collapse state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(collapsed);
    }
  }, [collapsed, onCollapseChange]);

  // Role Based Navigation
  const renderRoleBasedLinks = () => {
    switch (user?.role) {
      case UserRole.STUDENT:
        return (
          <>
            <SidebarLink
              href="/dashboard"
              icon={<Home className="h-5 w-5" />}
              label="Home"
              active={pathname === '/dashboard'}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/tests"
              icon={<FileText className="h-5 w-5" />}
              label="Tests"
              active={pathname.startsWith('/tests')}
              collapsed={collapsed}
            />
            <SidebarSubmenu
              label="Subjects"
              icon={<BookOpen className="h-5 w-5" />}
              active={pathname.startsWith('/subjects')}
              collapsed={collapsed}
            >
              <SidebarLink
                href="/subjects/physics"
                icon={<div className="h-3 w-3 rounded-full bg-subject-physics" />}
                label="Physics"
                active={pathname === '/subjects/physics'}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/subjects/chemistry"
                icon={<div className="h-3 w-3 rounded-full bg-subject-chemistry" />}
                label="Chemistry"
                active={pathname === '/subjects/chemistry'}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/subjects/mathematics"
                icon={<div className="h-3 w-3 rounded-full bg-subject-mathematics" />}
                label="Mathematics"
                active={pathname === '/subjects/mathematics'}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/subjects/biology"
                icon={<div className="h-3 w-3 rounded-full bg-subject-biology" />}
                label="Biology"
                active={pathname === '/subjects/biology'}
                collapsed={collapsed}
              />
            </SidebarSubmenu>
            <SidebarLink
              href="/performance"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="My Performance"
              active={pathname.startsWith('/performance')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/calendar"
              icon={<Calendar className="h-5 w-5" />}
              label="Calendar"
              active={pathname.startsWith('/calendar')}
              collapsed={collapsed}
            />
          </>
        );
      case UserRole.TEACHER:
        return (
          <>
            <SidebarLink
              href="/dashboard"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              active={pathname === '/dashboard'}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/students"
              icon={<Users className="h-5 w-5" />}
              label="Students"
              active={pathname.startsWith('/students')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/ai-assistant"
              icon={<Sparkles className="h-5 w-5" />}
              label="AI Assistant"
              active={pathname.startsWith('/ai-assistant')}
              collapsed={collapsed}
            />
            <SidebarSubmenu
              label="Questions"
              icon={<BookOpen className="h-5 w-5" />}
              active={pathname.startsWith('/questions')}
              collapsed={collapsed}
            >
              <SidebarLink
                href="/questions/create"
                label="Create"
                active={pathname === '/questions/create'}
                icon={<div className="h-3 w-3 rounded-full bg-[#1a4480]" />}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/questions/bank"
                label="Bank"
                active={pathname === '/questions/bank'}
                icon={<div className="h-3 w-3 rounded-full bg-[#1a4480]" />}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/questions/import"
                label="Import"
                active={pathname === '/questions/import'}
                icon={<div className="h-3 w-3 rounded-full bg-[#1a4480]" />}
                collapsed={collapsed}
              />
            </SidebarSubmenu>
            <SidebarSubmenu
              label="Tests"
              icon={<FileText className="h-5 w-5" />}
              active={pathname.startsWith('/tests')}
              collapsed={collapsed}
            >
              <SidebarLink
                href="/tests/create"
                label="Create"
                active={pathname === '/tests/create'}
                icon={<div className="h-3 w-3 rounded-full bg-[#1a4480]" />}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/tests/manage"
                label="Manage"
                active={pathname === '/tests/manage'}
                icon={<div className="h-3 w-3 rounded-full bg-[#1a4480]" />}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/tests/results"
                label="Results"
                active={pathname === '/tests/results'}
                icon={<div className="h-3 w-3 rounded-full bg-[#1a4480]" />}
                collapsed={collapsed}
              />
            </SidebarSubmenu>
            <SidebarLink
              href="/analytics"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Analytics"
              active={pathname.startsWith('/analytics')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/calendar"
              icon={<Calendar className="h-5 w-5" />}
              label="Calendar"
              active={pathname.startsWith('/calendar')}
              collapsed={collapsed}
            />
          </>
        );
      case UserRole.PRINCIPAL:
        return (
          <>
            <SidebarLink
              href="/dashboard"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              active={pathname === '/dashboard'}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/departments"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Departments"
              active={pathname.startsWith('/departments')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/teachers"
              icon={<User className="h-5 w-5" />}
              label="Teachers"
              active={pathname.startsWith('/teachers')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/students"
              icon={<Users className="h-5 w-5" />}
              label="Students"
              active={pathname.startsWith('/students')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/analytics"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Analytics"
              active={pathname.startsWith('/analytics')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={pathname.startsWith('/settings')}
              collapsed={collapsed}
            />
          </>
        );
      default:
        return (
          <SidebarLink
            href="/dashboard"
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            active={pathname === '/dashboard'}
            collapsed={collapsed}
          />
        );
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-20 flex flex-col bg-white/90 backdrop-blur-sm border-r border-border/40 h-screen shadow-md transition-all duration-300",
        collapsed ? "w-[72px] items-center py-4 pr-0 pl-0" : "w-[280px] py-4 pr-2 pl-4"
      )}
    >
      <div className={cn(
        "flex w-full items-center justify-between mb-6 pt-2 px-4",
        collapsed ? "justify-center" : ""
      )}>
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center w-full" : ""
        )}>
          <BookOpen className="h-7 w-7 text-[#1a4480]" />
          {!collapsed && (
            <span className="font-bold text-xl text-[#1a4480] ml-3">EduSpry</span>
          )}
        </div>
        
        {!collapsed && (
          <button
            onClick={toggleCollapsed}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#1a4480]/10 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Menu className="h-5 w-5 text-foreground/70" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={toggleCollapsed}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#1a4480]/10 transition-all duration-200 hover:scale-110 active:scale-95 mb-4 mx-auto"
        >
          <Menu className="h-5 w-5 text-foreground/70" />
        </button>
      )}

      <nav 
        className="flex w-full flex-col space-y-1 overflow-y-auto px-1"
        style={{
          maxHeight: "calc(100vh - 8rem)",
        }}
      >
        {renderRoleBasedLinks()}
      </nav>
    </div>
  );
};

export default Sidebar;

