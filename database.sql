-- Essential SQL schema for EARIST news website
-- Admin credentials, categories, and news/articles with publication dates

CREATE TABLE admins (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE articles (
  article_id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  author VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NULL,
  content TEXT NOT NULL,
  published_date DATE NOT NULL,
  image_url VARCHAR(255) NULL,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
  display_location ENUM('homepage', 'topics', 'both') NOT NULL DEFAULT 'both',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Sample seed data
INSERT INTO admins (username, email, password_hash, full_name, role)
VALUES
  ('admin', 'admin@earist.edu.ph', '$2b$10$/zF9zhF9yMpb0ZwZCqxPqulc84QftcsiN0zCiO6O3WCUVjINg1Pny', 'EARIST Administrator', 'admin');

INSERT INTO categories (name, slug, description)
VALUES
  ('Science', 'science', 'News and updates on science and technology.'),
  ('Politics', 'politics', 'Latest political news and commentary.'),
  ('Sports', 'sports', 'Coverage of sports events and achievements.'),
  ('Nature', 'nature', 'Stories about nature, environment, and sustainability.');

INSERT INTO articles (category_id, author, title, summary, content, published_date, image_url, status)
VALUES
  (1, 'Admin Team', 'New Research Lab Opens at EARIST', 'EARIST opens a new research facility focusing on science and engineering projects.', 'Full article content for the new research lab opening.', '2026-04-20', 'https://picsum.photos/seed/science/800/450', 'published'),
  (2, 'Admin Team', 'Campus Policy Updates for 2026', 'Important policy changes affecting campus operations and student activities.', 'Full article content for the campus policy update.', '2026-04-18', 'https://picsum.photos/seed/politics/800/450', 'published'),
  (3, 'Admin Team', 'EARIST Sports Championship Celebration', 'EARIST teams win championships and celebrate outstanding athletes.', 'Full article content for the sports championship.', '2026-04-15', 'https://picsum.photos/seed/sports/800/450', 'published'),
  (4, 'Admin Team', 'Green Campus Initiative Launched', 'A new sustainability initiative focusing on nature and campus environment.', 'Full article content for the green campus initiative.', '2026-04-10', 'https://picsum.photos/seed/nature/800/450', 'published');
