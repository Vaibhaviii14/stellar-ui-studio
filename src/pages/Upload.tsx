import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload as UploadIcon,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Image,
  File
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, ConfidenceBadge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useInvoiceStore } from '@/store/invoiceStore';
import { toast } from 'sonner';

interface UploadedFile {
  file: File;
  id: string;
  status: 'uploading' | 'extracting' | 'scoring' | 'ready' | 'error';
  progress: number;
  extractedData?: {
    invoiceNumber: string;
    vendor: string;
    amount: number;
    date: string;
    confidence: number;
  };
}

const statusSteps = [
  { key: 'uploading', label: 'Uploading', icon: UploadIcon },
  { key: 'extracting', label: 'Extracting', icon: FileText },
  { key: 'scoring', label: 'Scoring', icon: AlertCircle },
  { key: 'ready', label: 'Ready', icon: CheckCircle },
];

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { uploadInvoice, isLoading } = useInvoiceStore();

  const simulateProcessing = async (file: File, id: string) => {
    // Uploading
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'uploading', progress: 0 } : f));
    await new Promise(r => setTimeout(r, 800));
    setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: 30 } : f));

    // Extracting
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'extracting', progress: 50 } : f));
    await new Promise(r => setTimeout(r, 1200));

    // Scoring
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'scoring', progress: 80 } : f));
    await new Promise(r => setTimeout(r, 600));

    // Ready
    const mockData = {
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
      vendor: ['Acme Corp', 'TechFlow Inc', 'CloudSoft Solutions', 'Global Supplies'][Math.floor(Math.random() * 4)],
      amount: Math.floor(Math.random() * 10000) + 500,
      date: new Date().toISOString().split('T')[0],
      confidence: Math.floor(Math.random() * 30) + 70,
    };

    setFiles(prev => prev.map(f => f.id === id ? { 
      ...f, 
      status: 'ready', 
      progress: 100,
      extractedData: mockData
    } : f));

    toast.success(`${file.name} processed successfully!`);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const id = Date.now().toString() + Math.random().toString(36);
      const newFile: UploadedFile = {
        file,
        id,
        status: 'uploading',
        progress: 0,
      };
      setFiles(prev => [...prev, newFile]);
      simulateProcessing(file, id);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/tiff': ['.tiff', '.tif'],
    },
    maxSize: 25 * 1024 * 1024, // 25MB
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    return File;
  };

  const getCurrentStep = (status: UploadedFile['status']) => {
    return statusSteps.findIndex(s => s.key === status);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Upload Invoices</h1>
        <p className="text-muted-foreground mt-1">
          Upload PDF, JPG, PNG, or TIFF files up to 25MB each
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="single">Single Upload</TabsTrigger>
            <TabsTrigger value="batch">Batch Upload</TabsTrigger>
            <TabsTrigger value="email" disabled>
              Email Inbox
              <Badge variant="secondary" className="ml-2 text-xs">Soon</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="mt-6">
            {/* Dropzone */}
            <Card
              {...getRootProps()}
              className={`cursor-pointer transition-all duration-300 border-2 border-dashed ${
                isDragActive 
                  ? 'border-primary bg-primary/5 shadow-glow' 
                  : 'border-border hover:border-primary/50 hover:bg-secondary/50'
              }`}
            >
              <CardContent className="p-12">
                <input {...getInputProps()} />
                <div className="text-center">
                  <motion.div
                    animate={{ y: isDragActive ? -10 : 0 }}
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <UploadIcon className={`w-8 h-8 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    or click to browse from your computer
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['PDF', 'JPG', 'PNG', 'TIFF'].map(format => (
                      <Badge key={format} variant="secondary">{format}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batch" className="mt-6">
            <Card {...getRootProps()} className="cursor-pointer border-2 border-dashed border-border hover:border-primary/50">
              <CardContent className="p-12">
                <input {...getInputProps()} />
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <UploadIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Upload Multiple Files
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Select multiple files at once for batch processing
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Uploaded Files */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">Processing Queue</h2>
            {files.map((uploadedFile, index) => {
              const FileIcon = getFileIcon(uploadedFile.file);
              const currentStep = getCurrentStep(uploadedFile.status);

              return (
                <motion.div
                  key={uploadedFile.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* File Icon */}
                        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                          <FileIcon className="w-6 h-6 text-muted-foreground" />
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-foreground truncate">
                                {uploadedFile.file.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {(uploadedFile.file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(uploadedFile.id)}
                              className="flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Progress Steps */}
                          <div className="flex items-center gap-2 mb-3">
                            {statusSteps.map((step, stepIndex) => {
                              const isActive = stepIndex === currentStep;
                              const isCompleted = stepIndex < currentStep;
                              const StepIcon = step.icon;

                              return (
                                <div key={step.key} className="flex items-center gap-2">
                                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                    isCompleted ? 'bg-success/10 text-success' :
                                    isActive ? 'bg-primary/10 text-primary' :
                                    'bg-secondary text-muted-foreground'
                                  }`}>
                                    {isActive && uploadedFile.status !== 'ready' ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      <StepIcon className="w-3 h-3" />
                                    )}
                                    {step.label}
                                  </div>
                                  {stepIndex < statusSteps.length - 1 && (
                                    <div className={`w-4 h-0.5 ${
                                      isCompleted ? 'bg-success' : 'bg-border'
                                    }`} />
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Progress Bar */}
                          <Progress value={uploadedFile.progress} className="h-1.5" />

                          {/* Extracted Data */}
                          {uploadedFile.extractedData && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 p-3 bg-secondary/50 rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-foreground">Extracted Data</span>
                                <ConfidenceBadge confidence={uploadedFile.extractedData.confidence} />
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Invoice #</span>
                                  <p className="font-medium text-foreground">{uploadedFile.extractedData.invoiceNumber}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Vendor</span>
                                  <p className="font-medium text-foreground">{uploadedFile.extractedData.vendor}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Amount</span>
                                  <p className="font-medium text-foreground">${uploadedFile.extractedData.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Date</span>
                                  <p className="font-medium text-foreground">{uploadedFile.extractedData.date}</p>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" variant="hero">
                                  <CheckCircle className="w-4 h-4" />
                                  Approve & Save
                                </Button>
                                <Button size="sm" variant="outline">
                                  Review in Detail
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
