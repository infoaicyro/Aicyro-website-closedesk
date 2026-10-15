import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, FileText, AlertTriangle } from "lucide-react";

const SecurityChecklistTeaser = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden my-12 rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 px-8 md:px-12 max-w-7xl mx-auto">
        
        {/* Left: Content */}
        <div className="md:w-3/5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  text-xs font-bold uppercase mb-6">
            <ShieldCheck size={14} />
            <span>For CTOs & Dev Teams</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">
            Is Your SaaS Secure?
          </h2>
          <p className="text-lg text-[var(--foreground-muted)] mb-8 leading-relaxed">
            70% of breaches happen due to missed configuration steps. Download our **Ultimate SaaS Security Checklist** to audit your infrastructure, compliance (SOC2/HIPAA), and data protection before you launch.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/resources/security-checklist">
              <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold hover:bg-[var(--primary)] hover:text-white transition-all hover:scale-105">
                <FileText size={20} />
                <span>Get the Checklist</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="md:w-2/5 flex justify-center">
          <div className="relative w-full max-w-sm bg-[var(--background)] rounded-xl border border-[var(--border-color)] shadow-2xl p-6 rotate-3 hover:rotate-0 transition-transform duration-500">
             <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-color)] pb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Lock size={20} className="text-green-500" />
                </div>
                <div>
                    <h4 className="font-bold text-sm">Security Audit</h4>
                    <span className="text-xs text-[var(--foreground-muted)]">Status: Pending Review</span>
                </div>
             </div>
             
             <div className="space-y-3">
                {[
                    { label: "Data Encryption (AES-256)", status: true },
                    { label: "Role-Based Access (RBAC)", status: true },
                    { label: "API Rate Limiting", status: true },
                    { label: "Vulnerability Scan", status: false },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[var(--card-bg)]">
                        <span className="text-sm font-medium">{item.label}</span>
                        {item.status ? (
                            <ShieldCheck size={16} className="text-green-500" />
                        ) : (
                            <AlertTriangle size={16} className="text-red-400 animate-pulse" />
                        )}
                    </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SecurityChecklistTeaser;