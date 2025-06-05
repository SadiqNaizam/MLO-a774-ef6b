import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar'; // Custom
import Footer from '@/components/layout/Footer'; // Custom
// import TransactionListItem from '@/components/TransactionListItem'; // Custom component, consider for simpler lists

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft, Download, Filter, Search } from 'lucide-react';

// Placeholder data
const sampleTransactions = [
  { id: 'txn1', date: '2024-07-28', description: 'Online Purchase - Amazon', amount: -75.50, type: 'debit', status: 'completed', category: 'Shopping' },
  { id: 'txn2', date: '2024-07-27', description: 'Salary Deposit - Company Inc.', amount: 2500.00, type: 'credit', status: 'completed', category: 'Income' },
  { id: 'txn3', date: '2024-07-26', description: 'Utility Bill - Electricity', amount: -120.00, type: 'debit', status: 'completed', category: 'Bills' },
  { id: 'txn4', date: '2024-07-25', description: 'Transfer to Savings', amount: -500.00, type: 'debit', status: 'completed', category: 'Transfers' },
  { id: 'txn5', date: '2024-07-24', description: 'Restaurant - The Italian Place', amount: -45.20, type: 'debit', status: 'pending', category: 'Food' },
  { id: 'txn6', date: '2024-07-23', description: 'Refund from StoreX', amount: 30.00, type: 'credit', status: 'completed', category: 'Refunds' },
];

const ITEMS_PER_PAGE = 5;

const AccountDetailsPage = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  console.log(`AccountDetailsPage loaded for accountId: ${accountId}`);

  // Dummy account data based on ID (in a real app, this would be fetched)
  const accountDetails = useMemo(() => {
    if (accountId === 'acc123') return { name: 'Checking Account', number: '•••• 6789', balance: 5250.75, currency: '$', availableBalance: 5200.00 };
    if (accountId === 'acc456') return { name: 'Savings Account', number: '•••• 1234', balance: 12800.00, currency: '$', availableBalance: 12800.00 };
    if (accountId === 'acc789') return { name: 'Credit Card', number: '•••• 5555', balance: -750.20, currency: '$', availableBalance: 4249.80 }; // Credit limit might be implied
    return { name: 'Unknown Account', number: 'N/A', balance: 0, currency: '$', availableBalance: 0 };
  }, [accountId]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return sampleTransactions
      .filter(tx => tx.description.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(tx => filterType === 'all' || tx.type === filterType);
  }, [searchTerm, filterType]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleDownloadStatement = () => {
    console.log('Download statement clicked');
    // Placeholder for download logic
    alert('Statement download initiated (placeholder).');
  };


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <Breadcrumb>
                <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{accountDetails.name}</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">{accountDetails.name}</CardTitle>
              <CardDescription>Account No: {accountDetails.number}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className="text-2xl font-semibold">{accountDetails.currency}{accountDetails.balance.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-2xl font-semibold">{accountDetails.currency}{accountDetails.availableBalance.toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                 <Button onClick={() => navigate('/transfer', { state: { fromAccountId: accountId } })}>Make a Transfer</Button>
                 <Button variant="outline" onClick={handleDownloadStatement}><Download className="mr-2 h-4 w-4" /> Download Statement</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <div className="mt-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full md:w-[300px]"
                    />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                    <SelectItem value="debit">Debit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] md:h-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTransactions.length > 0 ? paginatedTransactions.map(tx => (
                      <TableRow key={tx.id}>
                        <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{tx.description}</TableCell>
                        <TableCell>{tx.category}</TableCell>
                        <TableCell className={`text-right ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.type === 'credit' ? '+' : '-'}{accountDetails.currency}{Math.abs(tx.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                           <span className={`px-2 py-1 text-xs rounded-full ${
                                tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                                tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                                {tx.status}
                            </span>
                        </TableCell>
                      </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-10">No transactions found.</TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            {totalPages > 1 && (
                <CardFooter className="justify-center">
                    <Pagination>
                        <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} aria-disabled={currentPage === 1} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                            <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}>
                                {i + 1}
                            </PaginationLink>
                            </PaginationItem>
                        ))}
                        {totalPages > 5 && <PaginationEllipsis />}
                        <PaginationItem>
                            <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} aria-disabled={currentPage === totalPages} />
                        </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            )}
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AccountDetailsPage;