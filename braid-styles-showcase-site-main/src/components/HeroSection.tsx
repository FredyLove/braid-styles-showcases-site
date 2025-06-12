
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">5-Star Rated Braiding Artist</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                Stunning 
                <span className="text-primary"> Braided </span>
                Hairstyles That Tell Your Story
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Transform your look with expertly crafted braids that celebrate your unique style. 
                From protective styles to intricate art pieces, I create beautiful braided hairstyles 
                that enhance your natural beauty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('portfolio')}
                className="text-lg px-8"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="text-lg px-8"
              >
                Book Consultation
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Braid Styles</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="rounded-3xl p-8 h-96 lg:h-[500px] flex items-center justify-center animate-slide-in"
              style={{
                backgroundImage: `linear-gradient(rgba(180, 111, 43, 0.6), rgba(255, 213, 168, 0.6)), url('/images/img13.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '1.5rem',
                filter: 'brightness(0.9)',
              }}
            >
              <div className="text-center space-y-4 text-white">
                <div className="w-32 h-32 bg-white/10 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
                <p className="text-xl font-semibold drop-shadow-md">
                  Your Hair Journey Starts Here
                </p>
                <p className="text-sm text-white/80 drop-shadow-sm">
                  Professional braiding artistry that brings your vision to life
                </p>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
