
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-primary">
              BraidArt
            </h3>
            <p className="text-muted-foreground">
              Creating beautiful braided hairstyles that celebrate your natural beauty 
              and express your unique style.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                📷
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                📱
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                💼
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Protective Braids</li>
              <li>Special Occasion Styles</li>
              <li>Quick Touch-Ups</li>
              <li>Hair Consultations</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>123 Main Street, Suite 200</p>
              <p>Your City, State 12345</p>
              <p>(555) 123-4567</p>
              <p>hello@braidart.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for beautiful hair
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2025 BraidArt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
