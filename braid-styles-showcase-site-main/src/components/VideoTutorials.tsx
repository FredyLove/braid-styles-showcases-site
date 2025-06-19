import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Tutorial = {
  id: number;
  title: string;
  description: string;
  video_id: string;
  duration: string;
  difficulty: string;
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

const VideoTutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await fetch("http://localhost:8000/tutorials/homepage");
        if (!res.ok) throw new Error("Failed to fetch tutorials");
        const data = await res.json();
        setTutorials(data);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTutorials();
  }, []);

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
                  src={`https://www.youtube.com/embed/${tutorial.video_id}`}
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
                <p className="text-muted-foreground">{tutorial.description}</p>
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
      </div>
    </section>
  );
}

export default VideoTutorials