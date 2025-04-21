import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon,
  label,
  active = false,
  collapsed = false,
  onClick,
}) => {
  const content = (
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
          "hover:bg-white/60 hover:text-[#1a4480]",
          active && "bg-white/80 text-[#1a4480] font-semibold shadow-sm",
          collapsed ? "justify-center px-0 py-3 rounded-2xl" : "justify-start px-3",
        )}
        style={{
          minHeight: collapsed ? 48 : 42,
          width: "100%",
          backdropFilter: active ? "blur(12px)" : "none",
          WebkitBackdropFilter: active ? "blur(12px)" : "none",
          boxShadow: active ? "0 4px 20px rgba(26, 68, 128, 0.15)" : "none",
          border: active ? "1px solid rgba(255, 255, 255, 0.8)" : "none",
        }}
        onClick={onClick}
      >
        <motion.span 
          className={cn(
            "flex items-center justify-center",
            active ? "text-[#1a4480]" : "text-foreground/70",
            collapsed && "mx-auto"
          )}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.span>
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
  );

  if (href) {
    return (
      <Link to={href} className="block w-full">
        {content}
      </Link>
    );
  }

  return content;
};

export default SidebarItem; 