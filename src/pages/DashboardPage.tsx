import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar'; // Custom
import AccountSummaryCard from '@/components/AccountSummaryCard'; // Custom
import Footer from '@/components/layout/Footer'; // Custom
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Bell, PlusCircle } from 'lucide-react';

// Placeholder data for AccountSummaryCard
const accounts = [
  { accountId: 'acc123', accountName: 'Checking Account', accountNumber: '•••• 6789', balance: 5250.75, currencySymbol: '$' },
  { accountId: 'acc456', accountName: 'Savings Account', accountNumber: '•••• 1234', balance: 12800.00, currencySymbol: '$' },
  { accountId: 'acc789', accountName: 'Credit Card', accountNumber: '•••• 5555', balance: -750.20, currencySymbol: '$' },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  console.log('DashboardPage loaded');

  const handleViewDetails = (accountId: string) => {
    console.log('View details for account:', accountId);
    navigate(`/account/${accountId}`);
  };

  const handleMakeTransfer = (accountId?: string) => {
    console.log('Make transfer from account:', accountId || 'general');
    navigate('/transfer', { state: { fromAccountId: accountId } });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <span className={navigationMenuTriggerStyle() + " cursor-default text-lg font-semibold"}>Dashboard</span>
                  </NavigationMenuItem>
                  {/* Add more top-level navigation if needed */}
                </NavigationMenuList>
              </NavigationMenu>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                </Button>
                 <Button onClick={() => navigate('/profile-settings')} variant="outline" size="sm">
                  My Profile
                </Button>
                <Button onClick={() => navigate('/login')} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800">Welcome User!</h1>
            <Button onClick={() => handleMakeTransfer()} size="lg">
              <PlusCircle className="mr-2 h-5 w-5" /> Make a Transfer
            </Button>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Accounts</h2>
            <ScrollArea className="h-[calc(100vh-400px)] md:h-auto"> {/* Adjust height as needed */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map(account => (
                  <AccountSummaryCard
                    key={account.accountId}
                    {...account}
                    onViewDetailsClick={handleViewDetails}
                    onMakeTransferClick={handleMakeTransfer}
                  />
                ))}
              </div>
            </ScrollArea>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Overview of your latest transactions or notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {/* Placeholder for recent activity feed or important notices */}
                  No new notifications. Your last login was today.
                  Check your <a href="#" onClick={() => navigate(`/account/${accounts[0].accountId}`)} className="text-blue-600 hover:underline">Checking Account</a> for recent transactions.
                </p>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;