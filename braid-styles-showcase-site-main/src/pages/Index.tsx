import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSystem from "@/components/BookingSystem";
import VideoTutorials from "@/components/VideoTutorials";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AftercareSection from "@/components/AftercareSection";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import UserBookings from "@/components/UserBookings";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        // Delay to ensure section is rendered
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // Slight delay for reliable scroll
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>BraidArt</title>
        <link rel="icon" href="/images/logo.ico" type="image/x-icon" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <StatsSection />
        <PortfolioSection />
        <LoyaltyProgram />
        <ServicesSection />
        <BookingSystem />
        {localStorage.getItem("access_token") && <UserBookings/> }
        <VideoTutorials />
        <AftercareSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
