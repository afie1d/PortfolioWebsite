import { cvEntries } from '../data/cv.ts';

export function renderCV(): void {
  const section = document.getElementById('cv');
  if (!section) return;

  const entriesHTML = cvEntries
    .map((entry, i) => {
      const side = i % 2 === 0 ? 'left' : 'right';
      return `
        <div class="cv-entry cv-entry--${side}">
          <div class="cv-card">
            <p class="cv-card__date">${entry.dateRange}</p>
            <h3 class="cv-card__role">${entry.role}</h3>
            <p class="cv-card__company">${entry.company}</p>
            <p class="cv-card__desc">${entry.description}</p>
          </div>
        </div>`;
    })
    .join('');

  section.innerHTML = `
    <h2 class="section-title">Career</h2>
    <div class="cv-timeline">${entriesHTML}</div>
  `;
}
