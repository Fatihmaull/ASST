"use client";

import { Check, Zap, Shield, Globe, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    description: "For individual researchers and open-source contributors.",
    features: [
      "50 AI Credits / Month",
      "5 Asset Targets",
      "Standard Vulnerability Scanning",
      "Community Support",
      "GitHub Integration"
    ],
    cta: "Start Free",
    featured: false
  },
  {
    name: "Operator",
    price: "$35",
    description: "For security professionals and active DeFi traders.",
    features: [
      "500 AI Credits / Month",
      "50 Asset Targets",
      "Deep Logical Reasoning Buffers",
      "Real-time Telemetry (SSE)",
      "Priority Agent Execution",
      "Exportable PDF Reports"
    ],
    cta: "Get Started",
    featured: false
  },
  {
    name: "Sentinel",
    price: "$60",
    description: "Advanced monitoring for protocol guardians and DAOs.",
    features: [
      "1,000 AI Credits / Month",
      "Unlimited Asset Targets",
      "Multi-Chain Threat Graphs",
      "Custom Sub-Agent Nodes",
      "Governance Alert Integration",
      "Audit Archive Access"
    ],
    cta: "Upgrade Now",
    featured: true
  },
  {
    name: "Commander",
    price: "$130",
    description: "Full-scale autonomous security for enterprise protocols.",
    features: [
      "3,000 AI Credits / Month",
      "Full Infrastructure SDK",
      "Dedicated Reasoning Buffer",
      "24/7 Security Advisory",
      "Custom ML Model Fine-tuning",
      "On-chain Governance Voting"
    ],
    cta: "Go Pro",
    featured: false
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] selection:bg-primary/10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#e5e4da] bg-[#faf9f5]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
               <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">ARES</span>
          </Link>
          <div className="hidden md:flex items-center gap-12 text-[14px] font-medium text-[#5e5d59]">
            <Link href="/intelligence" className="hover:text-primary transition-colors">Intelligence</Link>
            <Link href="/integrations" className="hover:text-primary transition-colors">Integrations</Link>
            <Link href="/pricing" className="text-primary font-bold">Pricing</Link>
          </div>
          <Link href="/dashboard" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-[14px] font-bold hover:opacity-90 transition-all">
             Launch Console
          </Link>
        </div>
      </nav>

      <section className="pt-40 pb-24 px-8">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-[13px] font-sans font-bold text-primary uppercase tracking-[0.3em] mb-6">Access Tiers</h2>
          <h1 className="text-6xl font-serif font-medium tracking-tight text-foreground mb-8">Intelligence as a Utility</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Scale your autonomous security operations with a plan that fits your execution requirements.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`ares-card p-8 flex flex-col ${tier.featured ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-105 z-10' : 'bg-white'}`}
            >
              <div className="mb-6">
                <h3 className={`text-xl font-serif font-bold mb-2 ${tier.featured ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`text-3xl font-bold ${tier.featured ? 'text-primary-foreground' : 'text-foreground'}`}>{tier.price}</span>
                  {tier.price !== "Custom" && <span className={tier.featured ? 'text-primary-foreground/60' : 'text-muted-foreground'}>/mo</span>}
                </div>
                <p className={`text-[13px] leading-relaxed ${tier.featured ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {tier.description}
                </p>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className={`w-3.5 h-3.5 shrink-0 ${tier.featured ? 'text-primary-foreground' : 'text-primary'}`} />
                    <span className={`text-[13px] ${tier.featured ? 'text-primary-foreground/90' : 'text-foreground'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-xl text-[14px] font-bold text-center transition-all flex items-center justify-center gap-2 ${
                tier.featured 
                ? 'bg-white text-primary hover:bg-[#faf9f5]' 
                : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}>
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* On-Demand & Enterprises */}
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="ares-card p-8 bg-[#141413] text-[#faf9f5] flex items-center justify-between group overflow-hidden">
              <div className="relative z-10">
                 <h3 className="text-2xl font-serif font-bold mb-2">ARES On-demand</h3>
                 <p className="text-[#b0aea5] text-sm">Pay-as-you-go security for single audits.</p>
                 <p className="text-primary font-bold mt-4 text-xl">Starts from $5 / usage</p>
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-105 transition-all relative z-10">
                 Run Audit
              </button>
              <div className="absolute top-0 right-0 opacity-[0.03] scale-150 rotate-12 -mr-10 -mt-10">
                 <Zap className="w-48 h-48" />
              </div>
           </div>

           <div className="ares-card p-8 bg-white border border-[#c96442]/20 flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10">
                 <h3 className="text-2xl font-serif font-bold mb-2">Enterprises!</h3>
                 <p className="text-muted-foreground text-sm">Custom infrastructure & SLAs.</p>
                 <p className="text-foreground font-bold mt-4 text-xl italic font-serif">Lets Talk!</p>
              </div>
              <Link href="mailto:ops@ares.protocol" className="px-6 py-3 bg-[#141413] text-white rounded-xl font-bold hover:bg-[#252524] transition-all relative z-10">
                 Contact Sales
              </Link>
              <div className="absolute top-0 right-0 opacity-[0.05] scale-125 -mr-8 -mt-8 text-primary">
                 <Globe className="w-40 h-40" />
              </div>
           </div>
        </div>

        {/* Payment Gateways */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
            <p className="text-[11px] font-sans font-bold text-muted-foreground uppercase tracking-[0.3em] mb-10">Settlement Powered By</p>
            <div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <Link href="https://solanapay.com/" target="_blank" className="flex items-center gap-2 group">
                  <Globe className="w-6 h-6 group-hover:text-[#9945FF]" />
                  <span className="text-xl font-serif font-bold">Solana Pay</span>
               </Link>
               <Link href="https://mpp.dev/" target="_blank" className="flex items-center gap-2 group">
                  <Cpu className="w-6 h-6 group-hover:text-primary" />
                  <span className="text-xl font-serif font-bold">Marquee</span>
               </Link>
               <Link href="https://payai.network/" target="_blank" className="flex items-center gap-2 group">
                  <Shield className="w-6 h-6 group-hover:text-blue-500" />
                  <span className="text-xl font-serif font-bold">PayAI</span>
               </Link>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-[#e5e4da] bg-[#f5f4ed]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-xl font-serif font-bold tracking-tight">ARES</span>
            </div>
            <p className="text-[#87867f] text-[14px] max-w-sm mb-8 leading-relaxed">
              The first autonomous security operations platform for the next generation of decentralized infrastructure.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-[12px] uppercase tracking-widest mb-6">Platform</h5>
            <ul className="space-y-4 text-[14px] text-[#5e5d59]">
              <li><Link href="/intelligence" className="hover:text-primary">Intelligence</Link></li>
              <li><Link href="/integrations" className="hover:text-primary">Integrations</Link></li>
              <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[12px] uppercase tracking-widest mb-6">Company</h5>
            <ul className="space-y-4 text-[14px] text-[#5e5d59]">
              <li><Link href="#" className="hover:text-primary">About</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
