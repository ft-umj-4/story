# Blog for Alumni FT UMJ - P2K - Angkatan ke-4 Tahun 2009

[🌎 Live](https://ft-umj-4.github.io/story/)

## Content Update

- All blog posts are under [`src/posts`](https://github.com/ft-umj-4/story/tree/master/src/posts)
- Update `index.md` if you need to update content from existing post
- Add new directory along with mandatory `index.md` file inside it.
- Sample metadata for each  `index.md`:

```md
---
<!-- Title of the blog post -->
title: Arisan Jilid 1 - 01 - Rumah Rahmat
<!-- YYYY-MM-DD published date -->
date: 2015-03-23
<!-- Tagging -->
tags:
 - arisan
 - arisan-jilid-1
<!-- Thumbnail: place the image under the same directory -->
thumb: Arisan-Jilid-01-1.jpg
---
```

## Local Development

Prerequisites:

- Install [bun](https://bun.sh/docs/installation)

Install deps:

```bash
bun install
```

Run in your local

```bash
bun run dev
```

Build the app

```bash
bun run build
```

## Auto deploy

This repo will auto deploy to production once you merge any new code in `master` branch.

---

&copy; Since 2019-present. Coded by [Irfan Maulana](https://www.mazipan.space/)