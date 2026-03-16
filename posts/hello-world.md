# Hello World — My First Blog Post

Welcome to my personal blog! This post is written in **Markdown** and rendered dynamically in the browser — no build step required.

## How This Works

Blog posts are stored as `.md` files in the `posts/` folder. A `manifest.json` file acts as the index, listing each post's metadata (title, date, category, excerpt, and cover image).

When you click a post, the browser fetches the `.md` file and renders it using [marked.js](https://marked.js.org/).

## Adding a New Post

1. Write your post as `posts/my-new-post.md`
2. Add an entry to `posts/manifest.json`:

```json
{
  "slug": "my-new-post",
  "title": "My New Post",
  "date": "2026-03-20",
  "category": "Tech",
  "excerpt": "A short description of the post.",
  "cover": "./assets/images/blog-1.jpg"
}
```

3. Commit and push — done! ✅

## Markdown Features Supported

- **Bold** and *italic* text
- `Inline code` and code blocks
- > Blockquotes
- Lists (ordered and unordered)
- [Links](https://github.com)
- Images
- Tables
- Horizontal rules

---

Thanks for visiting! More posts coming soon.
