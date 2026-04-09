import { projects } from '../data/projects.ts';
import { track } from '../analytics.ts';

const githubIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
</svg>`;

export function renderProjects(): void {
  const section = document.getElementById('projects');
  if (!section) return;

  const tilesHTML = projects
    .map(
      (project) => `
      <a
        class="project-tile"
        href="${project.githubUrl}"
        target="_blank"
        rel="noopener noreferrer"
        data-project="${project.name}"
        aria-label="${project.name} — view on GitHub"
      >
        <span class="project-tile__github">${githubIcon}</span>
        <h3 class="project-tile__name">${project.name}</h3>
        <p class="project-tile__desc">${project.description}</p>
        <ul class="project-tile__skills" aria-label="Technologies">
          ${project.skills.map((s) => `<li class="skill-pill">${s}</li>`).join('')}
        </ul>
      </a>`,
    )
    .join('');

  section.innerHTML = `
    <h2 class="section-title">Projects</h2>
    <div class="projects-grid">${tilesHTML}</div>
  `;

  section.querySelectorAll<HTMLAnchorElement>('.project-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      track('link_click', { label: `project_${tile.dataset['project'] ?? ''}` });
    });
  });
}
