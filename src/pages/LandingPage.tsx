import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserProfile } from '@/components/UserProfile';
import { 
  Palette, 
  Cloud, 
  Code, 
  ArrowRight,
  Play,
  UserPlus,
  Sparkles,
  Brain,
  GitBranch,
  Download
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleTryIt = () => {
    navigate('/builder');
  };

  const handleJoinUs = () => {
    navigate('/auth');
  };

  const features = [
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "Drag & Drop Interface",
      description: "Build ML pipelines visually with our intuitive drag-and-drop interface"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Code Generation",
      description: "Automatically generate Python code from your visual pipelines"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Storage",
      description: "Save and access your models from anywhere with cloud synchronization"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Smart Validation",
      description: "Get real-time feedback and suggestions to optimize your models"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Pre-built Templates",
      description: "Start quickly with proven ML pipeline templates"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Import/Export",
      description: "Share your models with team members and collaborate easily"
    }
  ];

  const stats = [
    { number: "50+", label: "ML Components" },
    { number: "10+", label: "Ready Templates" },
    { number: "100%", label: "Visual Interface" },
    { number: "∞", label: "Possibilities" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-white/20 dark:border-gray-800/30 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  DominoML
                </h1>
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                  Beta
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {currentUser && <UserProfile />}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-full border border-white/20 dark:border-slate-700/50">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  No-Code ML Platform
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight">
                  Build ML Models
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                    Visually
                  </span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                  Create powerful machine learning pipelines with our intuitive drag-and-drop interface. 
                  No coding required.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleTryIt}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all border-0"
              >
                <Play className="mr-2 h-5 w-5" />
                Try It First
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleJoinUs}
                className="px-8 py-4 text-lg font-medium bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-600/50 hover:bg-white/80 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Join Us
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                
                {/* Hero Image */}
                <div className="relative p-2">
                  <img 
                    src="/hero.jpg" 
                    alt="DominoML Visual ML Pipeline Builder Interface"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-16 max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
              Everything you need to build
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                ML models
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              From data preprocessing to model deployment, our platform provides all the tools 
              you need for your machine learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
            <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-left">
              <div className="max-w-3xl">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Ready to start building?
                </h2>
                <p className="text-xl text-white/90 mb-10 leading-relaxed">
                  Join thousands of developers and data scientists who are already building 
                  amazing ML models with our platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={handleTryIt}
                    className="bg-white text-blue-600 hover:bg-white/90 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start Building Now
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleJoinUs}
                    className="border-white/30 text-slate-900 dark:text-white hover:bg-white/10 dark:hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-medium"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 dark:border-slate-800/30 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                DominoML
              </span>
            </div>
            
            <div className="text-sm text-slate-600 dark:text-slate-400">
              © 2025 DominoML. Built with ❤️ for the ML community.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
