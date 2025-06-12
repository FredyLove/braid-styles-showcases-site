import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Calendar, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const StatsSection = () => {
  const [counts, setCounts] = useState({
    clients: 0,
    appointments: 0,
    years: 0,
    satisfaction: 0
  });

  const finalCounts = {
    clients: 250,
    appointments: 1200,
    years: 5,
    satisfaction: 98
  };

  const stats = [
    {
      icon: Users,
      label: "Happy Clients",
      value: counts.clients,
      suffix: "+",
      color: "text-blue-500"
    },
    {
      icon: Calendar,
      label: "Appointments Completed",
      value: counts.appointments,
      suffix: "+",
      color: "text-green-500"
    },
    {
      icon: Award,
      label: "Years of Experience",
      value: counts.years,
      suffix: "",
      color: "text-purple-500"
    },
    {
      icon: Heart,
      label: "Client Satisfaction",
      value: counts.satisfaction,
      suffix: "%",
      color: "text-red-500"
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const counters = Object.keys(finalCounts).map(key => {
      const finalValue = finalCounts[key as keyof typeof finalCounts];
      const increment = finalValue / steps;
      return { key, increment, current: 0 };
    });

    const timer = setInterval(() => {
      setCounts(prev => {
        const newCounts = { ...prev };
        let allComplete = true;

        counters.forEach(counter => {
          const finalValue = finalCounts[counter.key as keyof typeof finalCounts];
          if (counter.current < finalValue) {
            counter.current = Math.min(counter.current + counter.increment, finalValue);
            newCounts[counter.key as keyof typeof newCounts] = Math.floor(counter.current);
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(timer);
        }

        return newCounts;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label}
              className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className={cn("mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4", 
                  stat.color.replace('text-', 'bg-').replace('-500', '-100'))}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
