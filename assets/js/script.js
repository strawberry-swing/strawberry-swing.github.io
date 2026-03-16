'use strict';

// ============================================================
// i18n Translations
// ============================================================
const translations = {
  en: {
    "nav.about":      "About",
    "nav.resume":     "Resume",
    "nav.portfolio":  "Portfolio",
    "nav.blog":       "Blog",
    "nav.contact":    "Contact",

    "about.title":         "About me",
    "about.show-contacts": "Show Contacts",
    "resume.title":        "Resume",
    "portfolio.title":     "Portfolio",
    "blog.title":          "Blog",
    "blog.back":           "Back to Blog",
    "contact.title":       "Contact",
  },
  zh: {
    "nav.about":      "关于",
    "nav.resume":     "简历",
    "nav.portfolio":  "项目",
    "nav.blog":       "博客",
    "nav.contact":    "联系",

    "about.title":         "关于我",
    "about.show-contacts": "显示联系方式",
    "resume.title":        "简历",
    "portfolio.title":     "项目展示",
    "blog.title":          "博客",
    "blog.back":           "返回博客列表",
    "contact.title":       "联系我",
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
    filterFunc(this.innerText.toLowerCase());
  });
});

let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(this.innerText.toLowerCase());
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
