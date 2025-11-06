// App.js
import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import AnimatedBlob from "./components/AnimatedBlob";
import "./App.css";
import "./components/Intro.css";
import DariaPhoto from "./imgdaria.jpeg";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const hero = document.querySelector(".app");
    gsap.to(hero, {
      opacity: 0,
      y: -150,
      ease: "power2.out",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });


    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);


  const scrollToIntro = () => {
    const introSection = document.getElementById("intro");
    if (introSection) {
      introSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="app">
        {/* Left blob */}
        <AnimatedBlob
          size={700}
          radius={120}
          numPoints={15}
          opacity={1}
          wobble={15}
          offsetX={-70}
          offsetY={0}
          gradientColors={["var(--color-primary)", "var(--color-primary-sunset)"]}
          gradientId="blob1"
        />

        {/* Right blob */}
        <AnimatedBlob
          size={600}
          radius={100}
          numPoints={10}
          opacity={1}
          wobble={20}
          offsetX={80}
          offsetY={50}
          gradientColors={["var(--color-secondary)", "var(--color-secondary-xlight)"]}
          gradientId="blob2"
        />

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="intro-name"
        >
          Daria Skrzypczak
        </motion.h1>

        {/* Scroll Arrow */}
        <motion.div
          className="scroll-arrow"
          onClick={scrollToIntro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          ↓
        </motion.div>
      </div>

      {/* --- INTRO SECTION --- */}
      
      <section id="intro" className="intro-section">
        <div className="intro-content">
          <div className="intro-left">
            <h2 className="intro-title">
              <span className="title-text-gradient">About Me</span>
            </h2>
            <div className="intro-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
          
          <div className="intro-right">
            <div className="photo-container">
              <img 
                src={DariaPhoto} 
                alt="Photo of Daria" 
                className="intro-photo" 
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
