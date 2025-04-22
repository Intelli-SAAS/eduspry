import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, LogOut, Settings, User as UserIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout, tenant } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] text-white shadow-md relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
      
      {/* Top border accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
      
      <div className="flex h-16 items-center justify-between px-4 md:px-6 relative z-10">
        <div className="w-1/3"></div>

        <div className="relative w-full max-w-md md:w-2/5">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              className={`h-10 w-full rounded-lg border-0 bg-white/90 pl-10 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all ${isSearchFocused ? 'ring-2 ring-white/30' : ''}`}
              placeholder="Search for lessons, tests, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>

        <div className="flex items-center gap-3 ml-4">
          <div className="hover:scale-110 active:scale-95 transition-transform">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:text-white hover:bg-white/10 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="hover:scale-110 active:scale-95 transition-transform">
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 overflow-hidden border border-white/30 hover:bg-white/10">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt={user?.firstName} />
                    <AvatarFallback className="bg-white/10 text-white">
                      {user ? getInitials(`${user.firstName} ${user.lastName}`) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-50" align="end" side="bottom" sideOffset={5}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-[#f0f4f9] transition-colors">
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-[#f0f4f9] transition-colors">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-[#f0f4f9] transition-colors" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
