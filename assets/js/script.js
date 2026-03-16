'use strict';

// ============================================================
// i18n Translations
// ============================================================
const translations = {
  en: {
    // Sidebar
    "sidebar.job-title":   "Web developer",
    "sidebar.email":       "Email",
    "sidebar.phone":       "Phone",
    "sidebar.birthday":    "Birthday",
    "sidebar.location":    "Location",
    "about.show-contacts": "Show Contacts",

    // About
    "about.title":        "About me",
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
    "resume.experience": "Experience",
    "resume.skills":     "My skills",

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
    // Sidebar
    "sidebar.job-title":   "Web 开发者",
    "sidebar.email":       "邮箱",
    "sidebar.phone":       "电话",
    "sidebar.birthday":    "生日",
    "sidebar.location":    "所在地",
    "about.show-contacts": "显示联系方式",

    // About
    "about.title":        "关于我",
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
    "resume.experience": "工作经历",
    "resume.skills":     "我的技能",

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
// Portfolio Filter
// ============================================================
const select      = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn   = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) select.addEventListener("click", function () { elementToggleFunc(this); });

const filterFunc = (selectedValue) => {
  filterItems.forEach(item => {
    const match = selectedValue === "all" || selectedValue === item.dataset.category;
    item.classList.toggle("active", match);
  });
};

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(this.dataset.filterValue || this.innerText.toLowerCase());
  });
});

let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(this.dataset.filterValue || this.innerText.toLowerCase());
    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

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

const VALID_PAGES = ['about', 'resume', 'portfolio', 'blog', 'contact'];

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
  blogPostsList.innerHTML = posts.map(post => `
    <li class="blog-post-item">
      <a href="#blog/${post.slug}" class="blog-post-link" data-slug="${post.slug}">
        ${post.cover
          ? `<figure class="blog-banner-box"><img src="${post.cover}" alt="${post.title}" loading="lazy"></figure>`
          : ''}
        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category || 'Article'}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${formatDate(post.date)}</time>
          </div>
          <h3 class="h3 blog-item-title">${post.title}</h3>
          <p class="blog-text">${post.excerpt || ''}</p>
        </div>
      </a>
    </li>
  `).join('');

  blogPostsList.querySelectorAll('.blog-post-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const slug = link.dataset.slug;
      window.location.hash = `blog/${slug}`;
    });
  });
};

const loadBlogPost = async (slug) => {
  if (!blogListView || !blogPostView || !blogPostContent) return;
  blogListView.style.display = 'none';
  blogPostView.style.display = 'block';
  blogPostContent.innerHTML = '<div class="blog-post-loading">Loading...</div>';

  try {
    const res = await fetch(`./posts/${slug}.md`);
    if (!res.ok) throw new Error('post not found');
    const md = await res.text();
    blogPostContent.innerHTML = (typeof marked !== 'undefined')
      ? marked.parse(md)
      : `<pre>${md}</pre>`;
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
