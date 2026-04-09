import headshotUrl from '../assets/headshot.JPG';

export function renderAbout(): void {
  const section = document.getElementById('about');
  if (!section) return;

  const photoHTML = `
    <img src="${headshotUrl}" alt="Adam Field" class="about__photo" />
  `;

  section.innerHTML = `
    <h2 class="section-title">About</h2>
    <div class="about__grid">
      <div class="about__text">
        <p>
          I'm a machine learning engineer focused on computer vision and health technology. 
          I currently work at an early-stage medical AI startup where I research, design, 
          develop, and deploy deep learning models for high-stakes clinical environments.
        </p>
        <p>
          I'm drawn to challenging problems that directly impact people's quality of life.
          My mission is to optimize healthspan through technology, creativity, and connection.
        </p>
      </div>
      <div class="about__photo-wrap">
        ${photoHTML}
      </div>
    </div>
  `;
}
