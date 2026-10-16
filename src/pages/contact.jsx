
import Footer from "../components/Essntials/footer";
import Seo from "../components/Essntials/Seo";
import Contactform from "../components/contactus/contactform"
import Navbar from "@/components/Essntials/Navbar";
import ContactCTA from "@/components/contactus/contactusCTA";
import Test from "@/components/contactus/test";
import LeadMagnet from "@/components/Home/MVPBlueprint";

const ContactPage = () => {
  return (
    <>
      <Seo
        title="Contact Aicyro Solutions | Book a Strategy Call"
        description="Talk with Aicyro Solutions about AI, cybersecurity, SaaS, and scalable software development. Book a strategy call today."
        url="/contact"
        keywords="Contact Aicyro, get in touch, software project inquiry, AI consulting, SaaS consulting, cybersecurity consulting"
      />
      <div className="bg-[#0A0118]">
        <Navbar />
        <Test />

        <Contactform />
        <LeadMagnet />
        {/* <ContactCTA /> */}
       
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
