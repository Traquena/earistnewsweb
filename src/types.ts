/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
  role: string; // e.g., 'admin', 'student', 'faculty'
}

export const CATEGORIES = ['Science', 'Politics', 'Sports', 'Nature'];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'Iran rejects US Proposal',
    date: 'March 18, 2026',
    summary: 'As of late March 2026, Iran has officially rejected a 15-point U.S. proposal designed to end the ongoing military conflict.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/iran/800/450',
    category: 'Politics',
    author: 'John Doe',
    tags: ['Iran', 'US', 'Politics', 'War'],
    role: 'admin'
  },
  {
    id: '2',
    title: 'Department Launches Internship Program',
    date: 'March 20, 2026',
    summary: 'The department has officially launched its new internship program for the upcoming semester.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/internship/400/300',
    category: 'Sports',
    author: 'Jane Smith',
    tags: ['Internship', 'Department', 'Program'],
    role: 'faculty'
  },
  {
    id: '3',
    title: "JULIET'S BIRTHDAY NIGHT",
    date: 'May 26, 2026',
    summary: 'A celebration for Juliet\'s birthday was held last night with many attendees.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/birthday/400/300',
    category: 'Science',
    author: 'Mike Johnson',
    tags: ['Birthday', 'Celebration', 'Events'],
    role: 'student'
  }
];
