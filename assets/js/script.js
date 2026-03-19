'use strict';

// ============================================================
// i18n Translations
// ============================================================
const translations = {
  en: {
    // Navbar
    "nav.about":     "About",
    "nav.portfolio": "Portfolio",
    "nav.blog":      "Blog",

    // Sidebar
    "sidebar.job-title":   "Agent Security Researcher",
    "sidebar.email":       "Email",
    "sidebar.phone":       "Phone",
    "sidebar.birthday":    "Birthday",
    "sidebar.location":    "Location",
    "about.show-contacts": "Show Contacts",

    // About
    "about.title":        "About me",
    "about.bio1":         "I'm an AI Agent Security Researcher and graduate student at Hangzhou Dianzi University. My research focuses on security evaluation of AI Agents (especially CLI-based agents), designing and testing adversarial experiments including indirect prompt injection attacks on agents like Claude Code.",
    "about.bio2":         "I have a strong passion for developer tools and CLI automation technologies that boost development efficiency. I've implemented a nano Claude Code from scratch, studied the Claude Agent SDK, and have extensive Vibe Coding experience with Claude Code (6 months), Cursor (1 year), and various other CLI-Agents including Codex, Gemini-CLI, and Qwen Code.",
    "about.services":     "What i'm doing",
    "about.testimonials": "Testimonials",
    "about.clients":      "Clients",

    // Services
    "service.web-design.title": "Web design",
    "service.web-design.text":  "The most modern and high-quality design made at a professional level.",
    "service.web-dev.title":    "Web development",
    "service.web-dev.text":     "High-quality development of sites at the professional level.",
    "service.mobile.title":     "Mobile apps",
    "service.mobile.text":      "Professional development of applications for iOS and Android.",
    "service.photo.title":      "Photography",
    "service.photo.text":       "I make high-quality photos of any category at a professional level.",

    // Resume
    "resume.title":      "Resume",
    "resume.education":  "Education",
    "resume.experience": "Projects & Research",
    "resume.skills":     "My skills",

    // Education
    "edu.hdu.name": "Hangzhou Dianzi University",
    "edu.hdu.desc": "Master's degree in Computer Technology. Research focus on AI Agent security evaluation, adversarial experiment design and testing, with emphasis on CLI-based agents. GPA: 4.02/5.",
    "edu.zstu.name": "Zhejiang Sci-Tech University",
    "edu.zstu.desc": "Bachelor's degree in Computer Science and Technology.",

    // Experience
    "exp.benchmark.name": "CLI-Agent Security Benchmark (Research Paper in Progress)",
    "exp.benchmark.date": "2025 — 2026",
    "exp.benchmark.desc": "Designed and implemented a security evaluation benchmark for CLI-Agents (e.g., Claude Code), referencing OWASP LLM Top 10 and MITRE ATLAS. Evaluated multiple security risks with a focus on indirect prompt injection—covering Skills poisoning, project poisoning, Agent Memory poisoning, malicious shell command execution, and sensitive data exfiltration. Built an automated evaluation pipeline to test different CLI-Agents and backend LLMs.",
    "exp.agent.name": "AI Agent Related Projects",
    "exp.agent.date": "2025 — Present",
    "exp.agent.desc": "Implemented a minimal Claude Code clone to understand the foundational features of a CLI-Agent, including tool use, skills, subagents, background task execution, and agent-swarms. Studied the Claude Agent SDK. Wrote Agent Skills for automated GPU VRAM and disk usage monitoring using Openclaw-Cron.",
    "exp.modelops.name": "LLM ModelOps Platform",
    "exp.modelops.date": "2024 — 2026",
    "exp.modelops.desc": "Independently led backend service and database design for the lab's LLM fine-tuning platform (similar to Volcano Engine / Alibaba Cloud Bailian). Built REST APIs with Flask connecting the frontend to the underlying model training pipeline, with MongoDB for data management. Supported model inference, fine-tuning task management, training lifecycle tracking, dataset versioning, and Prompt template management.",

    // Portfolio
    "portfolio.title":          "Portfolio",
    "portfolio.filter.all":     "All",
    "portfolio.filter.web-design": "Web design",
    "portfolio.filter.apps":    "Applications",
    "portfolio.filter.web-dev": "Web development",
    "portfolio.filter.select":  "Select category",

    // Blog
    "blog.title": "Blog",
    "blog.back":  "Back to Blog",

    // Contact
    "contact.title":              "Contact",
    "contact.form-title":         "Contact Form",
    "contact.send":               "Send Message",
    "contact.placeholder.name":   "Full name",
    "contact.placeholder.email":  "Email address",
    "contact.placeholder.message": "Your Message",
  },
  zh: {
    // Navbar
    "nav.about":     "关于",
    "nav.portfolio": "作品集",
    "nav.blog":      "博客",

    // Sidebar
    "sidebar.job-title":   "AI Agent 安全研究者",
    "sidebar.email":       "邮箱",
    "sidebar.phone":       "电话",
    "sidebar.birthday":    "生日",
    "sidebar.location":    "所在地",
    "about.show-contacts": "显示联系方式",

    // About
    "about.title":        "关于我",
    "about.bio1":         "我是一名 AI Agent 安全研究者，目前就读于杭州电子科技大学计算机技术专业（研究生）。研究方向聚焦于 AI Agent（尤其是 CLI 领域）的安全性评估，设计并测试针对 Claude Code 等 Agent 的间接 Prompt 注入等对抗性实验。",
    "about.bio2":         "我对开发者工具和 CLI 自动化技术有浓厚兴趣。从零实现过一个 nano Claude Code，深入学习了 Claude Agent SDK，并有丰富的 Vibe Coding 经验：Claude Code 使用半年、Cursor 使用一年，以及 Codex、Gemini-CLI、Qwen Code 等各种国内外 CLI-Agent。",
    "about.services":     "我的服务",
    "about.testimonials": "用户评价",
    "about.clients":      "合作客户",

    // Services
    "service.web-design.title": "网页设计",
    "service.web-design.text":  "以专业水准打造最现代、最高质量的设计。",
    "service.web-dev.title":    "网页开发",
    "service.web-dev.text":     "以专业水准进行高质量网站开发。",
    "service.mobile.title":     "移动应用",
    "service.mobile.text":      "专业开发 iOS 和 Android 应用程序。",
    "service.photo.title":      "摄影",
    "service.photo.text":       "以专业水准拍摄各类高质量照片。",

    // Resume
    "resume.title":      "简历",
    "resume.education":  "教育经历",
    "resume.experience": "项目与科研经历",
    "resume.skills":     "我的技能",

    // Education
    "edu.hdu.name": "杭州电子科技大学",
    "edu.hdu.desc": "计算机技术专业，研究生。研究方向聚焦于 AI Agent 安全性评估、对抗性实验设计与测试，重点关注 CLI-Agent 领域。GPA: 4.02/5。",
    "edu.zstu.name": "浙江理工大学",
    "edu.zstu.desc": "计算机科学与技术专业，本科。",

    // Experience
    "exp.benchmark.name": "CLI-Agent 安全性 Benchmark 构建（论文撰写中）",
    "exp.benchmark.date": "2025 — 2026",
    "exp.benchmark.desc": "参考 OWASP LLM Top 10 与 MITRE ATLAS 攻击框架，设计并实现了一个面向 CLI-Agent（如 Claude Code）的安全评估 Benchmark。评估多种安全风险，重点关注间接 Prompt 注入对 Agent 命令执行滥用及环境信息泄露的影响，涵盖 Skills 投毒、项目投毒、Agent Memory 投毒、恶意 shell 命令执行及用户敏感信息泄露等场景。构建自动化评测流程，用于测试不同 CLI-Agent 和后端 LLM 的鲁棒性。",
    "exp.agent.name": "AI Agent 相关项目",
    "exp.agent.date": "2025 — 至今",
    "exp.agent.desc": "从零实现了一个最小 Claude Code，深入了解 CLI-Agent 的基础功能，包括工具调用、Skills 接入、Subagents、后台任务执行与监控、Agent-Swarms 等特性。学习了 Claude Agent SDK。针对实验室常见服务器问题，编写了 Agent Skill 自动检测 GPU 显存与硬盘占用情况，并通过 Openclaw-Cron 实现定时自动化检测。",
    "exp.modelops.name": "LLM ModelOps 平台",
    "exp.modelops.date": "2024 — 2026",
    "exp.modelops.desc": "独立负责实验室大语言模型调优平台的后端服务与数据库设计，类似火山方舟、阿里云百炼等 MaaS 平台。基于 Flask 设计并实现平台后端 API，连接前端与底层模型训练流程，使用 MongoDB 管理平台数据。支持模型推理与微调任务的参数配置与管理、训练任务生命周期管理、数据集版本管理及 Prompt 模板管理功能。",

    // Portfolio
    "portfolio.title":          "项目展示",
    "portfolio.filter.all":     "全部",
    "portfolio.filter.web-design": "网页设计",
    "portfolio.filter.apps":    "应用程序",
    "portfolio.filter.web-dev": "网页开发",
    "portfolio.filter.select":  "选择类别",

    // Blog
    "blog.title": "博客",
    "blog.back":  "返回博客列表",

    // Contact
    "contact.title":              "联系我",
    "contact.form-title":         "联系表单",
    "contact.send":               "发送消息",
    "contact.placeholder.name":   "姓名",
    "contact.placeholder.email":  "邮箱地址",
    "contact.placeholder.message": "留言内容",
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

const applyTranslations = (lang) => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang]?.[key] !== undefined) {
      el.placeholder = translations[lang][key];
    }
  });
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
};

