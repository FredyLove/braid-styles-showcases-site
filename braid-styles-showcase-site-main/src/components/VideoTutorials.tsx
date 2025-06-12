import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const VideoTutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "Basic Box Braids Tutorial",
      description: "Learn the fundamentals of creating beautiful box braids from start to finish.",
      videoId: "vNFTB08b1tw", // Replace with actual YouTube video IDs  
      duration: "15:30",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "French Braid Mastery",
      description: "Master the classic French braid technique with professional tips and tricks.",
      videoId: "-eItcamMAF8", // Replace with actual YouTube video IDs
      duration: "12:45",
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Protective Styling Tips",
      description: "Essential techniques for maintaining healthy hair while wearing protective styles.",
      videoId: "JN96_HQXtWo", // Replace with actual YouTube video IDs
      duration: "18:20",
      difficulty: "All Levels"
    },
    {
      id: 4,
      title: "Goddess Braids Step-by-Step",
      description: "Create stunning goddess braids with detailed step-by-step instructions.",
      videoId: "zLugWvepvOw", // Replace with actual YouTube video IDs
      duration: "22:15",
      difficulty: "Advanced"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <section id="tutorials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Video Tutorials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn professional braiding techniques with my step-by-step video tutorials. 
            Perfect for both beginners and experienced stylists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {tutorials.map((tutorial, index) => (
            <Card 
              key={tutorial.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                <iframe
                  src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                  title={tutorial.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-display leading-tight">
                    {tutorial.title}
                  </CardTitle>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    getDifficultyColor(tutorial.difficulty)
                  )}>
                    {tutorial.difficulty}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {tutorial.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Duration: {tutorial.duration}
                  </span>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Watch on YouTube
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 to-accent/10">
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              Want More Tutorials?
            </h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to my YouTube channel for weekly braiding tutorials and styling tips!
            </p>
            <Button size="lg">
              Subscribe to My Channel
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VideoTutorials;
