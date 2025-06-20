import { useEffect, useState } from "react";
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
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  sub: string;
  exp: number;
  name?: string;
};

const Index = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    // Check authentication status
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
        }
      } catch {
        setIsLoggedIn(false);
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
        <Navigation isLoggedIn={isLoggedIn} />
        <HeroSection />
        <StatsSection />
        <PortfolioSection />
        {isLoggedIn && <LoyaltyProgram />}
        <ServicesSection />
        <BookingSystem />
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