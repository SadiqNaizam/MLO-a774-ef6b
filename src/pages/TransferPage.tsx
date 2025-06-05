import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar'; // Custom
import Footer from '@/components/layout/Footer'; // Custom

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft, CheckCircle, Info, Send } from 'lucide-react';

// Placeholder data
const userAccounts = [
  { id: 'acc123', name: 'Checking Account (•••• 6789)', balance: 5250.75 },
  { id: 'acc456', name: 'Savings Account (•••• 1234)', balance: 12800.00 },
];

const TransferPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preselectedFromAccountId = location.state?.fromAccountId;

  console.log('TransferPage loaded. Preselected account:', preselectedFromAccountId);

  const [fromAccount, setFromAccount] = useState(preselectedFromAccountId || '');
  const [transferType, setTransferType] = useState('own'); // 'own', 'other_tsb', 'external'
  const [toAccount, setToAccount] = useState(''); // For 'own' or 'other_tsb'
  const [recipientName, setRecipientName] = useState(''); // For 'external'
  const [recipientAccountNo, setRecipientAccountNo] = useState(''); // For 'external'
  const [recipientBank, setRecipientBank] = useState(''); // For 'external'
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [formError, setFormError] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);

  const selectedFromAccountDetails = userAccounts.find(acc => acc.id === fromAccount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setTransferSuccess(false);

    if (!fromAccount || !amount) {
      setFormError('Please select a source account and enter an amount.');
      return;
    }
    if (parseFloat(amount) <= 0) {
      setFormError('Amount must be greater than zero.');
      return;
    }
    if (selectedFromAccountDetails && parseFloat(amount) > selectedFromAccountDetails.balance) {
        setFormError('Insufficient funds in the selected account.');
        return;
    }
    if (transferType === 'own' && !toAccount) {
      setFormError('Please select a destination account.');
      return;
    }
    if (transferType === 'own' && fromAccount === toAccount) {
      setFormError('Source and destination accounts cannot be the same.');
      return;
    }
    // Add more validation for other_tsb and external if implemented

    console.log('Reviewing transfer:', { fromAccount, transferType, toAccount, recipientName, recipientAccountNo, recipientBank, amount, reference });
    setShowReviewDialog(true);
  };

  const handleConfirmTransfer = () => {
    console.log('Transfer confirmed and processing...');
    // Placeholder: Simulate API call
    setTimeout(() => {
      setShowReviewDialog(false);
      setTransferSuccess(true);
      // Reset form or navigate
      // setFromAccount(''); setToAccount(''); setAmount(''); setReference(''); // etc.
    }, 1500);
  };
  
  const getToAccountName = () => {
    if (transferType === 'own') {
        return userAccounts.find(acc => acc.id === toAccount)?.name || 'N/A';
    }
    // Extend for other types if needed
    return 'N/A';
  }

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
                <BreadcrumbItem><BreadcrumbPage>Make a Transfer</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Card className="w-full max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Fund Transfer</CardTitle>
              <CardDescription>Securely transfer funds between your accounts or to others.</CardDescription>
            </CardHeader>
            <CardContent>
              {transferSuccess && (
                <Alert variant="default" className="mb-6 bg-green-50 border-green-300 text-green-700">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertTitle>Transfer Successful!</AlertTitle>
                  <AlertDescription>
                    Your transfer of ${amount} has been processed.
                    <Button variant="link" onClick={() => { setTransferSuccess(false); setAmount(''); setReference(''); }} className="ml-2 p-0 h-auto text-green-700">Make another transfer?</Button>
                  </AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fromAccount">From Account</Label>
                  <Select value={fromAccount} onValueChange={setFromAccount} required>
                    <SelectTrigger id="fromAccount">
                      <SelectValue placeholder="Select source account" />
                    </SelectTrigger>
                    <SelectContent>
                      {userAccounts.map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name} - Balance: ${acc.balance.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Transfer Type</Label>
                  <RadioGroup value={transferType} onValueChange={setTransferType} className="flex space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="own" id="own" />
                      <Label htmlFor="own">To My Own Account</Label>
                    </div>
                    {/* <div className="flex items-center space-x-2"> // Future options
                      <RadioGroupItem value="other_tsb" id="other_tsb" />
                      <Label htmlFor="other_tsb">To Another YourBank Account</Label>
                    </div> */}
                  </RadioGroup>
                </div>

                {transferType === 'own' && (
                  <div>
                    <Label htmlFor="toAccount">To Account</Label>
                    <Select value={toAccount} onValueChange={setToAccount} required>
                      <SelectTrigger id="toAccount">
                        <SelectValue placeholder="Select destination account" />
                      </SelectTrigger>
                      <SelectContent>
                        {userAccounts.filter(acc => acc.id !== fromAccount).map(acc => (
                          <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {/* Add fields for 'other_tsb' and 'external' when implemented */}

                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="0.01"
                    step="0.01"
                  />
                </div>

                <div>
                  <Label htmlFor="reference">Reference (Optional)</Label>
                  <Input
                    id="reference"
                    type="text"
                    placeholder="e.g., Monthly savings, Bill payment"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </div>

                {formError && (
                  <Alert variant="destructive">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" size="lg">
                  Review Transfer
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>

        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review Your Transfer</DialogTitle>
              <DialogDescription>Please confirm the details below before submitting.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <p><strong>From:</strong> {userAccounts.find(acc => acc.id === fromAccount)?.name}</p>
              <p><strong>To:</strong> {getToAccountName()}</p>
              <p><strong>Amount:</strong> ${parseFloat(amount || '0').toFixed(2)}</p>
              <p><strong>Reference:</strong> {reference || 'N/A'}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReviewDialog(false)}>Cancel</Button>
              <Button onClick={handleConfirmTransfer}><Send className="mr-2 h-4 w-4" /> Confirm Transfer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </div>
  );
};

export default TransferPage;