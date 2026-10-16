
import React, { useState, useEffect, useRef } from "react";
import CaseStudyCard from "./CaseStudyCard";
import { ref, onValue } from "firebase/database";
import { database } from "../../lib/firebase12";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CaseStudiesSection = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  // --- INTERACTION STATE ---
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftSnapshot, setScrollLeftSnapshot] = useState(0);

  // --- PROGRESS STATE ---
  const [activeIndex, setActiveIndex] = useState(0);

  // --- FIREBASE FETCH ---
  useEffect(() => {
    const projectsRef = ref(database, "Protfolio");
    const unsubscribe = onValue(
      projectsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          const projectsArray = Object.values(fetchedData);
          projectsArray.sort((a, b) => a.id - b.id);
          setProjectsData(projectsArray);
        } else {
          setProjectsData([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firebase read error:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  // --- INFINITE LOOP DATA ---
  const DUPLICATION_FACTOR = 4;
  const marqueeList = Array(DUPLICATION_FACTOR).fill(projectsData).flat();

  // --- INITIAL CENTERING ON LOAD ---
  useEffect(() => {
    if (scrollRef.current && projectsData.length > 0) {
      const scrollContainer = scrollRef.current;

      // Wait for DOM to paint widths accurately
      setTimeout(() => {
        const cards = scrollContainer.children;
        const targetIndex = projectsData.length; // Start at the second set of duplicates

        if (cards && cards[targetIndex]) {
          const targetCard = cards[targetIndex];
          const containerCenter = scrollContainer.clientWidth / 2;
          const cardCenter = targetCard.offsetWidth / 2;

          scrollContainer.scrollLeft =
            targetCard.offsetLeft - containerCenter + cardCenter;
        }
      }, 100);
    }
  }, [projectsData]);

  // --- SCROLL ANIMATION LOOP ---
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrameId;

    const step = () => {
      if (scrollContainer) {
        // 1. Smooth Auto-rotate
        if (!isHovered && !isDragging) {
          scrollContainer.scrollLeft += 1; // Speed
        }

        const singleSetWidth = scrollContainer.scrollWidth / DUPLICATION_FACTOR;
        if (singleSetWidth > 0) {
          // 2. Seamless Infinite Reset Math
          if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
            scrollContainer.scrollLeft -= singleSetWidth;
          } else if (scrollContainer.scrollLeft <= 0) {
            scrollContainer.scrollLeft += singleSetWidth;
          }

          // 3. Update Progress Bar based on the CENTER of the screen
          // Find the absolute center pixel of the currently visible area
          const centerPixel =
            scrollContainer.scrollLeft + scrollContainer.clientWidth / 2;

          // Find where that pixel falls within a single "set" of data
          const relativeCenter = centerPixel % singleSetWidth;

          // Map that center point to the correct card index
          const progressRatio = relativeCenter / singleSetWidth;
          const newIndex =
            Math.floor(progressRatio * projectsData.length) %
            projectsData.length;

          if (newIndex !== activeIndex && !isNaN(newIndex)) {
            setActiveIndex(newIndex);
          }
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging, projectsData, activeIndex]);
  // --- SMOOTH DRAG HANDLERS ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Increased precision for starting position
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftSnapshot(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    // Multiplier adjusted to 1.5x for a natural, 1:1 fluid feel
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftSnapshot - walk;
  };

  const handleTouchStart = () => setIsHovered(true);
  const handleTouchEnd = () => setTimeout(() => setIsHovered(false), 1000);

  // --- MANUAL NAVIGATION ARROWS ---
  const handleManualScroll = (direction) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.firstElementChild;
      const scrollAmount = firstCard ? firstCard.clientWidth + 32 : 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // --- CLICK PROGRESS BAR TO PERFECTLY CENTER ---
  const scrollToCard = (index) => {
    if (scrollRef.current && projectsData.length > 0) {
      setActiveIndex(index);
      const scrollContainer = scrollRef.current;
      const cards = scrollContainer.children;
      const singleSetWidth = scrollContainer.scrollWidth / DUPLICATION_FACTOR;

      if (singleSetWidth === 0) return;

      // Target the set the user is currently looking at
      const currentSet = Math.floor(
        scrollContainer.scrollLeft / singleSetWidth,
      );
      let targetDomIndex = currentSet * projectsData.length + index;

      if (targetDomIndex >= cards.length) targetDomIndex = index;

      const targetCard = cards[targetDomIndex];

      if (targetCard) {
        const containerCenter = scrollContainer.clientWidth / 2;
        const cardCenter = targetCard.offsetWidth / 2;
        const scrollPosition =
          targetCard.offsetLeft - containerCenter + cardCenter;

        scrollContainer.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  if (loading) {
    return (
      <section className="bg-[var(--background)] min-h-[50vh] py-16 px-4 flex justify-center items-center text-[var(--foreground)] text-xl">
        Loading Case Studies...
      </section>
    );
  }

  return (
    <section className="bg-[var(--background)] py-16 sm:py-24 transition-colors duration-300 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 text-center mb-10 sm:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
          Case Studies
        </h2>
        <div className="h-1 w-20 bg-[var(--primary)] mx-auto rounded-full mb-4"></div>
        <p className="text-[var(--foreground-muted)] text-base sm:text-lg">
          Explore our proven track record.
        </p>
      </div>

      <div
        className="relative w-full mb-8 sm:mb-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => handleManualScroll("left")}
          onMouseEnter={() => setIsHovered(true)}
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] shadow-lg hover:bg-[var(--secondary)] hover:text-white transition-all duration-300 backdrop-blur-md group hidden sm:flex justify-center items-center cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--foreground)] group-hover:text-white" />
        </button>

        <button
          onClick={() => handleManualScroll("right")}
          onMouseEnter={() => setIsHovered(true)}
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] shadow-lg hover:bg-[var(--secondary)] hover:text-white transition-all duration-300 backdrop-blur-md group hidden sm:flex justify-center items-center cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-[var(--foreground)] group-hover:text-white" />
        </button>

        <div className="absolute top-0 left-0 h-full w-8 sm:w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-8 sm:w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className={`
            flex gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap py-8 no-scrollbar touch-pan-x
            ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          `}
          // REMOVED snap CSS classes so it slides beautifully
          style={{
            scrollBehavior: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {marqueeList.length > 0 ? (
            marqueeList.map((project, index) => (
              <div key={`${project.id}-${index}`} className="flex-shrink-0">
                <CaseStudyCard
                  title={project.title}
                  imageSrc={project.imageSrc}
                  projectUrl={project.projectUrl}
                  problem={
                    project.problem ||
                    project.details?.problem ||
                    project.description
                  }
                  client={project.client || project.details?.client}
                  solution={project.solution || project.details?.solution}
                  result={project.result || project.details?.result}
                />
              </div>
            ))
          ) : (
            <div className="text-[var(--foreground)] text-center w-screen p-8">
              No case studies available.
            </div>
          )}
        </div>
      </div>

      {projectsData.length > 0 && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex justify-center items-center gap-1.5 sm:gap-2 max-w-2xl mx-auto px-4 w-full"
        >
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="relative flex-1 min-w-[16px] max-w-[48px] h-1.5 sm:h-2 rounded-full cursor-pointer overflow-hidden bg-[var(--border-color)] transition-all hover:bg-[var(--foreground-muted)]"
            >
              {idx === activeIndex && (
                <motion.div
                  layoutId="active-progress-block"
                  className="absolute inset-0 bg-[var(--primary)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default CaseStudiesSection;
