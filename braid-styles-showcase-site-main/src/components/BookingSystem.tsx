/* eslint-disable react-hooks/exhaustive-deps */
// Import dependencies and types
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Define type for Service fetched from the backend
interface Service {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  icon: string;
}

const BookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const { toast } = useToast();

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:8000/services/");
        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        toast({
          title: "Error",
          description: "Could not load services. Try again later.",
          variant: "destructive",
        });
      }
    };

    fetchServices();
  }, []);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and service.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          service_type: selectedService,
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
        }),
      });

      if (!res.ok) throw new Error("Failed to book");

      toast({
        title: "Booking Requested!",
        description: `Your appointment for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime} has been requested.`,
      });

      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedService("");
    } catch {
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your booking.",
        variant: "destructive",
      });
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  return (
    <section id="booking" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Book Your Appointment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your preferred date, time, and service. I'll confirm your appointment within 24 hours.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-center">Schedule Your Visit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">Choose Your Service</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        selectedService === service.title && "ring-2 ring-primary bg-primary/5"
                      )}
                      onClick={() => setSelectedService(service.title)}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground">{service.title}</h3>
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>{service.duration}</span>
                          <span className="font-medium text-primary">{service.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={isDateDisabled}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">Select Time</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="text-sm"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleBooking}
                size="lg"
                className="w-full"
                disabled={!selectedDate || !selectedTime || !selectedService}
              >
                Book Appointment
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Note: Sundays are unavailable. Appointments are subject to confirmation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;
