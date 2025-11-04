import { Task } from '../types/task';
import { v4 as uuidv4 } from 'uuid';

export const generateSampleTasks = (): Task[] => {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return [
    {
      id: uuidv4(),
      title: 'Review and improve task manager app',
      description: 'Complete a thorough review of the task manager functionality, fix any issues, and make improvements to make it more interesting and well-documented.',
      priority: 'high',
      status: 'in-progress',
      dueDate: tomorrow,
      tags: ['review', 'development', 'improvement'],
      createdAt: lastWeek,
      updatedAt: now
    },
    {
      id: uuidv4(),
      title: 'Set up CI/CD pipeline',
      description: 'Configure automated testing and deployment pipeline for the project using GitHub Actions.',
      priority: 'high',
      status: 'todo',
      dueDate: nextWeek,
      tags: ['devops', 'automation', 'ci-cd'],
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      title: 'Design system documentation',
      description: 'Create comprehensive documentation for the design system including component library, color schemes, and typography guidelines.',
      priority: 'medium',
      status: 'todo',
      dueDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      tags: ['documentation', 'design', 'ui-ux'],
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      title: 'Implement dark mode',
      description: 'Add dark mode support to the application with toggle functionality and system preference detection.',
      priority: 'medium',
      status: 'todo',
      dueDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
      tags: ['feature', 'ui-ux', 'accessibility'],
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      title: 'Performance optimization',
      description: 'Analyze and optimize application performance including bundle size reduction, lazy loading, and caching strategies.',
      priority: 'low',
      status: 'completed',
      dueDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      tags: ['performance', 'optimization', 'technical-debt'],
      createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      title: 'User feedback analysis',
      description: 'Collect and analyze user feedback from the beta testing phase to identify improvement opportunities.',
      priority: 'high',
      status: 'completed',
      dueDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      tags: ['research', 'feedback', 'ux-research'],
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      title: 'Mobile responsiveness testing',
      description: 'Test and ensure the application works seamlessly across all mobile devices and screen sizes.',
      priority: 'medium',
      status: 'in-progress',
      dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      tags: ['testing', 'mobile', 'responsive'],
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: now
    },
    {
      id: uuidv4(),
      title: 'Security audit',
      description: 'Conduct a comprehensive security audit of the application including dependency scanning and penetration testing.',
      priority: 'high',
      status: 'todo',
      dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      tags: ['security', 'audit', 'compliance'],
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
    }
  ];
};