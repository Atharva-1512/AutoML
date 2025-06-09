import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CreditCard, 
  TrendingUp, 
  Brain, 
  Zap, 
  RefreshCw, 
  Settings, 
  Activity,
  Eye,
  BarChart3,
  LineChart,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  DollarSign,
  Clock,
  MapPin,
  Users,
  Database,
  Target,
  Layers,
  GitBranch
} from 'lucide-react';
import { AnomalyDetector } from './components/AnomalyDetector';
import { FeatureEngineering } from './components/FeatureEngineering';
import { FeedbackLoop } from './components/FeedbackLoop';

interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  location: string;
  time: string;
  riskScore: number;
  isFraud: boolean;
  anomalyFlags: string[];
  features: {
    amount_normalized: number;
    time_since_last: number;
    merchant_risk: number;
    location_anomaly: number;
    velocity_score: number;
    behavioral_score: number;
  };
}

interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  falsePositiveRate: number;
}

function App() {
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [currentPipelineStep, setCurrentPipelineStep] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(847563);
  const [fraudDetected, setFraudDetected] = useState(1247);
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics>({
    accuracy: 99.84,
    precision: 91.2,
    recall: 87.4,
    f1Score: 89.3,
    auc: 93.1,
    falsePositiveRate: 0.16
  });
  const [dynamicFeatures, setDynamicFeatures] = useState(127);
  const [modelVersion, setModelVersion] = useState("2.1.3");
  const [anomalyCount, setAnomalyCount] = useState(0);
  const [systemLearning, setSystemLearning] = useState(false);

  // Simulate real-time transactions with anomaly awareness
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSystemActive) {
      interval = setInterval(() => {
        const merchants = ['Amazon', 'Walmart', 'Shell', 'McDonald\'s', 'Target', 'Starbucks', 'ATM Withdrawal', 'Gas Station'];
        const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Dallas', 'Boston', 'Denver'];
        
        // Generate transaction with enhanced anomaly detection
        const amount = Math.random() * 5000 + 10;
        const merchant = merchants[Math.floor(Math.random() * merchants.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        
        // Calculate risk factors
        const amountAnomaly = amount > 2000 ? 0.3 : 0;
        const timeAnomaly = new Date().getHours() < 6 || new Date().getHours() > 23 ? 0.2 : 0;
        const locationAnomaly = Math.random() * 0.4;
        const velocityAnomaly = Math.random() * 0.3;
        const behavioralAnomaly = Math.random() * 0.5;
        
        const baseRisk = (amountAnomaly + timeAnomaly + locationAnomaly + velocityAnomaly + behavioralAnomaly) * 100;
        const riskScore = Math.min(100, baseRisk + Math.random() * 20);
        
        const anomalyFlags = [];
        if (amountAnomaly > 0.2) anomalyFlags.push('High Amount');
        if (timeAnomaly > 0.1) anomalyFlags.push('Unusual Time');
        if (locationAnomaly > 0.3) anomalyFlags.push('Location Risk');
        if (velocityAnomaly > 0.2) anomalyFlags.push('High Velocity');
        if (behavioralAnomaly > 0.4) anomalyFlags.push('Behavioral Anomaly');

        const newTransaction: Transaction = {
          id: `TXN${Date.now()}`,
          amount,
          merchant,
          location,
          time: new Date().toLocaleTimeString(),
          riskScore,
          isFraud: riskScore > 75 || Math.random() < 0.003,
          anomalyFlags,
          features: {
            amount_normalized: amount / 5000,
            time_since_last: Math.random() * 3000,
            merchant_risk: Math.random(),
            location_anomaly: locationAnomaly,
            velocity_score: velocityAnomaly,
            behavioral_score: behavioralAnomaly
          }
        };

        setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
        setTotalTransactions(prev => prev + 1);
        if (newTransaction.isFraud) {
          setFraudDetected(prev => prev + 1);
        }

        // Update pipeline step
        setCurrentPipelineStep(prev => (prev + 1) % 7);
        
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isSystemActive]);

  const handleAnomalyDetected = (anomaly: any) => {
    setAnomalyCount(prev => prev + 1);
    // Trigger system learning when anomalies are detected
    if (Math.random() < 0.3) {
      setSystemLearning(true);
      setTimeout(() => setSystemLearning(false), 3000);
    }
  };

  const handleModelUpdate = (updates: Partial<ModelMetrics>) => {
    setModelMetrics(prev => ({ ...prev, ...updates }));
    // Update model version when significant improvements occur
    if (updates.accuracy && updates.accuracy > modelMetrics.accuracy + 0.01) {
      const versionParts = modelVersion.split('.');
      const newPatch = parseInt(versionParts[2]) + 1;
      setModelVersion(`${versionParts[0]}.${versionParts[1]}.${newPatch}`);
    }
  };

  const pipelineSteps = [
    { 
      id: 0, 
      title: 'Data Ingestion', 
      icon: CreditCard, 
      description: 'Real-time transaction streaming with preprocessing',
      color: 'from-blue-500 to-blue-600',
      status: 'Processing 2,547 TPS'
    },
    { 
      id: 1, 
      title: 'Anomaly Detection', 
      icon: Eye, 
      description: 'Multi-layer anomaly pattern recognition',
      color: 'from-red-500 to-red-600',
      status: `${anomalyCount} detected`
    },
    { 
      id: 2, 
      title: 'Feature Engineering', 
      icon: Settings, 
      description: 'Dynamic feature generation and selection',
      color: 'from-green-500 to-green-600',
      status: `${dynamicFeatures} features`
    },
    { 
      id: 3, 
      title: 'AutoML Pipeline', 
      icon: Brain, 
      description: 'Ensemble model with adaptive learning',
      color: 'from-purple-500 to-purple-600',
      status: `v${modelVersion}`
    },
    { 
      id: 4, 
      title: 'Risk Scoring', 
      icon: Target, 
      description: 'Real-time fraud probability calculation',
      color: 'from-orange-500 to-orange-600',
      status: 'Sub-50ms latency'
    },
    { 
      id: 5, 
      title: 'Feedback Loop', 
      icon: RefreshCw, 
      description: 'Continuous model improvement and adaptation',
      color: 'from-teal-500 to-teal-600',
      status: systemLearning ? 'Learning...' : 'Monitoring'
    },
    { 
      id: 6, 
      title: 'Decision Engine', 
      icon: Zap, 
      description: 'Automated fraud prevention actions',
      color: 'from-yellow-500 to-yellow-600',
      status: 'Real-time blocking'
    }
  ];

  const getRiskColor = (score: number) => {
    if (score > 80) return 'text-red-400 bg-red-900/30';
    if (score > 50) return 'text-yellow-400 bg-yellow-900/30';
    return 'text-green-400 bg-green-900/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FraudGuard AI</h1>
                <p className="text-sm text-slate-400">Anomaly-Aware AutoML System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">System Status</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isSystemActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                  <p className={`text-sm font-semibold ${isSystemActive ? 'text-green-400' : 'text-red-400'}`}>
                    {isSystemActive ? 'ACTIVE' : 'STANDBY'}
                  </p>
                  {systemLearning && (
                    <div className="flex items-center space-x-1">
                      <Brain className="w-3 h-3 text-blue-400 animate-pulse" />
                      <span className="text-xs text-blue-400">Learning</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsSystemActive(!isSystemActive)}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  isSystemActive 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSystemActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold">{totalTransactions.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Fraud Detected</p>
                <p className="text-2xl font-bold text-red-400">{fraudDetected.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Model AUC Score</p>
                <p className="text-2xl font-bold text-green-400">{modelMetrics.auc.toFixed(2)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Anomalies Found</p>
                <p className="text-2xl font-bold text-purple-400">{anomalyCount}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Pipeline Visualization */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Anomaly-Aware AutoML Pipeline</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-400">Real-time Processing</span>
              </div>
              {systemLearning && (
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-sm text-blue-400">Adaptive Learning Active</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {pipelineSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative p-4 rounded-lg border transition-all duration-500 ${
                  currentPipelineStep === step.id && isSystemActive
                    ? 'border-white/40 bg-white/20 scale-105 shadow-lg'
                    : 'border-white/20 bg-white/5'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className={`p-2 bg-gradient-to-r ${step.color} rounded-lg mr-3`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    <p className="text-xs text-slate-400">{step.status}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300">{step.description}</p>
                {currentPipelineStep === step.id && isSystemActive && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {/* Anomaly Detection Component */}
          <AnomalyDetector 
            isActive={isSystemActive} 
            onAnomalyDetected={handleAnomalyDetected}
          />

          {/* Feature Engineering Component */}
          <FeatureEngineering 
            isActive={isSystemActive}
            totalFeatures={dynamicFeatures}
            onFeatureUpdate={setDynamicFeatures}
          />

          {/* Feedback Loop Component */}
          <FeedbackLoop 
            isActive={isSystemActive}
            onModelUpdate={handleModelUpdate}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Real-time Transactions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold mb-6">Live Transaction Monitor</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    transaction.isFraud
                      ? 'border-red-500/50 bg-red-900/20'
                      : transaction.riskScore > 50
                      ? 'border-yellow-500/50 bg-yellow-900/20'
                      : 'border-white/20 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.isFraud ? 'bg-red-400' : 
                        transaction.riskScore > 50 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}></div>
                      <span className="font-mono text-sm">{transaction.id}</span>
                      {transaction.isFraud && (
                        <span className="px-2 py-1 bg-red-600 text-xs rounded-full">FRAUD</span>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      getRiskColor(transaction.riskScore)
                    }`}>
                      Risk: {transaction.riskScore.toFixed(1)}%
                    </span>
                  </div>
                  
                  {transaction.anomalyFlags.length > 0 && (
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {transaction.anomalyFlags.map((flag, index) => (
                          <span key={index} className="px-2 py-1 bg-orange-600/30 text-orange-300 text-xs rounded">
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Amount</p>
                      <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Merchant</p>
                      <p className="font-semibold">{transaction.merchant}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Location</p>
                      <p className="font-semibold">{transaction.location}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Time</p>
                      <p className="font-semibold">{transaction.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Model Performance */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold mb-6">Model Performance Metrics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-slate-400">Accuracy</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-green-400">{modelMetrics.accuracy.toFixed(2)}%</span>
                  <div className="w-16 bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      style={{ width: `${modelMetrics.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-slate-400">Precision</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-blue-400">{modelMetrics.precision.toFixed(1)}%</span>
                  <div className="w-16 bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${modelMetrics.precision}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-slate-400">Recall</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-purple-400">{modelMetrics.recall.toFixed(1)}%</span>
                  <div className="w-16 bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${modelMetrics.recall}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-slate-400">F1 Score</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-orange-400">{modelMetrics.f1Score.toFixed(1)}%</span>
                  <div className="w-16 bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                      style={{ width: `${modelMetrics.f1Score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-slate-400">AUC-ROC</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-yellow-400">{modelMetrics.auc.toFixed(1)}%</span>
                  <div className="w-16 bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full"
                      style={{ width: `${modelMetrics.auc}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-slate-400">False Positive Rate</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-red-400">{modelMetrics.falsePositiveRate.toFixed(2)}%</span>
                  <div className="w-16 bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                      style={{ width: `${modelMetrics.falsePositiveRate * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-500/30">
              <div className="flex items-center mb-2">
                <Brain className="w-5 h-5 mr-2 text-blue-400" />
                <span className="font-semibold">AutoML Insights</span>
              </div>
              <p className="text-sm text-slate-300">
                Anomaly-aware ensemble model with {dynamicFeatures} engineered features achieving 
                industry-leading {modelMetrics.auc.toFixed(1)}% AUC. System continuously adapts to emerging fraud patterns 
                through feedback-driven learning and dynamic feature engineering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;