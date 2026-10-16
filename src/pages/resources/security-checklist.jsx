import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Server,
  Key,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Download,
  FileText,
} from "lucide-react";
import Navbar from "../../components/Essntials/Navbar";
import Footer from "../../components/Essntials/footer";
import Seo from "../../components/Essntials/Seo";

// Firebase
import { ref, push, serverTimestamp } from "firebase/database";
import { database } from "../../lib/firebase12";

const checklistSections = [
  {
    category: "Authentication & Access Control",
    items: [
      { id: "mfa", label: "Multi-Factor Authentication (MFA) enforced for all team and admin accounts", critical: true },
      { id: "rbac", label: "Granular Role-Based Access Control (RBAC) with principle of least privilege", critical: true },
      { id: "sessions", label: "Secure session management (HTTP-only, secure, SameSite cookies with strict TTL)", critical: false },
      { id: "password_policy", label: "Strong password policies with brute-force rate-limiting and account lockouts", critical: false },
    ],
  },
  {
    category: "Data Protection & Encryption",
    items: [
      { id: "aes256", label: "AES-256 encryption at rest for databases, backups, and file storage", critical: true },
      { id: "tls13", label: "TLS 1.3 enforced for all data in transit with strict HTTPS redirect", critical: true },
      { id: "pii_masking", label: "PII masking and tokenization for customer-identifiable information", critical: true },
      { id: "backup_dr", label: "Automated, encrypted daily backups with tested disaster recovery plan", critical: false },
    ],
  },
  {
    category: "API & Infrastructure Security",
    items: [
      { id: "rate_limiting", label: "API rate limiting and DDoS protection (Cloudflare / WAF)", critical: true },
      { id: "input_validation", label: "Strict server-side input validation and SQL/NoSQL injection sanitization", critical: true },
      { id: "cors", label: "Strict CORS policies restricted to authorized production domains only", critical: false },
      { id: "secrets", label: "Zero secrets/keys in code; centralized vault (AWS Secrets Manager / Doppler)", critical: true },
    ],
  },
  {
    category: "Compliance & Monitoring",
    items: [
      { id: "audit_logs", label: "Immutable audit logging for all authentication and privileged actions", critical: true },
      { id: "vuln_scan", label: "Automated dependency vulnerability scanning (Dependabot / Snyk) in CI/CD", critical: false },
      { id: "soc2_ready", label: "SOC2 / GDPR / HIPAA privacy controls documented and reviewed", critical: false },
      { id: "incident_resp", label: "Documented Incident Response Plan with defined severity escalation", critical: false },
    ],
  },
];

const SecurityChecklistPage = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleItem = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalItems = checklistSections.reduce((acc, s) => acc + s.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const scorePercent = Math.round((completedItems / totalItems) * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const leadsRef = ref(database, "leadMagnets/securityChecklist");
      await push(leadsRef, {
        ...formData,
        score: scorePercent,
        completedCount: completedItems,
        totalCount: totalItems,
        checkedItems,
        timestamp: serverTimestamp(),
        source: "security-checklist-page",
        status: "new",
      });

      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Ultimate SaaS Security Checklist | Aicyro Solutions"
        description="Audit your SaaS security posture. Verify encryption, RBAC, API protection, and SOC2/HIPAA readiness before launch."
        url="/resources/security-checklist"
        keywords="SaaS security checklist, cybersecurity audit, SOC2 readiness, cloud security, Aicyro Solutions"
      />

      <div className="bg-[var(--background)] min-h-screen text-[var(--foreground)] flex flex-col font-sans transition-colors duration-300">
        <Navbar />

        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 text-green-500 text-xs font-bold uppercase mb-4 bg-green-500/10">
                <ShieldCheck size={16} />
                <span>For CTOs, Founders & Dev Teams</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
                The Ultimate SaaS Security Checklist
              </h1>
              <p className="text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                70% of breaches happen due to missed configuration steps. Check off each safeguard below to calculate your current security score and export your remediation roadmap.
              </p>
            </div>

            {/* Score Bar */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 mb-10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="transparent"
                      className="text-[var(--border-color)]"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="transparent"
                      className={scorePercent >= 70 ? "text-green-500" : scorePercent >= 40 ? "text-amber-500" : "text-red-500"}
                      strokeDasharray={175.9}
                      strokeDashoffset={175.9 - (175.9 * scorePercent) / 100}
                    />
                  </svg>
                  <span className="absolute font-bold text-sm">{scorePercent}%</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Your Security Score</h3>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    {completedItems} of {totalItems} safeguards active
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                  {scorePercent >= 80 ? "Audit-Ready" : scorePercent >= 50 ? "Moderate Risk" : "High Vulnerability"}
                </span>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="space-y-8 mb-14">
              {checklistSections.map((section, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-sm"
                >
                  <h2 className="text-xl font-bold mb-4 text-[var(--foreground)] flex items-center gap-2">
                    <Lock size={20} className="text-[var(--primary)]" />
                    {section.category}
                  </h2>
                  <div className="space-y-3">
                    {section.items.map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${
                            isChecked
                              ? "bg-green-500/5 border-green-500/30"
                              : "hover:bg-[var(--foreground)]/5 border-transparent"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-1 h-5 w-5 rounded text-[var(--primary)] cursor-pointer"
                          />
                          <div className="flex-grow">
                            <span className={`text-sm ${isChecked ? "text-[var(--foreground)] font-medium" : "text-[var(--foreground-muted)]"}`}>
                              {item.label}
                            </span>
                            {item.critical && (
                              <span className="ml-2 inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-500/10 text-red-400">
                                Critical
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Lead Capture & Custom Report */}
            <div className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--background)] border border-[var(--border-color)] rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
              {!submitted ? (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase mb-4">
                    <FileText size={14} />
                    <span>Free Security Remediation Report</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                    Get Your Custom Action Plan
                  </h2>
                  <p className="text-sm text-[var(--foreground-muted)] mb-8">
                    Enter your details to receive a prioritized remediation roadmap tailored to your SaaS architecture.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--foreground-muted)]">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--foreground-muted)]">Work Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--foreground-muted)]">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Inc."
                        className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-6 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[var(--primary)]/20"
                    >
                      {loading ? "Generating Report..." : "Download Action Plan & Book Security Review"}
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">Checklist Submitted!</h3>
                  <p className="text-sm text-[var(--foreground-muted)] max-w-md mx-auto">
                    Thank you {formData.name}. Our security team will review your posture ({scorePercent}% score) and email you a customized security remediation roadmap.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                      href="/contact"
                      className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-90"
                    >
                      Book Free Security Consultation
                    </Link>
                    <Link
                      href="/services/cybersecurity-data-protection"
                      className="px-6 py-3 rounded-xl border border-[var(--border-color)] text-sm font-semibold hover:bg-[var(--foreground)]/5"
                    >
                      Explore Security Services
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SecurityChecklistPage;

