import express from 'express';
import cors from 'cors';
import { run, all, get } from './db.js';
import crypto from 'crypto';
import fs from 'fs';

const app = express();
const port = 3114;

process.on('uncaughtException', err => fs.writeFileSync('err.log', err.stack));
process.on('unhandledRejection', err => fs.writeFileSync('err.log', err.stack));

app.use(cors());
app.use(express.json());

const initializeDb = async () => {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS resumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      public_id TEXT UNIQUE,
      title TEXT,
      template TEXT DEFAULT 'ClassicATS',
      font TEXT DEFAULT 'inter',
      personal_name TEXT,
      personal_title TEXT,
      personal_email TEXT,
      personal_phone TEXT,
      personal_location TEXT,
      personal_linkedin TEXT,
      personal_github TEXT,
      personal_summary TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS resume_versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      resume_id INTEGER,
      snapshot_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS experience (
      id TEXT PRIMARY KEY,
      resume_id INTEGER,
      company TEXT,
      role TEXT,
      location TEXT,
      start_date TEXT,
      end_date TEXT,
      details TEXT,
      order_idx INTEGER,
      FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS education (
      id TEXT PRIMARY KEY,
      resume_id INTEGER,
      school TEXT,
      degree TEXT,
      location TEXT,
      start_date TEXT,
      end_date TEXT,
      order_idx INTEGER,
      FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      resume_id INTEGER,
      name TEXT,
      tech TEXT,
      date TEXT,
      details TEXT,
      link TEXT,
      github_link TEXT,
      order_idx INTEGER,
      FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      resume_id INTEGER,
      category TEXT,
      items TEXT,
      order_idx INTEGER,
      FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS certifications (
      id TEXT PRIMARY KEY,
      resume_id INTEGER,
      name TEXT,
      issuer TEXT,
      date TEXT,
      link TEXT,
      order_idx INTEGER,
      FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
    )
  `);

  // Seed data if empty
  const usersCount = await get("SELECT COUNT(*) as count FROM users");
  if (usersCount.count === 0) {
    const userRes = await run("INSERT INTO users (name, email) VALUES (?, ?)", ['Demo User', 'demo@example.com']);
    const userId = userRes.lastID;
    const publicId = crypto.randomUUID();

    const resumeRes = await run(`
      INSERT INTO resumes (
        user_id, public_id, title, template, font, 
        personal_name, personal_title, personal_email, personal_phone, personal_location, personal_summary
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId, publicId, 'My Main Resume', 'ClassicATS', 'inter',
      'Alex Johnson', 'Full Stack Engineer', 'alex.j@example.com', '(555) 867-5309', 'New York, NY',
      'Detail-oriented software engineer with 5+ years of experience building scalable web applications. Passionate about clean code and intuitive user interfaces.'
    ]);
    const resumeId = resumeRes.lastID;

    await run(`INSERT INTO experience (id, resume_id, company, role, location, start_date, end_date, details, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId, 'InnovateTech', 'Frontend Engineer', 'Remote', 'Mar 2021', 'Present', 'Architected and implemented a new component library using React and Tailwind CSS.\nImproved core web vitals by 40% through code splitting and lazy loading.', 0]);
    
    await run(`INSERT INTO experience (id, resume_id, company, role, location, start_date, end_date, details, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId, 'WebSolutions Inc', 'Web Developer', 'New York, NY', 'Jun 2018', 'Feb 2021', 'Developed responsive client websites using HTML, CSS, and vanilla JavaScript.\nCollaborated closely with designers to ensure pixel-perfect implementation.', 1]);

    await run(`INSERT INTO education (id, resume_id, school, degree, location, start_date, end_date, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId, 'State University', 'B.S. in Computer Science', 'Boston, MA', 'Sep 2014', 'May 2018', 0]);

    await run(`INSERT INTO skills (id, resume_id, category, items, order_idx) VALUES (?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId, 'Programming Languages', 'JavaScript, TypeScript, Python, HTML/CSS', 0]);
    
    await run(`INSERT INTO skills (id, resume_id, category, items, order_idx) VALUES (?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId, 'Frameworks', 'React, Node.js, Express, Tailwind CSS', 1]);

    // Second seed resume (Sagnik Mitra)
    const publicId2 = crypto.randomUUID();
    const resumeRes2 = await run(`
      INSERT INTO resumes (
        user_id, public_id, title, template, font, 
        personal_name, personal_title, personal_email, personal_phone, personal_location, personal_linkedin, personal_github
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId, publicId2, "Sagnik's Resume", 'Professional', 'inter',
      'Sagnik Mitra', '', 'sagnikmitra1302@gmail.com', '+91-9520916065', 'Chennai, Tamil Nadu, India', 
      'https://www.linkedin.com/in/sagnik-mitra-5b0028347', 'https://github.com/bankutech'
    ]);
    const resumeId2 = resumeRes2.lastID;

    await run(`INSERT INTO education (id, resume_id, school, degree, location, start_date, end_date, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, 'SRM Institute of Science and Technology', 'Bachelor of Technology in Computer Science Engineering (AI & ML Specialization)', 'Chennai, Tamil Nadu, India', 'Aug 2024', 'May 2028', 0]);

    await run(`INSERT INTO experience (id, resume_id, company, role, location, start_date, end_date, details, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, 'SRM Insider Community', 'Technical Core Member', 'Chennai, Tamil Nadu, India', 'Oct 2024', 'Present', 'Spearheaded technical community initiatives, organizing interactive coding workshops and hackathons for 100+ university students\nCollaborated with a cross-functional team of 10+ peers to facilitate knowledge-sharing sessions on modern web development and software engineering best practices', 0]);

    await run(`INSERT INTO projects (id, resume_id, name, tech, date, details, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, 'Moodwave | Full Stack Web Application', 'React, Node.js, Express, REST APIs, Vercel', '2025', 'Engineered a dynamic mood-tracking application using React hooks, allowing users to log daily emotional states and visualize long-term trends\nIntegrated external RESTful APIs for real-time data fetching and implemented JSON-based data persistence to ensure reliable state management\nOptimized frontend rendering logic, reducing UI latency and delivering a seamless, mobile-responsive experience across devices', 0]);

    await run(`INSERT INTO projects (id, resume_id, name, tech, date, details, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, 'Student Planner Portal | Task Management System', 'JavaScript, HTML5, CSS3, DOM Manipulation', '2025', 'Architected a client-side student productivity platform featuring dynamic task management, deadline tracking, and calendar functionalities\nLeveraged Web Storage API (LocalStorage) to engineer a persistent database solution, ensuring zero data loss across browser sessions\nDesigned an accessible, interactive user interface utilizing modern CSS Grid/Flexbox, improving overall user retention and task completion rates', 1]);

    await run(`INSERT INTO certifications (id, resume_id, name, issuer, date, order_idx) VALUES (?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, '2nd Prize Winner \u2013 Technical Hackathon (Digisys Innosol Pvt. Ltd.)', 'Prototyped and pitched a functional software solution under a strict 24-hour deadline, competing against 50+ teams', '2025', 0]);

    await run(`INSERT INTO certifications (id, resume_id, name, issuer, date, order_idx) VALUES (?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, 'MyCaptain Web Development Certification', 'Completed comprehensive training in modern full-stack web development principles', '2024', 1]);

    await run(`INSERT INTO skills (id, resume_id, category, items, order_idx) VALUES (?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, 'Languages', 'Python, C/C++, JavaScript (ES6+), HTML5, CSS3, SQL', 0]);
    
    await run(`INSERT INTO skills (id, resume_id, category, items, order_idx) VALUES (?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, 'Frontend', 'React.js, Tailwind CSS, Responsive Design', 1]);

    await run(`INSERT INTO skills (id, resume_id, category, items, order_idx) VALUES (?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, 'Backend & Databases', 'Node.js, Express.js, SQLite, REST APIs', 2]);

    await run(`INSERT INTO skills (id, resume_id, category, items, order_idx) VALUES (?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), resumeId2, 'Tools & Technologies', 'Git, GitHub, Vercel, API Integration, JSON', 3]);
  }
};
let dbInitialized = false;
app.use(async (req, res, next) => {
  try {
    if (!dbInitialized) {
      await initializeDb();
      dbInitialized = true;
      console.log("Database initialized on first request");
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Helper to fetch full resume tree
const getFullResume = async (resumeId) => {
  const resume = await get('SELECT * FROM resumes WHERE id = ?', [resumeId]);
  if (!resume) return null;
  
  const [experience, education, projects, skills, certifications] = await Promise.all([
    all('SELECT * FROM experience WHERE resume_id = ? ORDER BY order_idx ASC', [resumeId]),
    all('SELECT * FROM education WHERE resume_id = ? ORDER BY order_idx ASC', [resumeId]),
    all('SELECT * FROM projects WHERE resume_id = ? ORDER BY order_idx ASC', [resumeId]),
    all('SELECT * FROM skills WHERE resume_id = ? ORDER BY order_idx ASC', [resumeId]),
    all('SELECT * FROM certifications WHERE resume_id = ? ORDER BY order_idx ASC', [resumeId])
  ]);

  return {
    ...resume,
    experience,
    education,
    projects,
    skills,
    certifications
  };
};

// API Routes
app.get('/api/resumes', async (req, res) => {
  try {
    const resumes = await all('SELECT id, public_id, title, updated_at, template FROM resumes ORDER BY updated_at DESC');
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/resumes/:id', async (req, res) => {
  try {
    const data = await getFullResume(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/public/resumes/:public_id', async (req, res) => {
  try {
    const resume = await get('SELECT id FROM resumes WHERE public_id = ?', [req.params.public_id]);
    if (!resume) return res.status(404).json({ error: "Not found" });
    const data = await getFullResume(resume.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/resumes', async (req, res) => {
  try {
    const publicId = crypto.randomUUID();
    
    // Ensure we have a user
    let user = await get('SELECT id FROM users LIMIT 1');
    if (!user) {
      await run("INSERT INTO users (name, email) VALUES (?, ?)", ['Demo User', 'demo@example.com']);
      user = await get('SELECT id FROM users LIMIT 1');
    }

    const result = await run(`
      INSERT INTO resumes (user_id, public_id, title) VALUES (?, ?, ?)
    `, [user.id, publicId, req.body.title || 'Untitled Resume']);
    
    const newResume = await getFullResume(result.lastID);
    res.json(newResume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update full resume (receives the whole tree)
app.put('/api/resumes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    
    // Save current version to history before updating
    const currentState = await getFullResume(id);
    if (currentState) {
      await run('INSERT INTO resume_versions (resume_id, snapshot_json) VALUES (?, ?)', [id, JSON.stringify(currentState)]);
    }

    await run(`
      UPDATE resumes SET 
        title = ?, template = ?, font = ?, personal_name = ?, personal_title = ?, personal_email = ?, 
        personal_phone = ?, personal_location = ?, personal_linkedin = ?, personal_github = ?, 
        personal_summary = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      data.title, data.template, data.font, data.personal_name, data.personal_title, data.personal_email,
      data.personal_phone, data.personal_location, data.personal_linkedin, data.personal_github,
      data.personal_summary, id
    ]);

    // Recreate relations (simplest way to handle drag & drop order and nested items)
    await run('DELETE FROM experience WHERE resume_id = ?', [id]);
    for (const [idx, item] of (data.experience || []).entries()) {
      await run(`INSERT INTO experience (id, resume_id, company, role, location, start_date, end_date, details, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.id || crypto.randomUUID(), id, item.company, item.role, item.location, item.start_date, item.end_date, item.details, idx]);
    }

    await run('DELETE FROM education WHERE resume_id = ?', [id]);
    for (const [idx, item] of (data.education || []).entries()) {
      await run(`INSERT INTO education (id, resume_id, school, degree, location, start_date, end_date, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.id || crypto.randomUUID(), id, item.school, item.degree, item.location, item.start_date, item.end_date, idx]);
    }

    await run('DELETE FROM projects WHERE resume_id = ?', [id]);
    for (const [idx, item] of (data.projects || []).entries()) {
      await run(`INSERT INTO projects (id, resume_id, name, tech, date, details, link, github_link, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.id || crypto.randomUUID(), id, item.name, item.tech, item.date, item.details, item.link, item.github_link, idx]);
    }

    await run('DELETE FROM skills WHERE resume_id = ?', [id]);
    for (const [idx, item] of (data.skills || []).entries()) {
      await run(`INSERT INTO skills (id, resume_id, category, items, order_idx) VALUES (?, ?, ?, ?, ?)`,
        [item.id || crypto.randomUUID(), id, item.category, item.items, idx]);
    }

    await run('DELETE FROM certifications WHERE resume_id = ?', [id]);
    for (const [idx, item] of (data.certifications || []).entries()) {
      await run(`INSERT INTO certifications (id, resume_id, name, issuer, date, link, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [item.id || crypto.randomUUID(), id, item.name, item.issuer, item.date, item.link, idx]);
    }

    const updated = await getFullResume(id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/resumes/:id', async (req, res) => {
  try {
    await run('DELETE FROM resumes WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/resumes/:id/versions', async (req, res) => {
  try {
    const versions = await all('SELECT id, created_at FROM resume_versions WHERE resume_id = ? ORDER BY created_at DESC', [req.params.id]);
    res.json(versions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/resumes/:id/versions/:versionId/restore', async (req, res) => {
  try {
    const version = await get('SELECT snapshot_json FROM resume_versions WHERE id = ? AND resume_id = ?', [req.params.versionId, req.params.id]);
    if (!version) return res.status(404).json({ error: "Version not found" });
    
    // We will just return the JSON and let the frontend call PUT to actually save it as current
    res.json(JSON.parse(version.snapshot_json));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/match', async (req, res) => {
  try {
    // const { resumeText, jobDescription } = req.body;
    // Basic mock logic for Job Match API
    const matchScore = 78;
    const missingKeywords = ['Docker', 'AWS', 'CI/CD'];
    const suggestedSkills = ['Kubernetes', 'Microservices'];
    res.json({ matchScore, missingKeywords, suggestedSkills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});
