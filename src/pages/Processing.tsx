import { motion } from 'framer-motion';
import { Clock, FileText, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useInvoiceStore } from '@/store/invoiceStore';

export default function Processing() {
  const { invoices } = useInvoiceStore();
  const processingInvoices = invoices.filter(inv => inv.status === 'processing');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Processing Queue</h1>
        <p className="text-muted-foreground mt-1">
          {processingInvoices.length} invoices currently being processed
        </p>
      </motion.div>

      {/* Processing List */}
      {processingInvoices.length > 0 ? (
        <div className="space-y-4">
          {processingInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{invoice.fileName}</p>
                        <p className="text-sm text-muted-foreground">
                          Started {new Date(invoice.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="processing">Processing</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Active Processing</h3>
              <p className="text-muted-foreground">
                All invoices have been processed. Upload new invoices to see them here.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
