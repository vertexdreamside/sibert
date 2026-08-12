"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/content";

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-green-deep"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative w-[110px] h-[110px]"
          >
            <Image src={SITE.logoMark} alt="" fill sizes="110px" className="object-contain" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
            className="font-script text-2xl text-sand mt-4"
          >
            {SITE.name}
          </motion.span>
          <div className="mt-5 w-32 h-[2px] rounded bg-gold/20 relative overflow-hidden">
            <motion.span
              className="absolute inset-y-0 w-2/5 bg-gold rounded"
              animate={{ left: ["-40%", "100%"] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
