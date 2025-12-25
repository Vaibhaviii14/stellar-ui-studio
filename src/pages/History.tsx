import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Clock, Eye, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const historyItems = [
  {
    id: '1',
    date: 'Today',
    invoices: [
      { id: 'h1', invoiceNumber: 'INV-2024-047', vendor: 'Acme Corp', amount: 2450, status: 'approved', time: '10:30 AM' },
      { id: 'h2', invoiceNumber: 'INV-2024-046', vendor: 'TechFlow Inc', amount: 8750.50, status: 'approved', time: '09:15 AM' },
    ],
  },
  {
    id: '2',
    date: 'Yesterday',
    invoices: [
      { id: 'h3', invoiceNumber: 'INV-2024-045', vendor: 'CloudSoft', amount: 1250, status: 'rejected', time: '04:45 PM' },
      { id: 'h4', invoiceNumber: 'INV-2024-044', vendor: 'Global Ltd', amount: 3200.75, status: 'approved', time: '02:30 PM' },
      { id: 'h5', invoiceNumber: 'INV-2024-043', vendor: 'Innovation Labs', amount: 15000, status: 'approved', time: '11:00 AM' },
    ],
  },
  {
    id: '3',
    date: 'Jan 22, 2024',
    invoices: [
      { id: 'h6', invoiceNumber: 'INV-2024-042', vendor: 'DataStream Inc', amount: 4500, status: 'approved', time: '03:20 PM' },
      { id: 'h7', invoiceNumber: 'INV-2024-041', vendor: 'SecureNet', amount: 2100, status: 'approved', time: '10:45 AM' },
    ],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="w-4 h-4 text-success" />;
    case 'rejected':
      return <XCircle className="w-4 h-4 text-destructive" />;
    default:
      return <Clock className="w-4 h-4 text-warning" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'approved':
      return <Badge variant="success">Approved</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="warning">Pending</Badge>;
  }
};

export default function History() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">History</h1>
        <p className="text-muted-foreground mt-1">
          View all processed invoices organized by date
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

        {historyItems.map((group, groupIndex) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
            className="relative mb-8"
          >
            {/* Date Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{group.date}</h2>
              <Badge variant="secondary">{group.invoices.length} invoices</Badge>
            </div>

            {/* Invoices */}
            <div className="ml-12 space-y-3">
              {group.invoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                >
                  <Card hover>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                            {getStatusIcon(invoice.status)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{invoice.invoiceNumber}</p>
                            <p className="text-sm text-muted-foreground">{invoice.vendor}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              ${invoice.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">{invoice.time}</p>
                          </div>
                          {getStatusBadge(invoice.status)}
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
