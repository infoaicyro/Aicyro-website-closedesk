
import Footer from "../components/Essntials/footer";
import Seo from "../components/Essntials/Seo";
import ServicesIntro from "@/components/services/ServicesIntro";
import Navbar from "@/components/Essntials/Navbar";
import CoreServices from "@/components/services/detailcoreservices";
import AdditionalCapabilities from "@/components/services/AdditionalCapabilities";
import ProcessSection from "@/components/services/ProcessSection";

const ServicesPage = () => {
  return (
    <>
      <Seo
        title="AI, SaaS & Secure Software Development Services | Aicyro"
        description="Custom AI, SaaS, web, and secure software development services designed to scale, protect, and grow modern businesses globally."
        url="/services"
        keywords="Aicyro services, SaaS development, AI integration, cybersecurity services, cloud architecture, web development, app development"
      />
      <div className="bg-[#0B0219]">
        <Navbar/>
        <ServicesIntro />
        <CoreServices />
        <AdditionalCapabilities />
        <ProcessSection />
        <Footer />
        
      </div>
    </>
  );
};

export default ServicesPage;
