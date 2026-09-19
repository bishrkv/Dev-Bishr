import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data');
const SITE_DATA_FILE = path.join(DATA_DIR, 'site-data.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

app.use(express.json({ limit: '5mb' }));

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(SITE_DATA_FILE);
  } catch {
    const defaultData = {
      about: "I'm Bishr KV, a passionate full stack web developer from India. I build modern, responsive web applications.\n\nWith expertise in frontend and backend technologies, I bring ideas to life from concept to deployment.",
      skills: [],
      services: [],
      timeline: [],
      projects: [],
      testimonials: []
    };
    await fs.writeFile(SITE_DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
  }

  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    await fs.writeFile(MESSAGES_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const text = await fs.readFile(filePath, 'utf8');
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, data: unknown) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  return data;
}

// API Routes
app.get('/api/site-data', async (_req, res) => {
  try {
    const data = await readJsonFile(SITE_DATA_FILE, {});
    res.json(data);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.put('/api/site-data', async (req, res) => {
  try {
    const updated = await writeJsonFile(SITE_DATA_FILE, req.body);
    res.json(updated);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post('/api/site-data', async (req, res) => {
  try {
    const updated = await writeJsonFile(SITE_DATA_FILE, req.body);
    res.json(updated);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get('/api/messages', async (_req, res) => {
  try {
    const messages = await readJsonFile(MESSAGES_FILE, []);
    res.json(messages);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
      name: typeof name === 'string' ? name : '',
      email: typeof email === 'string' ? email : '',
      subject: typeof subject === 'string' ? subject : '',
      message: typeof message === 'string' ? message : '',
      date: new Date().toISOString().slice(0, 10),
      emailSent: false,
      emailError: 'Message logged and saved in admin dashboard.'
    };
    const messages = await readJsonFile<any[]>(MESSAGES_FILE, []);
    const updatedMessages = [newMessage, ...(Array.isArray(messages) ? messages.filter(m => m.id !== newMessage.id) : [])];
    await writeJsonFile(MESSAGES_FILE, updatedMessages);
    res.json(newMessage);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.delete('/api/messages', async (_req, res) => {
  try {
    await writeJsonFile(MESSAGES_FILE, []);
    res.json({ ok: true });
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await readJsonFile<any[]>(MESSAGES_FILE, []);
    const filtered = (Array.isArray(messages) ? messages : []).filter(m => m.id !== id);
    await writeJsonFile(MESSAGES_FILE, filtered);
    res.json({ ok: true });
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Vite or Static file middleware
async function startServer() {
  await ensureStorage();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(ROOT, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
