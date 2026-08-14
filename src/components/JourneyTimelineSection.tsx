import React, { useState } from 'react';
import { 
  CreditCard, 
  Layers, 
  Package, 
  Truck, 
  Home, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';
import { JOURNEY_STAGES } from '../data/mockData';

interface JourneyTimelineSectionProps {
  onOpenSampleTracker: (sampleId: string) => void;
}

export const JourneyTimelineSection: React.FC<JourneyTimelineSectionProps> = ({ onOpenSampleTracker }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard': return <CreditCard className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Package': return <Package className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
      default: return <ShieldCheck className="w-5 h-5" />;
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            The Amanat 6-Stage Chain of Custody
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How donation tracking works in real-time
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            From the moment your Rupees leave your bank account to the final verified doorstep handover in a remote Pakistani village.
          </p>
        </div>

        {/* 6 Step Interactive Horizontal / Grid Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOURNEY_STAGES.map((stage, idx) => {
            const isSelected = activeStageIndex === idx;
            return (
              <div
                key={stage.key}
                onClick={() => setActiveStageIndex(idx)}
                className={`relative p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-xl shadow-emerald-950/20 -translate-y-1'
                    : 'bg-white hover:border-emerald-300 border-slate-200 text-slate-800 shadow-xs'
                }`}
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                      isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-100 text-emerald-800 border border-slate-200'
                    }`}>
                      Stage {stage.stepNumber}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {getIcon(stage.icon)}
                    </div>
                  </div>

                  <div className="mb-2">
                    <h3 className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {stage.title}
                    </h3>
                    <p className={`font-urdu text-sm font-bold ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      {stage.urdu}
                    </p>
                  </div>

                  <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                    isSelected ? 'text-emerald-100' : 'text-slate-600'
                  }`}>
                    {stage.description}
                  </p>
                </div>

                {/* Proof Tag at bottom */}
                <div className={`mt-6 pt-4 border-t text-xs flex items-center justify-between ${
                  isSelected ? 'border-emerald-800/80 text-emerald-200' : 'border-slate-100 text-slate-500'
                }`}>
                  <span className="font-semibold flex items-center gap-1.5">
                    <ShieldCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`} />
                    Audit Proof:
                  </span>
                  <span className={`font-medium ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                    {stage.proof}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Call to action bar for testing tracking */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-emerald-900 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-emerald-100 flex items-center justify-center shrink-0 shadow-md">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Experience a complete live donation journey right now</h4>
              <p className="text-xs sm:text-sm text-emerald-200">See real photo logs, volunteer dispatches, and recipient tokens in action.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenSampleTracker('AMT-2026-FLOOD-8821')}
            className="px-6 py-3 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <span>View Demo Flood Relief Journey</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </button>
        </div>

      </div>
    </section>
  );
};
