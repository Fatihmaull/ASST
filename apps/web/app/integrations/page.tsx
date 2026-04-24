"use client";

import { Globe, Shield, Zap, Cable, Terminal, Cloud, MessageSquare, Code } from "lucide-react";
import Link from "next/link";

export default function IntegrationsPage() {
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
            <Link href="/integrations" className="text-primary font-bold">Integrations</Link>
            <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>
          <Link href="/dashboard" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-[14px] font-bold hover:opacity-90 transition-all">
             Launch Console
          </Link>
        </div>
      </nav>

      <section className="pt-40 pb-24 px-8">
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <h2 className="text-[13px] font-sans font-bold text-primary uppercase tracking-[0.3em] mb-6">Omnichannel Security</h2>
          <h1 className="text-6xl md:text-7xl font-serif font-medium tracking-tight text-foreground mb-10">Unified Control</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Attach ARES to your existing development lifecycle. 
            From code commit to on-chain execution, we maintain a persistent security posture.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
           {[
             { name: "GitHub Actions", icon: Code, category: "CI/CD", desc: "Automate ARES scans on every pull request to catch vulnerabilities before they land." },
             { name: "Comm Communications", icon: MessageSquare, category: "Alerting", desc: "Stream critical agent findings directly into your engineering war rooms." },
             { name: "Terraform", icon: Cable, category: "IaC", desc: "Scan infrastructure manifests for insecure cloud permissioning and secret exposure." },
             { name: "Solana RPC", icon: Zap, category: "Network", desc: "Live monitoring of program upgrades and treasury flows via Helius and Jito." },
             { name: "PagerDuty", icon: Shield, category: "Incident Response", desc: "Route logical buffer alerts to on-call security responders instantly." },
             { name: "AWS Security Hub", icon: Cloud, category: "SIEM", desc: "Aggregate ARES intelligence into your enterprise security dashboard." }
           ].map((int, i) => (
             <div key={i} className="ares-card p-8 bg-white border border-border whisper-shadow hover:scale-[1.02] transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <int.icon className="w-6 h-6" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-secondary rounded-lg">{int.category}</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{int.name}</h3>
                <p className="text-[14px] text-[#5e5d59] leading-relaxed">
                   {int.desc}
                </p>
             </div>
           ))}
        </div>

        <div className="max-w-4xl mx-auto p-12 bg-secondary/5 border border-border rounded-[32px] overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
              <Terminal className="w-48 h-48" />
           </div>
           <h2 className="text-3xl font-serif font-medium mb-6">Developer SDK</h2>
           <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
             The ARES CLI allows you to integrate autonomous intelligence into any terminal-based environment. 
             Optimized for CI/CD runners and local research.
           </p>
           <div className="bg-[#141413] rounded-2xl p-6 font-mono text-[14px] text-primary mb-10 shadow-xl">
             <span className="text-emerald-500 mr-2">$</span>
             <span className="text-white">npm install -g @ares/sdk</span>
             <br />
             <span className="text-emerald-500 mr-2">$</span>
             <span className="text-white">ares scan --target ./programs/staking --mode autonomous</span>
           </div>
           <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2">
              View Documentation
              <Globe className="w-4 h-4" />
           </button>
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
