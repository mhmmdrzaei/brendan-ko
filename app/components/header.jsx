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
    <header className={`${
            mobileOpen ? "headingOpen" : ""
          } site-header`}>
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
<button
  className={`hamburger ${mobileOpen ? 'active' : ''}`}
  onClick={() => setMobileOpen((prev) => !prev)}
  aria-label="Toggle menu"
>
  <span></span>
  <span></span>
  <span></span>
</button>

        </div>

        <nav
          className={`main-heading-menu ${
            mobileOpen ? "openMenu" : "collapsed"
          }`}
        >
          
{mainHeadingMenu.map((item, index) => {
  //
  // ------------------------------------
  // PAGE
  // ------------------------------------
if (item._type === "reference" && (!item.projects || item.projects.length === 0)) {
  return (
    <li key={item._id || item.slug?.current}>
      <Link href={`/${item.slug?.current}`}>{item.title}</Link>
    </li>
  );
}

  //
  // ------------------------------------
  // CATEGORY (now _type === "reference")
  // ------------------------------------
  if (item._type === "reference") {
    return (
      <li key={item._id || item.slug?.current}>
        <details ref={(el) => (detailsRefs.current[index] = el)}>
          <summary>
            {item.title}
            <span className="summary-toggle-icon"></span>
          </summary>

          <ul
            style={{
              background: item.hexColor || "#151b17",
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

  //
  // ------------------------------------
  // SUBMENU ITEM
  // ------------------------------------
  if (item._type === "submenuItem") {
    return (
      <li key={`submenu-${index}`} className="submenu-wrapper">
        <details ref={(el) => (detailsRefs.current[index] = el)}>
          <summary>
            {item.submenuHeading}
            <span className="summary-toggle-icon"></span>
          </summary>

          <ul style={{
              background: "#151b17",
            }}>
            {item.submenuItems?.map((sub, i) => (
              <li key={`submenu-item-${i}`}>
                <Link href={sub.url}>{sub.title}</Link>
              </li>
            ))}
          </ul>
        </details>
      </li>
    );
  }

  //
  // ------------------------------------
  // OUTBOUND LINK ITEM
  // ------------------------------------
  if (item._type === "outboundLinkItem") {
    return (
      <li key={`outbound-${index}`}>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </li>
    );
  }

  //
  // FALLBACK (in case something unexpected shows up)
  // ------------------------------------
  return null;
})}

        </nav>
      </div>

      {sideHeadingMenu.length > 0 && (
        <nav
          className={`side-heading-menu ${
            mobileOpen ? "openMenu" : "collapsed"
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
