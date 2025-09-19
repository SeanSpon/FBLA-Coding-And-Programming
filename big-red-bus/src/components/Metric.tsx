"use client";

import { useInView, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export function Metric({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useSpring(0, { damping: 100, stiffness: 100 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(
    () =>
      motionValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            Math.round(latest)
          );
        }
      }),
    [motionValue]
  );

  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-primary-red">
        <span ref={ref} />
      </p>
      <p className="text-warm-gray">{label}</p>
    </div>
  );
}