// ============================================================
// Language Toggle
// ============================================================
const langToggleBtn = document.getElementById('lang-toggle');

const updateLangToggleUI = (lang) => {
  if (!langToggleBtn) return;
  langToggleBtn.classList.toggle('zh-active', lang === 'zh');
};

if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('lang', currentLang);
    updateLangToggleUI(currentLang);
    applyTranslations(currentLang);
    if (portfolioManifestCache) renderPortfolioList(portfolioManifestCache);
    if (manifestCache) renderBlogList(manifestCache);
  });
}

// ============================================================
// Utility
// ============================================================
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// ============================================================
// Sidebar Toggle
// ============================================================
const sidebar    = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

// ============================================================
// Testimonials Modal
// ============================================================
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer   = document.querySelector("[data-modal-container]");
const modalCloseBtn    = document.querySelector("[data-modal-close-btn]");
const overlay          = document.querySelector("[data-overlay]");
const modalImg         = document.querySelector("[data-modal-img]");
const modalTitle       = document.querySelector("[data-modal-title]");
const modalText        = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay)        overlay.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    if (modalImg)   { modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
                      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt; }
    if (modalTitle) { modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML; }
    if (modalText)  { modalText.innerHTML  = this.querySelector("[data-testimonials-text]").innerHTML; }
    testimonialsModalFunc();
  });
});
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay)       overlay.addEventListener("click", testimonialsModalFunc);

