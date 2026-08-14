import React, { useState } from 'react';
import { 
  X, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle2, 
  Sparkles,
  QrCode,
  Lock
} from 'lucide-react';
import { RELIEF_CAMPAIGNS } from '../data/mockData';
import { createDonation } from '../data/donationStore';
import { DonationPurpose } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonationComplete: (newTrackingId: string) => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ 
  isOpen, 
  onClose, 
  onDonationComplete 
}) => {
  const { isUrdu, t, formatPKR, direction } = useLanguage();
  const [selectedCampaignId, setSelectedCampaignId] = useState(RELIEF_CAMPAIGNS[0].id);
  const [amount, setAmount] = useState<number>(3500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [phone, setPhone] = useState<string>('0300-1234567');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'raast' | 'jazzcash' | 'easypaisa' | 'card'>('raast');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleQuickAmount = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setAmount(num);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      
      const currentCamp = RELIEF_CAMPAIGNS.find(c => c.id === selectedCampaignId) || RELIEF_CAMPAIGNS[0];
      
      // Determine purpose
      let mappedPurpose: DonationPurpose = 'Ration';
      if (currentCamp.category.toLowerCase().includes('flood')) {
        mappedPurpose = 'Flood Relief';
      } else if (currentCamp.category.toLowerCase().includes('ramadan')) {
        mappedPurpose = 'Ramadan Relief';
      } else if (currentCamp.category.toLowerCase().includes('emergency') || currentCamp.category.toLowerCase().includes('winter')) {
        mappedPurpose = 'Emergency Relief';
      }

      const record = createDonation({
        amount: amount,
        purpose: mappedPurpose,
        donorName: isAnonymous ? undefined : (donorName.trim() || undefined),
        contact: phone.trim() || undefined
      });

      onDonationComplete(record.trackingId);
      onClose();
    }, 800);
  };

  const currentCampaign = RELIEF_CAMPAIGNS.find(c => c.id === selectedCampaignId) || RELIEF_CAMPAIGNS[0];
  const rationBagsCount = Math.max(1, Math.floor(amount / 3500));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute ${isUrdu ? 'left-5' : 'right-5'} top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t('donateModalTitle')}
            </h3>
            <p className="text-xs text-slate-500">
              {t('donateModalSubtitle')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Campaign Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              {t('donateSelectDrive')}
            </label>
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {RELIEF_CAMPAIGNS.map((camp) => (
                <option key={camp.id} value={camp.id}>
                  {isUrdu ? camp.urduTitle : camp.title} ({camp.location})
                </option>
              ))}
            </select>
          </div>

          {/* Amount Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide flex justify-between">
              <span>{t('donateSelectAmount')}</span>
              <span className="text-emerald-700 font-bold">
                ~{rationBagsCount} {isUrdu ? 'راشن بیگ' : `Ration Bag${rationBagsCount > 1 ? 's' : ''}`}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2.5">
              {[3500, 7000, 17500].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => handleQuickAmount(preset)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                    amount === preset && !customAmount
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="font-mono text-sm">{formatPKR(preset)}</p>
                  <p className="text-[10px] opacity-80">
                    {preset === 3500 
                      ? (isUrdu ? '1 بیگ' : '1 Bag') 
                      : preset === 7000 
                        ? (isUrdu ? '2 بیگز' : '2 Bags') 
                        : (isUrdu ? '5 بیگز' : '5 Bags')}
                  </p>
                </button>
              ))}
            </div>

            <div className="relative">
              <span className={`absolute ${isUrdu ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono`}>
                PKR
              </span>
              <input
                type="number"
                placeholder={t('donateCustomPlaceholder')}
                value={customAmount}
                onChange={handleCustomAmountChange}
                className={`w-full ${isUrdu ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600`}
              />
            </div>
          </div>

          {/* Donor Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('donateDonorName')}
              </label>
              <input
                type="text"
                disabled={isAnonymous}
                placeholder={isAnonymous ? (isUrdu ? "گمنام عطیہ دہندہ" : "Anonymous Donor") : (isUrdu ? "مثلاً اسد خان" : "e.g. Asad Khan")}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('donateMobileLabel')}
              </label>
              <input
                type="tel"
                placeholder="0300-1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 preserve-ltr"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous-check"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="anonymous-check" className="text-xs text-slate-600 font-medium cursor-pointer">
              {t('donatePrivacyCheck')}
            </label>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              {t('donatePaymentGateway')}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'raast', label: 'Raast P2P', icon: <QrCode className="w-4 h-4" /> },
                { id: 'jazzcash', label: 'JazzCash', icon: <Smartphone className="w-4 h-4" /> },
                { id: 'easypaisa', label: 'EasyPaisa', icon: <Smartphone className="w-4 h-4" /> },
                { id: 'card', label: isUrdu ? 'بینک کارڈ' : 'Debit Card', icon: <CreditCard className="w-4 h-4" /> },
              ].map((pm) => (
                <button
                  type="button"
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === pm.id
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {pm.icon}
                  <span className="text-[11px] font-medium">{pm.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('donateGenerating')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>{t('donateConfirmBtn')} ({formatPKR(amount)})</span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 shrink-0" />
                )}
              </span>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400">
            {t('donateEncryptionNotice')}
          </p>

        </form>
      </div>
    </div>
  );
};
