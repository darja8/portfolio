import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

const AnimatedBlob = ({
  size = 400,
  radius = 70,
  numPoints = 12,
  wobble = 6,
  opacity = 0.6,
  offsetX = 0,
  offsetY = 0,
  gradientId = "grad", 
  gradientColors = ["#FF0066", "#FF8C00"],
}) => {
  const pathRef = useRef(null);
  const center = { x: size / 2 + offsetX, y: size / 2 + offsetY };
  const phases = Array.from({ length: numPoints }, () => Math.random() * 2 * Math.PI);

  useAnimationFrame((t) => {
    if (!pathRef.current) return;

    const points = Array.from({ length: numPoints }, (_, i) => {
      const angle = (i / numPoints) * 2 * Math.PI;
      const offset = Math.sin(t / 3000 + phases[i]) * wobble;
      return {
        x: center.x + Math.cos(angle) * (radius + offset),
        y: center.y + Math.sin(angle) * (radius + offset),
      };
    });

    const getPath = (pts) => {
      const sizePts = pts.length;
      let d = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 0; i < sizePts; i++) {
        const p0 = pts[(i - 1 + sizePts) % sizePts];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % sizePts];
        const p3 = pts[(i + 2) % sizePts];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
      }
      d += " Z";
      return d;
    };

    pathRef.current.setAttribute("d", getPath(points));
  });

  return (
    <motion.svg
      className="intro-blob"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          {gradientColors.map((color, i) => (
            <stop
              key={i}
              offset={`${(i / (gradientColors.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
      </defs>
      <path ref={pathRef} fill={`url(#${gradientId})`} opacity={opacity} />
    </motion.svg>
  );
};

export default AnimatedBlob;




// import { motion } from "framer-motion";

// const AnimatedBlob = () => {
//   return (
//     <motion.svg
//       className="intro-blob"
//       viewBox="0 0 200 200"
//       xmlns="http://www.w3.org/2000/svg"
//       animate={{
//         rotate: [0, 10, -10, 0],
//         y: [0, -20, 20, 0],
//       }}
//       transition={{
//         duration: 8,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     >
//       <path
//         fill="#FF0066"
//         d="M44.1,-49.8C54.2,-34,57.3,-17,59.4,2.1C61.5,21.2,62.6,42.4,52.5,54.2C42.4,66.1,21.2,68.6,-0.8,69.4C-22.8,70.2,-45.6,69.3,-62,57.4C-78.4,45.6,-88.5,22.8,-83.5,4.9C-78.6,-12.9,-58.6,-25.8,-42.2,-41.5C-25.8,-57.3,-12.9,-76,2.1,-78.1C17,-80.1,34,-65.6,44.1,-49.8Z"
//         transform="translate(100 100)"
//       />
//     </motion.svg>
//   );
// };

// export default AnimatedBlob;
