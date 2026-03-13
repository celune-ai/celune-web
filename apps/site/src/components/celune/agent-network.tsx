'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Cycling words, one per agent ─── */

const CYCLE_WORDS = [
  { word: 'Shipping', agent: 'RICK', color: '#22c55e' },
  { word: 'Planning', agent: 'SAGE', color: '#a78bfa' },
  { word: 'Designing', agent: 'NOIR', color: '#f472b6' },
  { word: 'Scanning', agent: 'SCAN', color: '#60a5fa' },
  { word: 'Researching', agent: 'DELV', color: '#fbbf24' },
  { word: 'Deploying', agent: 'FLOW', color: '#34d399' },
  { word: 'Organizing', agent: 'ATLAS', color: '#f97316' },
];

export function AgentNetwork() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CYCLE_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const current = CYCLE_WORDS[index];

  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-medium tracking-tight whitespace-nowrap text-white md:text-5xl lg:text-6xl">
            A team that never stops{' '}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.word}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
                  className="inline-block"
                  style={{ color: current.color }}
                >
                  {current.word}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <p className="mt-6 text-lg text-neutral-400">
            Specialized agents work in parallel — planning, building, reviewing, and deploying around the clock.
          </p>
        </div>

      </div>
    </section>
  );
}
