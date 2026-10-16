// import { useRouter } from "next/router";
// import AicyroChatbot from "@/components/Chatbot/AicyroChatbot";

// export default function RootLayout({ children }) {
//   const router = useRouter();

//   // Check if the current page is the admin dashboard (/lg) or the logs page (/logs)
//   const isDashboard = router.pathname === "/lg";
//   const isLogsPage = router.pathname === "/logs";

//   // Hide the chatbot if on the dashboard OR the logs page
//   const showChatbot = !isDashboard && !isLogsPage;

//   return (
//     <div>
//       <main>
//         {children}

//         {/* Only render the chatbot on public/allowed pages */}
//         {showChatbot && <AicyroChatbot />}
//       </main>
//     </div>
//   );
// }


//
//
//
//
//
//
//
//

// import { useRouter } from "next/router";
// import AicyroChatbot from "@/components/Chatbot/AicyroChatbot";
// import Sticky from "../components/Home/StickyEstimateBtn";
// import CookieConsentBanner from "../components/Essntials/CookieConsentBanner";

// export default function RootLayout({ children }) {
//   const router = useRouter();

//   // Check if the current page is the admin dashboard (/lg)
//   const isDashboard = router.pathname === "/lg";

//   return (
//     <div>
//       <main>
//         {children}
//         <CookieConsentBanner />
//         {/* Only render the chatbot if we are NOT on the dashboard */}
//         {!isDashboard && <AicyroChatbot />}
//         {!isDashboard && <Sticky />}
//       </main>
//     </div>
//   );
// }

//
//
//
//
//
//
//
//
//
//

import { useRouter } from "next/router";
import AicyroChatbot from "@/components/Chatbot/AicyroChatbot";
import Sticky from "../components/Home/StickyEstimateBtn";
import CookieConsentBanner from "../components/Essntials/CookieConsentBanner";

export default function RootLayout({ children }) {
  const router = useRouter();

  // Check if the current page is the admin dashboard (/lg) or the logs page (/logs)
  const isDashboard = router.pathname === "/lg";
  const isLogsPage = router.pathname === "/logs";

  // Hide floating elements (chatbot, sticky btn, cookie banner) on dashboard and logs pages
  const hideFloatingElements = isDashboard || isLogsPage;

  return (
    <div>
      <main>
        {children}
        
        {/* Only render overlays if we are NOT on the dashboard or logs page */}
        {!hideFloatingElements && (
          <>
            <CookieConsentBanner />
            <AicyroChatbot />
            <Sticky />
          </>
        )}
      </main>
    </div>
  );
}