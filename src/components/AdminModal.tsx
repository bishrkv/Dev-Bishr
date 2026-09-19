import React, { useState } from 'react';
import { SiteData, Project, Skill, Service, TimelineItem, Testimonial, Message } from '../types';
import { normalizeUrl, getDomainType } from '../utils';
import {
  X,
  LogOut,
  Save,
  Plus,
  Pencil,
  Trash2,
  FileDown,
  FileUp,
  AlertTriangle,
  Globe,
  Star,
  LogIn
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData;
  messages: Message[];
  onSaveSiteData: (newData: SiteData) => Promise<void>;
  onDeleteMessage: (id: string) => Promise<void>;
  onClearAllMessages: () => Promise<void>;
  onResetAllData: () => Promise<void>;
  onShowToast: (msg: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  siteData,
  messages,
  onSaveSiteData,
  onDeleteMessage,
  onClearAllMessages,
  onResetAllData,
  onShowToast
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Current active admin tab
  const [activeTab, setActiveTab] = useState<
    'about' | 'skills' | 'services' | 'timeline' | 'projects' | 'testimonials' | 'messages' | 'jsondata'
  >('projects');

  // Form states for nested edits
  const [aboutInput, setAboutInput] = useState(siteData.about);

  // Skill form
  const [skillFormOpen, setSkillFormOpen] = useState(false);
  const [skillEditIndex, setSkillEditIndex] = useState<number | null>(null);
  const [skillData, setSkillData] = useState<Skill>({ name: '', level: 85, category: 'Frontend' });

  // Service form
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [serviceEditIndex, setServiceEditIndex] = useState<number | null>(null);
  const [serviceData, setServiceData] = useState<Service>({ title: '', description: '', icon: 'code-2' });

  // Timeline form
  const [timelineFormOpen, setTimelineFormOpen] = useState(false);
  const [timelineEditIndex, setTimelineEditIndex] = useState<number | null>(null);
  const [timelineData, setTimelineData] = useState<TimelineItem>({
    title: '',
    company: '',
    period: '',
    type: 'work',
    description: ''
  });

  // Project form
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [projectEditId, setProjectEditId] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<Project>({
    id: '',
    title: '',
    description: '',
    tech: '',
    image: '',
    url: '',
    featured: true
  });

  // Testimonial form
  const [testimonialFormOpen, setTestimonialFormOpen] = useState(false);
  const [testimonialEditIndex, setTestimonialEditIndex] = useState<number | null>(null);
  const [testimonialData, setTestimonialData] = useState<Testimonial>({
    name: '',
    role: '',
    text: '',
    rating: 5
  });

  if (!isOpen) return null;

  // 1. LOGIN MODAL VIEW
  if (!isAuthenticated) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (username.trim() === 'bishr' && password.trim() === '123') {
        setIsAuthenticated(true);
        setLoginError(false);
        setAboutInput(siteData.about);
      } else {
        setLoginError(true);
      }
    };

    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Admin Access</h3>
              <p className="text-xs text-gray-500 mt-0.5">Manage Bishr KV Portfolio</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5 block font-medium">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5 block font-medium">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg">
                Invalid username or password.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD VIEW
  const handleSaveAbout = async () => {
    await onSaveSiteData({ ...siteData, about: aboutInput });
    onShowToast('About text saved successfully!');
  };

  // Skill Actions
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSkills = [...siteData.skills];
    if (skillEditIndex !== null) {
      updatedSkills[skillEditIndex] = skillData;
    } else {
      updatedSkills.push(skillData);
    }
    await onSaveSiteData({ ...siteData, skills: updatedSkills });
    setSkillFormOpen(false);
    setSkillEditIndex(null);
    onShowToast('Skill updated!');
  };

  const handleDeleteSkill = async (index: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    const updatedSkills = siteData.skills.filter((_, idx) => idx !== index);
    await onSaveSiteData({ ...siteData, skills: updatedSkills });
    onShowToast('Skill deleted!');
  };

  // Service Actions
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...siteData.services];
    if (serviceEditIndex !== null) {
      updated[serviceEditIndex] = serviceData;
    } else {
      updated.push(serviceData);
    }
    await onSaveSiteData({ ...siteData, services: updated });
    setServiceFormOpen(false);
    setServiceEditIndex(null);
    onShowToast('Service updated!');
  };

  const handleDeleteService = async (index: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    const updated = siteData.services.filter((_, idx) => idx !== index);
    await onSaveSiteData({ ...siteData, services: updated });
    onShowToast('Service deleted!');
  };

  // Timeline Actions
  const handleSaveTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...siteData.timeline];
    if (timelineEditIndex !== null) {
      updated[timelineEditIndex] = timelineData;
    } else {
      updated.push(timelineData);
    }
    await onSaveSiteData({ ...siteData, timeline: updated });
    setTimelineFormOpen(false);
    setTimelineEditIndex(null);
    onShowToast('Timeline updated!');
  };

  const handleDeleteTimeline = async (index: number) => {
    if (!confirm('Are you sure you want to delete this timeline entry?')) return;
    const updated = siteData.timeline.filter((_, idx) => idx !== index);
    await onSaveSiteData({ ...siteData, timeline: updated });
    onShowToast('Timeline entry deleted!');
  };

  // Project Actions
  const handleOpenProjectForm = (project?: Project) => {
    if (project) {
      setProjectEditId(project.id);
      setProjectData({ ...project });
    } else {
      setProjectEditId(null);
      setProjectData({
        id: 'p_' + Date.now().toString(36),
        title: '',
        description: '',
        tech: 'React, Tailwind, Node.js',
        image: '',
        url: '',
        featured: true
      });
    }
    setProjectFormOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = normalizeUrl(projectData.url).url || projectData.url;
    const newP = { ...projectData, url: cleanUrl };

    let updatedProjects: Project[];
    if (projectEditId) {
      updatedProjects = siteData.projects.map(p => (p.id === projectEditId ? newP : p));
    } else {
      updatedProjects = [newP, ...siteData.projects];
    }

    await onSaveSiteData({ ...siteData, projects: updatedProjects });
    setProjectFormOpen(false);
    setProjectEditId(null);
    onShowToast(projectEditId ? 'Project updated!' : 'New project added!');
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const updated = siteData.projects.filter(p => p.id !== id);
    await onSaveSiteData({ ...siteData, projects: updated });
    onShowToast('Project removed!');
  };

  // Testimonial Actions
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...siteData.testimonials];
    if (testimonialEditIndex !== null) {
      updated[testimonialEditIndex] = testimonialData;
    } else {
      updated.push(testimonialData);
    }
    await onSaveSiteData({ ...siteData, testimonials: updated });
    setTestimonialFormOpen(false);
    setTestimonialEditIndex(null);
    onShowToast('Review updated!');
  };

  const handleDeleteTestimonial = async (index: number) => {
    if (!confirm('Delete this testimonial?')) return;
    const updated = siteData.testimonials.filter((_, idx) => idx !== index);
    await onSaveSiteData({ ...siteData, testimonials: updated });
    onShowToast('Review removed!');
  };

  // JSON Export / Import
  const fullJson = JSON.stringify({ ...siteData, messages }, null, 2);
  const fullJsonBytes = new Blob([fullJson]).size;

  const handleExportJSON = () => {
    const blob = new Blob([fullJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bishrkv-portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('JSON backup downloaded!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!confirm('This will replace all current website data. Proceed?')) return;
        await onSaveSiteData({
          about: parsed.about || siteData.about,
          skills: parsed.skills || siteData.skills,
          services: parsed.services || siteData.services,
          timeline: parsed.timeline || siteData.timeline,
          projects: parsed.projects || siteData.projects,
          testimonials: parsed.testimonials || siteData.testimonials
        });
        onShowToast('Data imported successfully!');
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto">
      {/* Top Admin Nav */}
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-sm gradient-blue">Bishr KV.</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              Admin
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Firebase Cloud Synced
            </span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
            {(
              [
                ['about', 'About'],
                ['skills', 'Skills'],
                ['services', 'Services'],
                ['timeline', 'Timeline'],
                ['projects', 'Projects'],
                ['testimonials', 'Reviews'],
                ['messages', `Messages (${messages.length})`],
                ['jsondata', 'JSON']
              ] as const
            ).map(([tabKey, label]) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tabKey
                    ? 'bg-white/10 text-white font-medium shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}

            <div className="w-px h-4 bg-white/15 mx-1" />

            <button
              onClick={() => {
                setIsAuthenticated(false);
                onClose();
              }}
              className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* TAB 1: ABOUT */}
        {activeTab === 'about' && (
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold text-white mb-2">Edit About Text</h2>
            <p className="text-xs text-gray-400 mb-6">Updates the introduction paragraphs displayed on the homepage.</p>
            <div className="card-static p-6 space-y-4">
              <textarea
                rows={8}
                value={aboutInput}
                onChange={e => setAboutInput(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 leading-relaxed font-light"
              />
              <button
                onClick={handleSaveAbout}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-5 py-2.5 rounded-lg transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === 'skills' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Skills & Proficiencies</h2>
                <p className="text-xs text-gray-400 mt-1">Manage skill tags, percentage levels, and categories.</p>
              </div>
              <button
                onClick={() => {
                  setSkillEditIndex(null);
                  setSkillData({ name: '', level: 85, category: 'Frontend' });
                  setSkillFormOpen(true);
                }}
                className="inline-flex items-center gap-1.5 bg-white text-black font-medium text-xs px-3.5 py-2 rounded-lg hover:scale-105 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            </div>

            {skillFormOpen && (
              <form onSubmit={handleSaveSkill} className="card-static p-5 mb-6 space-y-4 border-blue-500/30">
                <h4 className="text-sm font-semibold text-white">
                  {skillEditIndex !== null ? 'Edit Skill' : 'Add New Skill'}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Skill Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. React"
                      value={skillData.name}
                      onChange={e => setSkillData({ ...skillData, name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Level (1-100%)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      required
                      value={skillData.level}
                      onChange={e => setSkillData({ ...skillData, level: parseInt(e.target.value) || 50 })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Category</label>
                  <select
                    value={skillData.category}
                    onChange={e => setSkillData({ ...skillData, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Tools">Tools</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg">
                    {skillEditIndex !== null ? 'Save Skill' : 'Add Skill'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSkillFormOpen(false)}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 text-xs px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {siteData.skills.map((s, idx) => (
                <div key={idx} className="card-static p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {s.category}
                    </span>
                    <span className="text-sm font-medium text-white">{s.name}</span>
                    <span className="text-xs text-gray-400 font-mono">({s.level}%)</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        setSkillEditIndex(idx);
                        setSkillData({ ...s });
                        setSkillFormOpen(true);
                      }}
                      className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(idx)}
                      className="w-7 h-7 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Services</h2>
                <p className="text-xs text-gray-400 mt-1">Configure service offerings shown on the homepage.</p>
              </div>
              <button
                onClick={() => {
                  setServiceEditIndex(null);
                  setServiceData({ title: '', description: '', icon: 'code-2' });
                  setServiceFormOpen(true);
                }}
                className="inline-flex items-center gap-1.5 bg-white text-black font-medium text-xs px-3.5 py-2 rounded-lg hover:scale-105 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>

            {serviceFormOpen && (
              <form onSubmit={handleSaveService} className="card-static p-5 mb-6 space-y-4 border-blue-500/30">
                <h4 className="text-sm font-semibold text-white">
                  {serviceEditIndex !== null ? 'Edit Service' : 'Add New Service'}
                </h4>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Title</label>
                  <input
                    type="text"
                    required
                    value={serviceData.title}
                    onChange={e => setServiceData({ ...serviceData, title: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={serviceData.description}
                    onChange={e => setServiceData({ ...serviceData, description: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">
                    Icon (code-2, palette, server, smartphone, zap, shield-check)
                  </label>
                  <input
                    type="text"
                    value={serviceData.icon}
                    onChange={e => setServiceData({ ...serviceData, icon: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg">
                    Save Service
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceFormOpen(false)}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 text-xs px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {siteData.services.map((sv, idx) => (
                <div key={idx} className="card-static p-4 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{sv.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{sv.description}</p>
                    <span className="text-[10px] text-blue-400 font-mono mt-1 inline-block">icon: {sv.icon}</span>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => {
                        setServiceEditIndex(idx);
                        setServiceData({ ...sv });
                        setServiceFormOpen(true);
                      }}
                      className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(idx)}
                      className="w-7 h-7 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Experience & Education</h2>
                <p className="text-xs text-gray-400 mt-1">Timeline steps shown in the Journey section.</p>
              </div>
              <button
                onClick={() => {
                  setTimelineEditIndex(null);
                  setTimelineData({
                    title: '',
                    company: '',
                    period: '',
                    type: 'work',
                    description: ''
                  });
                  setTimelineFormOpen(true);
                }}
                className="inline-flex items-center gap-1.5 bg-white text-black font-medium text-xs px-3.5 py-2 rounded-lg hover:scale-105 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Entry
              </button>
            </div>

            {timelineFormOpen && (
              <form onSubmit={handleSaveTimeline} className="card-static p-5 mb-6 space-y-4 border-blue-500/30">
                <h4 className="text-sm font-semibold text-white">
                  {timelineEditIndex !== null ? 'Edit Journey Entry' : 'Add New Entry'}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Title</label>
                    <input
                      type="text"
                      required
                      value={timelineData.title}
                      onChange={e => setTimelineData({ ...timelineData, title: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">
                      Company / School
                    </label>
                    <input
                      type="text"
                      required
                      value={timelineData.company}
                      onChange={e => setTimelineData({ ...timelineData, company: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Period</label>
                    <input
                      type="text"
                      required
                      placeholder="2024 - Present"
                      value={timelineData.period}
                      onChange={e => setTimelineData({ ...timelineData, period: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Type</label>
                    <select
                      value={timelineData.type}
                      onChange={e => setTimelineData({ ...timelineData, type: e.target.value as 'work' | 'education' })}
                      className="w-full bg-zinc-900 border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    >
                      <option value="work">Work Experience</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={timelineData.description}
                    onChange={e => setTimelineData({ ...timelineData, description: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg">
                    Save Entry
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimelineFormOpen(false)}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 text-xs px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {siteData.timeline.map((item, idx) => (
                <div key={idx} className="card-static p-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 uppercase">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-blue-400 font-medium">{item.company} · {item.period}</p>
                    <p className="text-xs text-gray-400 mt-1 font-light">{item.description}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => {
                        setTimelineEditIndex(idx);
                        setTimelineData({ ...item });
                        setTimelineFormOpen(true);
                      }}
                      className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTimeline(idx)}
                      className="w-7 h-7 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Project Showcase ({siteData.projects.length})</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Add, edit or toggle featured projects. Vercel, Netlify, custom domain links supported.
                </p>
              </div>
              <button
                onClick={() => handleOpenProjectForm()}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-lg shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                Add New Project
              </button>
            </div>

            {projectFormOpen && (
              <form onSubmit={handleSaveProject} className="card-static p-6 mb-8 space-y-4 border-blue-500/40">
                <h4 className="text-sm font-semibold text-white">
                  {projectEditId ? 'Edit Project' : 'Add New Project'}
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block font-medium">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nahdi Mandi"
                      value={projectData.title}
                      onChange={e => setProjectData({ ...projectData, title: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block font-medium">
                      Live Website URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. https://nahdimandi.lovable.app/"
                      value={projectData.url}
                      onChange={e => setProjectData({ ...projectData, url: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block font-medium">
                    Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={projectData.description}
                    onChange={e => setProjectData({ ...projectData, description: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block font-medium">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="React, Tailwind, Node.js"
                      value={projectData.tech}
                      onChange={e => setProjectData({ ...projectData, tech: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block font-medium">
                      Screenshot Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://i.postimg.cc/..."
                      value={projectData.image}
                      onChange={e => setProjectData({ ...projectData, image: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="pFeaturedCheck"
                    checked={projectData.featured}
                    onChange={e => setProjectData({ ...projectData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 bg-zinc-800"
                  />
                  <label htmlFor="pFeaturedCheck" className="text-xs text-gray-300">
                    Show in Featured Projects on homepage
                  </label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-5 py-2.5 rounded-lg">
                    {projectEditId ? 'Save Changes' : 'Add Project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectFormOpen(false)}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 text-xs px-4 py-2.5 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {siteData.projects.map((p, idx) => {
                const urlInfo = normalizeUrl(p.url);
                const domain = urlInfo.valid ? getDomainType(urlInfo.url) : '';

                return (
                  <div key={p.id || idx} className="card-static p-4 flex items-center gap-4">
                    <img
                      src={p.image || `https://picsum.photos/seed/${idx + 1}/100/100.jpg`}
                      alt={p.title}
                      className="w-14 h-14 rounded-lg object-cover bg-zinc-800 border border-white/10 flex-shrink-0"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = `https://picsum.photos/seed/${idx + 1}/100/100.jpg`;
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="text-sm font-semibold text-white truncate">{p.title}</h4>
                        {p.featured ? (
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium">
                            ⭐ Featured
                          </span>
                        ) : (
                          <span className="text-[10px] bg-zinc-800 text-gray-400 px-2 py-0.5 rounded-full">
                            All Projects
                          </span>
                        )}
                        {urlInfo.valid && (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Globe className="w-2.5 h-2.5" />
                            Live {domain ? `(${domain})` : ''}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{p.description}</p>
                      {urlInfo.valid && (
                        <a
                          href={urlInfo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-blue-400 hover:underline truncate block mt-0.5"
                        >
                          {urlInfo.display}
                        </a>
                      )}
                    </div>

                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleOpenProjectForm(p)}
                        className="inline-flex items-center gap-1 text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Client Reviews</h2>
                <p className="text-xs text-gray-400 mt-1">Manage client recommendations and ratings.</p>
              </div>
              <button
                onClick={() => {
                  setTestimonialEditIndex(null);
                  setTestimonialData({ name: '', role: '', text: '', rating: 5 });
                  setTestimonialFormOpen(true);
                }}
                className="inline-flex items-center gap-1.5 bg-white text-black font-medium text-xs px-3.5 py-2 rounded-lg hover:scale-105 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Review
              </button>
            </div>

            {testimonialFormOpen && (
              <form onSubmit={handleSaveTestimonial} className="card-static p-5 mb-6 space-y-4 border-blue-500/30">
                <h4 className="text-sm font-semibold text-white">
                  {testimonialEditIndex !== null ? 'Edit Review' : 'Add Review'}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Client Name</label>
                    <input
                      type="text"
                      required
                      value={testimonialData.name}
                      onChange={e => setTestimonialData({ ...testimonialData, name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Role / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Founder, CEO"
                      value={testimonialData.role || ''}
                      onChange={e => setTestimonialData({ ...testimonialData, role: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Review Text</label>
                  <textarea
                    rows={3}
                    required
                    value={testimonialData.text}
                    onChange={e => setTestimonialData({ ...testimonialData, text: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonialData.rating}
                    onChange={e => setTestimonialData({ ...testimonialData, rating: parseInt(e.target.value) || 5 })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg">
                    Save Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setTestimonialFormOpen(false)}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 text-xs px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {siteData.testimonials.map((t, idx) => (
                <div key={idx} className="card-static p-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                      {t.role && <span className="text-xs text-gray-400 font-light">({t.role})</span>}
                      <span className="flex items-center text-amber-400 text-xs ml-2">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                        {t.rating}/5
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 italic">"{t.text}"</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => {
                        setTestimonialEditIndex(idx);
                        setTestimonialData({ ...t });
                        setTestimonialFormOpen(true);
                      }}
                      className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(idx)}
                      className="w-7 h-7 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Contact Messages ({messages.length})</h2>
                <p className="text-xs text-gray-400 mt-1">All submissions from the website contact form.</p>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={async () => {
                    if (confirm('Clear all messages permanently?')) {
                      await onClearAllMessages();
                      onShowToast('All messages cleared.');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All
                </button>
              )}
            </div>

            {messages.length === 0 ? (
              <div className="card-static p-12 text-center text-gray-500 text-sm">
                No messages in the inbox yet.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map(m => (
                  <div key={m.id} className="card-static p-5 relative group">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-sm font-semibold text-white">{m.name}</span>
                        <a
                          href={`mailto:${m.email}`}
                          className="text-xs text-blue-400 hover:underline ml-2 font-mono"
                        >
                          {m.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-gray-500 font-mono">{m.date}</span>
                        <button
                          onClick={async () => {
                            await onDeleteMessage(m.id);
                            onShowToast('Message deleted');
                          }}
                          className="w-7 h-7 rounded bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-gray-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {m.subject && <p className="text-xs font-semibold text-gray-300 mb-1">{m.subject}</p>}
                    <p className="text-xs text-gray-400 font-light leading-relaxed whitespace-pre-wrap">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: JSON DATA */}
        {activeTab === 'jsondata' && (
          <div className="max-w-4xl">
            <h2 className="text-xl font-semibold text-white mb-2">Database & JSON Management</h2>
            <p className="text-xs text-gray-400 mb-6">
              Export data backup, restore an existing file, or inspect live raw JSON state.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="card-static p-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Export Backup</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Download full JSON snapshot</p>
                </div>
                <button
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-lg cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  Download
                </button>
              </div>

              <div className="card-static p-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Import JSON</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Restore from backup file</p>
                </div>
                <label className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-4 py-2 rounded-lg cursor-pointer">
                  <FileUp className="w-4 h-4" />
                  Choose File
                  <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                </label>
              </div>
            </div>

            <div className="card-static p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Live JSON State</span>
                <span className="text-xs text-gray-500 font-mono">
                  {fullJsonBytes < 1024 ? `${fullJsonBytes} B` : `${(fullJsonBytes / 1024).toFixed(1)} KB`}
                </span>
              </div>
              <pre className="bg-black/60 rounded-xl p-4 text-[11px] font-mono text-emerald-400 max-h-80 overflow-y-auto border border-white/5">
                {fullJson}
              </pre>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-red-400 mb-1">Danger Zone</h4>
              <p className="text-xs text-gray-500 mb-4">Reset all data back to clean factory default state.</p>
              <button
                onClick={async () => {
                  if (confirm('Reset everything back to default? All custom edits will be reverted.')) {
                    await onResetAllData();
                    onShowToast('All data reset to defaults!');
                  }
                }}
                className="inline-flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Reset Everything
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
