import {
  ArrowRight,
  ClipboardList,
  ShieldCheck,
  Package,
  Ship,
  Globe,
  Briefcase,
  Handshake,
  TrendingUp,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const tradeSteps = [
    { Icon: Globe, title: "Indian Manufacturers" },
    { Icon: ClipboardList, title: "Product Registration" },
    { Icon: ShieldCheck, title: "Quality Check" },
    { Icon: Package, title: "Packaging" },
    { Icon: Ship, title: "Logistics" },
    { Icon: Globe, title: "International Buyers" },
    { Icon: Briefcase, title: "Market Entry" },
    { Icon: Handshake, title: "Partnership" },
    { Icon: TrendingUp, title: "Growth" },
    { Icon: Star, title: "Success" },
  ];

  // Duplicate for seamless scroll
  const allSteps = [...tradeSteps, ...tradeSteps];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-white/30" />

      <div className="max-w-7xl w-full relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent">
            Global Trade Made Simple
          </h1>
          <p className="text-xl md:text-2xl text-[hsl(var(--brand-blue))] mb-3 font-semibold">
            Connecting Indian Manufacturers with the World
          </p>
          <p className="text-lg md:text-xl text-[hsl(var(--brand-green))] mb-10">
            Your End-to-End International Trading Partner
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))] hover:opacity-90 transition-opacity"
            >
              Start Trading
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-[hsl(var(--brand-blue))] text-[hsl(var(--brand-blue))] hover:bg-[hsl(var(--brand-blue))]/10"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Journey Visualization */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-fade-in">
          <h3 className="text-center text-2xl font-bold text-[hsl(var(--brand-blue))] mb-6">Your Trade Journey</h3>

          <div className="overflow-hidden relative">
            <div className="flex gap-6 animate-scroll-left">
              {allSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-6 flex-shrink-0">
                  <div className="min-w-[180px] flex flex-col items-center justify-center p-5 text-center hover:scale-110 transition-all duration-300 cursor-pointer">
                    <step.Icon
                      size={64}
                      className="text-[hsl(var(--brand-blue))] mb-4 drop-shadow-lg"
                      strokeWidth={1.5}
                    />
                    <div className="text-sm font-semibold text-[hsl(var(--brand-blue))] leading-tight">
                      {step.title}
                    </div>
                  </div>
                  {index < allSteps.length - 1 && (
                    <div className="text-[hsl(var(--brand-green))] text-3xl flex-shrink-0 opacity-60 font-bold">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phase Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="px-5 py-2 bg-gradient-to-r from-[hsl(var(--brand-blue))]/10 to-[hsl(var(--brand-green))]/10 rounded-full text-[hsl(var(--brand-blue))] text-sm font-semibold border-2 border-[hsl(var(--brand-blue))]/30">
              📤 Export Process
            </div>
            <div className="px-5 py-2 bg-gradient-to-r from-[hsl(var(--brand-blue))]/10 to-[hsl(var(--brand-green))]/10 rounded-full text-[hsl(var(--brand-blue))] text-sm font-semibold border-2 border-[hsl(var(--brand-blue))]/30">
              📥 Import Solutions
            </div>
            <div className="px-5 py-2 bg-gradient-to-r from-[hsl(var(--brand-blue))]/10 to-[hsl(var(--brand-green))]/10 rounded-full text-[hsl(var(--brand-blue))] text-sm font-semibold border-2 border-[hsl(var(--brand-blue))]/30">
              🌐 Global Network
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
