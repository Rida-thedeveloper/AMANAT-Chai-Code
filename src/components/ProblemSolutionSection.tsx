import React from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  ArrowDown, 
  ArrowRight, 
  ShieldCheck, 
  FileQuestion, 
  Eye, 
  Sparkles,
  Smartphone,
  Truck,
  HeartHandshake
} from 'lucide-react';

interface ProblemSolutionSectionProps {
  onOpenDemo?: () => void;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({ onOpenDemo }) => {
  return (
    <section id="problem-solution" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            The Trust Gap in Aid
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            After you donate, what happens?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Traditional donations disappear into a black box. Amanat replaces uncertainty with end-to-end chain of custody.
          </p>
        </div>

        {/* Side-by-Side Comparison Flow Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column: The Problem (Traditional Donation) */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-200 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    Traditional Charity
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">The Black Box</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-lg">
                  ✕
                </div>
              </div>

              {/* Problem Vertical Flow */}
              <div className="space-y-4">
                
                {/* 1. Donate */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Donate</p>
                      <p className="text-xs text-slate-500">You transfer funds or hand over cash.</p>
                    </div>
                  </div>
                </div>

                {/* Arrow Down with Question */}
                <div className="flex flex-col items-center justify-center py-1 text-rose-500">
                  <ArrowDown className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1.5 shadow-2xs">
                    <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                    Where did my money go?
                  </span>
                </div>

                {/* 2. Unseen Intermediate */}
                <div className="p-4 rounded-2xl bg-white/60 border border-dashed border-slate-300 text-slate-400">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-400">
                      ?
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Zero Updates / General Fund</p>
                      <p className="text-xs text-slate-400">No receipt ID, no ration allotment tracking.</p>
                    </div>
                  </div>
                </div>

                {/* Arrow Down with Second Question */}
                <div className="flex flex-col items-center justify-center py-1 text-rose-500">
                  <ArrowDown className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1.5 shadow-2xs">
                    <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                    Did the ration actually reach someone?
                  </span>
                </div>

                {/* 3. Unknown Outcome */}
                <div className="p-4 rounded-2xl bg-white/60 border border-dashed border-slate-300 text-slate-400">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-400">
                      ?
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Unverifiable Distribution</p>
                      <p className="text-xs text-slate-400">Relying on vague annual reports.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Result: High donor hesitation and trust fatigue.</span>
            </div>
          </div>

          {/* Right Column: The Solution (Amanat) */}
          <div className="rounded-3xl bg-emerald-950 text-white p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden border border-emerald-800">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-emerald-900 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-700">
                    Amanat Standard
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">100% Trackable Journey</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-500/20">
                  ✓
                </div>
              </div>

              {/* Solution Flow */}
              <div className="space-y-3">
                
                {/* 1. Donate */}
                <div className="p-3.5 rounded-2xl bg-emerald-900/70 border border-emerald-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Donate</p>
                      <p className="text-[11px] text-emerald-200">Unique tracking ID generated immediately.</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-800 px-2 py-0.5 rounded text-emerald-200">
                    ID ISSUED
                  </span>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-emerald-500" />
                </div>

                {/* 2. Track */}
                <div className="p-3.5 rounded-2xl bg-emerald-900/70 border border-emerald-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Track</p>
                      <p className="text-[11px] text-emerald-200">Live warehouse allotment, packaging & transit GPS.</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-800 px-2 py-0.5 rounded text-emerald-200">
                    LIVE STATUS
                  </span>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-emerald-500" />
                </div>

                {/* 3. Deliver */}
                <div className="p-3.5 rounded-2xl bg-emerald-900/70 border border-emerald-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Deliver</p>
                      <p className="text-[11px] text-emerald-200">Verified ground volunteer brings ration to doorstep.</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-800 px-2 py-0.5 rounded text-emerald-200">
                    VOLUNTEER
                  </span>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-emerald-500" />
                </div>

                {/* 4. Verify */}
                <div className="p-3.5 rounded-2xl bg-emerald-800 border-2 border-emerald-400 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-emerald-900 flex items-center justify-center font-extrabold text-xs">
                      4
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-1.5">
                        Verify <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      </p>
                      <p className="text-[11px] text-emerald-100">Recipient confirms handover using SMS OTP.</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white text-emerald-900 px-2 py-0.5 rounded">
                    OTP CONFIRMED
                  </span>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-900 text-xs text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Zero leakage • Cryptographic transparency
              </span>
              {onOpenDemo && (
                <button 
                  onClick={onOpenDemo}
                  className="font-bold text-emerald-200 hover:text-white underline cursor-pointer text-xs"
                >
                  View Sample Track
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
