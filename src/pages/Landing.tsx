import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Brain, 
  Shield, 
  Clock, 
  BarChart3, 
  Users,
  ArrowRight,
  CheckCircle,
  FileText,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useThemeStore } from '@/store/themeStore';

const features = [
  { icon: Brain, title: 'AI-Powered Extraction', description: 'GPT-4 + OCR extracts data from any invoice format with 98.7% accuracy' },
  { icon: Zap, title: 'Lightning Fast', description: 'Process thousands of invoices in seconds, not hours' },
  { icon: Shield, title: 'Confidence Scoring', description: 'Every field gets a confidence score for human validation' },
  { icon: Clock, title: 'Real-time Processing', description: 'Watch as AI extracts and validates data in real-time' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Track accuracy, processing times, and cost savings' },
  { icon: Users, title: 'Human-in-the-loop', description: 'Review and correct AI suggestions for perfect results' },
];

const stats = [
  { value: '1,247+', label: 'Invoices Processed' },
  { value: '98.7%', label: 'Accuracy Rate' },
  { value: '<3s', label: 'Avg Processing Time' },
  { value: '$45K+', label: 'Cost Savings' },
];

const steps = [
  { step: '01', title: 'Upload', description: 'Drag & drop PDF, JPG, PNG, or TIFF files' },
  { step: '02', title: 'Extract', description: 'AI analyzes and extracts all invoice data' },
  { step: '03', title: 'Validate', description: 'Review confidence scores and correct if needed' },
  { step: '04', title: 'Export', description: 'Download as JSON, CSV, or sync to your ERP' },
];

const techStack = ['React', 'Python/Flask', 'GPT-4', 'Tesseract OCR', 'AWS'];

export default function Landing() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-glow">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">InvoiceAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              HackXios 2K25 Project
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              AI-Powered
              <br />
              <span className="gradient-text">Invoice Automation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Process thousands of invoices in seconds — powered by Generative AI + OCR.
              Extract, validate, and export with unprecedented accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="hero" size="xl">
                  Start Processing
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/upload">
                <Button variant="outline" size="xl">
                  Live Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to automate your invoice processing workflow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four simple steps to transform your invoice processing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 px-4 border-y border-border bg-secondary/20">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="text-sm text-muted-foreground">Powered by:</span>
            {techStack.map((tech) => (
              <span key={tech} className="text-sm font-medium text-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Automate?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Start processing invoices in seconds. No login required for demo.
            </p>
            <Link to="/dashboard">
              <Button variant="secondary" size="xl">
                Get Started — It's Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">InvoiceAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for HackXios 2K25 with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
