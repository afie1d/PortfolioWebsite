export interface CVEntry {
  role: string;
  company: string;
  dateRange: string;
  description: string;
}

export const cvEntries: CVEntry[] = [
  {
    role: 'Machine Learning Engineer',
    company: 'Thalasso Therapeutics',
    dateRange: '2025 — Present',
    description:
      'Building computer vision systems for medical imaging. Guiding business and product strategy with technical insights.',
  },
  {
    role: 'Machine Learning Intern',
    company: 'Rose-Hulman Ventures',
    dateRange: 'Summer 2024',
    description:
      'Developed medical image segmentation models. Designed novel algorithms for orienting and aligning anatomical structures in 3D space.',
  },
  {
    role: 'BS Computer Science & Entrepreneurship',
    company: 'Rose-Hulman Institute of Technology',
    dateRange: '2021 — 2025',
    description:
      'Graduated summa cum laude as a member of Phi Gamma Delta fraternity and football team captain.',
  },
];
