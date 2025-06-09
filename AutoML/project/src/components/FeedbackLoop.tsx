import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, CheckCircle, XCircle, Brain, Zap } from 'lucide-react';

interface FeedbackData {
  id: string;
  type: 'model_update' | 'feature_adjustment' | 'threshold_tuning' | 'pattern_learning';
  description: string;
  impact: number;
  timestamp: Date;
  status: 'processing' | 'completed' | 'failed';
}

interface ModelAdaptation {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  learningRate: number;
  adaptationCount: number;
}

interface FeedbackLoopProps {
  isActive: boolean;
  onModelUpdate: (metrics: Partial<ModelAdaptation>) => void;
}

export const FeedbackLoop: React.FC<FeedbackLoopProps> = ({ isActive, onModelUpdate }) => {
  const [feedbackQueue, setFeedbackQueue] = useState<FeedbackData[]>([]);
  const [adaptationMetrics, setAdaptationMetrics] = useState<ModelAdaptation>({
    accuracy: 99.84,
    precision: 91.2,
    recall: 87.4,
    f1Score: 89.3,
    learningRate: 0.001,
    adaptationCount: 0
  });
  const [isLearning, setIsLearning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        // Simulate feedback-driven adaptations
        if (Math.random() < 0.12) {
          const feedbackTypes = [
            'model_update',
            'feature_adjustment', 
            'threshold_tuning',
            'pattern_learning'
          ] as const;

          const descriptions = {
            model_update: 'Updating model weights based on recent fraud patterns',
            feature_adjustment: 'Adjusting feature importance based on performance',
            threshold_tuning: 'Optimizing decision thresholds for better precision',
            pattern_learning: 'Learning new fraud patterns from recent data'
          };

          const type = feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)];
          
          const newFeedback: FeedbackData = {
            id: `FB-${Date.now()}`,
            type,
            description: descriptions[type],
            impact: Math.random() * 10 + 1,
            timestamp: new Date(),
            status: 'processing'
          };

          setFeedbackQueue(prev => [newFeedback, ...prev.slice(0, 4)]);
          setIsLearning(true);

          // Simulate processing and model updates
          setTimeout(() => {
            setFeedbackQueue(prev => 
              prev.map(fb => 
                fb.id === newFeedback.id 
                  ? { ...fb, status: Math.random() > 0.1 ? 'completed' : 'failed' }
                  : fb
              )
            );

            if (Math.random() > 0.1) {
              // Successful adaptation - update metrics
              const improvements = {
                accuracy: adaptationMetrics.accuracy + (Math.random() - 0.5) * 0.02,
                precision: adaptationMetrics.precision + (Math.random() - 0.5) * 0.5,
                recall: adaptationMetrics.recall + (Math.random() - 0.5) * 0.5,
                f1Score: adaptationMetrics.f1Score + (Math.random() - 0.5) * 0.3,
                adaptationCount: adaptationMetrics.adaptationCount + 1
              };

              setAdaptationMetrics(prev => ({
                ...prev,
                ...improvements,
                accuracy: Math.min(99.99, Math.max(99.0, improvements.accuracy)),
                precision: Math.min(99.0, Math.max(85.0, improvements.precision)),
                recall: Math.min(95.0, Math.max(80.0, improvements.recall)),
                f1Score: Math.min(95.0, Math.max(85.0, improvements.f1Score))
              }));

              onModelUpdate(improvements);
            }

            setIsLearning(false);
          }, 2000 + Math.random() * 3000);
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isActive, adaptationMetrics, onModelUpdate]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return RefreshCw;
      case 'completed': return CheckCircle;
      case 'failed': return XCircle;
      default: return RefreshCw;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-yellow-400 bg-yellow-900/30';
      case 'completed': return 'text-green-400 bg-green-900/30';
      case 'failed': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'model_update': return Brain;
      case 'feature_adjustment': return TrendingUp;
      case 'threshold_tuning': return Zap;
      case 'pattern_learning': return RefreshCw;
      default: return RefreshCw;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg ${isLearning ? 'animate-pulse' : ''}`}>
            <RefreshCw className={`w-5 h-5 ${isLearning ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Adaptive Feedback Loop</h2>
            <p className="text-sm text-slate-400">Self-improving ML system</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Adaptations</p>
          <p className="text-lg font-bold text-teal-400">{adaptationMetrics.adaptationCount}</p>
        </div>
      </div>

      {/* Adaptation Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-slate-400 mb-1">Accuracy</p>
          <p className="text-lg font-bold text-green-400">{adaptationMetrics.accuracy.toFixed(2)}%</p>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-1 rounded-full"
              style={{ width: `${adaptationMetrics.accuracy}%` }}
            ></div>
          </div>
        </div>

        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-slate-400 mb-1">Precision</p>
          <p className="text-lg font-bold text-blue-400">{adaptationMetrics.precision.toFixed(1)}%</p>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full"
              style={{ width: `${adaptationMetrics.precision}%` }}
            ></div>
          </div>
        </div>

        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-slate-400 mb-1">Recall</p>
          <p className="text-lg font-bold text-purple-400">{adaptationMetrics.recall.toFixed(1)}%</p>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-1 rounded-full"
              style={{ width: `${adaptationMetrics.recall}%` }}
            ></div>
          </div>
        </div>

        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-slate-400 mb-1">F1 Score</p>
          <p className="text-lg font-bold text-orange-400">{adaptationMetrics.f1Score.toFixed(1)}%</p>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-1 rounded-full"
              style={{ width: `${adaptationMetrics.f1Score}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Feedback Queue */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Recent Adaptations</h3>
        {feedbackQueue.length === 0 ? (
          <div className="text-center py-6 text-slate-400">
            <RefreshCw className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent adaptations</p>
          </div>
        ) : (
          feedbackQueue.map((feedback) => {
            const StatusIcon = getStatusIcon(feedback.status);
            const TypeIcon = getTypeIcon(feedback.type);
            return (
              <div
                key={feedback.id}
                className="p-4 rounded-lg border border-white/20 bg-white/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <TypeIcon className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-sm capitalize">
                      {feedback.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(feedback.status)}`}>
                      <StatusIcon className={`w-3 h-3 inline mr-1 ${feedback.status === 'processing' ? 'animate-spin' : ''}`} />
                      {feedback.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      Impact: +{feedback.impact.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-2">{feedback.description}</p>
                <p className="text-xs text-slate-400">
                  {feedback.timestamp.toLocaleTimeString()}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};