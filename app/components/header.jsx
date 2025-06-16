'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Header({ settings }) {
  const { siteTitle, mainHeadingMenu, sideHeadingMenu = [] } = settings;

  const [mobileOpen, setMobileOpen] = useState(false);
  const detailsRefs = useRef([]);

  useEffect(() => {
    // Close all other <details> when one is opened
    detailsRefs.current.forEach((el, idx) => {
      if (el) {
        el.addEventListener("toggle", () => {
          if (el.open) {
            detailsRefs.current.forEach((other, i) => {
              if (i !== idx && other) other.open = false;
            });
          }
        });
      }
    });
  }, []);

  return (
    <header className="site-header">
      <div className="heading-left">
        <div className="site-branding">
          <Link href="/">
            <h1>{siteTitle}</h1>
          </Link>
          <div className="circles">
            <div className="yellow"></div>
            <div className="orange"></div>
            <div className="blue"></div>
          </div>

          {/* 🍔 Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <nav
          className={`main-heading-menu ${
            mobileOpen ? "openMenu" : "collapsed"
          }`}
        >
          {mainHeadingMenu.map((item, index) => {
            if (item._type === "page") {
              return (
                <li key={item._id || item.slug?.current}>
                  <Link href={`/${item.slug?.current}`}>{item.title}</Link>
                </li>
              );
            }

            if (item._type === "category") {
              return (
                <li key={item._id || item.slug?.current}>
                  <details ref={(el) => (detailsRefs.current[index] = el)}>
                    <summary>
                      {item.title}
                      <span className="summary-toggle-icon">
                      
                      </span>
                    </summary>
                    <ul
                      style={{
                        background: item.hexColor || "inherit",
                      }}
                    >
                      {item.projects?.map((project) => (
                        <li key={project._id || project.slug?.current}>
                          <Link href={`/projects/${project.slug?.current}`}>
                            {project.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            }

            return null;
          })}
        </nav>
      </div>

      {sideHeadingMenu.length > 0 && (
        <nav
          className={`side-heading-menu ${
            mobileOpen ? "open" : "collapsed"
          }`}
        >
          {sideHeadingMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.linkUrl}>{item.linkTitle}</Link>
            </li>
          ))}
        </nav>
      )}
    </header>
  );
}
