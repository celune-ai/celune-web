---
title: Feed Sources
description: RSS feeds and Bluesky topics powering the feed scanner.
---

# Feed Sources

The feed scanner runs on a configurable set of RSS feeds and Bluesky topic searches. This is the current configuration from `feed-sources.yaml`.

## RSS Feeds (25 sources)

### Tech

| Name            | Tags             |
| --------------- | ---------------- |
| Hacker News     | tech, startups   |
| TechCrunch AI   | ai, startups     |
| Ars Technica AI | ai, tech         |
| The Verge Tech  | tech, product    |
| Platformer      | tech, business   |
| Simon Willison  | ai, python, tech |

### Design

| Name                 | Tags               |
| -------------------- | ------------------ |
| A List Apart         | design, web        |
| Smashing Magazine    | design, web, ux    |
| Nielsen Norman Group | ux, research       |
| Julie Zhuo           | design, leadership |

### Indie / Solopreneur

| Name          | Tags                      |
| ------------- | ------------------------- |
| Indie Hackers | indie, startups, business |
| Pieter Levels | indie, ai, startups       |
| Justin Welsh  | indie, business           |

### AI / Agents

| Name              | Tags                    |
| ----------------- | ----------------------- |
| Latent Space      | ai, agents, engineering |
| The Rundown AI    | ai, tools               |
| Hugging Face Blog | ai, open-source         |

### Product & Growth

| Name               | Tags              |
| ------------------ | ----------------- |
| Lenny's Newsletter | product, growth   |
| Product Hunt       | product, startups |

### Healthcare

| Name              | Tags                 |
| ----------------- | -------------------- |
| Rock Health       | healthcare, startups |
| Fierce Healthcare | healthcare, industry |

### Business Strategy

| Name        | Tags           |
| ----------- | -------------- |
| Stratechery | tech, business |

## Bluesky

Bluesky scanning is enabled. Credentials are loaded from environment variables.

### Topic Searches

- AI tools
- product design
- software startups
- indie hacking
- UX research

## Configuration

The full YAML configuration:

```yaml
rss:
  - name: 'Hacker News'
    url: 'https://news.ycombinator.com/rss'
    tags: [tech, startups]

  - name: 'TechCrunch AI'
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/'
    tags: [ai, startups]

  - name: 'Ars Technica AI'
    url: 'https://feeds.arstechnica.com/arstechnica/technology-lab'
    tags: [ai, tech]

  - name: 'The Verge Tech'
    url: 'https://www.theverge.com/rss/tech/index.xml'
    tags: [tech, product]

  - name: 'A List Apart'
    url: 'https://alistapart.com/main/feed/'
    tags: [design, web]

  - name: 'Smashing Magazine'
    url: 'https://www.smashingmagazine.com/feed/'
    tags: [design, web, ux]

  - name: 'Nielsen Norman Group'
    url: 'https://www.nngroup.com/feed/rss/'
    tags: [ux, research]

  - name: 'Product Hunt'
    url: 'https://www.producthunt.com/feed'
    tags: [product, startups]

  - name: 'Simon Willison'
    url: 'https://simonwillison.net/atom/everything/'
    tags: [ai, python, tech]

  - name: 'Platformer'
    url: 'https://www.platformer.news/rss/'
    tags: [tech, business]

  - name: 'Indie Hackers'
    url: 'https://www.indiehackers.com/feed.xml'
    tags: [indie, startups, business]

  - name: 'Pieter Levels'
    url: 'https://levels.io/rss/'
    tags: [indie, ai, startups]

  - name: 'Justin Welsh'
    url: 'https://thejustinwelsh.substack.com/feed'
    tags: [indie, business]

  - name: 'Latent Space'
    url: 'https://www.latent.space/feed'
    tags: [ai, agents, engineering]

  - name: 'The Rundown AI'
    url: 'https://rss.beehiiv.com/feeds/2R3C6Bt5wj.xml'
    tags: [ai, tools]

  - name: 'Hugging Face Blog'
    url: 'https://huggingface.co/blog/feed.xml'
    tags: [ai, open-source]

  - name: "Lenny's Newsletter"
    url: 'https://www.lennysnewsletter.com/feed'
    tags: [product, growth]

  - name: 'Julie Zhuo'
    url: 'https://lg.substack.com/feed'
    tags: [design, leadership]

  - name: 'Stratechery'
    url: 'https://stratechery.com/feed/'
    tags: [tech, business]

  - name: 'Rock Health'
    url: 'https://rockhealth.com/feed/'
    tags: [healthcare, startups]

  - name: 'Fierce Healthcare'
    url: 'https://www.fiercehealthcare.com/rss/xml'
    tags: [healthcare, industry]

bluesky:
  enabled: true
  # Credentials loaded from .env

topics:
  - 'AI tools'
  - 'product design'
  - 'software startups'
  - 'indie hacking'
  - 'UX research'
```
