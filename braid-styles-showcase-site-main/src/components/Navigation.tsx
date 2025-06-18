import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      // Navigate to home and pass scroll target as state
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }
 
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="BraidArt Logo" className="h-20 w-20" />
            <span className="font-display text-2xl font-bold text-primary">BraidArt</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollToSection("portfolio")} className="text-foreground hover:text-primary transition-colors">Portfolio</button>
            <button onClick={() => scrollToSection("services")} className="text-foreground hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection("contact")} className="text-foreground hover:text-primary transition-colors">Contact</button>

            {/* User Icon Dropdown */}
            <div className="relative">
              <Button variant="ghost" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <User className="w-5 h-5" />
              </Button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            <Button onClick={() => scrollToSection("contact")}>Book Appointment</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => scrollToSection("home")} className="block w-full text-left px-3 py-2 text-foreground hover:text-primary">Home</button>
            <button onClick={() => scrollToSection("portfolio")} className="block w-full text-left px-3 py-2 text-foreground hover:text-primary">Portfolio</button>
            <button onClick={() => scrollToSection("services")} className="block w-full text-left px-3 py-2 text-foreground hover:text-primary">Services</button>
            <button onClick={() => scrollToSection("about")} className="block w-full text-left px-3 py-2 text-foreground hover:text-primary">About</button>
            <button onClick={() => scrollToSection("contact")} className="block w-full text-left px-3 py-2 text-foreground hover:text-primary">Contact</button>

            <div className="px-3 space-y-2">
              <button onClick={() => navigate("/login")} className="block w-full text-left text-foreground hover:text-primary">Login</button>
              <button onClick={() => navigate("/register")} className="block w-full text-left text-foreground hover:text-primary">Register</button>
            </div>

            <div className="px-3 py-2">
              <Button onClick={() => scrollToSection("contact")} className="w-full">Book Appointment</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
