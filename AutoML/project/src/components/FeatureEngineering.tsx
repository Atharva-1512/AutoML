import React, { useState, useEffect } from 'react';
import { Settings, Layers, TrendingUp, MapPin, DollarSign, Clock, Users, Activity } from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  category: string;
  importance: number;
  isNew: boolean;
  description: string;
}

interface FeatureEngineeringProps {
  isActive: boolean;
  totalFeatures: number;
  onFeatureUpdate: (count: number) => void;
}

export const FeatureEngineering: React.FC<FeatureEngineeringProps> = ({ 
  isActive, 
  totalFeatures, 
  onFeatureUpdate 
}) => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 'f1',
      name: 'transaction_velocity_1h',
      category: 'Velocity',
      importance: 0.87,
      isNew: false,
      description: 'Number of transactions in last hour'
    },
    {
      id: 'f2',
      name: 'amount_zscore_merchant',
      category: 'Amount',
      importance: 0.82,
      isNew: false,
      description: 'Z-score of amount for merchant category'
    },
    {
      id: 'f3',
      name: 'location_distance_home',
      category: 'Location',
      importance: 0.74,
      isNew: false,
      description: 'Distance from home location'
    },
    {
      id: 'f4',
      name: 'time_since_last_txn',
      category: 'Temporal',
      importance: 0.71,
      isNew: false,
      description: 'Time since last transaction'
    },
    {
      id: 'f5',
      name: 'merchant_fraud_rate',
      category: 'Merchant',
      importance: 0.69,
      isNew: false,
      description: 'Historical fraud rate for merchant'
    }
  ]);

  const [engineeringActivity, setEngineeringActivity] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        // Simulate dynamic feature creation
        if (Math.random() < 0.08) {
          const newFeatureNames = [
            'spending_pattern_anomaly',
            'cross_merchant_velocity',
            'weekend_behavior_score',
            'international_risk_factor',
            'device_fingerprint_match',
            'payment_method_consistency',
            'seasonal_spending_deviation',
            'peer_group_comparison'
          ];

          const categories = ['Behavioral', 'Velocity', 'Risk', 'Pattern', 'Device'];
          
          const newFeature: Feature = {
            id: `f_${Date.now()}`,
            name: newFeatureNames[Math.floor(Math.random() * newFeatureNames.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            importance: 0.3 + Math.random() * 0.6,
            isNew: true,
            description: 'Dynamically generated feature based on recent patterns'
          };

          setFeatures(prev => {
            const updated = [newFeature, ...prev.slice(0, 7)];
            return updated.map(f => ({ ...f, isNew: f.id === newFeature.id }));
          });

          onFeatureUpdate(totalFeatures + 1);
          setEngineeringActivity(prev => Math.min(100, prev + 10));
        }

        // Update feature importance based on performance
        if (Math.random() < 0.1) {
          setFeatures(prev => prev.map(feature => ({
            ...feature,
            importance: Math.max(0.1, Math.min(1.0, feature.importance + (Math.random() - 0.5) * 0.05))
          })));
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isActive, totalFeatures, onFeatureUpdate]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'velocity': return TrendingUp;
      case 'amount': return DollarSign;
      case 'location': return MapPin;
      case 'temporal': return Clock;
      case 'merchant': return Users;
      case 'behavioral': return Activity;
      default: return Layers;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'velocity': 'from-green-500 to-green-600',
      'amount': 'from-yellow-500 to-yellow-600',
      'location': 'from-blue-500 to-blue-600',
      'temporal': 'from-orange-500 to-orange-600',
      'merchant': 'from-purple-500 to-purple-600',
      'behavioral': 'from-red-500 to-red-600',
      'risk': 'from-pink-500 to-pink-600',
      'pattern': 'from-indigo-500 to-indigo-600',
      'device': 'from-teal-500 to-teal-600'
    };
    return colors[category.toLowerCase() as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Dynamic Feature Engineering</h2>
            <p className="text-sm text-slate-400">Auto-generating risk indicators</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Activity Level</p>
          <p className="text-lg font-bold text-green-400">{engineeringActivity.toFixed(0)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Total Features</span>
            <span className="text-lg font-bold text-blue-400">{totalFeatures}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalFeatures / 200) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Avg Importance</span>
            <span className="text-lg font-bold text-purple-400">
              {(features.reduce((acc, f) => acc + f.importance, 0) / features.length).toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
              style={{ width: `${(features.reduce((acc, f) => acc + f.importance, 0) / features.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {features.map((feature) => {
          const IconComponent = getCategoryIcon(feature.category);
          return (
            <div
              key={feature.id}
              className={`p-3 rounded-lg border transition-all duration-500 ${
                feature.isNew 
                  ? 'border-green-500/50 bg-green-900/20 animate-pulse' 
                  : 'border-white/20 bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-1 bg-gradient-to-r ${getCategoryColor(feature.category)} rounded`}>
                    <IconComponent className="w-3 h-3" />
                  </div>
                  <span className="font-mono text-sm">{feature.name}</span>
                  {feature.isNew && (
                    <span className="px-2 py-1 bg-green-600 text-xs rounded-full">NEW</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">{feature.category}</span>
                  <span className="text-xs font-semibold">
                    {(feature.importance * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300">{feature.description}</p>
              <div className="mt-2 w-full bg-white/10 rounded-full h-1">
                <div 
                  className={`bg-gradient-to-r ${getCategoryColor(feature.category)} h-1 rounded-full transition-all duration-300`}
                  style={{ width: `${feature.importance * 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};