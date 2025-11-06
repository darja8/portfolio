// components/Title.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBlob from "./AnimatedBlob";

gsap.registerPlugin(ScrollTrigger);

export default function Title() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.to(el, {
      yPercent: -30,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "80% top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="title-section">
      {/* Left blob */}
      <AnimatedBlob
        size={700}
        radius={120}
        numPoints={15}
        wobble={15}
        offsetX={-70}
        offsetY={0}
        gradientColors={["#f2709c", "#ff9472"]}
        gradientId="blob1"
      />

      {/* Right blob */}
      <AnimatedBlob
        size={600}
        radius={100}
        numPoints={10}
        wobble={20}
        offsetX={80}
        offsetY={50}
        gradientColors={["#DAD299", "#B0DAB9"]}
        gradientId="blob2"
      />

      <h1 className="intro-name">Daria Skrzypczak</h1>

      <div className="scroll-arrow">↓ Scroll</div>
    </section>
  );
}
