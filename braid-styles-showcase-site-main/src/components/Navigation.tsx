import { useEffect, useState, useRef } from "react";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  Image, 
  Scissors, 
  Info, 
  Phone, 
  Calendar,
  Bookmark,
  UserCircle,
  ClipboardList,
  LogIn,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { cn } from "@/lib/utils";

type DecodedToken = {
  sub: string;
  name?: string;
  exp: number;
};

type NavigationProps = {
  isLoggedIn: boolean;
};

const Navigation = ({ isLoggedIn }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>("home");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("access_token");
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("access_token");
      }
    }
  }, []);

  useEffect(() => {
    // Set up IntersectionObserver to track which section is in view
    const sections = ["home", "portfolio", "services", "about", "contact"];
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          const element = document.getElementById(section);
          if (element) {
            observerRef.current?.unobserve(element);
          }
        });
      }
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/");
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const isActive = (sectionId: string) => {
    if (location.pathname !== "/") return false;
    return activeSection === sectionId;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <img src="/images/logo.png" alt="BraidArt Logo" className="h-10 w-10" />
            <span className="font-display text-xl font-bold text-primary">BraidArt</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <button 
              onClick={() => scrollToSection("home")} 
              className={cn(
                "flex items-center gap-2 transition-colors",
                isActive("home") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              )}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button 
              onClick={() => scrollToSection("portfolio")} 
              className={cn(
                "flex items-center gap-2 transition-colors",
                isActive("portfolio") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              )}
            >
              <Image className="w-4 h-4" />
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className={cn(
                "flex items-center gap-2 transition-colors",
                isActive("services") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              )}
            >
              <Scissors className="w-4 h-4" />
              Services
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className={cn(
                "flex items-center gap-2 transition-colors",
                isActive("about") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              )}
            >
              <Info className="w-4 h-4" />
              About
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className={cn(
                "flex items-center gap-2 transition-colors",
                isActive("contact") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              )}
            >
              <Phone className="w-4 h-4" />
              Contact
            </button>
            
            {!user && (
              <Button 
                onClick={() => scrollToSection("contact")} 
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Button>
            )}

            {/* User Dropdown */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="rounded-full"
              >
                <User className="w-5 h-5" />
              </Button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-popover shadow-lg rounded-md z-50 border border-border">
                  {user ? (
                    <div className="p-1">
                      <div className="px-4 py-2 text-sm font-medium border-b flex items-center gap-2">
                        <UserCircle className="w-4 h-4" />
                        {user.name || user.sub}
                      </div>
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setUserMenuOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent rounded-sm",
                          location.pathname === "/profile" ? "bg-accent" : ""
                        )}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate("/bookings");
                          setUserMenuOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent rounded-sm",
                          location.pathname === "/bookings" ? "bg-accent" : ""
                        )}
                      >
                        <ClipboardList className="w-4 h-4" />
                        My Bookings
                      </button>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent rounded-sm text-destructive"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="p-1">
                      <button
                        onClick={() => {
                          navigate("/login");
                          setUserMenuOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent rounded-sm",
                          location.pathname === "/login" ? "bg-accent" : ""
                        )}
                      >
                        <LogIn className="w-4 h-4" />
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/register");
                          setUserMenuOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent rounded-sm",
                          location.pathname === "/register" ? "bg-accent" : ""
                        )}
                      >
                        <UserPlus className="w-4 h-4" />
                        Register
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <button 
              onClick={() => scrollToSection("home")} 
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-sm",
                isActive("home") ? "bg-accent text-primary" : "text-foreground"
              )}
            >
              <Home className="w-5 h-5" />
              Home
            </button>
            <button 
              onClick={() => scrollToSection("portfolio")} 
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-sm",
                isActive("portfolio") ? "bg-accent text-primary" : "text-foreground"
              )}
            >
              <Image className="w-5 h-5" />
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-sm",
                isActive("services") ? "bg-accent text-primary" : "text-foreground"
              )}
            >
              <Scissors className="w-5 h-5" />
              Services
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-sm",
                isActive("about") ? "bg-accent text-primary" : "text-foreground"
              )}
            >
              <Info className="w-5 h-5" />
              About
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-sm",
                isActive("contact") ? "bg-accent text-primary" : "text-foreground"
              )}
            >
              <Phone className="w-5 h-5" />
              Contact
            </button>

            {!user ? (
              <div className="pt-2 space-y-1">
                <button 
                  onClick={() => navigate("/login")} 
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-sm",
                    location.pathname === "/login" ? "bg-accent text-primary" : "text-foreground"
                  )}
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </button>
                <button 
                  onClick={() => navigate("/register")} 
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-sm",
                    location.pathname === "/register" ? "bg-accent text-primary" : "text-foreground"
                  )}
                >
                  <UserPlus className="w-5 h-5" />
                  Register
                </button>
                <Button 
                  onClick={() => scrollToSection("contact")} 
                  className="w-full flex items-center gap-2 mt-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Button>
              </div>
            ) : (
              <div className="pt-2 space-y-1">
                <div className="px-4 py-3 text-sm font-medium flex items-center gap-3 border-t">
                  <UserCircle className="w-5 h-5" />
                  {user.name || user.sub}
                </div>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent rounded-sm",
                    location.pathname === "/profile" ? "bg-accent text-primary" : "text-foreground"
                  )}
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/bookings");
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent rounded-sm",
                    location.pathname === "/bookings" ? "bg-accent text-primary" : "text-foreground"
                  )}
                >
                  <ClipboardList className="w-5 h-5" />
                  My Bookings
                </button>
                <button 
                  onClick={logout} 
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent rounded-sm text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;