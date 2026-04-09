export type SkillCategory =
  | 'Machine Learning / AI'
  | 'Medical Imaging'
  | 'Software Development'

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: 1 | 2 | 3 | 4 | 5;
}

export const skills: Skill[] = [
  // Machine Learning / AI
  { name: 'GANs',                       category: 'Machine Learning / AI', proficiency: 4 },
  { name: 'Vision-Language Models',     category: 'Machine Learning / AI', proficiency: 4 },
  { name: 'PyTorch',                    category: 'Machine Learning / AI', proficiency: 4 },
  { name: 'TorchIO',                    category: 'Machine Learning / AI', proficiency: 4 },
  { name: 'torchvision',                category: 'Machine Learning / AI', proficiency: 4 },
  { name: 'OpenCV',                     category: 'Machine Learning / AI', proficiency: 3 },
  { name: 'MLflow',                     category: 'Machine Learning / AI', proficiency: 3 },

  // Medical Imaging
  { name: 'DRR Generation',             category: 'Medical Imaging', proficiency: 4 },
  { name: 'Projection Geometry',        category: 'Medical Imaging', proficiency: 4 },
  { name: 'DICOM / NIfTI Pipelines',    category: 'Medical Imaging', proficiency: 3 },
  { name: 'SimpleITK',                  category: 'Medical Imaging', proficiency: 2 },

  // Software Development
  { name: 'Python',                     category: 'Software Development', proficiency: 5 },
  { name: 'Linux / Bash',               category: 'Software Development', proficiency: 4 },
  { name: 'NumPy',                      category: 'Software Development', proficiency: 4 },
  { name: 'REST APIs / BentoML',        category: 'Software Development', proficiency: 2 },
];
