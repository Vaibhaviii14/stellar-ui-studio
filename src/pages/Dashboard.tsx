import { motion } from 'framer-motion';
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  Upload,
  CheckSquare,
  BarChart3,
  Download,
  Zap,
  Trophy,
  Flame,
  Server,
  Cpu,
  Database,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInvoiceStore } from '@/store/invoiceStore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

const volumeData = [
  { name: 'Mon', invoices: 145 },
  { name: 'Tue', invoices: 232 },
  { name: 'Wed', invoices: 189 },
  { name: 'Thu', invoices: 278 },
  { name: 'Fri', invoices: 256 },
  { name: 'Sat', invoices: 87 },
  { name: 'Sun', invoices: 60 },
];

const funnelData = [
  { name: 'Uploaded', value: 1247, fill: 'hsl(var(--info))' },
  { name: 'Extracted', value: 1198, fill: 'hsl(var(--primary))' },
  { name: 'Approved', value: 1156, fill: 'hsl(var(--success))' },
];

const vendorData = [
  { name: 'Acme Corp', invoices: 234 },
  { name: 'TechFlow', invoices: 189 },
  { name: 'CloudSoft', invoices: 156 },
  { name: 'Global Ltd', invoices: 142 },
  { name: 'InnoLabs', invoices: 98 },
];

const confidenceData = [
  { name: '90-100%', value: 68, fill: 'hsl(var(--success))' },
  { name: '70-89%', value: 22, fill: 'hsl(var(--warning))' },
  { name: '<70%', value: 10, fill: 'hsl(var(--destructive))' },
];

export default function Dashboard() {
  const { analytics, invoices, queue } = useInvoiceStore();

  const kpiCards = [
    {
      title: 'Total Processed',
      value: analytics.totalProcessed.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'primary',
    },
    {
      title: 'Accuracy Rate',
      value: `${analytics.accuracyRate}%`,
      change: '+2.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'success',
    },
    {
      title: 'Avg Processing Time',
      value: `${analytics.avgProcessingTime}s`,
      change: '-0.5s',
      trend: 'up',
      icon: Clock,
      color: 'info',
    },
    {
      title: 'Pending Review',
      value: analytics.pendingReview.toString(),
      change: '5 urgent',
      trend: 'down',
      icon: AlertCircle,
      color: 'warning',
    },
  ];

  const systemStatus = [
    { name: 'API', status: 'online' },
    { name: 'OCR', status: 'online' },
    { name: 'GPU', status: 'online' },
    { name: 'DB', status: 'online' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Vaibhavi! 👋</h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="success" className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              6 day streak — keep going!
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {systemStatus.map((sys) => (
                <span key={sys.name} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  {sys.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {kpi.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-warning" />
                      )}
                      <span className={`text-sm ${kpi.trend === 'up' ? 'text-success' : 'text-warning'}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-${kpi.color}/10 flex items-center justify-center`}>
                    <kpi.icon className={`w-6 h-6 text-${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <Link to="/upload">
                <Button variant="hero">
                  <Upload className="w-4 h-4" />
                  Upload Invoice
                </Button>
              </Link>
              <Link to="/review-queue">
                <Button variant="outline">
                  <CheckSquare className="w-4 h-4" />
                  Review Queue
                  <Badge variant="warning" className="ml-2">{analytics.pendingReview}</Badge>
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Button>
              </Link>
              <Button variant="outline">
                <Download className="w-4 h-4" />
                Export All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Volume Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Volume Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeData}>
                    <defs>
                      <linearGradient id="colorInvoices" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="invoices"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorInvoices)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Processing Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-warning" />
                Processing Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Vendor Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Top Vendors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vendorData.map((vendor, index) => (
                  <div key={vendor.name} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{vendor.name}</span>
                        <span className="text-sm text-muted-foreground">{vendor.invoices}</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(vendor.invoices / vendorData[0].invoices) * 100}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Confidence Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Cpu className="w-5 h-5 text-info" />
                AI Confidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={confidenceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {confidenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {confidenceData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cost Savings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5" />
                <span className="font-medium">Cost Savings</span>
              </div>
              <div className="text-4xl font-bold mb-2">
                ${analytics.costSaved.toLocaleString()}
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Estimated savings from automated processing vs manual entry
              </p>
              <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-foreground/80">Per invoice:</span>
                  <span className="font-medium">~$36.30</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