// ============================================================
// Portfolio: Dynamic Loading
// ============================================================
const portfolioList = document.getElementById('portfolio-list');
let portfolioManifestCache = null;

const loadPortfolioManifest = async () => {
  if (portfolioManifestCache) {
    renderPortfolioList(portfolioManifestCache);
    return;
  }
  try {
    const res = await fetch('./portfolio/manifest.json');
    if (!res.ok) throw new Error('portfolio manifest not found');
    portfolioManifestCache = await res.json();
    renderPortfolioList(portfolioManifestCache);
  } catch (e) {
    if (portfolioList) {
      portfolioList.innerHTML = '<li style="padding:20px;color:var(--light-gray-70,#a8a8b3);">No projects yet.</li>';
    }
  }
};

const CATEGORY_ICONS = {
  agent:   'terminal-outline',
  mlops:   'server-outline',
  research:'flask-outline',
  web:     'globe-outline',
  default: 'code-slash-outline',
};

const renderPortfolioList = (projects) => {
  if (!portfolioList) return;
  portfolioList.innerHTML = projects.map(p => {
    const title    = currentLang === 'zh' && p.title_zh    ? p.title_zh    : p.title;
    const category = currentLang === 'zh' && p.category_zh ? p.category_zh : p.category;
    const desc     = currentLang === 'zh' && p.desc_zh     ? p.desc_zh     : (p.desc || '');
    const icon     = CATEGORY_ICONS[p.category] || CATEGORY_ICONS.default;
    const isExternal = p.link && p.link !== '#';
    return `
    <li class="project-item active" data-filter-item data-category="${p.category}">
      <a href="${p.link || '#'}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          ${p.cover
            ? `<img src="${p.cover}" alt="${title}" loading="lazy">`
            : `<div class="project-img-placeholder"><ion-icon name="${icon}"></ion-icon></div>`
          }
        </figure>
        <h3 class="project-title">${title}</h3>
        <p class="project-category">${category}</p>
        ${desc ? `<p class="project-desc">${desc}</p>` : ''}
      </a>
    </li>`;
  }).join('');
};

