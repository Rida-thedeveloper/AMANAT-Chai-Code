import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Package, 
  AlertCircle, 
  Sparkles, 
  User, 
  Phone, 
  Compass, 
  HelpCircle,
  Share2,
  Lock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { DonationPurpose, TrackingRecord, CreateDonationInput } from '../types';
import { createDonation, getUserCreatedDonationsList } from '../data/donationStore';
import { useLanguage } from '../context/LanguageContext';

interface DonateAndTrackPageProps {
  onTrackDonation: (trackingId: string) => void;
  onNavigateHome?: () => void;
  initialPurpose?: DonationPurpose;
}

const QUICK_AMOUNTS = [500, 1000, 2500, 5000];

const PURPOSE_OPTIONS: Array<{
  id: DonationPurpose;
  titleKey: string;
  descKey: string;
  defaultTitle: string;
  urduTitle: string;
  icon: string;
  tag: string;
  urduTag: string;
}> = [
  {
    id: 'Ration',
    titleKey: 'purposeRation',
    descKey: 'purposeRationDesc',
    defaultTitle: 'Ration',
    urduTitle: 'راشن',
    icon: '🍚',
    tag: 'Monthly Staples',
    urduTag: 'ماہانہ راشن'
  },
  {
    id: 'Flood Relief',
    titleKey: 'purposeFloodRelief',
    descKey: 'purposeFloodReliefDesc',
    defaultTitle: 'Flood Relief',
    urduTitle: 'سیلاب ریلیف',
    icon: '🌊',
    tag: 'High Priority',
    urduTag: 'ہنگامی ضرورت'
  },
  {
    id: 'Emergency Relief',
    titleKey: 'purposeEmergencyRelief',
    descKey: 'purposeEmergencyReliefDesc',
    defaultTitle: 'Emergency Relief',
    urduTitle: 'ہنگامی ریلیف',
    icon: '🚨',
    tag: 'Disaster Aid',
    urduTag: 'فوری امداد'
  },
  {
    id: 'Ramadan Relief',
    titleKey: 'purposeRamadanRelief',
    descKey: 'purposeRamadanReliefDesc',
    defaultTitle: 'Ramadan Relief',
    urduTitle: 'رمضان ریلیف',
    icon: '🌙',
    tag: 'Sehri & Iftar',
    urduTag: 'سحر و افطار'
  },
  {
    id: 'General Relief',
    titleKey: 'purposeGeneralRelief',
    descKey: 'purposeGeneralReliefDesc',
    defaultTitle: 'General Relief',
    urduTitle: 'عمومی ریلیف',
    icon: '🤝',
    tag: 'Sadaqah & Zakat',
    urduTag: 'صدقہ و زکوٰۃ'
  },
];

