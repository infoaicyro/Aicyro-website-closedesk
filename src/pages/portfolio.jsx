

import Footer from "../components/Essntials/footer";
import Seo from "../components/Essntials/Seo";
import Navbar from "@/components/Essntials/Navbar";
import Section from "../components/portfolio/intro";
import CaseStudiesSection from "@/components/portfolio/CaseStudiesSection";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";


const PortfolioPage = () => {
  return (
    <>
      <Seo
        title="Portfolio"
        description="Browse Aicyro Solutions portfolio of SaaS platforms, AI-powered applications, and secure enterprise systems delivered for startups and global businesses."
        url="/portfolio"
        keywords="Aicyro portfolio, case studies, SaaS projects, AI projects, cybersecurity projects, client success stories"
      />
      {/* UPDATED: Uses background variable and text variable */}
      <div className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <Navbar />
        <Section />
        <CaseStudiesSection />
        <PortfolioCTA />
        
        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage;