const portfolioPage = document.querySelector('[data-page="portfolio"]');
if (portfolioPage) {
  new MutationObserver(() => {
    if (portfolioPage.classList.contains('active')) {
      loadPortfolioManifest();
    }
  }).observe(portfolioPage, { attributes: true, attributeFilter: ['class'] });
}

// ============================================================
// Contact Form
// ============================================================
const form       = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn    = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (form && formBtn) {
      formBtn.toggleAttribute("disabled", !form.checkValidity());
    }
  });
});

// ============================================================
// Hash Router
// ============================================================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages           = document.querySelectorAll("[data-page]");

const VALID_PAGES = ['about', 'portfolio', 'blog'];

const showPage = (pageName) => {
  pages.forEach(page => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });
  navigationLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.pageTarget === pageName);
  });
  window.scrollTo(0, 0);
};

const navigateTo = (hash) => {
  if (!hash) hash = 'about';

  if (hash.startsWith('blog/')) {
    const slug = hash.split('/').slice(1).join('/');
    showPage('blog');
    loadBlogPost(slug);
    return;
  }

  if (!VALID_PAGES.includes(hash)) hash = 'about';

  if (hash === 'blog') {
    showPage('blog');
    showBlogList(false);
    return;
  }

  showPage(hash);
};

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const target = this.dataset.pageTarget || 'about';
    window.location.hash = target;
  });
});

window.addEventListener('hashchange', () => {
  navigateTo(decodeURIComponent(window.location.hash.slice(1)));
});

// ============================================================
// Blog: Markdown Loading
// ============================================================
const blogListView   = document.querySelector('.blog-list-view');
const blogPostView   = document.querySelector('.blog-post-view');
const blogPostsList  = document.getElementById('blog-posts-list');
const blogPostContent = document.getElementById('blog-post-content');
const blogBackBtn    = document.getElementById('blog-back-btn');

let manifestCache = null;

const loadManifest = async () => {
  if (manifestCache) {
    renderBlogList(manifestCache);
    return;
  }
  try {
    const res = await fetch('./posts/manifest.json');
    if (!res.ok) throw new Error('manifest not found');
    manifestCache = await res.json();
    renderBlogList(manifestCache);
  } catch (e) {
    if (blogPostsList) {
      blogPostsList.innerHTML = '<li style="padding:20px;color:var(--light-gray-70,#a8a8b3);">No posts yet.</li>';
    }
  }
};

const renderBlogList = (posts) => {
  if (!blogPostsList) return;

  const sorted = [...posts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date) - new Date(a.date);
  });

  blogPostsList.innerHTML = sorted.map(post => {
    const title   = currentLang === 'zh' && post.title_zh   ? post.title_zh   : post.title;
    const excerpt = currentLang === 'zh' && post.excerpt_zh ? post.excerpt_zh : (post.excerpt || '');
    return `
    <li class="blog-post-item${post.pinned ? ' blog-post-pinned' : ''}">
      <a href="#blog/${post.slug}" class="blog-post-link" data-slug="${post.slug}">
        ${post.pinned ? '<span class="pin-badge"><ion-icon name="pin"></ion-icon></span>' : ''}
        ${post.cover
          ? `<figure class="blog-banner-box"><img src="${post.cover}" alt="${title}" loading="lazy"></figure>`
          : ''}
        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category || 'Article'}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${formatDate(post.date)}</time>
          </div>
          <h3 class="h3 blog-item-title">${title}</h3>
          <p class="blog-text">${excerpt}</p>
        </div>
      </a>
    </li>`;
  }).join('');

  blogPostsList.querySelectorAll('.blog-post-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const slug = link.dataset.slug;
      window.location.hash = `blog/${slug}`;
    });
  });
};

// ============================================================
// Markdown Rendering Pipeline
// ============================================================

