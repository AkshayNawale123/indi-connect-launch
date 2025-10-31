import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, category, userName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompts: Record<string, string> = {
      manufacturer: `You are an expert trade consultant for T-imoexo helping ${userName} (an Indian manufacturer) expand globally. 
      Provide concise, professional guidance on: export processes, documentation, market research, compliance, logistics, and payment terms. 
      Be encouraging and actionable. Keep responses under 3 sentences unless complex explanation is needed.`,
      
      international_buyer: `You are an expert trade consultant for T-imoexo helping ${userName} (an international buyer) source from India. 
      Provide concise, professional guidance on: finding suppliers, quality assurance, import procedures, shipping, customs, and negotiations. 
      Be helpful and practical. Keep responses under 3 sentences unless complex explanation is needed.`,
      
      international_seller: `You are an expert trade consultant for T-imoexo helping ${userName} (an international seller) enter the Indian market. 
      Provide concise, professional guidance on: market entry strategies, regulations, distribution channels, pricing, cultural considerations. 
      Be insightful and strategic. Keep responses under 3 sentences unless complex explanation is needed.`,
    };

    const systemPrompt = systemPrompts[category] || systemPrompts.international_buyer;

    console.log(`Chat request for ${userName} (${category})`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error(`AI Gateway error: ${response.status}`, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to process chat request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
