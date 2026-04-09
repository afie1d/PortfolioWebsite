import { skills, type SkillCategory } from '../data/skills.ts';

function renderBars(proficiency: number, categoryIndex: number): string {
  return Array.from({ length: 5 }, (_, i) => {
    const filled = i < proficiency;
    return `<span
      class="skill-bar${filled ? ' skill-bar--filled' : ''}"
      style="${filled ? `--bar-index:${i};--category-delay:${categoryIndex * 200}ms` : ''}"
    ></span>`;
  }).join('');
}

export function renderSkills(): void {
  const section = document.getElementById('skills');
  if (!section) return;

  const categories: SkillCategory[] = [
    'Machine Learning / AI',
    'Medical Imaging',
    'Software Development',
  ];

  const grouped = categories.map((cat, catIndex) => {
    const categorySkills = skills.filter((s) => s.category === cat);
    const rows = categorySkills
      .map(
        (skill) => `
        <div class="skill-row">
          <span class="skill-row__name">${skill.name}</span>
          <div class="skill-bars" aria-label="${skill.proficiency} out of 5">
            ${renderBars(skill.proficiency, catIndex)}
          </div>
        </div>`,
      )
      .join('');

    return `
      <div class="skills-category">
        <h3 class="skills-category__title">${cat}</h3>
        ${rows}
      </div>`;
  });

  section.innerHTML = `
    <h2 class="section-title">Skills</h2>
    ${grouped.join('')}
  `;
}
