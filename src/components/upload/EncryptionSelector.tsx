import React from 'react';
import { Shield, Lock, Server, Database, Cpu } from 'lucide-react';
import { encryptionTierDetails } from '../../utils/encryption';
import type { EncryptionTier } from '../../types/file';

const encryptionIcons = {
  none: Shield,
  basic: Lock,
  advanced: Server,
  enterprise: Database,
  quantum: Cpu,
};

interface EncryptionSelectorProps {
  selected: EncryptionTier;
  onChange: (tier: EncryptionTier) => void;
}

export function EncryptionSelector({ selected, onChange }: EncryptionSelectorProps) {
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Select Encryption Level:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(encryptionTierDetails) as EncryptionTier[]).map((tier) => {
          const details = encryptionTierDetails[tier];
          const Icon = encryptionIcons[tier];
          
          return (
            <div
              key={tier}
              onClick={() => onChange(tier)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selected === tier
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Icon className={`h-5 w-5 ${
                  selected === tier ? 'text-indigo-600' : 'text-gray-500'
                }`} />
                <h4 className="ml-2 font-medium">{details.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{details.description}</p>
              <ul className="text-xs text-gray-500">
                {details.features.map((feature, index) => (
                  <li key={index} className="mb-1">• {feature}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}