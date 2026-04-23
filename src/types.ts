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

export interface AdminUser {
  username: string;
  password: string;
  name: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const ADMIN_ACCOUNTS: AdminUser[] = [
  {
    username: 'eren',
    password: '1234',
    name: 'Admin Eren'
  }
];

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
  },
  {
    id: '4',
    title: 'Election Watch Updates',
    date: 'March 16, 2026',
    summary: 'The latest updates on the upcoming elections and voter registration deadlines.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/politics2/800/450',
    category: 'Politics',
    author: 'Sarah Williams',
    tags: ['Election', 'Politics', 'Updates'],
    role: 'admin'
  },
  {
    id: '5',
    title: 'New Policy Announcement',
    date: 'March 14, 2026',
    summary: 'Campus administration announces new policies affecting student activities and campus operations.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/politics3/800/450',
    category: 'Politics',
    author: 'David Chen',
    tags: ['Policy', 'Announcement', 'Campus'],
    role: 'faculty'
  },
  {
    id: '6',
    title: 'New Research Lab Opens at EARIST',
    date: 'April 20, 2026',
    summary: 'EARIST opens a new research facility focusing on science and engineering projects.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/science/800/450',
    category: 'Science',
    author: 'Admin Team',
    tags: ['Research', 'Lab', 'Science'],
    role: 'admin'
  },
  {
    id: '7',
    title: 'Quantum Computing Breakthrough',
    date: 'April 18, 2026',
    summary: 'Researchers announce a major breakthrough in quantum computing applications.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/science1/800/450',
    category: 'Science',
    author: 'Jane Smith',
    tags: ['Quantum', 'Computing', 'Technology'],
    role: 'faculty'
  },
  {
    id: '8',
    title: 'EARIST Sports Championship Celebration',
    date: 'April 15, 2026',
    summary: 'EARIST teams win championships and celebrate outstanding athletic achievements.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/sports/800/450',
    category: 'Sports',
    author: 'Admin Team',
    tags: ['Championship', 'Sports', 'Athletes'],
    role: 'admin'
  },
  {
    id: '9',
    title: 'Basketball Tournament Results',
    date: 'April 12, 2026',
    summary: 'EARIST basketball team advances to the finals with an impressive victory.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/sports1/800/450',
    category: 'Sports',
    author: 'Mark Rivera',
    tags: ['Basketball', 'Tournament', 'Sports'],
    role: 'student'
  },
  {
    id: '10',
    title: 'Green Campus Initiative Launched',
    date: 'April 10, 2026',
    summary: 'A new sustainability initiative focusing on nature and campus environment conservation.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/nature/800/450',
    category: 'Nature',
    author: 'Admin Team',
    tags: ['Sustainability', 'Environment', 'Green'],
    role: 'admin'
  },
  {
    id: '11',
    title: 'Environmental Innovation Fair',
    date: 'April 08, 2026',
    summary: 'Students showcase innovative environmental and sustainability projects at campus fair.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/nature1/800/450',
    category: 'Nature',
    author: 'Lisa Green',
    tags: ['Innovation', 'Environment', 'Fair'],
    role: 'faculty'
  },
  {
    id: '12',
    title: 'Tree Planting Campaign Success',
    date: 'April 05, 2026',
    summary: 'Campus-wide tree planting campaign reaches goal of 500 trees planted.',
    content: 'Full content of the article would go here...',
    image: 'https://picsum.photos/seed/nature2/800/450',
    category: 'Nature',
    author: 'John Doe',
    tags: ['Trees', 'Environment', 'Campaign'],
    role: 'student'
  }
];
