import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeftRight, UserCircle, Settings, CreditCard } from 'lucide-react'; // Example icons
import { cn } from "@/lib/utils"; // For conditional class names

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/transfer', label: 'Transfers', icon: ArrowLeftRight },
  { href: '/accounts', label: 'Accounts', icon: CreditCard },
  { href: '/profile', label: 'Profile Settings', icon: UserCircle },
  // Add more navigation items here
];

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 p-4 space-y-6 hidden md:block">
      <div className="text-2xl font-semibold text-blue-700 mb-8">YourBank</div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
              location.pathname.startsWith(item.href)
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="pt-4 mt-auto border-t border-gray-200">
         {/* Example: Settings link or other bottom items */}
         <Link
            to="/settings"
            className={cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
              location.pathname.startsWith("/settings")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
      </div>
    </aside>
  );
}
export default Sidebar;