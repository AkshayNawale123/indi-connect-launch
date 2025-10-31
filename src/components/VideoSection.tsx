import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[hsl(var(--brand-blue))]/5 to-[hsl(var(--brand-green))]/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent">
            See T-imoexo In Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how we simplify international trade for manufacturers, buyers, and sellers across the globe
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[hsl(var(--brand-blue))]/10 to-[hsl(var(--brand-green))]/10 aspect-video">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
            {/* Play Button */}
            <button className="w-24 h-24 rounded-full bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))] flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 animate-float">
              <Play className="text-white ml-1" size={40} fill="white" />
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-[hsl(var(--brand-blue))] mb-2">
                Company Overview Video
              </h3>
              <p className="text-muted-foreground">
                Watch how T-imoexo connects businesses worldwide
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-[hsl(var(--brand-blue))]/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-[hsl(var(--brand-green))]/10 rounded-full blur-xl" />
          </div>

          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(46, 62, 143, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(46, 62, 143, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        {/* Info Cards Below Video */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[hsl(var(--brand-blue))]/20 hover:border-[hsl(var(--brand-blue))] transition-colors">
            <div className="text-4xl mb-3">🏭</div>
            <h3 className="text-xl font-bold text-[hsl(var(--brand-blue))] mb-2">
              For Manufacturers
            </h3>
            <p className="text-muted-foreground">
              Access global markets with our efficient export processes and worldwide network
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[hsl(var(--brand-blue))]/20 hover:border-[hsl(var(--brand-green))] transition-colors">
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="text-xl font-bold text-[hsl(var(--brand-green))] mb-2">
              For International Buyers
            </h3>
            <p className="text-muted-foreground">
              Source quality products from India with complete transparency and support
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[hsl(var(--brand-blue))]/20 hover:border-[hsl(var(--brand-blue))] transition-colors">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-xl font-bold text-[hsl(var(--brand-blue))] mb-2">
              For International Sellers
            </h3>
            <p className="text-muted-foreground">
              Establish your products in the thriving Indian market with our expertise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
