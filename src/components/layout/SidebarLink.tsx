import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
    <Link to={href} className="block w-full">
      <div
        className={cn(
          "transition-all duration-200 hover:scale-[1.02]",
          collapsed ? "hover:translate-x-0" : "hover:translate-x-[3px]"
        )}
      >
        <Button
          variant="ghost"
          className={cn(
            "flex w-full items-center transition-all px-2 py-2 rounded-xl text-[1rem]",
            "hover:bg-[#1a4480]/10 hover:text-[#1a4480]",
            active && "bg-[#1a4480]/15 text-[#1a4480] font-semibold",
            collapsed ? "justify-center px-0 py-3 rounded-2xl" : "justify-start px-3",
          )}
          style={{
            minHeight: collapsed ? 48 : 42,
            width: "100%",
            backdropFilter: active ? "blur(8px)" : "none",
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
            <span
              className={cn(
                "ml-3 font-medium whitespace-nowrap",
                active ? "text-[#1a4480]" : "text-foreground/90"
              )}
            >
              {label}
            </span>
          )}
        </Button>
      </div>
    </Link>
  );
};

export default SidebarLink; 