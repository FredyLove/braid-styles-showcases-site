
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Shield, Sparkles } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Protective Braids",
      description: "Keep your hair healthy while looking fabulous with our protective braiding styles.",
      duration: "3-5 hours",
      price: "Starting at $150",
      features: ["Box Braids", "Senegalese Twists", "Goddess Braids", "Cornrows"]
    },
    {
      icon: Sparkles,
      title: "Special Occasion Styles",
      description: "Elegant braided updos and intricate styles for your most important moments.",
      duration: "2-4 hours",
      price: "Starting at $120",
      features: ["Wedding Braids", "Prom Styles", "Crown Braids", "French Braids"]
    },
    {
      icon: Clock,
      title: "Quick Touch-Ups",
      description: "Maintain your braided style with professional touch-ups and edge work.",
      duration: "30-60 minutes",
      price: "Starting at $40",
      features: ["Edge Touch-ups", "Braid Repair", "Style Refresh", "Maintenance"]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            My Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From protective styles to special occasion elegance, I offer a full range of 
            braiding services tailored to your needs and lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-display">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">
                  {service.description}
                </p>
                
                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium text-primary">{service.price}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-foreground">Includes:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={scrollToContact}
                >
                  Book This Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center space-y-6 bg-secondary/20 rounded-3xl p-8">
          <h3 className="text-2xl font-display font-semibold text-foreground">
            Custom Consultation Available
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Not sure which style is right for you? Book a consultation where we'll discuss 
            your hair goals, lifestyle, and find the perfect braided style for you.
          </p>
          <Button size="lg" onClick={scrollToContact}>
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
