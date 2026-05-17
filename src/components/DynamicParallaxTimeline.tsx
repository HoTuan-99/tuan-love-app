"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import loveConfig from "@/config/loveConfig";
import styles from "./ParallaxTimeline.module.css";

type DynamicParallaxTimelineProps = {
  photos: (string | null)[];
  memoryDates?: string[];
};

function formatDate(date?: string) {
  if (!date) return "Our Journey";

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return date;
}

export default function DynamicParallaxTimeline({
  photos,
  memoryDates = [],
}: DynamicParallaxTimelineProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const photoItems = useMemo(() => {
    return photos.map((src, i) => {
      const defaultMilestone = loveConfig.milestones[i] || {
        title: `Memory ${i + 1}`,
        date: "Our Journey",
        description: "Every moment with you is a treasure.",
      };

      return {
        src,
        index: i,
        milestone: {
          ...defaultMilestone,
          date: formatDate(memoryDates[i] || defaultMilestone.date),
        },
      };
    });
  }, [photos, memoryDates]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set(prev).add(index));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [photoItems.length]);

  return (
    <section className={styles.timeline}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Our Love Story</h2>
          <p>Every moment, a chapter in our beautiful journey together</p>
        </div>

        <div className={styles.timelineTrack}>
          {photoItems.map((item, index) => {
            if (!item.src) return null;

            const isEven = item.index % 2 === 0;
            const isVisible = visibleItems.has(index);

            return (
              <div
                key={item.index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`${styles.timelineItem} ${
                  isVisible ? styles.visible : ""
                } ${isEven ? styles.left : styles.right}`}
              >
                <div className={styles.itemContent}>
                  <div className={styles.photoWrapper}>
                    <div className={styles.photoFrame}>
                      <img
                        src={item.src}
                        alt={item.milestone.title}
                        className={styles.photo}
                        loading="lazy"
                      />
                      <div className={styles.photoOverlay}></div>
                    </div>

                    <div className={styles.heartFloat}>💕</div>
                  </div>

                  <div className={styles.milestoneCard}>
                    <div className={styles.dateTag}>
                      <span className={styles.calendarIcon}>📅</span>
                      {item.milestone.date}
                    </div>

                    <h3 className={styles.milestoneTitle}>
                      {item.milestone.title}
                    </h3>

                    <p className={styles.milestoneDescription}>
                      {item.milestone.description}
                    </p>
                  </div>
                </div>

                <div className={styles.connector}>
                  <div className={styles.dot}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}