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
import { DonateAndTrackPage } from './components/DonateAndTrackPage';
import { TrackDonationPage } from './components/TrackDonationPage';
import { DeliveryDashboardPage } from './components/DeliveryDashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'donate-track' | 'track' | 'delivery-dashboard'>('home');
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  const handleOpenTracker = (sampleId?: string) => {
    const id = sampleId || 'RR-1042';
    setActiveTrackingId(id);
    setCurrentPage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrackPage = (sampleId?: string) => {
    setActiveTrackingId(sampleId || 'RR-1042');
    setCurrentPage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDeliveryDashboard = () => {
    setCurrentPage('delivery-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseTracker = () => {
    setActiveTrackingId(null);
  };

  const handleOpenDonatePage = () => {
    setCurrentPage('donate-track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDonateModal = () => {
    setIsDonateModalOpen(true);
  };

  const handleCloseDonateModal = () => {
    setIsDonateModalOpen(false);
  };

  const handleDonationComplete = (newTrackingId: string) => {
    setActiveTrackingId(newTrackingId);
    setCurrentPage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (sectionId === 'donate-track') {
      setCurrentPage('donate-track');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'track') {
      setCurrentPage('track');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'delivery-dashboard') {
      setCurrentPage('delivery-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onOpenTracker={handleOpenTracker}
        onNavigateToSection={handleNavigateToSection}
        onOpenDonateAndTrack={handleOpenDonatePage}
        onOpenTrackPage={handleOpenTrackPage}
        onOpenDeliveryDashboard={handleOpenDeliveryDashboard}
        onDonateClick={handleOpenDonatePage}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {currentPage === 'delivery-dashboard' ? (
          /* Dedicated "Delivery Dashboard" (Volunteer Portal) */
          <DeliveryDashboardPage
            onNavigateHome={() => handleNavigateToSection('home')}
            onNavigateTrack={(id) => {
              setActiveTrackingId(id);
              setCurrentPage('track');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : currentPage === 'donate-track' ? (
          /* Dedicated "Donate & Track" Page */
          <DonateAndTrackPage
            onTrackDonation={(id) => {
              setActiveTrackingId(id);
              setCurrentPage('track');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateHome={() => handleNavigateToSection('home')}
          />
        ) : currentPage === 'track' ? (
          /* Dedicated "Track a Donation" Page */
          <TrackDonationPage
            initialTrackingId={activeTrackingId || 'RR-1042'}
            onNavigateHome={() => handleNavigateToSection('home')}
            onNavigateDonate={handleOpenDonatePage}
            onSelectTrackingId={(id) => setActiveTrackingId(id)}
          />
        ) : (
          /* Homepage Sections */
          <>
            {/* Hero Section */}
            <HeroSection
              onSearchTrackId={(id) => handleOpenTrackPage(id)}
              onDonateClick={handleOpenDonatePage}
              onOpenDemo={(id) => handleOpenTrackPage(id)}
              onOpenTrackPage={(id) => handleOpenTrackPage(id)}
            />

            {/* Problem vs. Amanat Solution (After you donate, what happens?) */}
            <ProblemSolutionSection 
              onOpenDemo={() => handleOpenTrackPage('RR-1042')}
            />

            {/* How Amanat Works (4 Simple Steps) */}
            <HowAmanatWorksSection
              onOpenSampleTracker={(sampleId) => handleOpenTrackPage(sampleId)}
            />

            {/* Visual Courier Tracking Simulation ("Like courier tracking — but for your donation.") */}
            <CourierVisualSection
              onOpenFullDetail={(id) => handleOpenTrackPage(id)}
              onDonateClick={handleOpenDonatePage}
            />

            {/* Active Relief Campaigns in Pakistan */}
            <ActiveCampaignsSection
              onSelectCampaignForTracking={(sampleId) => handleOpenTrackPage(sampleId)}
            />

            {/* Zero-Leakage Verification & Trust Pillars */}
            <TransparencyAuditSection />

            {/* Vetted Ground Partners */}
            <PartnersSection />
          </>
        )}
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Interactive Donation Modal */}
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={handleCloseDonateModal}
        onDonationComplete={handleDonationComplete}
      />

    </div>
  );
}