// Phase 1: Extract all math before marked.js touches the source.
//   - Block math $$...$$ (multiline)
//   - Inline math $...$ (allow internal spaces, but not empty)
//   - Also protect raw HTML <img> tags from marked mangling
const extractMath = (md) => {
  const store = [];
  const push = (content, display) => {
    store.push({ content, display });
    return `<span data-math-id="${store.length - 1}"></span>`;
  };
  md = md.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) => push(tex.trim(), true));
  md = md.replace(/(?<!\$)\$(?!\$)([^\n$]+?)\$(?!\$)/g, (_, tex) => push(tex.trim(), false));
  return { md, store };
};

// Phase 2: After marked produces HTML, render each math placeholder with KaTeX.
const renderMathPlaceholders = (html, store) => {
  if (typeof katex === 'undefined' || !store.length) return html;
  return html.replace(/data-math-id="(\d+)"/g, (fullAttr, i) => {
    const { content, display } = store[+i];
    try {
      const rendered = katex.renderToString(content, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      });
      return `data-math-id="${i}" data-rendered>${display
        ? `</span><div class="katex-display-wrapper">${rendered}</div><span`
        : `</span>${rendered}<span`}`;
    } catch {
      return fullAttr;
    }
  });
};

// Phase 3: Fix relative image paths from posts/ subdirectory
const fixImagePaths = (html) =>
  html.replace(/(<img\s[^>]*?)src=(["'])images\//gi, '$1src=$2./posts/images/');

// Configure marked for best output
if (typeof marked !== 'undefined') {
  marked.setOptions({
    breaks: false,
    gfm: true,
    headerIds: false,
    mangle: false,
  });
}

const loadBlogPost = async (slug) => {
  if (!blogListView || !blogPostView || !blogPostContent) return;
  blogListView.style.display = 'none';
  blogPostView.style.display = 'block';
  blogPostContent.innerHTML = '<div class="blog-post-loading">Loading…</div>';

  try {
    // Parallel: ensure manifest + fetch the md file at the same time
    const [mdRes] = await Promise.all([
      fetch(`./posts/${encodeURIComponent(slug)}.md`),
      manifestCache ? Promise.resolve() : fetch('./posts/manifest.json')
        .then(r => r.ok ? r.json() : null)
        .then(d => { if (d) manifestCache = d; })
        .catch(() => {}),
    ]);
    if (!mdRes.ok) throw new Error('not found');
    let md = await mdRes.text();

    // Inject title if the file has no leading # heading
    if (!/^\s*#/.test(md)) {
      const post = manifestCache?.find(p => p.slug === slug);
      if (post) {
        const title = currentLang === 'zh' && post.title_zh ? post.title_zh : post.title;
        md = `# ${title}\n\n${md}`;
      }
    }

    // Pipeline: extract math → parse markdown → render math → fix images
    const { md: safeMd, store } = extractMath(md);
    let html = (typeof marked !== 'undefined') ? marked.parse(safeMd) : `<pre>${safeMd}</pre>`;
    html = renderMathPlaceholders(html, store);
    html = fixImagePaths(html);

    blogPostContent.innerHTML = html;

    // Clean up empty wrapper spans left by injection
    blogPostContent.querySelectorAll('span[data-rendered]').forEach(el => {
      if (!el.textContent.trim() && !el.children.length) el.remove();
    });

    window.scrollTo(0, 0);
  } catch (e) {
    blogPostContent.innerHTML = '<p style="color:var(--light-gray-70,#a8a8b3);padding:20px 0;">Post not found.</p>';
  }
};

const showBlogList = (updateHash = true) => {
  if (blogListView) blogListView.style.display = '';
  if (blogPostView) blogPostView.style.display = 'none';
  if (updateHash) window.location.hash = 'blog';
  loadManifest();
};

if (blogBackBtn) {
  blogBackBtn.addEventListener('click', () => showBlogList(true));
}

const blogPage = document.querySelector('[data-page="blog"]');
if (blogPage) {
  new MutationObserver(() => {
    if (blogPage.classList.contains('active')) {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash.startsWith('blog/')) {
        showBlogList(false);
      }
    }
  }).observe(blogPage, { attributes: true, attributeFilter: ['class'] });
}

// ============================================================
// Helpers
// ============================================================
const formatDate = (dateStr) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
};

// ============================================================
// Init
// ============================================================
updateLangToggleUI(currentLang);
applyTranslations(currentLang);

const initialHash = decodeURIComponent(window.location.hash.slice(1)) || 'about';
navigateTo(initialHash);
