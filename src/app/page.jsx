"use client";

import { frame, motion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export default function Drag() {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <div style={containerStyle}>
      <motion.img
        ref={ref}
        src="https://media.istockphoto.com/id/1415430015/vector/deflating-balloon-flies-away-flat-cartoon-vector-illustration-isolated-on-white.jpg?s=612x612&w=0&k=20&c=KYzLtrbv5kTnAcFsKoI2OYIBz5OxW4AFc4N8gV6m9P0="
        alt="Deflating Balloon"
        style={{ ...ball, x, y, objectFit: "cover" }}
      />
    </div>
  );
}

const spring = { damping: 3, stiffness: 50, restDelta: 0.001 };

export function useFollowPointer(ref) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }) => {
      const element = ref.current;

      frame.read(() => {
        x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        y.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [x, y, ref]);

  return { x, y };
}

const containerStyle = {
  width: "100vw",
  height: "100vh",
  backgroundImage: `url("https://cdn.cosmos.so/b638a3d5-7ed0-4531-bab5-45e02fc88175?format=jpeg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
  position: "relative",
  cursor: "none",
};

const ball = {
  width: 100,
  height: 100,
  borderRadius: "50%",
  objectFit: "cover",
  position: "absolute",
};
