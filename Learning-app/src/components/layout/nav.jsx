import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from "@/lib/utils"; // Assuming shadcn/ui setup this utility

import {
  Home,
  Users,
  Settings,
  BookOpen,
  PenTool,
  Smile,
  UserCircle2,
  Briefcase, // Placeholder for Parent/Teacher Portal
} from 'lucide-react';
import { useTranslation } from 'react-i18next';


const NavLink = ({ to, icon: Icon, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    isCollapsed ? (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              to={to}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <Link
        to={to}
        className={cn(
          "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        {label}
      </Link>
    )
  );
};


export default function Nav({ isCollapsed }) {
  const { t } = useTranslation();

  const navItems = [
    { to: "/", icon: Home, label: t('dashboard') },
    { to: "/phonemic-awareness", icon: Smile, label: t('phonemic_awareness') },
    { to: "/phonics", icon: BookOpen, label: t('phonics') },
    { to: "/writing-practice", icon: PenTool, label: t('writing_practice') },
    { to: "/profile", icon: UserCircle2, label: t('profile') },
    { to: "/parent-teacher-portal", icon: Briefcase, label: t('parent_teacher_portal') },
  ];

  return (
    <nav className={cn("flex flex-col gap-2 p-2", isCollapsed ? "items-center" : "")}>
      {navItems.map((item) => (
        <NavLink key={item.to} {...item} isCollapsed={isCollapsed} />
      ))}
    </nav>
  );
}

export function BottomNav({ isCollapsed }) {
  const { t } = useTranslation();
   const bottomNavItems = [
    { to: "/settings", icon: Settings, label: t('settings') },
  ];
  return (
    <nav className={cn("mt-auto flex flex-col gap-2 p-2", isCollapsed ? "items-center" : "")}>
       {bottomNavItems.map((item) => (
        <NavLink key={item.to} {...item} isCollapsed={isCollapsed} />
      ))}
    </nav>
  );
}
