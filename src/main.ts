import './styles/global.css';
import './styles/nav.css';
import './styles/sections/home.css';
import './styles/sections/about.css';
import './styles/sections/projects.css';
import './styles/sections/skills.css';
import './styles/sections/cv.css';

import { renderHome } from './sections/home.ts';
import { renderAbout } from './sections/about.ts';
import { renderProjects } from './sections/projects.ts';
import { renderSkills } from './sections/skills.ts';
import { renderCV } from './sections/cv.ts';
import { track } from './analytics.ts';

// ─── Render all sections ──────────────────────────────────────────────────────
renderHome();
renderAbout();
renderProjects();
renderSkills();
renderCV();

// ─── Analytics: pageview ──────────────────────────────────────────────────────
track('pageview');

// ─── Nav: active section tracking ────────────────────────────────────────────
const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav__link[data-section]');
const sectionIds = ['home', 'about', 'projects', 'skills', 'cv'] as const;
const sectionMap = new Map<string, HTMLElement>();

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionMap.set(id, el);
});

const activeVisibleSections = new Set<string>();

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = (entry.target as HTMLElement).id;
      if (entry.isIntersecting) {
        activeVisibleSections.add(id);
      } else {
        activeVisibleSections.delete(id);
      }
    });

    // Set the first visible section (top-most) as active
    let activeId: string | null = null;
    for (const id of sectionIds) {
      if (activeVisibleSections.has(id)) {
        activeId = id;
        break;
      }
    }

    navLinks.forEach((link) => {
      link.classList.toggle('nav-active', link.dataset['section'] === activeId);
    });
  },
  { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
);

sectionMap.forEach((el) => navObserver.observe(el));

// ─── Nav: smooth scroll ───────────────────────────────────────────────────────
document.querySelectorAll<HTMLAnchorElement>('[data-scroll-to]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.dataset['scrollTo'];
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeOverlay();
    }
  });
});

// ─── Nav: hamburger ───────────────────────────────────────────────────────────
const hamburger = document.querySelector<HTMLButtonElement>('.nav__hamburger');
const overlay = document.querySelector<HTMLElement>('.nav__overlay');

function closeOverlay(): void {
  overlay?.classList.remove('is-open');
  hamburger?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  const isOpen = overlay?.classList.toggle('is-open') ?? false;
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeOverlay();
});

// ─── Scroll animations: section fade-in ──────────────────────────────────────
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll<HTMLElement>('.section-animate').forEach((el) => {
  scrollObserver.observe(el);
});

// ─── Skills: animate bars on scroll ──────────────────────────────────────────
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsSection.classList.add('skills-animated');
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  skillsObserver.observe(skillsSection);
}

// ─── Analytics: section views ────────────────────────────────────────────────
const sectionViewObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        track('section_view', { section: (entry.target as HTMLElement).id });
        sectionViewObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

sectionMap.forEach((el) => sectionViewObserver.observe(el));

// ─── CV: per-card slide-in animations ────────────────────────────────────────
const cvObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        cvObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 },
);

document.querySelectorAll<HTMLElement>('.cv-entry').forEach((el) => {
  cvObserver.observe(el);
});
