import { track } from '../analytics.ts';

interface SocialLink {
  label: string;
  href: string;
  ariaLabel: string;
  icon: string;
  trackLabel: string;
}

const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/afie1d',
    ariaLabel: 'Adam Field on LinkedIn',
    trackLabel: 'linkedin',
    icon: `<svg class="home__social-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3"/>
      <path d="M7 10v7M7 7v.01M12 10v7M12 13a3 3 0 0 1 6 0v4"/>
    </svg>`,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/afie1d',
    ariaLabel: 'Adam Field on GitHub',
    trackLabel: 'github',
    icon: `<svg class="home__social-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>`,
  },
  {
    label: 'Email',
    href: 'mailto:adamjfield@outlook.com',
    ariaLabel: 'Email Adam Field',
    trackLabel: 'email',
    icon: `<svg class="home__social-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>`,
  },
  {
    label: 'Resume',
    href: '/Adam_Field_Resume.pdf',
    ariaLabel: 'Download Adam Field\'s resume',
    trackLabel: 'resume',
    icon: `<svg class="home__social-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <polyline points="9 15 12 18 15 15"/>
    </svg>`,
  },
];

export function renderHome(): void {
  const section = document.getElementById('home');
  if (!section) return;

  const socialHTML = socialLinks
    .map((link) => {
      const isDownload = link.trackLabel === 'resume';
      const downloadAttr = isDownload ? ' download' : '';
      const targetAttr = isDownload ? '' : ' target="_blank" rel="noopener noreferrer"';
      return `<a
          class="home__social-link"
          href="${link.href}"${targetAttr}${downloadAttr}
          aria-label="${link.ariaLabel}"
          data-track="${link.trackLabel}"
        >${link.icon}<span>${link.label}</span></a>`;
    })
    .join('');

  section.innerHTML = `
    <div class="home__bg" aria-hidden="true"></div>
    <div class="home__content">
      <p class="home__eyebrow">Hello, I'm</p>
      <h1 class="home__title">Adam Field</h1>
      <p class="home__subtitle">
        Machine learning engineer building at the intersection of
        computer vision and health technology.
      </p>
      <nav class="home__social" aria-label="Social links">
        ${socialHTML}
      </nav>
    </div>
    <div class="home__scroll-cue" aria-hidden="true">
      <svg class="home__scroll-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M10 4v12M4 10l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  `;

  section.querySelectorAll<HTMLAnchorElement>('.home__social-link').forEach((el) => {
    el.addEventListener('click', () => {
      track('link_click', { label: el.dataset['track'] ?? '' });
    });
  });
}
