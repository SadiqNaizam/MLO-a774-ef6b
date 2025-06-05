import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle, HelpCircle } from 'lucide-react'; // Icons for transaction type/status
import { cn } from "@/lib/utils";

export interface TransactionListItemProps {
  id: string;
  date: string; // e.g., "2023-10-26" or "Oct 26, 2023"
  description: string;
  amount: number;
  currencySymbol?: string;
  type: 'credit' | 'debit' | 'pending'; // 'pending' could be a type or status
  status?: 'completed' | 'pending' | 'failed'; // More granular status
  category?: string;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  date,
  description,
  amount,
  currencySymbol = '$',
  type,
  status,
  category,
}) => {
  console.log("Rendering TransactionListItem:", description);

  const isCredit = type === 'credit';
  const isDebit = type === 'debit';

  const amountColor = isCredit ? 'text-green-600' : isDebit ? 'text-red-600' : 'text-gray-700';
  const amountPrefix = isCredit ? '+' : isDebit ? '-' : '';

  const TypeIcon = isCredit ? ArrowDownCircle : isDebit ? ArrowUpCircle : HelpCircle;
  const iconColor = isCredit ? 'text-green-500' : isDebit ? 'text-red-500' : 'text-yellow-500';

  let statusBadgeVariant: "default" | "secondary" | "destructive" | "outline" = "default";
  if (status === 'completed') statusBadgeVariant = 'secondary'; // green
  if (status === 'pending') statusBadgeVariant = 'default'; // blue/yellow
  if (status === 'failed') statusBadgeVariant = 'destructive'; // red


  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center space-x-3">
        <TypeIcon className={cn("h-6 w-6 flex-shrink-0", iconColor)} />
        <div>
          <p className="text-sm font-medium text-gray-800">{description}</p>
          <p className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}{category ? ` • ${category}` : ''}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn("text-sm font-semibold", amountColor)}>
          {amountPrefix}{currencySymbol}{Math.abs(amount).toFixed(2)}
        </p>
        {status && (
          <Badge variant={statusBadgeVariant} className="mt-1 text-xs capitalize">
            {status}
          </Badge>
        )}
      </div>
    </div>
  );
}
export default TransactionListItem;