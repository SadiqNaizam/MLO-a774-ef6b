import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from 'lucide-react'; // Example icons

interface AccountSummaryCardProps {
  accountId: string;
  accountName: string;
  accountNumber: string; // e.g., "•••• 1234"
  balance: number;
  currencySymbol?: string;
  onViewDetailsClick?: (accountId: string) => void;
  onMakeTransferClick?: (accountId: string) => void;
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountId,
  accountName,
  accountNumber,
  balance,
  currencySymbol = '$',
  onViewDetailsClick,
  onMakeTransferClick,
}) => {
  console.log("Rendering AccountSummaryCard for:", accountName);

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  return (
    <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700">{accountName}</CardTitle>
        <CardDescription>Account No: {accountNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold text-gray-800">
          {currencySymbol}{formattedBalance}
        </p>
        <p className="text-sm text-gray-500 mt-1">Available Balance</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-4">
        {onViewDetailsClick && (
          <Button variant="outline" size="sm" onClick={() => onViewDetailsClick(accountId)}>
            <Eye className="mr-2 h-4 w-4" /> View Details
          </Button>
        )}
        {onMakeTransferClick && (
          <Button variant="default" size="sm" onClick={() => onMakeTransferClick(accountId)}>
            Make Transfer <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
export default AccountSummaryCard;