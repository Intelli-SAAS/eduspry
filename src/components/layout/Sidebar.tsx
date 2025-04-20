
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
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  label,
  active = false,
}) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          active && "bg-gray-100 text-gray-900 font-medium"
        )}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Button>
    </Link>
  );
};

interface SidebarSubmenuProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  label,
  icon,
  children,
  active = false,
}) => {
  const [isOpen, setIsOpen] = useState(active);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            active && "bg-gray-100 text-gray-900 font-medium"
          )}
        >
          {icon}
          <span className="ml-2">{label}</span>
          <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 pt-1">{children}</CollapsibleContent>
    </Collapsible>
  );
};

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Return different sidebar layouts based on user role
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
            />
            <SidebarLink
              href="/tests"
              icon={<FileText className="h-5 w-5" />}
              label="Tests"
              active={pathname.startsWith('/tests')}
            />
            <SidebarSubmenu
              label="Subjects"
              icon={<BookOpen className="h-5 w-5" />}
              active={pathname.startsWith('/subjects')}
            >
              <SidebarLink
                href="/subjects/physics"
                icon={<div className="h-2 w-2 rounded-full bg-subject-physics" />}
                label="Physics"
                active={pathname === '/subjects/physics'}
              />
              <SidebarLink
                href="/subjects/chemistry"
                icon={<div className="h-2 w-2 rounded-full bg-subject-chemistry" />}
                label="Chemistry"
                active={pathname === '/subjects/chemistry'}
              />
              <SidebarLink
                href="/subjects/mathematics"
                icon={<div className="h-2 w-2 rounded-full bg-subject-mathematics" />}
                label="Mathematics"
                active={pathname === '/subjects/mathematics'}
              />
              <SidebarLink
                href="/subjects/biology"
                icon={<div className="h-2 w-2 rounded-full bg-subject-biology" />}
                label="Biology"
                active={pathname === '/subjects/biology'}
              />
            </SidebarSubmenu>
            <SidebarLink
              href="/performance"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="My Performance"
              active={pathname.startsWith('/performance')}
            />
            <SidebarLink
              href="/calendar"
              icon={<Calendar className="h-5 w-5" />}
              label="Calendar"
              active={pathname.startsWith('/calendar')}
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
            />
            <SidebarLink
              href="/students"
              icon={<Users className="h-5 w-5" />}
              label="Students"
              active={pathname.startsWith('/students')}
            />
            <SidebarSubmenu
              label="Questions"
              icon={<BookOpen className="h-5 w-5" />}
              active={pathname.startsWith('/questions')}
            >
              <SidebarLink
                href="/questions/create"
                label="Create Question"
                active={pathname === '/questions/create'}
                icon={<div className="h-2 w-2 rounded-full bg-primary" />}
              />
              <SidebarLink
                href="/questions/bank"
                label="Question Bank"
                active={pathname === '/questions/bank'}
                icon={<div className="h-2 w-2 rounded-full bg-primary" />}
              />
              <SidebarLink
                href="/questions/import"
                label="Import Questions"
                active={pathname === '/questions/import'}
                icon={<div className="h-2 w-2 rounded-full bg-primary" />}
              />
            </SidebarSubmenu>
            <SidebarSubmenu
              label="Tests"
              icon={<FileText className="h-5 w-5" />}
              active={pathname.startsWith('/tests')}
            >
              <SidebarLink
                href="/tests/create"
                label="Create Test"
                active={pathname === '/tests/create'}
                icon={<div className="h-2 w-2 rounded-full bg-primary" />}
              />
              <SidebarLink
                href="/tests/manage"
                label="Manage Tests"
                active={pathname === '/tests/manage'}
                icon={<div className="h-2 w-2 rounded-full bg-primary" />}
              />
              <SidebarLink
                href="/tests/results"
                label="Test Results"
                active={pathname === '/tests/results'}
                icon={<div className="h-2 w-2 rounded-full bg-primary" />}
              />
            </SidebarSubmenu>
            <SidebarLink
              href="/analytics"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Analytics"
              active={pathname.startsWith('/analytics')}
            />
            <SidebarLink
              href="/calendar"
              icon={<Calendar className="h-5 w-5" />}
              label="Calendar"
              active={pathname.startsWith('/calendar')}
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
            />
            <SidebarLink
              href="/departments"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Departments"
              active={pathname.startsWith('/departments')}
            />
            <SidebarLink
              href="/teachers"
              icon={<User className="h-5 w-5" />}
              label="Teachers"
              active={pathname.startsWith('/teachers')}
            />
            <SidebarLink
              href="/students"
              icon={<Users className="h-5 w-5" />}
              label="Students"
              active={pathname.startsWith('/students')}
            />
            <SidebarLink
              href="/analytics"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="School Analytics"
              active={pathname.startsWith('/analytics')}
            />
            <SidebarLink
              href="/settings"
              icon={<Settings className="h-5 w-5" />}
              label="School Settings"
              active={pathname.startsWith('/settings')}
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
          />
        );
    }
  };

  return (
    <div
      className={cn(
        "flex h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        "bg-white border-r border-gray-100 shadow-sm"
      )}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
          <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
            {!collapsed && (
              <>
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-semibold text-gray-900">EduSpry</span>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          <div className="space-y-1">
            {renderRoleBasedLinks()}
          </div>
        </nav>

        <div className="border-t border-gray-100 p-4">
          {!collapsed && (
            <div className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} EduSpry
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
