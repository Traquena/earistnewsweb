import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// Create database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'earistnewsweb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Example endpoint to get articles
app.get('/api/articles', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, c.name as category 
      FROM articles a 
      LEFT JOIN categories c ON a.category_id = c.category_id 
      ORDER BY a.published_date DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const [rows]: any = await pool.query(`
      SELECT a.*, c.name as category 
      FROM articles a 
      LEFT JOIN categories c ON a.category_id = c.category_id 
      WHERE a.article_id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/articles/:id', upload.single('featureImage'), async (req, res) => {
  const { category_id, title, summary, content, date, status, author } = req.body;
  let featureImage = req.body.featureImage;

  if (req.file) {
    featureImage = `/uploads/${req.file.filename}`;
  }

  if (!title || !content || !category_id || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const [result]: any = await pool.query(
      'UPDATE articles SET category_id = ?, author = ?, title = ?, summary = ?, content = ?, published_date = ?, image_url = ?, status = ?, display_location = ? WHERE article_id = ?',
      [category_id, author || 'Admin Team', title, summary, content, date, featureImage, status || 'published', req.body.display_location || 'both', req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ message: 'Article updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const [result]: any = await pool.query('DELETE FROM articles WHERE article_id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example endpoint to get categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/articles', upload.single('featureImage'), async (req, res) => {
  const { category_id, title, summary, content, date, status, author } = req.body;
  let featureImage = '';

  if (req.file) {
    featureImage = `/uploads/${req.file.filename}`;
  }

  if (!title || !content || !category_id || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const [result]: any = await pool.query(
      'INSERT INTO articles (category_id, author, title, summary, content, published_date, image_url, status, display_location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [category_id, author || 'Admin Team', title, summary, content, date, featureImage, status || 'published', req.body.display_location || 'both']
    );
    res.status(201).json({ message: 'Article created successfully', articleId: result.insertId });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT admin_id, username, email, full_name, role, created_at FROM admins');
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const [rows]: any = await pool.query('SELECT admin_id, username, email, full_name, role, created_at FROM admins WHERE admin_id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { email, full_name, role } = req.body;
  if (!email || !full_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const [result]: any = await pool.query(
      'UPDATE admins SET email = ?, full_name = ?, role = ? WHERE admin_id = ?',
      [email, full_name, role || 'admin', req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const [result]: any = await pool.query('DELETE FROM admins WHERE admin_id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/dashboard-stats', async (req, res) => {
  try {
    const [articles]: any = await pool.query('SELECT COUNT(*) as count FROM articles');
    const [published]: any = await pool.query('SELECT COUNT(*) as count FROM articles WHERE status = "published"');
    const [categories]: any = await pool.query('SELECT COUNT(*) as count FROM categories');
    const [users]: any = await pool.query('SELECT COUNT(*) as count FROM admins');
    
    res.json({
      totalArticles: articles[0].count,
      publishedArticles: published[0].count,
      totalCategories: categories[0].count,
      totalUsers: users[0].count
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const [rows]: any = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return the user without the password hash
    const { password_hash, ...userProfile } = admin;
    res.json(userProfile);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, email, password, fullName } = req.body;
  if (!username || !email || !password || !fullName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user exists
    const [existing]: any = await pool.query('SELECT * FROM admins WHERE username = ? OR email = ?', [username, email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result]: any = await pool.query(
      'INSERT INTO admins (username, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, fullName, 'admin']
    );

    res.status(201).json({ message: 'Account created successfully', userId: result.insertId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
