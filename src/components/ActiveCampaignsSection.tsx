import React from 'react';
import { 
  HeartHandshake, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  Search, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { RELIEF_CAMPAIGNS } from '../data/mockData';

interface ActiveCampaignsSectionProps {
  onSelectCampaignForTracking: (sampleTrackingId: string) => void;
}

export const ActiveCampaignsSection: React.FC<ActiveCampaignsSectionProps> = ({ onSelectCampaignForTracking }) => {
  return (
    <section id="active-drives" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Verified Relief Campaigns
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Urgent Relief Campaigns in Pakistan
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-urdu">
              ہر مہم میں شامل عطیات کی لمحہ بہ لمحہ رپورٹنگ اور ٹریکنگ
            </p>
          </div>
          <div className="text-xs text-slate-500 max-w-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800">100% Direct Impact Policy:</span>{' '}
            Every rupee is earmarked for tangible ration bags with zero administrative cuts.
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RELIEF_CAMPAIGNS.map((campaign) => {
            const percentFunded = Math.round((campaign.fundedBags / campaign.targetBags) * 100);
            return (
              <div
                key={campaign.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Emergency Level */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                      {campaign.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      campaign.emergencyLevel === 'Urgent'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {campaign.emergencyLevel === 'Urgent' ? '🔴 High Emergency' : 'Active Drive'}
                    </span>
                  </div>

                  {/* Campaign Title & Urdu Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                    {campaign.title}
                  </h3>
                  <p className="font-urdu text-sm font-bold text-emerald-800 mb-3">
                    {campaign.urduTitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                    {campaign.description}
                  </p>

                  {/* Location & Partner */}
                  <div className="space-y-2 text-xs text-slate-600 mb-5 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Locations: <strong>{campaign.location} ({campaign.province})</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Verified Field Partner: <strong>{campaign.partnerNgo}</strong></span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">
                        {campaign.fundedBags.toLocaleString()} / {campaign.targetBags.toLocaleString()} Ration Bags Funded
                      </span>
                      <span className="text-emerald-700 font-mono">{percentFunded}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentFunded}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Standard Ration Pack</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">
                      PKR {campaign.costPerBagPKR.toLocaleString()} / Family Bag
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCampaignForTracking(campaign.sampleTrackingId)}
                      className="px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 border border-emerald-200 transition-colors cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      Track Sample
                    </button>
                    <button
                      onClick={() => onSelectCampaignForTracking(campaign.sampleTrackingId)}
                      className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-200 transition-all cursor-pointer"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" />
                      Donate
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
