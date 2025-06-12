
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Users,} from "lucide-react";

const AboutSection = () => {
  const achievements = [
    {
      icon: Award,
      title: "Certified Professional",
      description: "Licensed cosmetologist with specialized training in braiding techniques"
    },
    {
      icon: Heart,
      title: "Passion for Hair",
      description: "Dedicated to celebrating natural hair beauty and promoting healthy hair practices"
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Proud to serve and empower women in our community through beautiful braided styles"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground">
                Hi, I'm Nkot Marlyse Colette! I've been passionate about hair artistry for over more than 5 years, 
                specializing in creating stunning braided hairstyles that celebrate the 
                natural beauty and cultural richness of textured hair.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                My journey began when I was young, watching my grandmother create beautiful 
                braided styles for family and friends. That early inspiration grew into a 
                deep love for the artistry and cultural significance of braiding, and now I am the one that create hers'.
              </p>
              
              <p className="text-muted-foreground">
                Today, I'm committed to providing exceptional braiding services while 
                promoting healthy hair practices. Every client who sits in my chair receives 
                not just a beautiful style, but also education on maintaining their hair's 
                health and embracing their natural beauty.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Satisfied Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 h-64 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-3xl">👩‍🎨</span>
                </div>
                <p className="text-lg font-medium text-foreground">
                  Crafting Beauty, One Braid at a Time
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {achievements.map((achievement, index) => (
                <Card key={achievement.title} className="border-0 shadow-sm">
                  <CardContent className="flex items-start space-x-4 p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