export const DonateAndTrackPage: React.FC<DonateAndTrackPageProps> = ({
  onTrackDonation,
  onNavigateHome,
  initialPurpose = 'Ration'
}) => {
  const { isUrdu, t, formatPKR, direction } = useLanguage();

  // Form State
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [customAmountInput, setCustomAmountInput] = useState<string>('5000');
  const [purpose, setPurpose] = useState<DonationPurpose>(initialPurpose);
  const [donorName, setDonorName] = useState<string>('');
  const [contact, setContact] = useState<string>('');

  // UI Flow State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdDonation, setCreatedDonation] = useState<TrackingRecord | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Stored donations list
  const [savedDonations, setSavedDonations] = useState<TrackingRecord[]>([]);

  // Load saved user donations
  const refreshSavedDonations = () => {
    setSavedDonations(getUserCreatedDonationsList());
  };

  useEffect(() => {
    refreshSavedDonations();

    const handleStorageUpdate = () => {
      refreshSavedDonations();
    };

    window.addEventListener('amanat_donations_changed', handleStorageUpdate);
    return () => {
      window.removeEventListener('amanat_donations_changed', handleStorageUpdate);
    };
  }, []);

  const handleAmountOptionClick = (amount: number) => {
    setIsCustomAmount(false);
    setSelectedAmount(amount);
    setCustomAmountInput(amount.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmountInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
    }
  };

  const handleSelectCustomRadio = () => {
    setIsCustomAmount(true);
    const num = parseInt(customAmountInput, 10);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
    }
  };

  const handleCreateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAmount < 100) {
      alert(isUrdu ? 'براہ کرم کم از کم 100 روپے درج کریں۔' : 'Please enter a valid amount of at least Rs. 100.');
      return;
    }

    setIsSubmitting(true);

    // Simulate instant donation processing
    setTimeout(() => {
      const input: CreateDonationInput = {
        amount: selectedAmount,
        purpose: purpose,
        donorName: donorName.trim() || undefined,
        contact: contact.trim() || undefined
      };

      const record = createDonation(input);
      setCreatedDonation(record);
      setIsSubmitting(false);
      refreshSavedDonations();
    }, 600);
  };

  const handleCopyDonationId = (idToCopy?: string) => {
    const id = idToCopy || createdDonation?.trackingId;
    if (id) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const handleResetForm = () => {
    setCreatedDonation(null);
    setDonorName('');
    setContact('');
    setSelectedAmount(5000);
    setIsCustomAmount(false);
    setCustomAmountInput('5000');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onTrackDonation(searchQuery.trim().toUpperCase());
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-[calc(100vh-5rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Breadcrumb / Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              {direction === 'rtl' ? (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <span>ہوم پیج پر واپس جائیں</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </>
              )}
            </button>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isUrdu ? '100% شفاف اور ٹریک ایبل' : '100% Zero Leakage Aid'}</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('pageDonateTrackTitle')}
          </h1>
          {isUrdu ? (
            <p className="mt-2 text-base sm:text-lg text-emerald-800 font-urdu leading-relaxed">
              {t('pageDonateTrackSubtitle')}
            </p>
          ) : (
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              {t('pageDonateTrackSubtitle')}
            </p>
          )}
        </div>

        {/* MAIN INTERACTIVE CARD: Form vs. Success Screen */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden mb-12 transition-all">
          
          {/* STATE A: SUCCESS SCREEN (Once Donation Created) */}
          {createdDonation ? (
            <div className="p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Success Green Banner */}
              <div className="text-center max-w-lg mx-auto">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50 shadow-inner">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold tracking-wide uppercase mb-2">
                  {isUrdu ? 'کامیاب اندراج' : 'Simulation Success'}
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {t('donationSuccessTitle')}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {t('donationSuccessSubtitle')}
                </p>
              </div>

              {/* Exact Requested Success Box */}
              <div className="my-8 max-w-lg mx-auto bg-slate-50 border-2 border-emerald-300/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                
                {/* 1. Amount Row */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs sm:text-sm font-semibold text-slate-500">
                    {t('donationAmountLabel')}
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-slate-900">
                    Rs. {createdDonation.amountPKR.toLocaleString()}
                  </span>
                </div>

                {/* 2. Unique Donation ID */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs sm:text-sm font-semibold text-slate-500">
                    {t('donationIdLabel')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-xl font-extrabold font-mono text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300 preserve-ltr">
                      {createdDonation.trackingId}
                    </span>
                    <button
                      onClick={() => handleCopyDonationId(createdDonation.trackingId)}
                      title={t('btnCopyDonationId')}
                      className="p-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                    >
                      {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 3. Status */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs sm:text-sm font-semibold text-slate-500">
                    {t('donationStatusLabel')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-blue-100 text-blue-900 border border-blue-200">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    <span>{t('donationStatusReceived')}</span>
                  </span>
                </div>

                {/* 4. Purpose & Donor Summary */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{isUrdu ? 'مقصد:' : 'Purpose:'} <strong>{createdDonation.campaignCategory}</strong></span>
                  <span>{isUrdu ? 'عطیہ دہندہ:' : 'Donor:'} <strong>{createdDonation.donorName}</strong></span>
                </div>

                {/* Exact requested Notice */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-emerald-950">
                    "{t('donationSaveIdNotice')}"
                  </p>
                </div>
              </div>

              {/* Exact Requested Action Buttons */}
              <div className="max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-3">
                
                {/* Primary Button 1: "Track My Donation" */}
                <button
                  onClick={() => onTrackDonation(createdDonation.trackingId)}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-200/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('btnTrackMyDonation')}</span>
                </button>

                {/* Primary Button 2: "Copy Donation ID" */}
                <button
                  onClick={() => handleCopyDonationId(createdDonation.trackingId)}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border-2 border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">{t('btnCopied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t('btnCopyDonationId')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Option: Create Another Donation */}
              <div className="text-center mt-6">
                <button
                  onClick={handleResetForm}
                  className="text-xs text-slate-500 hover:text-emerald-700 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  {t('btnCreateAnother')}
                </button>
              </div>

            </div>
          ) : (
            
            /* STATE B: DONATION CREATION FORM */
            <form onSubmit={handleCreateDonation} className="p-6 sm:p-10 space-y-8">
              
              {/* FIELD 1: DONATION AMOUNT */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <label className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold font-mono">1</span>
                    <span>{t('donateFieldAmountTitle')}</span>
                  </label>
                  <span className="text-xs text-slate-500">{t('donateFieldAmountSubtitle')}</span>
                </div>

                {/* Quick Selection Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {QUICK_AMOUNTS.map((amt) => {
                    const isSelected = !isCustomAmount && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountOptionClick(amt)}
                        className={`py-3 px-4 rounded-xl font-mono text-sm sm:text-base font-bold border-2 transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs ring-2 ring-emerald-600/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        Rs. {amt.toLocaleString()}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Option */}
                <div className="pt-1">
                  <div 
                    onClick={handleSelectCustomRadio}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isCustomAmount
                        ? 'bg-emerald-50/50 border-emerald-600 ring-2 ring-emerald-600/20'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="custom-amount-radio"
                        name="amount-type"
                        checked={isCustomAmount}
                        onChange={handleSelectCustomRadio}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="custom-amount-radio" className="text-xs sm:text-sm font-bold text-slate-800 cursor-pointer">
                        {t('customAmountLabel')} (PKR)
                      </label>
                    </div>

                    <div className="relative w-full sm:w-56">
                      <span className={`absolute ${direction === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 font-bold text-xs text-slate-500`}>
                        Rs.
                      </span>
                      <input
                        type="text"
                        value={customAmountInput}
                        onFocus={handleSelectCustomRadio}
                        onChange={handleCustomAmountChange}
                        placeholder="e.g. 15000"
                        className={`w-full ${direction === 'rtl' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 rounded-lg border text-sm font-bold font-mono text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isCustomAmount ? 'border-emerald-500' : 'border-slate-300'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* FIELD 2: DONATION PURPOSE */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <label className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold font-mono">2</span>
                    <span>{t('donateFieldPurposeTitle')}</span>
                  </label>
                  <span className="text-xs text-slate-500">{t('donateFieldPurposeSubtitle')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PURPOSE_OPTIONS.map((opt) => {
                    const isSelected = purpose === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setPurpose(opt.id)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50/70 border-emerald-600 text-slate-900 shadow-sm ring-2 ring-emerald-600/20'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-2xl">{opt.icon}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-emerald-200/80 text-emerald-950' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {isUrdu ? opt.urduTag : opt.tag}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {isUrdu ? opt.urduTitle : opt.defaultTitle}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {t(opt.descKey)}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-emerald-700">
                            {isSelected ? (isUrdu ? '✓ منتخب شدہ' : '✓ Selected') : (isUrdu ? 'منتخب کریں' : 'Select')}
                          </span>
                          <input
                            type="radio"
                            name="donation-purpose"
                            checked={isSelected}
                            onChange={() => setPurpose(opt.id)}
                            className="text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FIELDS 3 & 4: DONOR NAME & CONTACT (OPTIONAL) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Field 3: Donor Name (Optional) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t('donateFieldDonorTitle')}</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {t('donateFieldDonorOptional')}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={t('donateFieldDonorPlaceholder')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Field 4: Contact (Optional) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t('donateFieldContactTitle')}</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {t('donateFieldContactOptional')}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t('donateFieldContactPlaceholder')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>

              </div>

              {/* Hackathon Simulation Note */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 font-semibold">
                    {isUrdu ? 'ہیکاتھون سمولیشن موڈ:' : 'Hackathon MVP Simulation:'}
                  </strong>{' '}
                  <span>
                    {isUrdu 
                      ? 'عطیہ تخلیق کرنے پر ایک منفرد RR-XXXX ٹریکنگ آئی ڈی جاری ہوگی جو فوری طور پر لائیو ٹریکنگ کے لیے دستیاب ہو گی۔'
                      : 'Clicking create will register your donation in browser storage and generate a live RR-XXXX tracking ID.'}
                  </span>
                </div>
              </div>

              {/* PRIMARY ACTION BUTTON: "Create Donation" */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-200/80 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed hover:shadow-emerald-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('donateCreatingBtn')}</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake className="w-5 h-5" />
                      <span>{t('donateCreateBtn')} — Rs. {selectedAmount.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

        {/* SECTION 2: SAVED DONATIONS & TRACKING HISTORY */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-700" />
                <span>{t('recentDonationsTitle')}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('recentDonationsSubtitle')}
              </p>
            </div>

            {/* Quick Track Input */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="e.g. RR-1042"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 text-xs font-mono uppercase bg-slate-50 rounded-lg border border-slate-300 w-32 sm:w-40 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-lg cursor-pointer"
              >
                {isUrdu ? 'تلاش' : 'Search'}
              </button>
            </form>
          </div>

          {savedDonations.length === 0 ? (
            <div className="text-center py-8 px-4 text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs sm:text-sm font-medium text-slate-600">
                {t('recentDonationsEmpty')}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {savedDonations.map((item) => (
                <div 
                  key={item.trackingId}
                  className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/80 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 preserve-ltr">
                        {item.trackingId}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        Rs. {item.amountPKR.toLocaleString()}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.campaignCategory}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-3">
                      <span>{isUrdu ? 'عطیہ دہندہ:' : 'Donor:'} <strong>{item.donorName}</strong></span>
                      {item.createdAt && <span>• {item.createdAt}</span>}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleCopyDonationId(item.trackingId)}
                      title={t('btnCopyDonationId')}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded border border-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onTrackDonation(item.trackingId)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isUrdu ? 'لائیو ٹریک کریں' : 'Track Live'}</span>
                      {direction === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
