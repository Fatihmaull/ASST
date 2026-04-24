"use client";

import { Brain, Cpu, Shield, Zap, Lock, ChevronRight, Binary, Search, Network, Activity } from "lucide-react";
import Link from "next/link";

export default function IntelligencePage() {
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
            <Link href="/intelligence" className="text-primary font-bold">Intelligence</Link>
            <Link href="/integrations" className="hover:text-primary transition-colors">Integrations</Link>
            <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>
          <Link href="/dashboard" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-[14px] font-bold hover:opacity-90 transition-all">
             Launch Console
          </Link>
        </div>
      </nav>

      <section className="pt-40 pb-24 px-8">
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-[13px] font-sans font-bold text-primary uppercase tracking-[0.3em] mb-6 text-center">Autonomous Reasoning</h2>
          <h1 className="text-6xl md:text-7xl font-serif font-medium tracking-tight text-foreground mb-10 text-center">Beyond Vector Search</h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-center">
            ARES doesn't just find vulnerabilities; it reasons about the economic and logical implications of protocol state. 
            Powered by the Advanced Resilience Evaluation System.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           {[
             { 
               title: "Logical Buffers", 
               icon: Brain, 
               desc: "Persistent contexts that store agentic reasoning across multiple analysis cycles, enabling complex cross-contract vulnerability discovery."
             },
             { 
               title: "Autonomous Auditing", 
               icon: Shield, 
               desc: "Self-correcting audit loops that verify findings against live chain state using optimized MPC-based sub-agent swarms."
             },
             { 
               title: "Invariant Monitoring", 
               icon: Activity, 
               desc: "Continuous verification of protocol invariants at the bytecode and state level, providing millisecond-precision alerts."
             }
           ].map((feature, i) => (
             <div key={i} className="ares-card p-10 bg-white border border-border whisper-shadow hover:ring-shadow transition-all group">
                <div className="w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                   <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{feature.title}</h3>
                <p className="text-[#5e5d59] leading-relaxed text-[15px]">
                   {feature.desc}
                </p>
             </div>
           ))}
        </div>

        <div className="max-w-7xl mx-auto bg-[#141413] text-[#faf9f5] rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
           <div className="flex-1 p-12 md:p-20 order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-serif font-medium mb-10 leading-tight"> The ARES Orchestrator</h2>
              <div className="space-y-8">
                 <div className="flex gap-6">
                    <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center shrink-0">
                       <Search className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold mb-2 uppercase tracking-widest text-sm opacity-60">Discovery Layer</h4>
                       <p className="text-[#b0aea5] leading-relaxed">Agents utilize high-fidelity supply chain analysis and static audits to map the protocol topology.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center shrink-0">
                       <Network className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold mb-2 uppercase tracking-widest text-sm opacity-60">Reasoning Engine</h4>
                       <p className="text-[#b0aea5] leading-relaxed">Gemini 3 Flash optimized agents cross-reference findings with global threat intelligence patterns.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center shrink-0">
                       <Lock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold mb-2 uppercase tracking-widest text-sm opacity-60">Synthesis & Patching</h4>
                       <p className="text-[#b0aea5] leading-relaxed">The final report synthesizer generates human-readable assessments and recommended remediation vectors.</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="flex-1 bg-[#1a1a18] p-12 md:p-20 order-1 md:order-2 flex flex-col justify-center relative overflow-hidden border-b md:border-b-0 md:border-l border-white/10">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] rotate-12 scale-[3]">
                 <Cpu className="w-64 h-64" />
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 font-mono text-[13px] relative z-10 whisper-shadow">
                 <div className="flex items-center gap-2 mb-4 opacity-40">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="ml-2 uppercase tracking-widest text-[10px]">ARES_TELEMETRY:v4</span>
                 </div>
                 <p className="text-emerald-400 mb-2">[EXECUTING] DeFi_Security_Auditor...</p>
                 <p className="text-[#b0aea5] mb-2">&gt; Mapping pool invariants for DEX:AggregatorProxy</p>
                 <p className="text-[#b0aea5] mb-2">&gt; Found: Potential cpi_guard bypass on instruction 4</p>
                 <p className="text-primary mb-2">[CRITICAL] Delegating to Orchestrator for economic impact analysis</p>
                 <p className="text-emerald-400">&gt; Reasoning completed. Outputting report...</p>
                 <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 animate-pulse">
                    <div className="w-1 h-3 bg-primary" />
                    <span className="text-primary font-bold">READY FOR OPERATOR APPROVAL</span>
                 </div>
              </div>
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
