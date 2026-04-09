export interface Project {
  name: string;
  description: string;
  skills: string[];
  githubUrl: string;
}

export const projects: Project[] = [
  {
    name: 'Uncertainty Prediction for Vision-Language Models',
    description:
      'Senior thesis: A novel vision-based framework for epistemic uncertainty estimation in vision-language models. Awarded best presentation at the 2025 RHIT CSSE Symposium.',
    skills: ['VLMs', 'BLIP', 'Pytorch'],
    githubUrl: 'https://github.com/afie1d/VisualUncertaintyPrediction',
  },
  {
    name: 'Music Genre Classifier',
    description:
      'Music genre classification from audio signals using both convolutional and transformer-based networks.',
    skills: ['WaveNet', 'Signal Processing', 'CNN', 'Transformers'],
    githubUrl: 'https://github.com/afie1d/music-style-transfer',
  },
  {
    name: 'Sudoku Solver',
    description:
      'A comparison of backtracking and CNN-based approaches to solving Sudoku puzzles of varying difficulty.',
    skills: ['CNN', 'Python'],
    githubUrl: 'https://github.com/afie1d/sudoku',
  },
  {
    name: 'MNIST Digit Recognition',
    description:
      'A reproduction of the LeNet-5 architecture for handwritten digit recognition, along with a comparison against modern optimizers and regularization techniques.',
    skills: ['CNN', 'PyTorch', 'Python'],
    githubUrl: 'https://github.com/afie1d/LeNet',
  },
];
