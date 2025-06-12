import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Maya Johnson",
      service: "Box Braids",
      rating: 5,
      text: "Sarah's work is absolutely incredible! My box braids lasted for months and looked stunning the entire time. Her attention to detail and gentle touch made the whole experience amazing.",
      image: "🌸"
    },
    {
      id: 2,
      name: "Zara Williams",
      service: "Wedding Style",
      rating: 5,
      text: "She made my wedding day perfect with the most beautiful braided updo. Everyone kept asking who did my hair! Professional, talented, and so sweet to work with.",
      image: "👰"
    },
    {
      id: 3,
      name: "Amara Davis",
      service: "Goddess Braids",
      rating: 5,
      text: "I've been going to Sarah for over a year now. She always knows exactly what style will work best for my face shape and lifestyle. Truly gifted at what she does!",
      image: "✨"
    },
    {
      id: 4,
      name: "Keisha Brown",
      service: "Protective Style",
      rating: 5,
      text: "My hair has never been healthier! Sarah's protective styling techniques helped my hair grow so much. Plus, I always leave feeling absolutely gorgeous.",
      image: "🌿"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            What My Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real clients who trust me with their hair journey.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="relative overflow-hidden bg-gradient-to-r from-background to-background/95 shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="text-6xl mb-6">
                {testimonials[currentTestimonial].image}
              </div>
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg md:text-xl text-muted-foreground mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div>
                <p className="font-semibold text-foreground text-lg">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-primary font-medium">
                  {testimonials[currentTestimonial].service}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                currentTestimonial === index ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="hover:shadow-md transition-all cursor-pointer"
              onClick={() => setCurrentTestimonial(index)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{testimonial.image}</div>
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-xs text-primary">{testimonial.service}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
