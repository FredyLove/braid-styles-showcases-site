import { Card, CardContent } from "@/components/ui/card";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

const PortfolioSection = () => {
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Box Braids",
      description: "Classic protective style with modern flair",
      category: "Protective",
      image: "/images/img5.jpg"
    },
    {
      id: 2,
      title: "Dutch Crown Braid",
      description: "Elegant updo perfect for special occasions",
      category: "Elegant",
      image: "/images/img9.jpg"
    },
    {
      id: 3,
      title: "Senegalese Twists",
      description: "Beautiful twisted protective style",
      category: "Protective",
      image: "/images/img1.jpg"
    },
    {
      id: 4,
      title: "Goddess Braids",
      description: "Bold and beautiful statement braids",
      category: "Statement",
      image: "/images/img12.jpg"
    },
    {
      id: 5,
      title: "French Braid Updo",
      description: "Sophisticated style for professional settings",
      category: "Professional",
      image: "/images/img14.jpg"
    },
    {
      id: 6,
      title: "Fulani Braids",
      description: "Traditional style with contemporary touches",
      category: "Cultural",
      image: "/images/img6.jpg"
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            My Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my collection of braided masterpieces. Each style is carefully crafted 
            to enhance your natural beauty and express your unique personality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card 
              key={item.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} hairstyle`}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  <div className="absolute top-4 left-4 bg-background/80 px-3 py-1 rounded-full">
                    <p className="text-sm font-medium text-primary">{item.category}</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">View Details</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see more of my work? Follow me on social media for daily inspiration!
          </p>
          <div className="flex justify-center gap-4">
            {[
              { name: 'Instagram', icon: '📷', url: '#' },
              { name: 'TikTok', icon: '📱', url: '#' },
              { name: 'Pinterest', icon: '💼', url: '#' }
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform"
                aria-label={`Follow on ${platform.name}`}
              >
                {platform.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;