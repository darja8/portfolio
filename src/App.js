import AnimatedBlob from "./components/AnimatedBlob";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Left blob */}
      <AnimatedBlob
        size={700}
        radius={120}
        numPoints={15}
        opacity={1} 
        wobble={15}
        offsetX={-70}  // slightly more left to balance
        offsetY={0}
        gradientColors={["#f2709c", "#ff9472"]}
        gradientId="blob1"
      />

      {/* Right blob */}
      <AnimatedBlob
        size={600}
        radius={100}
        numPoints={10}
        opacity={1}
        wobble={20}
        offsetX={80}   // slightly less right
        offsetY={50}
        gradientColors={["#DAD299", "#B0DAB9"]}
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
      
    </div>
  );
}

export default App;




// import React from "react";
// import Intro from "./components/Intro";

// function App() {
//   return (
//     <main className="relative overflow-hidden">
//       <Intro />
//     </main>
//   );
// }

// export default App;
