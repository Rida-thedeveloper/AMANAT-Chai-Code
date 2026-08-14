import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Package,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  User,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  Check,
  Building,
  Info
} from 'lucide-react';
import { TrackingRecord } from '../types';
import { advanceDemoStage, resetDemoDonation, getDonationById } from '../data/donationStore';
import { useLanguage } from '../context/LanguageContext';

interface VolunteerDeliveryFlowProps {
  currentRecord: TrackingRecord;
  onStatusUpdated: (updatedRecord: TrackingRecord) => void;
  onClose?: () => void;
}

export const VolunteerDeliveryFlow: React.FC<VolunteerDeliveryFlowProps> = ({
  currentRecord,
  onStatusUpdated,
  onClose
}) => {
  const { isUrdu, formatPKR, direction } = useLanguage();

  // State
  const [otpInput, setOtpInput] = useState<string>('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);

  const demoExpectedOtp = currentRecord.demoOtp || '8492';
  const currentIdx = currentRecord.currentStepIndex ?? 4;
  const isDelivered = currentIdx >= 5;
  const isFullyVerified = currentIdx >= 6;

  // Step 1: Volunteer clicks "Confirm Delivery Handover"
  const handleConfirmDelivery = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const updated = advanceDemoStage('delivered');
      onStatusUpdated(updated);
      setIsVerifying(false);
    }, 400);
  };

  // Step 2: Recipient enters demo OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    const clean = otpInput.trim();
    if (clean !== demoExpectedOtp) {
      setOtpError(
        isUrdu 
          ? `غلط او ٹی پی کوڈ! ڈیمو کے لیے کوڈ ${demoExpectedOtp} درج کریں۔`
          : `Invalid OTP code. Please enter the demo OTP: ${demoExpectedOtp}`
      );
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const updated = advanceDemoStage('verified');
      onStatusUpdated(updated);
      setIsVerifying(false);
      setSuccessAnimation(true);
    }, 600);
  };

  const handleFillDemoOtp = () => {
    setOtpInput(demoExpectedOtp);
    setOtpError(null);
  };

  const handleResetDemo = () => {
    const freshDemo = resetDemoDonation();
    onStatusUpdated(freshDemo);
    setOtpInput('');
    setOtpError(null);
    setSuccessAnimation(false);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-300 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
      
      {/* Demo Mode Badge Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-200">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider uppercase bg-amber-100 text-amber-900 border border-amber-300">
                {isUrdu ? 'رضاکار ڈیش بورڈ (ڈیمو موڈ)' : 'Volunteer Dashboard (Demo Mode)'}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Demo Data
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {isUrdu ? 'فیلڈ ترسیل و تصدیقی عمل' : 'Delivery & Recipient OTP Verification'}
            </h3>
          </div>
        </div>

        <button
          onClick={handleResetDemo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200 self-start sm:self-auto"
          title="Reset Demo to Volunteer Assigned state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'ڈیمو ری سیٹ کریں' : 'Reset Demo'}</span>
        </button>
      </div>

      {/* Demo Instructions Notice for Judges */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            {isUrdu ? 'ججز کے لیے انٹرایکٹو ہدایات:' : 'Interactive Guide for Judges & Evaluators:'}
          </p>
          <p className="text-amber-800 leading-relaxed">
            {isUrdu
              ? 'یہ ڈیمو بغیر کسی بیرونی سروس یا حقیقی SMS کے مکمل طور پر کام کرتا ہے۔ نیچے دیئے گئے بٹن پر کلک کر کے ترسیل کی تصدیق کریں اور ڈیمو او ٹی پی درج کر کے زیرو لیکیج آڈٹ کا مشاہدہ کریں۔'
              : 'This interactive simulation demonstrates the real-time courier hand-off and recipient OTP authentication without requiring SMS or payment gateways.'}
          </p>
        </div>
      </div>

      {/* Field Volunteer Manifest Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-0.5">
          <span className="text-slate-500 font-semibold block">{isUrdu ? 'فیلڈ رضاکار:' : 'Field Volunteer:'}</span>
          <span className="font-bold text-slate-900 text-sm block">Muhammad Salman</span>
          <span className="text-[11px] text-slate-500">Amanat Relief Unit #04</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-0.5">
          <span className="text-slate-500 font-semibold block">{isUrdu ? 'راشن پیکجز:' : 'Relief Cargo:'}</span>
          <span className="font-bold text-emerald-800 text-sm block">3 Family Ration Packages</span>
          <span className="text-[11px] text-slate-500">Flour (60kg), Oil (18L), Rice (15kg)</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-0.5">
          <span className="text-slate-500 font-semibold block">{isUrdu ? 'ہدف مستحق:' : 'Target Recipient:'}</span>
          <span className="font-mono font-bold text-slate-900 text-sm block">FAM-DEMO-UC12-1042</span>
          <span className="text-[11px] text-slate-500">UC-12, Sukkur, Sindh</span>
        </div>
      </div>

      {/* Interactive State Flow */}
      {!isDelivered && (
        /* STAGE 1: IN TRANSIT -> CONFIRM DELIVERY */
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto ring-4 ring-blue-50">
            <Truck className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
              {isUrdu ? 'راشن راستے میں ہے (In Transit)' : 'Ration is In Transit to Doorstep'}
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
              {isUrdu
                ? 'رضاکار محمد سلمان راشن لے کر یونین کونسل 12 کے مستحق خاندان کے گھر پہنچ چکا ہے۔ ترسیل کی تصدیق کے لیے بٹن دبائیں۔'
                : 'The field volunteer has reached the recipient household in UC-12. Click below to simulate delivery handover.'}
            </p>
          </div>

          <button
            onClick={handleConfirmDelivery}
            disabled={isVerifying}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto text-sm disabled:opacity-50"
          >
            {isVerifying ? (
              <span>{isUrdu ? 'تصدیق ہو رہی ہے...' : 'Updating Status...'}</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{isUrdu ? 'ترسیل کی تصدیق کریں (Confirm Delivery Handover)' : 'Confirm Delivery Handover'}</span>
              </>
            )}
          </button>
        </div>
      )}

      {isDelivered && !isFullyVerified && (
        /* STAGE 2: DELIVERED -> ENTER DEMO OTP */
        <div className="bg-amber-50/60 p-6 rounded-2xl border-2 border-amber-300 text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto ring-4 ring-amber-50">
            <KeyRound className="w-6 h-6" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-wider border border-amber-200">
              {isUrdu ? 'مرحلہ 2: مستحق او ٹی پی تصدیق' : 'Step 2: Recipient OTP Verification'}
            </span>
            <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
              {isUrdu ? 'مستحق کا 4 ہندسوں والا او ٹی پی کوڈ درج کریں' : 'Enter 4-Digit Recipient OTP'}
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
              {isUrdu
                ? 'راشن مستحق کو دیا جا چکا ہے۔ اب مستحق کو موصول ہونے والا ڈیمو کوڈ درج کر کے ٹریکنگ مکمل کریں۔'
                : 'Ration bags have been handed over. Enter the demo recipient OTP code below to finalize the audit seal.'}
            </p>
          </div>

          {/* Quick Demo OTP Hint Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-xs text-amber-950 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isUrdu ? 'ڈیمو او ٹی پی کوڈ:' : 'Demo OTP Code:'} <strong className="font-mono text-sm tracking-widest text-emerald-800">{demoExpectedOtp}</strong></span>
            <button
              type="button"
              onClick={handleFillDemoOtp}
              className="ml-2 px-2 py-0.5 rounded bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold text-[11px] cursor-pointer"
            >
              {isUrdu ? 'خودکار درج کریں' : 'Auto-fill'}
            </button>
          </div>

          {/* OTP Input Form */}
          <form onSubmit={handleVerifyOtp} className="max-w-xs mx-auto space-y-3">
            <div>
              <input
                type="text"
                maxLength={6}
                value={otpInput}
                onChange={(e) => {
                  setOtpInput(e.target.value);
                  setOtpError(null);
                }}
                placeholder="8492"
                className="w-full text-center py-3 px-4 font-mono font-black text-2xl tracking-[0.4em] rounded-xl border-2 border-amber-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 bg-white text-slate-900 outline-none"
              />
            </div>

            {otpError && (
              <p className="text-xs font-bold text-red-600 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{otpError}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={isVerifying || otpInput.trim().length === 0}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
            >
              {isVerifying ? (
                <span>{isUrdu ? 'تصدیق جاری ہے...' : 'Verifying OTP...'}</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isUrdu ? 'او ٹی پی تصدیق مکمل کریں' : 'Verify Recipient & Complete'}</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {isFullyVerified && (
        /* STAGE 3: FULLY VERIFIED SUCCESS STATE */
        <div className="bg-emerald-50 p-6 sm:p-8 rounded-2xl border-2 border-emerald-400 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-200 ring-8 ring-emerald-100">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 font-extrabold text-xs uppercase tracking-wider">
              {isUrdu ? '100% تصدیق مکمل' : 'Audit Seal: 100% Verified'}
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-emerald-950 mt-2">
              {isUrdu ? 'مستحق کی ترسیل کامیابی سے تصدیق ہو گئی!' : 'Recipient Verified & Chain of Custody Closed!'}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto mt-1 leading-relaxed">
              {isUrdu
                ? 'او ٹی پی کوڈ #8492 کی تصدیق ہو چکی ہے۔ ٹائم لائن میں تمام 6 مراحل مکمل ہو چکے ہیں اور ڈیجیٹل آڈٹ محفوظ کر دیا گیا ہے۔'
                : 'Demo OTP #8492 successfully validated. All 6 stages on the timeline are now 100% complete with full audit seal.'}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('tracking-timeline-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>{isUrdu ? 'اپ ڈیٹ شدہ ٹائم لائن دیکھیں' : 'View Updated Timeline'}</span>
            </button>

            <button
              onClick={handleResetDemo}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isUrdu ? 'ڈیمو دوبارہ چلائیں' : 'Replay Demo'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
