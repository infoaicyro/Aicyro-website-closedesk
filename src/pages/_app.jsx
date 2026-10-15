// // // src/pages/_app.jsx
// // import React, { useEffect } from "react";
// // import { useRouter } from "next/router";
// // import "@/styles/globals.css";
// // import RootLayout from "./layout";
// // import ThemeProvider from "../components/ThemeProvider";
// // import CookieConsentBanner from "../components/Essential/CookieConsentBanner";
// // import { trackVisit } from "../lib/activityTracker";
// // import Popupform from "@/components/Form/PopupModel";
// // import GlobalActivityTracker from "../components/GlobalActivityTracker";

// // // Import tracing utility
// // import { generateCorrelationId } from "../lib/tracer";
// // import { createWebsiteLogger } from "../lib/loggerPresets";

// // const routerLogger = createWebsiteLogger("AppRouter");

// // export default function App({ Component, pageProps }) {
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (router.isReady) {
// //       const initialPageTxId = generateCorrelationId();
// //       // 🚨 TICKET 3: page_loaded
// //       routerLogger.info("navigation", "page_loaded", {
// //         correlation: { correlation_id: initialPageTxId },
// //         context: { endpoint: router.pathname },
// //       });
// //       trackVisit(router.pathname, initialPageTxId);
// //     }

// //     const handleRouteChange = (url) => {
// //       const routeTxId = generateCorrelationId();
// //       // 🚨 TICKET 3: page_loaded
// //       routerLogger.info("navigation", "page_loaded", {
// //         correlation: { correlation_id: routeTxId },
// //         context: { endpoint: url },
// //       });
// //       trackVisit(url, routeTxId);
// //     };

// //     router.events.on("routeChangeComplete", handleRouteChange);
// //     return () => router.events.off("routeChangeComplete", handleRouteChange);
// //   }, [router.isReady, router.pathname]);

// //   const isLogsPage = router.pathname === "/logs";

// //   return (
// //     <ThemeProvider>
// //       <RootLayout>
// //         <GlobalActivityTracker />

// //         <Component {...pageProps} />

// //         {!isLogsPage && (
// //           <>
// //             {/* <Popupform /> */}
// //             <CookieConsentBanner />
// //           </>
// //         )}
// //       </RootLayout>
// //     </ThemeProvider>
// //   );
// // }


// // src/pages/_app.jsx

// import "@/styles/globals.css";
// import Head from "next/head";
// import Favicon from "../assets/favicon.png";
// import LogoAnimation from "../Components/LogoAnimation";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import "@/styles/globals.css";
// import RootLayout from "./layout";
// import ThemeProvider from "../Components/ThemeProvider";
// import { trackVisit } from "../lib/activityTracker";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// import CookieConsentBanner from "../components/Essntials/CookieConsentBanner";

// import { Poppins } from "next/font/google";

// const DEFAULT_TITLE = "Advanced AI & Cybersecurity Solutions | Aicyro ";
// const DEFAULT_DESC = "Aicyro Solutions is a SaaS development company...";
// const DEFAULT_KEYWORDS = "SaaS development company, Cyber security experts...";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "600", "700", "800"], // Match weights from your report
//   variable: "--font-poppins", // Optional: if you use Tailwind variables
//   display: "swap",
// });
// export default function App({ Component, pageProps }) {
//   const router = useRouter();

//   const [showSplash, setShowSplash] = useState(false);

//   useEffect(() => {
//     const hasVisited = sessionStorage.getItem("aicyro_visited");
//     if (!hasVisited) {
//       setShowSplash(true);
//       sessionStorage.setItem("aicyro_visited", "true");
//     }
//   }, []);

//   useEffect(() => {
//     // Track the landing page view exactly once
//     if (router.isReady) {
//       trackVisit(router.pathname);
//     }

//     // Track subsequent navigations
//     const handleRouteChange = (url) => trackVisit(url);
//     router.events.on("routeChangeComplete", handleRouteChange);

//     return () => {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [router.isReady, router.pathname]);

//   return (
//     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
//       <Head>
//         <title>{DEFAULT_TITLE}</title>
//         <meta name="description" content={DEFAULT_DESC} />
//         <meta name="keywords" content={DEFAULT_KEYWORDS} />
//         <meta name="robots" content="index, follow" />
//         <meta name="googlebot" content="index, follow" />
//         <link rel="icon" href={Favicon.src} />
//       </Head>
//       {showSplash && <LogoAnimation onComplete={() => setShowSplash(false)} />}
//       <ThemeProvider>
//         <RootLayout className={poppins.className}>
//           <Component {...pageProps} />
//           {!isLogsPage && (
//           <>
//             {/* <Popupform /> */}
//             <CookieConsentBanner />
//           </>
//           )}
//         </RootLayout>
//       </ThemeProvider>
//     </GoogleOAuthProvider>
//   );
// }


//
//
//
//

//

//
//

// src/pages/_app.jsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Poppins } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "@/styles/globals.css";
import Favicon from "../assets/favicon.png";
import LogoAnimation from "../Components/LogoAnimation";
import RootLayout from "./layout";
import ThemeProvider from "../Components/ThemeProvider";

// Tracking, Tracing, and Logging Imports
import { trackVisit } from "../lib/activityTracker";
import { generateCorrelationId } from "../lib/tracer";
import { createWebsiteLogger } from "../lib/loggerPresets";
import GlobalActivityTracker from "../components/GlobalActivityTracker";
import CookieConsentBanner from "../components/Essntials/CookieConsentBanner";

const DEFAULT_TITLE = "Advanced AI & Cybersecurity Solutions | Aicyro ";
const DEFAULT_DESC = "Aicyro Solutions is a SaaS development company...";
const DEFAULT_KEYWORDS = "SaaS development company, Cyber security experts...";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Initialize Logger
const routerLogger = createWebsiteLogger("AppRouter");

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(false);

  // Define isLogsPage to hide the banner/popups on the logs page
  const isLogsPage = router.pathname === "/logs";

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("aicyro_visited");
    if (!hasVisited) {
      setShowSplash(true);
      sessionStorage.setItem("aicyro_visited", "true");
    }
  }, []);

  // Merged Tracking and Logging Logic
  useEffect(() => {
    if (router.isReady) {
      const initialPageTxId = generateCorrelationId();
      // 🚨 TICKET 3: page_loaded
      routerLogger.info("navigation", "page_loaded", {
        correlation: { correlation_id: initialPageTxId },
        context: { endpoint: router.pathname },
      });
      trackVisit(router.pathname, initialPageTxId);
    }

    const handleRouteChange = (url) => {
      const routeTxId = generateCorrelationId();
      // 🚨 TICKET 3: page_loaded
      routerLogger.info("navigation", "page_loaded", {
        correlation: { correlation_id: routeTxId },
        context: { endpoint: url },
      });
      trackVisit(url, routeTxId);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.isReady, router.pathname]);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESC} />
        <meta name="keywords" content={DEFAULT_KEYWORDS} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="icon" href={Favicon.src} />
      </Head>
      
      {showSplash && <LogoAnimation onComplete={() => setShowSplash(false)} />}
      
      <ThemeProvider>
        <RootLayout className={poppins.className}>
          {/* Re-added GlobalActivityTracker from the old version */}
          <GlobalActivityTracker />

          <Component {...pageProps} />
          
          {/* Conditionally hide cookie banner and popups on /logs route */}
          {!isLogsPage && (
            <>
              {/* <Popupform /> */}
              <CookieConsentBanner />
            </>
          )}
        </RootLayout>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}