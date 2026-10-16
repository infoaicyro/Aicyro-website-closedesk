
import BlogHero from "../components/blogs/blogstart";
import BlogGrid from "../components/blogs/bloggrid";
// import Newsletter from "../Components/Blog/Newsletter";
import Footer from "../components/Essntials/footer";
import Seo from "../components/Essntials/Seo";
import LeadMagnet from "@/components/Home/MVPBlueprint";

const BlogPage = () => {
  return (
    <>
      <Seo
        title="Blog"
        description="Explore insights, tutorials, and trends on AI, Cybersecurity, and SaaS development from the experts at Aicyro Solutions."
        url="/blog"
        keywords="Aicyro Blog, Tech Insights, AI Trends, Cybersecurity News, SaaS Development, Web Development Tutorials"
      />
      {/* Main Wrapper with Dark Theme */}
      <div className="bg-[#0A0118] min-h-screen text-white">
        <BlogHero />
        <BlogGrid />
        {/* <Newsletter /> */}
        <LeadMagnet />
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
