import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { HowAmanatWorksSection } from './components/HowAmanatWorksSection';
import { CourierVisualSection } from './components/CourierVisualSection';
import { ActiveCampaignsSection } from './components/ActiveCampaignsSection';
import { TransparencyAuditSection } from './components/TransparencyAuditSection';
import { PartnersSection } from './components/PartnersSection';
import { Footer } from './components/Footer';
import { TrackingDetailView } from './components/TrackingDetailView';
import { DonateModal } from './components/DonateModal';

export default function App() {
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  const handleOpenTracker = (sampleId?: string) => {
    setActiveTrackingId(sampleId || 'AMT-2026-FLOOD-8821');
  };

  const handleCloseTracker = () => {
    setActiveTrackingId(null);
  };

  const handleOpenDonateModal = () => {
    setIsDonateModalOpen(true);
  };

  const handleCloseDonateModal = () => {
    setIsDonateModalOpen(false);
  };

  const handleDonationComplete = (newTrackingId: string) => {
    setActiveTrackingId(newTrackingId);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenTracker={handleOpenTracker}
        onNavigateToSection={handleNavigateToSection}
        onDonateClick={handleOpenDonateModal}
      />

      {/* 2. Main Page Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          onSearchTrackId={(id) => setActiveTrackingId(id)}
          onDonateClick={handleOpenDonateModal}
          onOpenDemo={(id) => setActiveTrackingId(id)}
        />

        {/* Problem vs. Amanat Solution (After you donate, what happens?) */}
        <ProblemSolutionSection 
          onOpenDemo={() => setActiveTrackingId('AMT-2026-FLOOD-8821')}
        />

        {/* How Amanat Works (4 Simple Steps) */}
        <HowAmanatWorksSection
          onOpenSampleTracker={(sampleId) => setActiveTrackingId(sampleId)}
        />

        {/* Visual Courier Tracking Simulation ("Like courier tracking — but for your donation.") */}
        <CourierVisualSection
          onOpenFullDetail={(id) => setActiveTrackingId(id)}
          onDonateClick={handleOpenDonateModal}
        />

        {/* Active Relief Campaigns in Pakistan */}
        <ActiveCampaignsSection
          onSelectCampaignForTracking={(sampleId) => setActiveTrackingId(sampleId)}
        />

        {/* Zero-Leakage Verification & Trust Pillars */}
        <TransparencyAuditSection />

        {/* Vetted Ground Partners */}
        <PartnersSection />

      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Interactive Donation Modal */}
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={handleCloseDonateModal}
        onDonationComplete={handleDonationComplete}
      />

      {/* 5. Live Tracking Detail Modal / Audit View */}
      {activeTrackingId && (
        <TrackingDetailView
          trackingId={activeTrackingId}
          onClose={handleCloseTracker}
          onSelectAnotherSample={(id) => setActiveTrackingId(id)}
        />
      )}

    </div>
  );
}
