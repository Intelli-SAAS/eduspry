import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
} from 'lucide-react';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  label,
  active = false,
  collapsed = false,
}) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "flex w-full items-center justify-center group transition-all px-2 py-2 rounded-xl",
          "hover:bg-secondary/70",
          active && "bg-secondary text-primary font-semibold",
          collapsed ? "justify-center px-0 py-3 rounded-2xl" : "justify-start px-3",
        )}
        style={{
          minHeight: collapsed ? 48 : 42,
          width: "100%",
        }}
      >
        <span className={cn(
          "flex items-center justify-center",
          active ? "text-primary" : "text-foreground/70"
        )}>
          {icon}
        </span>
        {!collapsed && (
          <span
            className={cn(
              "ml-3 text-[1rem] font-medium transition-all whitespace-nowrap",
              collapsed && "opacity-0 w-0 pointer-events-none",
              active ? "text-primary" : "text-foreground/90"
            )}
          >
            {label}
          </span>
        )}
      </Button>
    </Link>
  );
};


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
        <Button
          variant="ghost"
          className={cn(
            "flex w-full items-center px-3 py-2 rounded-xl transition-all",
            active && "bg-secondary text-primary font-semibold",
            collapsed ? "justify-center px-0 py-3 rounded-2xl" : "justify-start px-3"
          )}
          style={{
            minHeight: collapsed ? 48 : 42,
            width: "100%",
          }}
        >
          <span className={cn(
            "flex items-center justify-center",
            active ? "text-primary" : "text-foreground/70"
          )}>
            {icon}
          </span>
          {!collapsed && (
            <>
              <span className={cn(
                "ml-3 font-medium",
                active ? "text-primary" : "text-foreground/90"
              )}>
                {label}
              </span>
              <ChevronDown className={cn(
                "ml-auto h-4 w-4 transition-transform text-foreground/60",
                isOpen && "rotate-180"
              )} />
            </>
          )}
        </Button>
      </CollapsibleTrigger>
      {!collapsed && (
        <CollapsibleContent className="pl-7 pt-1 space-y-1">
          {children}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Role Based Navigation
  const renderRoleBasedLinks = () => {
    switch (user?.role) {
      case UserRole.STUDENT:
        return (
          <>
            <SidebarLink
              href="/dashboard"
              icon={<Home className="h-6 w-6" />}
              label="Home"
              active={pathname === '/dashboard'}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/tests"
              icon={<FileText className="h-6 w-6" />}
              label="Tests"
              active={pathname.startsWith('/tests')}
              collapsed={collapsed}
            />
            <SidebarSubmenu
              label="Subjects"
              icon={<BookOpen className="h-6 w-6" />}
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
              icon={<LayoutDashboard className="h-6 w-6" />}
              label="My Performance"
              active={pathname.startsWith('/performance')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/calendar"
              icon={<Calendar className="h-6 w-6" />}
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
              icon={<Home className="h-6 w-6" />}
              label="Dashboard"
              active={pathname === '/dashboard'}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/students"
              icon={<Users className="h-6 w-6" />}
              label="Students"
              active={pathname.startsWith('/students')}
              collapsed={collapsed}
            />
            <SidebarSubmenu
              label="Questions"
              icon={<BookOpen className="h-6 w-6" />}
              active={pathname.startsWith('/questions')}
              collapsed={collapsed}
            >
              <SidebarLink
                href="/questions/create"
                label="Create"
                active={pathname === '/questions/create'}
                icon={<div className="h-3 w-3 rounded-full bg-primary" />}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/questions/bank"
                label="Bank"
                active={pathname === '/questions/bank'}
                icon={<div className="h-3 w-3 rounded-full bg-primary" />}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/questions/import"
                label="Import"
                active={pathname === '/questions/import'}
                icon={<div className="h-3 w-3 rounded-full bg-primary" />}
                collapsed={collapsed}
              />
            </SidebarSubmenu>
            <SidebarSubmenu
              label="Tests"
              icon={<FileText className="h-6 w-6" />}
              active={pathname.startsWith('/tests')}
              collapsed={collapsed}
            >
              <SidebarLink
                href="/tests/create"
                label="Create"
                active={pathname === '/tests/create'}
                icon={<div className="h-3 w-3 rounded-full bg-primary" />}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/tests/manage"
                label="Manage"
                active={pathname === '/tests/manage'}
                icon={<div className="h-3 w-3 rounded-full bg-primary" />}
                collapsed={collapsed}
              />
              <SidebarLink
                href="/tests/results"
                label="Results"
                active={pathname === '/tests/results'}
                icon={<div className="h-3 w-3 rounded-full bg-primary" />}
                collapsed={collapsed}
              />
            </SidebarSubmenu>
            <SidebarLink
              href="/analytics"
              icon={<LayoutDashboard className="h-6 w-6" />}
              label="Analytics"
              active={pathname.startsWith('/analytics')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/calendar"
              icon={<Calendar className="h-6 w-6" />}
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
              icon={<Home className="h-6 w-6" />}
              label="Dashboard"
              active={pathname === '/dashboard'}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/departments"
              icon={<LayoutDashboard className="h-6 w-6" />}
              label="Departments"
              active={pathname.startsWith('/departments')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/teachers"
              icon={<User className="h-6 w-6" />}
              label="Teachers"
              active={pathname.startsWith('/teachers')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/students"
              icon={<Users className="h-6 w-6" />}
              label="Students"
              active={pathname.startsWith('/students')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/analytics"
              icon={<LayoutDashboard className="h-6 w-6" />}
              label="Analytics"
              active={pathname.startsWith('/analytics')}
              collapsed={collapsed}
            />
            <SidebarLink
              href="/settings"
              icon={<Settings className="h-6 w-6" />}
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
            icon={<Home className="h-6 w-6" />}
            label="Dashboard"
            active={pathname === '/dashboard'}
            collapsed={collapsed}
          />
        );
    }
  };


  // MAIN SIDEBAR COMPONENT
  return (
    <aside
      className={cn(
        "flex flex-col min-h-screen transition-all duration-300 ease-in-out shadow-sm",
        collapsed
          ? "w-[70px] bg-white"
          : "w-[270px] bg-white",
        "border-r border-border z-20"
      )}
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)"
      }}
    >
      <div className="flex items-center p-4 pb-0">
        <div className="flex flex-1 flex-col items-center w-full animate-fade-in">
          {!collapsed && (
            <div className="w-full">
              <span className="text-2xl font-poppins font-bold bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                EduSpry
              </span>
              <div className="text-xs text-gray-500 font-inter font-medium mt-1">The Competitive Edge for Curious Minds.</div>
            </div>
          )}
        </div>
      </div>

      <button
        className={cn(
          "absolute top-4 right-3 z-30 w-8 h-8 p-0 hidden md:flex items-center justify-center rounded-full border border-border bg-secondary/50 hover:bg-secondary transition",
          collapsed && "left-2.5 top-4"
        )}
        title={collapsed ? "Expand" : "Collapse"}
        aria-label="Toggle sidebar"
        onClick={() => setCollapsed((v) => !v)}
        tabIndex={0}
        type="button"
      >
        <Menu className="h-5 w-5 text-foreground/70" />
      </button>

      <nav className={cn(
        "flex-1 px-2 py-6 transition-all duration-300 overflow-y-auto",
        collapsed ? "space-y-2" : "space-y-1"
      )}>
        {renderRoleBasedLinks()}
      </nav>

      {/* Footer for copyright */}
      <div className="mt-auto pb-7 px-2 text-xs text-gray-500 w-full text-center opacity-80">
        {!collapsed && (
          <>© {new Date().getFullYear()} EduSpry</>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

