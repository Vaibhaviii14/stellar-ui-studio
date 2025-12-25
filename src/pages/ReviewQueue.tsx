import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, ConfidenceBadge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useInvoiceStore } from '@/store/invoiceStore';
import { toast } from 'sonner';

const mockReviewItems = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    vendor: 'TechFlow Inc',
    amount: 8750.50,
    date: '2024-01-15',
    confidence: 72,
    status: 'pending_review',
    fields: [
      { name: 'Invoice Number', value: 'INV-2024-001', confidence: 98, original: 'INV-2024-001' },
      { name: 'Vendor Name', value: 'TechFlow Inc', confidence: 95, original: 'TechFlow Inc.' },
      { name: 'Total Amount', value: '$8,750.50', confidence: 68, original: '$8750.5' },
      { name: 'Due Date', value: '2024-02-15', confidence: 45, original: '15/02/24' },
    ],
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    vendor: 'CloudSoft Solutions',
    amount: 3200.00,
    date: '2024-01-14',
    confidence: 58,
    status: 'pending_review',
    fields: [
      { name: 'Invoice Number', value: 'INV-2024-002', confidence: 92, original: 'INV-2024-002' },
      { name: 'Vendor Name', value: 'CloudSoft Solutions', confidence: 88, original: 'CloudSoft' },
      { name: 'Total Amount', value: '$3,200.00', confidence: 42, original: '3200' },
      { name: 'Tax Amount', value: '$288.00', confidence: 35, original: 'N/A' },
    ],
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    vendor: 'Global Supplies Ltd',
    amount: 1250.75,
    date: '2024-01-13',
    confidence: 85,
    status: 'pending_review',
    fields: [
      { name: 'Invoice Number', value: 'INV-2024-003', confidence: 99, original: 'INV-2024-003' },
      { name: 'Vendor Name', value: 'Global Supplies Ltd', confidence: 97, original: 'Global Supplies Ltd' },
      { name: 'Total Amount', value: '$1,250.75', confidence: 94, original: '$1,250.75' },
      { name: 'Due Date', value: '2024-02-13', confidence: 62, original: '13-Feb-2024' },
    ],
  },
];

export default function ReviewQueue() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reviewPanel, setReviewPanel] = useState<typeof mockReviewItems[0] | null>(null);
  const [confidenceRange, setConfidenceRange] = useState([0, 100]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleApprove = (id: string) => {
    toast.success('Invoice approved successfully!');
    setReviewPanel(null);
  };

  const handleReject = (id: string) => {
    toast.error('Invoice rejected');
    setReviewPanel(null);
  };

  const handleBulkApprove = () => {
    toast.success(`${selectedItems.length} invoices approved!`);
    setSelectedItems([]);
  };

  const filteredItems = mockReviewItems.filter(item =>
    item.confidence >= confidenceRange[0] &&
    item.confidence <= confidenceRange[1] &&
    (searchQuery === '' ||
      item.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Review Queue</h1>
          <p className="text-muted-foreground mt-1">
            {filteredItems.length} invoices pending review
          </p>
        </div>
        {selectedItems.length > 0 && (
          <div className="flex gap-2">
            <Button variant="success" onClick={handleBulkApprove}>
              <CheckCircle className="w-4 h-4" />
              Approve Selected ({selectedItems.length})
            </Button>
            <Button variant="destructive">
              <XCircle className="w-4 h-4" />
              Reject Selected
            </Button>
          </div>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by vendor or invoice number..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 min-w-64">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Confidence:</span>
                <Slider
                  value={confidenceRange}
                  onValueChange={setConfidenceRange}
                  min={0}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-foreground w-20">
                  {confidenceRange[0]}-{confidenceRange[1]}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-input"
                        checked={selectedItems.length === filteredItems.length}
                        onChange={() =>
                          setSelectedItems(
                            selectedItems.length === filteredItems.length
                              ? []
                              : filteredItems.map(i => i.id)
                          )
                        }
                      />
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Invoice #</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Vendor</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Confidence</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <>
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border hover:bg-secondary/50 cursor-pointer"
                        onClick={() => toggleRow(item.id)}
                      >
                        <td className="p-4" onClick={e => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            className="rounded border-input"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleSelection(item.id)}
                          />
                        </td>
                        <td className="p-4 font-medium text-foreground">{item.invoiceNumber}</td>
                        <td className="p-4 text-foreground">{item.vendor}</td>
                        <td className="p-4 text-foreground">${item.amount.toLocaleString()}</td>
                        <td className="p-4 text-muted-foreground">{item.date}</td>
                        <td className="p-4">
                          <ConfidenceBadge confidence={item.confidence} />
                        </td>
                        <td className="p-4" onClick={e => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => setReviewPanel(item)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-success" onClick={() => handleApprove(item.id)}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleReject(item.id)}>
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                      <AnimatePresence>
                        {expandedRow === item.id && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <td colSpan={7} className="bg-secondary/30 p-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {item.fields.map(field => (
                                  <div key={field.name} className="p-3 bg-card rounded-lg">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs text-muted-foreground">{field.name}</span>
                                      <span className={`text-xs font-medium ${getConfidenceColor(field.confidence)}`}>
                                        {field.confidence}%
                                      </span>
                                    </div>
                                    <p className="font-medium text-foreground">{field.value}</p>
                                    {field.confidence < 70 && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Original: {field.original}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Review Panel */}
      <AnimatePresence>
        {reviewPanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              onClick={() => setReviewPanel(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Review Invoice</h2>
                  <Button variant="ghost" size="icon" onClick={() => setReviewPanel(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {reviewPanel.fields.map(field => (
                    <div key={field.name} className="p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{field.name}</span>
                        <div className="flex items-center gap-2">
                          {field.confidence < 70 && (
                            <AlertTriangle className="w-4 h-4 text-warning" />
                          )}
                          <Badge variant={field.confidence >= 85 ? 'success' : field.confidence >= 60 ? 'warning' : 'destructive'}>
                            {field.confidence}%
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground">AI Extracted</span>
                          <p className="font-medium text-foreground">{field.value}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Original Text</span>
                          <p className="text-muted-foreground">{field.original}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="hero" className="flex-1" onClick={() => handleApprove(reviewPanel.id)}>
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button variant="destructive" className="flex-1" onClick={() => handleReject(reviewPanel.id)}>
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
