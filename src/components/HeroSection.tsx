import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const tradeSteps = [
    { number: 1, icon: "🏭", title: "Indian Manufacturers" },
    { number: 2, icon: "📋", title: "Product Registration" },
    { number: 3, icon: "✓", title: "Quality Check" },
    { number: 4, icon: "📦", title: "Packaging" },
    { number: 5, icon: "🚢", title: "Logistics" },
    { number: 6, icon: "🌍", title: "International Buyers" },
    { number: 7, icon: "💼", title: "Market Entry" },
    { number: 8, icon: "🤝", title: "Partnership" },
    { number: 9, icon: "📈", title: "Growth" },
    { number: 10, icon: "🌟", title: "Success" },
  ];

  // Duplicate for seamless scroll
  const allSteps = [...tradeSteps, ...tradeSteps];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
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
          <h3 className="text-center text-2xl font-bold text-[hsl(var(--brand-blue))] mb-6">
            Your Trade Journey
          </h3>
          
          <div className="overflow-hidden relative">
            <div className="flex gap-3 animate-scroll-left">
              {allSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 flex-shrink-0">
                  <div className="min-w-[180px] bg-gradient-to-br from-[hsl(var(--brand-blue))]/5 to-[hsl(var(--brand-green))]/5 border-2 border-[hsl(var(--brand-blue))]/20 rounded-xl p-5 text-center hover:scale-105 hover:border-[hsl(var(--brand-blue))] hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))] rounded-full flex items-center justify-center font-bold text-white text-lg mb-3 mx-auto shadow-md">
                      {step.number}
                    </div>
                    <div className="text-3xl mb-2">{step.icon}</div>
                    <div className="text-sm font-semibold text-[hsl(var(--brand-blue))] leading-tight">
                      {step.title}
                    </div>
                  </div>
                  {index < allSteps.length - 1 && (
                    <div className="text-[hsl(var(--brand-green))] text-2xl flex-shrink-0 opacity-60">
                      →
                    </div>
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
