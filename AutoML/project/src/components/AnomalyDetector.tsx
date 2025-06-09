import React, { useState, useEffect } from 'react';
import { AlertTriangle, Eye, TrendingUp, Brain, Zap } from 'lucide-react';

interface AnomalyPattern {
  id: string;
  type: 'statistical' | 'behavioral' | 'temporal' | 'geographical';
  severity: number;
  description: string;
  confidence: number;
  detectedAt: Date;
}

interface AnomalyDetectorProps {
  isActive: boolean;
  onAnomalyDetected: (anomaly: AnomalyPattern) => void;
}

export const AnomalyDetector: React.FC<AnomalyDetectorProps> = ({ isActive, onAnomalyDetected }) => {
  const [detectedAnomalies, setDetectedAnomalies] = useState<AnomalyPattern[]>([]);
  const [detectionRate, setDetectionRate] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        // Simulate anomaly detection
        if (Math.random() < 0.15) {
          const anomalyTypes = ['statistical', 'behavioral', 'temporal', 'geographical'] as const;
          const descriptions = [
            'Unusual transaction amount pattern detected',
            'Abnormal spending velocity identified',
            'Geographic location anomaly found',
            'Temporal pattern deviation observed',
            'Merchant category risk spike detected'
          ];

          const newAnomaly: AnomalyPattern = {
            id: `ANOM-${Date.now()}`,
            type: anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)],
            severity: Math.random() * 100,
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            confidence: 0.7 + Math.random() * 0.3,
            detectedAt: new Date()
          };

          setDetectedAnomalies(prev => [newAnomaly, ...prev.slice(0, 4)]);
          onAnomalyDetected(newAnomaly);
          setDetectionRate(prev => Math.min(100, prev + Math.random() * 5));
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isActive, onAnomalyDetected]);

  const getSeverityColor = (severity: number) => {
    if (severity > 80) return 'text-red-400 bg-red-900/30 border-red-500/50';
    if (severity > 50) return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
    return 'text-green-400 bg-green-900/30 border-green-500/50';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'statistical': return TrendingUp;
      case 'behavioral': return Brain;
      case 'temporal': return Zap;
      case 'geographical': return Eye;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Anomaly Detection Engine</h2>
            <p className="text-sm text-slate-400">Real-time pattern analysis</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Detection Rate</p>
          <p className="text-lg font-bold text-red-400">{detectionRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="space-y-3">
        {detectedAnomalies.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No anomalies detected</p>
            <p className="text-sm">System monitoring for unusual patterns...</p>
          </div>
        ) : (
          detectedAnomalies.map((anomaly) => {
            const IconComponent = getTypeIcon(anomaly.type);
            return (
              <div
                key={anomaly.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${getSeverityColor(anomaly.severity)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4" />
                    <span className="font-semibold capitalize">{anomaly.type} Anomaly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-white/20 rounded">
                      {(anomaly.confidence * 100).toFixed(0)}% confidence
                    </span>
                    <span className="text-xs">
                      Severity: {anomaly.severity.toFixed(0)}
                    </span>
                  </div>
                </div>
                <p className="text-sm mb-2">{anomaly.description}</p>
                <p className="text-xs text-slate-400">
                  Detected: {anomaly.detectedAt.toLocaleTimeString()}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};