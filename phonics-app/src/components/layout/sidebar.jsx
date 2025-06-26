import { Link } from 'react-router-dom';
import { BookOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Nav, { BottomNav } from './nav'; // Assuming Nav component is created
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';

// For this example, we'll assume the sidebar is always collapsed on small screens (sm:pl-14 in MainLayout)
// and expanded on larger screens. A more complex state management could be added later for a toggle.

export default function Sidebar() {
  const { t } = useTranslation();
  // On smaller screens, shadcn dashboard example hides the sidebar and uses a sheet in the header.
  // This sidebar is for larger screens (sm: breakpoint and up).
  // The `sm:pl-14` on `MainLayout`'s `div.flex.flex-col` implies a collapsed sidebar width.
  // We'll make it fixed and always visible on sm+ screens.
  // A more dynamic collapsed/expanded state could be managed with React state if needed.
  const isCollapsed = false; // Set to true to see collapsed state, or manage with state

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-10 flex-col border-r bg-background sm:flex",
      isCollapsed ? "w-14" : "w-60" // Adjust width based on collapsed state
    )}>
      <div className={cn(
        "flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6",
        isCollapsed ? "justify-center" : ""
      )}>
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className={cn("h-6 w-6", isCollapsed ? "" : "mr-2")} />
          {!isCollapsed && <span className="">{t('app_name')}</span>}
        </Link>
        {/* Add a button to toggle collapse if needed, not in this basic version */}
      </div>
      <div className="flex-1 overflow-auto py-2">
        <Nav isCollapsed={isCollapsed} />
      </div>
      <div className="mt-auto border-t p-2">
        <BottomNav isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
