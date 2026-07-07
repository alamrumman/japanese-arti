```markdown
# PRD — 日本の工芸品 (Japanese Artifacts)
### Premium Frontend Experience
Version: 1.0

---

# Overview

Build a premium React frontend showcasing the beauty of traditional Japanese craftsmanship.

The website should feel like walking through a modern Japanese museum rather than browsing an ecommerce website.

The entire website must be written in Japanese.

No English should appear anywhere inside the UI.

The experience must be slow, elegant, immersive and cinematic.

---

# Primary Goals

- Achieve Lighthouse 100 across all categories
- Smooth 60 FPS animations
- Premium storytelling
- Japanese-first experience
- Extremely clean codebase
- Fully responsive
- Reusable components
- Production ready

---

# Technology

- React
- TypeScript
- Vite
- TailwindCSS
- GSAP
- Lenis
- SplitType
- Framer Motion
- React Intersection Observer

No ThreeJS.

Everything should rely on GPU accelerated CSS transforms.

---

# Performance

Performance Score
100

Accessibility
100

SEO
100

Best Practices
100

CLS
<0.02

LCP
<1.8s

INP
<150ms

Images

AVIF
WebP fallback

Responsive images

loading="lazy"

Hero assets preloaded

Fonts

font-display swap

Animations

transform
opacity
filter

Never animate

top
left
width
height
margin

---

# Theme

A modern digital museum.

Think

Apple
MUJI
Aesop
Japanese National Museum

Visual language

Paper

Ink

Clay

Wood

Gold

Stone

Soft light

Negative space

Natural imperfections

---

# Color Palette

Background

#F7F4EF

Paper

#EFE9DF

Ink

#1A1A1A

Gold

#C79B52

Clay

#A86C4A

Forest

#55654F

Dark

#111111

---

# Typography

Headings

Noto Serif JP

Body

Noto Sans JP

Large spacing

Large margins

Editorial layouts

---

# Website Structure

1 Hero

2 日本の工芸について

3 注目の工芸品

4 制作工程

5 歴史

6 ギャラリー

7 職人の哲学

8 CTA

9 Footer

---

# Global Behaviour

Lenis smooth scrolling

Duration

1.2

Every section enters with

opacity

translateY

Image parallax

Nothing snaps.

Everything should feel handcrafted.

---

# HERO SECTION

Height

100vh

Layout

Left

Japanese heading

Description

CTA

Right

Large handcrafted artifact

Background

Paper texture

Japanese sun

Ink brush

Dust particles

Cherry blossom

---

## Hero Animation

Page loads

Paper texture fades

Background scales

Sun slowly appears

Ink stroke draws

Artifact fades

Artifact slowly rotates

Headline reveals line by line

Description fades

CTA slides upward

Particles begin floating

Mouse movement

Artifact tilts

Entire hero breathes forever

---

## Hero Scroll

Artifact

Moves upward

Scales slightly

Camera zooms

Text fades

Background transforms

Next section pushes over hero

---

# SECTION 2

日本の工芸について

Layout

50/50

Left

Large editorial typography

Story

CTA

Right

Beautiful artisan photograph

Large image

Rounded corners

Soft shadow

---

Animations

Image

Scale

1.1 → 1

Text

Reveal line by line

Brush stroke draws behind heading

Background slowly moves

---

# FEATURED ARTIFACTS

Section title

注目の工芸品

Five premium cards

Tea Bowl

Folding Fan

Lacquer Box

Katana Handle

Noh Mask

Layout

Desktop

5 cards

Tablet

3

Mobile

1

---

Card Design

Large image

Japanese title

Small description

Arrow

Hover

Lift

Image zoom

Soft shadow

Gold underline

---

Animation

Cards appear one after another

20ms delay

Hover

TranslateY

-12px

Scale image

1.08

---

# MAKING PROCESS

Horizontal timeline

Desktop

Vertical

Mobile

Steps

土づくり

成形

乾燥

絵付け

焼成

完成

Each step

Circle image

Gold connector

Japanese label

Hover enlarges image

---

Animation

Connector line grows

Images fade

Step numbers animate

---

# HISTORY SECTION

Large horizontal timeline

1600

1700

1800

1900

Today

Center line

Gold

Each milestone

Artifact

Small description

Scroll reveals milestones

---

# GALLERY

Masonry Grid

2

3

4 columns

Responsive

Images

Pottery

Tea ceremony

Bamboo

Fans

Wood

Masks

Calligraphy

Fabric

Hover

Scale

Overlay

Japanese title

Arrow

---

# PHILOSOPHY

Dark background

Large Japanese quote

Huge artifact image

Gold particles

Ink animation

Quote slowly appears

Very little movement

---

# CTA

Centered

Large Japanese heading

Description

Single CTA

Background

Paper

Gold accents

Ink brush

Animation

Brush draws

Button fades

Hover

Gold glow

Arrow slides

---

# FOOTER

Minimal

Navigation

Socials

Japanese logo

Divider

Copyright

---

# Navbar

Transparent

Becomes paper background

Blur

Shadow

Hide on scroll down

Show on scroll up

Desktop

Inline navigation

Mobile

Fullscreen menu

Animated

---

# Micro Interactions

Buttons

Ripple

Hover

Lift

Cards

Glow

Images

Zoom

Cursor

Smooth

Links

Underline grows

---

# Motion Principles

Fast

Never

Everything

Elegant

Slow

Organic

No bouncing

No elastic

Ease

power3.out

power2.inOut

---

# Asset List

Hero

Hero Background

Paper Texture

Ink Brush

Red Sun

Dust Overlay

Cherry Blossom Branch

Mountain Ink

Hero Bowl

---

About

Artisan Hands

Pottery Wheel

Clay

Workshop

Natural Light

---

Featured Cards

Tea Bowl

Folding Fan

Lacquer Box

Katana Handle

Noh Mask

---

Timeline

Clay

Wheel

Drying

Painting

Kiln

Finished Bowl

---

Gallery

15 Museum Quality Images

Pottery

Tea Set

Bamboo

Calligraphy

Fabric

Wood

Masks

Fans

Incense

Lacquerware

---

# Image Requirements

Resolution

3000px+

Format

AVIF

Fallback

WebP

Compression

High

No text

No watermark

Studio lighting

Museum quality

Warm tones

Natural imperfections

---

# Accessibility

Keyboard navigation

Visible focus

ARIA labels

Contrast AA+

Reduced motion support

Semantic HTML

Alt text

---

# SEO

Japanese metadata

Structured Data

OpenGraph

Twitter cards

Sitemap

robots.txt

Canonical URLs

---

# Folder Structure

src/

assets/

images/

icons/

components/

layout/

navbar/

footer/

ui/

sections/

Hero/

About/

Artifacts/

Timeline/

Gallery/

Philosophy/

CTA/

hooks/

animations/

utils/

styles/

---

# Deliverables

✓ Pixel-perfect React implementation

✓ Fully responsive

✓ Japanese-only UI

✓ GSAP animations

✓ Lenis smooth scrolling

✓ Lighthouse 100

✓ Optimized assets

✓ Reusable components

✓ Clean TypeScript

✓ Production-ready codebase
```

This PRD is designed specifically for **Claude Code/Codex** to build a premium museum-style Japanese artifacts website with cinematic animations, excellent performance, and a production-ready architecture.
