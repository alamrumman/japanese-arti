import { StrictMode, useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/hooks/useSmoothScroll.js
/**
* Lenis smooth scrolling, loaded lazily after first paint so it stays out of
* the critical bundle and off the main thread during load. Disabled when the
* user prefers reduced motion. PRD: duration 1.2, nothing snaps.
*/
function useSmoothScroll() {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let lenis;
		let rafId;
		let cancelled = false;
		const start = () => {
			import("lenis").then(({ default: Lenis }) => {
				if (cancelled) return;
				lenis = new Lenis({
					duration: 1.2,
					easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
					smoothWheel: true
				});
				const raf = (time) => {
					lenis.raf(time);
					rafId = requestAnimationFrame(raf);
				};
				rafId = requestAnimationFrame(raf);
			});
		};
		const idle = typeof requestIdleCallback !== "undefined" ? requestIdleCallback(start, { timeout: 2e3 }) : setTimeout(start, 1200);
		return () => {
			cancelled = true;
			if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(idle);
			else clearTimeout(idle);
			if (rafId) cancelAnimationFrame(rafId);
			if (lenis) lenis.destroy();
		};
	}, []);
}
//#endregion
//#region src/data/site.js
var NAV_LINKS = [
	{
		label: "ホーム",
		to: "/"
	},
	{
		label: "工芸品",
		to: "/#artifacts"
	},
	{
		label: "職人の技",
		to: "/#process"
	},
	{
		label: "美の哲学",
		to: "/#philosophy"
	},
	{
		label: "ギャラリー",
		to: "/#gallery"
	},
	{
		label: "私たちについて",
		to: "/about"
	},
	{
		label: "お問い合わせ",
		to: "/contact"
	}
];
var ARTIFACTS = [
	{
		id: "chawan",
		title: "茶碗",
		desc: "茶の湯を映す、侘び寂びの器。",
		img: "/images/chawan.webp"
	},
	{
		id: "sensu",
		title: "京扇子",
		desc: "風を彩る、日本の美意識。",
		img: "/images/sensu.webp"
	},
	{
		id: "shikki",
		title: "漆器",
		desc: "時を重ねて美しくなる、漆の器。",
		img: "/images/shikki.webp"
	},
	{
		id: "katana",
		title: "日本刀の技",
		desc: "武士の魂、匠の技が宿る。",
		img: "/images/katana.webp"
	},
	{
		id: "nomen",
		title: "能面",
		desc: "感情を超えた、美の表現。",
		img: "/images/nomen.webp"
	}
];
var PROCESS_STEPS = [
	{
		no: "01",
		title: "土づくり",
		desc: "素材を選び、土の個性を引き出す。",
		img: "/images/p1.webp"
	},
	{
		no: "02",
		title: "成形",
		desc: "手や道具を使い、形を生み出す。",
		img: "/images/p2.webp"
	},
	{
		no: "03",
		title: "乾燥・素焼き",
		desc: "時間をかけて、土を強くする。",
		img: "/images/p3.webp"
	},
	{
		no: "04",
		title: "釉薬・絵付け",
		desc: "美しさを与え、想いを込める。",
		img: "/images/p4.webp"
	},
	{
		no: "05",
		title: "本焼成",
		desc: "炎と向き合い、完成へと導く。",
		img: "/images/p5.webp"
	}
];
var HISTORY = [
	{
		year: "1600",
		title: "桃山の残響",
		desc: "茶の湯とともに、器の美が磨かれる。",
		img: "/images/chawan.webp"
	},
	{
		year: "1700",
		title: "町人文化",
		desc: "暮らしの中に、工芸の彩りが広がる。",
		img: "/images/sensu.webp"
	},
	{
		year: "1800",
		title: "技の円熟",
		desc: "各地の窯が、独自の表情を深める。",
		img: "/images/shikki.webp"
	},
	{
		year: "1900",
		title: "民藝の目",
		desc: "無名の職人の手仕事に、美が見出される。",
		img: "/images/g_basket.webp"
	},
	{
		year: "現在",
		title: "受け継ぐ手",
		desc: "伝統と現代が出会い、新たな美が生まれる。",
		img: "/images/katana.webp"
	}
];
var GALLERY = [
	{
		id: "g1",
		title: "茶の湯",
		span: "tall",
		img: "/images/chawan.webp"
	},
	{
		id: "g2",
		title: "鉄瓶",
		span: "wide",
		img: "/images/g_teapot.webp"
	},
	{
		id: "g3",
		title: "花入",
		span: "base",
		img: "/images/g_pot.webp"
	},
	{
		id: "g4",
		title: "藍染",
		span: "tall",
		img: "/images/g_indigo.webp"
	},
	{
		id: "g5",
		title: "竹細工",
		span: "base",
		img: "/images/g_basket.webp"
	},
	{
		id: "g6",
		title: "漆黒",
		span: "wide",
		img: "/images/philobowl.webp"
	},
	{
		id: "g7",
		title: "能面",
		span: "base",
		img: "/images/nomen.webp"
	},
	{
		id: "g8",
		title: "金彩",
		span: "tall",
		img: "/images/shikki.webp"
	},
	{
		id: "g9",
		title: "炎",
		span: "base",
		img: "/images/p5.webp"
	}
];
var FOOTER_COLUMNS = [
	{
		heading: "工芸品",
		links: [
			"茶道具",
			"陶磁器",
			"漆器",
			"木工品",
			"金工品",
			"染織品"
		]
	},
	{
		heading: "職人の技",
		links: [
			"工芸の工程",
			"素材について",
			"伝統の継承",
			"道具の紹介"
		]
	},
	{
		heading: "美の哲学",
		links: [
			"美意識",
			"侘び寂び",
			"自然との調和",
			"日本の心"
		]
	},
	{
		heading: "サポート",
		links: [
			{
				label: "よくある質問",
				to: "/contact"
			},
			{
				label: "プライバシーポリシー",
				to: "/privacy"
			},
			{
				label: "利用規約",
				to: "/terms"
			},
			{
				label: "お問い合わせ",
				to: "/contact"
			}
		]
	}
];
//#endregion
//#region src/hooks/useScrollDirection.js
/**
* Navbar behaviour: track whether the page is scrolled (paper bg) and
* whether the user is scrolling down (hide) or up (show).
*/
function useScrollDirection() {
	const [scrolled, setScrolled] = useState(false);
	const [hidden, setHidden] = useState(false);
	useEffect(() => {
		let lastY = window.scrollY;
		let ticking = false;
		const update = () => {
			const y = window.scrollY;
			setScrolled(y > 24);
			if (Math.abs(y - lastY) > 6) {
				setHidden(y > lastY && y > 240);
				lastY = y;
			}
			ticking = false;
		};
		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(update);
				ticking = true;
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return {
		scrolled,
		hidden
	};
}
//#endregion
//#region src/components/layout/Logo.jsx
/** Wordmark: seal-style mark + Japanese lockup. */
function Logo({ light = false, className = "" }) {
	const ink = light ? "#F7F4EF" : "#1A1A1A";
	const sub = light ? "rgba(247,244,239,0.6)" : "rgba(26,26,26,0.55)";
	return /* @__PURE__ */ jsxs("span", {
		className: `flex items-center gap-3 ${className}`,
		children: [/* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 40 40",
			width: "34",
			height: "34",
			fill: "none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "1.5",
					y: "1.5",
					width: "37",
					height: "37",
					rx: "7",
					stroke: ink,
					strokeWidth: "1.4"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M20 8v24M11 15h18M13 24c4 3 10 3 14 0",
					stroke: ink,
					strokeWidth: "1.4",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "20",
					cy: "20",
					r: "2.4",
					fill: "var(--gold)"
				})
			]
		}), /* @__PURE__ */ jsxs("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-serif text-lg font-semibold tracking-[0.14em]",
				style: { color: ink },
				children: "日本の工芸品"
			}), /* @__PURE__ */ jsx("span", {
				className: "mt-1 font-sans text-[10px] tracking-[0.3em]",
				style: { color: sub },
				children: "匠の技と美の世界"
			})]
		})]
	});
}
//#endregion
//#region src/components/layout/Navbar.jsx
function Navbar() {
	const { scrolled, hidden } = useScrollDirection();
	const [menuOpen, setMenuOpen] = useState(false);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,backdrop-filter] duration-500 ease-soft
          ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}
          ${scrolled ? "bg-bg/80 shadow-[0_1px_0_rgba(26,26,26,0.06)] backdrop-blur-md" : "bg-transparent"}`,
		children: /* @__PURE__ */ jsxs("nav", {
			className: "container-max flex items-center justify-between py-4",
			"aria-label": "メインナビゲーション",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					"aria-label": "ホームへ",
					onClick: () => setMenuOpen(false),
					children: /* @__PURE__ */ jsx(Logo, {})
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "hidden items-center gap-8 lg:flex",
					children: NAV_LINKS.map((l) => /* @__PURE__ */ jsx("li", { children: l.to.startsWith("/#") ? /* @__PURE__ */ jsx("a", {
						href: l.to,
						className: "link-underline font-sans text-sm text-ink/80 hover:text-ink",
						children: l.label
					}) : /* @__PURE__ */ jsx(Link, {
						to: l.to,
						className: "link-underline font-sans text-sm text-ink/80 hover:text-ink",
						children: l.label
					}) }, l.label))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "hidden items-center gap-1 rounded-full border border-ink/15 px-3 py-1.5 font-sans text-xs text-ink/70 sm:flex",
						children: ["JP", /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 10 6",
							width: "9",
							height: "6",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("path", {
								d: "M1 1l4 4 4-4",
								stroke: "currentColor",
								fill: "none",
								strokeWidth: "1.2"
							})
						})]
					}), /* @__PURE__ */ jsx("button", {
						className: "flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 lg:hidden",
						"aria-label": menuOpen ? "メニューを閉じる" : "メニューを開く",
						"aria-expanded": menuOpen,
						onClick: () => setMenuOpen((v) => !v),
						children: /* @__PURE__ */ jsxs("span", {
							className: "relative block h-3 w-4",
							children: [
								/* @__PURE__ */ jsx("span", { className: `absolute left-0 block h-px w-4 bg-ink transition-all duration-300 ${menuOpen ? "top-1.5 rotate-45" : "top-0"}` }),
								/* @__PURE__ */ jsx("span", { className: `absolute left-0 top-1.5 block h-px w-4 bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}` }),
								/* @__PURE__ */ jsx("span", { className: `absolute left-0 block h-px w-4 bg-ink transition-all duration-300 ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}` })
							]
						})
					})]
				})
			]
		})
	}), /* @__PURE__ */ jsx("div", {
		className: `fixed inset-0 z-40 bg-paper-texture transition-[opacity,visibility] duration-500 ease-soft lg:hidden
          ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`,
		children: /* @__PURE__ */ jsx("ul", {
			className: "flex h-full flex-col items-center justify-center gap-7",
			children: NAV_LINKS.map((l, i) => /* @__PURE__ */ jsx("li", {
				style: { transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms" },
				className: `transition-all duration-500 ease-soft ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
				children: l.to.startsWith("/#") ? /* @__PURE__ */ jsx("a", {
					href: l.to,
					onClick: () => setMenuOpen(false),
					className: "font-serif text-2xl text-ink",
					children: l.label
				}) : /* @__PURE__ */ jsx(Link, {
					to: l.to,
					onClick: () => setMenuOpen(false),
					className: "font-serif text-2xl text-ink",
					children: l.label
				})
			}, l.label))
		})
	})] });
}
//#endregion
//#region src/components/layout/Footer.jsx
var SOCIALS = [
	"Instagram",
	"Facebook",
	"X",
	"YouTube"
];
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-dark text-bg",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container-max grid gap-12 py-20 md:grid-cols-[1.4fr_repeat(4,1fr)]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "max-w-xs",
				children: [/* @__PURE__ */ jsx(Logo, { light: true }), /* @__PURE__ */ jsx("p", {
					className: "mt-6 font-sans text-sm leading-relaxed text-bg/60",
					children: "日本の伝統工芸の魅力と、職人たちの想いを世界に伝えます。"
				})]
			}), FOOTER_COLUMNS.map((col) => /* @__PURE__ */ jsxs("nav", {
				"aria-label": col.heading,
				children: [/* @__PURE__ */ jsx("h3", {
					className: "font-serif text-sm font-medium tracking-widest text-gold",
					children: col.heading
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-5 space-y-3",
					children: col.links.map((link) => {
						const item = typeof link === "string" ? { label: link } : link;
						return /* @__PURE__ */ jsx("li", { children: item.to ? /* @__PURE__ */ jsx(Link, {
							to: item.to,
							className: "link-underline font-sans text-sm text-bg/60 hover:text-bg",
							children: item.label
						}) : /* @__PURE__ */ jsx("span", {
							className: "font-sans text-sm text-bg/60",
							children: item.label
						}) }, item.label);
					})
				})]
			}, col.heading))]
		}), /* @__PURE__ */ jsx("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-max flex flex-col items-center justify-between gap-6 py-8 sm:flex-row",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-sans text-xs text-bg/45",
					children: "© 2024 日本の工芸品. All rights reserved."
				}), /* @__PURE__ */ jsx("ul", {
					className: "flex items-center gap-5",
					children: SOCIALS.map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
						href: "#",
						"aria-label": s,
						className: "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 font-sans text-[10px] text-bg/70 transition-colors duration-[250ms] ease-soft hover:border-gold hover:text-gold",
						children: s[0]
					}) }, s))
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/layout/ScrollToTop.jsx
/** Reset scroll on route change; honour in-page hash anchors. */
function ScrollToTop() {
	const { pathname, hash } = useLocation();
	useEffect(() => {
		if (hash) {
			const el = document.getElementById(hash.slice(1));
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
				return;
			}
		}
		window.scrollTo(0, 0);
	}, [pathname, hash]);
	return null;
}
//#endregion
//#region src/components/layout/Layout.jsx
function Layout() {
	useSmoothScroll();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("a", {
			href: "#main",
			className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-bg",
			children: "本文へスキップ"
		}),
		/* @__PURE__ */ jsx(ScrollToTop, {}),
		/* @__PURE__ */ jsx(Navbar, {}),
		/* @__PURE__ */ jsx("main", {
			id: "main",
			children: /* @__PURE__ */ jsx(Outlet, {})
		}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
//#endregion
//#region src/hooks/useDocumentMeta.js
var SITE = "日本の工芸品";
/**
* Lightweight per-page <title> + meta description management.
* Avoids pulling in a helmet dependency (keeps bundle small for Lighthouse).
*/
function useDocumentMeta({ title, description }) {
	useEffect(() => {
		if (title) document.title = `${title} — ${SITE}`;
		if (description) {
			let tag = document.querySelector("meta[name=\"description\"]");
			if (!tag) {
				tag = document.createElement("meta");
				tag.setAttribute("name", "description");
				document.head.appendChild(tag);
			}
			tag.setAttribute("content", description);
		}
	}, [title, description]);
}
//#endregion
//#region src/components/ui/Arrow.jsx
/** Slim arrow that slides right on hover of a parent `.group`. */
function Arrow({ className = "" }) {
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 32 12",
		width: "32",
		height: "12",
		fill: "none",
		"aria-hidden": "true",
		className: `transition-transform duration-[250ms] ease-soft group-hover:translate-x-1.5 ${className}`,
		children: /* @__PURE__ */ jsx("path", {
			d: "M0 6h30M25 1l5 5-5 5",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})
	});
}
//#endregion
//#region src/components/ui/Button.jsx
/**
* Primary CTA. Renders a router <Link> when `to` is set, otherwise a <button>.
*/
function Button({ to, href, children, arrow = true, className = "", ...rest }) {
	const inner = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { children }), arrow && /* @__PURE__ */ jsx(Arrow, { className: "text-bg" })] });
	if (to) return /* @__PURE__ */ jsx(Link, {
		to,
		className: `btn-ink group ${className}`,
		...rest,
		children: inner
	});
	if (href) return /* @__PURE__ */ jsx("a", {
		href,
		className: `btn-ink group ${className}`,
		...rest,
		children: inner
	});
	return /* @__PURE__ */ jsx("button", {
		className: `btn-ink group ${className}`,
		...rest,
		children: inner
	});
}
//#endregion
//#region src/components/hero/Petals.jsx
/** Drifting cherry petals — decorative, GPU transforms, reduced-motion safe. */
var PETALS = [
	{
		left: "12%",
		size: 12,
		delay: 0,
		dur: 15
	},
	{
		left: "28%",
		size: 9,
		delay: 4,
		dur: 18
	},
	{
		left: "46%",
		size: 14,
		delay: 8,
		dur: 16
	},
	{
		left: "63%",
		size: 8,
		delay: 2,
		dur: 20
	},
	{
		left: "78%",
		size: 11,
		delay: 6,
		dur: 17
	},
	{
		left: "90%",
		size: 10,
		delay: 11,
		dur: 19
	}
];
function Petals() {
	return /* @__PURE__ */ jsx("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": "true",
		children: PETALS.map((p, i) => /* @__PURE__ */ jsx("span", {
			className: "absolute top-0 block",
			style: {
				left: p.left,
				width: p.size,
				height: p.size * .72,
				background: "linear-gradient(135deg, #f7dfe4, #eab7c3)",
				borderRadius: "60% 0 60% 0",
				animation: `floatPetal ${p.dur}s linear ${p.delay}s infinite`
			}
		}, i))
	});
}
//#endregion
//#region src/components/sections/Hero.jsx
function Hero() {
	const stageRef = useRef(null);
	const artRef = useRef(null);
	const handleMove = (e) => {
		const stage = stageRef.current;
		const art = artRef.current;
		if (!stage || !art) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const r = stage.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - .5;
		const py = (e.clientY - r.top) / r.height - .5;
		art.style.transform = `scale(1.05) translate3d(${(px * -14).toFixed(1)}px, ${(py * -10).toFixed(1)}px, 0)`;
	};
	const handleLeave = () => {
		if (artRef.current) artRef.current.style.transform = "scale(1.05)";
	};
	return /* @__PURE__ */ jsxs("section", {
		ref: stageRef,
		className: "relative min-h-[100svh] overflow-hidden bg-bg",
		onMouseMove: handleMove,
		onMouseLeave: handleLeave,
		children: [
			/* @__PURE__ */ jsx("img", {
				ref: artRef,
				src: "/images/hero-1200.webp",
				srcSet: "/images/hero-768.webp 768w, /images/hero-1200.webp 1200w, /images/hero-1600.webp 1600w",
				sizes: "100vw",
				width: "1600",
				height: "1067",
				alt: "金継ぎの茶碗と朝日、桜の枝",
				fetchPriority: "high",
				decoding: "async",
				className: "pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover object-[72%_center] transition-transform duration-500 ease-soft"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute inset-0",
				style: { background: "linear-gradient(90deg, rgba(247,244,239,0.94) 0%, rgba(247,244,239,0.82) 32%, rgba(247,244,239,0.32) 52%, rgba(247,244,239,0) 68%)" }
			}),
			/* @__PURE__ */ jsx(Petals, {}),
			/* @__PURE__ */ jsx("div", {
				className: "container-max relative grid min-h-[100svh] items-center pt-28 lg:pt-20",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative z-10 max-w-xl",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow mb-6",
							style: { animation: "fadeUp 0.8s ease-soft 0.3s both" },
							children: "日本の伝統工芸"
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "font-serif text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.08] text-ink",
							children: [/* @__PURE__ */ jsx("span", {
								className: "block overflow-hidden",
								children: /* @__PURE__ */ jsx("span", {
									className: "block",
									style: { animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s both" },
									children: "日本の美"
								})
							}), /* @__PURE__ */ jsx("span", {
								className: "block overflow-hidden",
								children: /* @__PURE__ */ jsx("span", {
									className: "block",
									style: { animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.7s both" },
									children: "匠の心"
								})
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-8 max-w-md font-sans text-base leading-relaxed text-ink/75",
							style: { animation: "fadeUp 1s ease-soft 1s both" },
							children: [
								"受け継がれる伝統、磨き抜かれた技。",
								/* @__PURE__ */ jsx("br", {}),
								"日本の工芸品が語る、美と心の物語。"
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-10",
							style: { animation: "fadeUp 1s ease-soft 1.2s both" },
							children: /* @__PURE__ */ jsx(Button, {
								href: "#artifacts",
								children: "工芸品を見る"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute bottom-10 left-6 hidden flex-col items-center gap-3 sm:left-10 lg:flex",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-sans text-[10px] tracking-[0.35em] text-ink/50 [writing-mode:vertical-rl]",
					children: "SCROLL"
				}), /* @__PURE__ */ jsx("span", { className: "h-16 w-px bg-ink/30" })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-sans text-xs text-ink/50 lg:flex",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-ink",
						children: "01"
					}),
					/* @__PURE__ */ jsx("span", { className: "h-px w-8 bg-ink/30" }),
					/* @__PURE__ */ jsx("span", { children: "03" })
				]
			})
		]
	});
}
//#endregion
//#region src/hooks/useReveal.js
/**
* Reveal-on-scroll via IntersectionObserver.
* Near-zero JS cost, unobserves after first reveal, honours reduced motion.
*/
function useReveal({ threshold = .18, rootMargin = "0px 0px -8% 0px" } = {}) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (typeof IntersectionObserver === "undefined") {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold,
			rootMargin
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold, rootMargin]);
	return {
		ref,
		visible
	};
}
//#endregion
//#region src/components/ui/Reveal.jsx
/**
* Wraps children in a scroll-reveal. `as` lets it render any element,
* `delay` staggers groups. Motion is pure CSS transform/opacity.
*/
function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
	const { ref, visible } = useReveal();
	return /* @__PURE__ */ jsx(Tag, {
		ref,
		style: { "--reveal-delay": `${delay}ms` },
		className: `reveal ${visible ? "is-visible" : ""} ${className}`,
		...rest,
		children
	});
}
//#endregion
//#region src/components/ui/Photo.jsx
/**
* Optimized image tile. WebP, lazy-loaded and async-decoded by default so it
* never blocks the main thread or hurts LCP. Pass `eager` for above-the-fold art.
*/
function Photo({ src, alt = "", className = "", imgClassName = "", rounded = "rounded-card", eager = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `relative overflow-hidden ${rounded} ${className}`,
		children: [/* @__PURE__ */ jsx("img", {
			src,
			alt,
			loading: eager ? "eager" : "lazy",
			decoding: "async",
			fetchPriority: eager ? "high" : "auto",
			className: `h-full w-full object-cover ${imgClassName}`
		}), /* @__PURE__ */ jsx("span", {
			className: "pointer-events-none absolute inset-0",
			style: { background: "radial-gradient(80% 70% at 50% 30%, transparent 60%, rgba(17,17,17,0.16))" }
		})]
	});
}
//#endregion
//#region src/components/ui/BrushStroke.jsx
/**
* Self-drawing ink brush stroke. Draws once when scrolled into view.
*/
function BrushStroke({ className = "" }) {
	const { ref, visible } = useReveal({ threshold: .3 });
	return /* @__PURE__ */ jsx("svg", {
		ref,
		viewBox: "0 0 600 120",
		fill: "none",
		"aria-hidden": "true",
		className,
		preserveAspectRatio: "none",
		children: /* @__PURE__ */ jsx("path", {
			d: "M12 78C120 34 210 30 300 52c86 21 150 30 288-18",
			stroke: "var(--ink)",
			strokeWidth: "26",
			strokeLinecap: "round",
			opacity: "0.9",
			style: {
				strokeDasharray: 640,
				strokeDashoffset: visible ? 0 : 640,
				transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)"
			}
		})
	});
}
//#endregion
//#region src/components/sections/About.jsx
function About$1() {
	return /* @__PURE__ */ jsx("section", {
		className: "relative bg-paper-texture section-pad",
		"aria-labelledby": "about-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-max grid items-center gap-14 lg:grid-cols-2 lg:gap-24",
			children: [/* @__PURE__ */ jsx(Reveal, {
				className: "order-2 lg:order-1",
				children: /* @__PURE__ */ jsx("div", {
					className: "group relative overflow-hidden rounded-card shadow-card",
					children: /* @__PURE__ */ jsx(Photo, {
						src: "/images/about.webp",
						alt: "轆轤で器を成形する陶芸家の手",
						rounded: "rounded-card",
						className: "aspect-[4/5]",
						imgClassName: "transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
					})
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "order-1 lg:order-2",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "relative mb-4 inline-block",
						children: [/* @__PURE__ */ jsx(BrushStroke, { className: "absolute -left-6 -top-2 h-16 w-56 opacity-[0.08]" }), /* @__PURE__ */ jsx("p", {
							className: "eyebrow relative",
							children: "私たちについて"
						})]
					}),
					/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("h2", {
						id: "about-heading",
						className: "font-serif text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-tight text-ink",
						children: [
							"日本の工芸が",
							/* @__PURE__ */ jsx("br", {}),
							"生まれる理由"
						]
					}) }),
					/* @__PURE__ */ jsxs(Reveal, {
						delay: 120,
						className: "mt-8 max-w-prose space-y-5 font-sans text-ink/70",
						children: [/* @__PURE__ */ jsx("p", { children: "自然との調和を大切にし、日常の中に美を見出す日本人の感性は、 千年以上にわたり受け継がれてきました。" }), /* @__PURE__ */ jsx("p", { children: "素材と真摯に向き合い、手間を惜しまず、心を込めて生み出される工芸品。 それは、使う人の暮らしにそっと寄り添う、かけがえのない存在です。" })]
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 220,
						className: "mt-10",
						children: /* @__PURE__ */ jsx(Button, {
							to: "/about",
							children: "私たちについて"
						})
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/components/ui/SectionHeading.jsx
/** Eyebrow + large serif title, optional link on the right. */
function SectionHeading({ eyebrow, title, action, light = false, className = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-wrap items-end justify-between gap-6 ${className}`,
		children: [/* @__PURE__ */ jsxs(Reveal, { children: [eyebrow && /* @__PURE__ */ jsx("p", {
			className: `eyebrow mb-4 ${light ? "text-gold" : ""}`,
			children: eyebrow
		}), /* @__PURE__ */ jsx("h2", {
			className: `font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight ${light ? "text-bg" : "text-ink"}`,
			children: title
		})] }), action && /* @__PURE__ */ jsx(Reveal, {
			delay: 120,
			children: action
		})]
	});
}
//#endregion
//#region src/components/sections/FeaturedArtifacts.jsx
function FeaturedArtifacts() {
	return /* @__PURE__ */ jsx("section", {
		id: "artifacts",
		className: "relative scroll-mt-24 bg-bg section-pad",
		"aria-labelledby": "artifacts-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-max",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "特集",
				title: /* @__PURE__ */ jsx("span", {
					id: "artifacts-heading",
					children: "注目の工芸品"
				}),
				action: /* @__PURE__ */ jsxs("a", {
					href: "#gallery",
					className: "btn-ghost group",
					children: ["すべて見る ", /* @__PURE__ */ jsx(Arrow, {})]
				})
			}), /* @__PURE__ */ jsx("ul", {
				className: "mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
				children: ARTIFACTS.map((a, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Reveal, {
					delay: i * 90,
					children: /* @__PURE__ */ jsxs("article", {
						className: "group flex h-full flex-col overflow-hidden rounded-card bg-paper shadow-card transition-[transform,box-shadow] duration-[400ms] ease-soft hover:-translate-y-3 hover:shadow-cardHover",
						children: [/* @__PURE__ */ jsx("div", {
							className: "overflow-hidden",
							children: /* @__PURE__ */ jsx(Photo, {
								src: a.img,
								alt: `${a.title}の工芸品`,
								rounded: "rounded-none",
								className: "aspect-[4/5]",
								imgClassName: "transition-transform duration-[600ms] ease-soft group-hover:scale-[1.08]"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-1 flex-col p-5",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-serif text-lg font-semibold text-ink",
									children: a.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 flex-1 font-sans text-sm text-ink/60",
									children: a.desc
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-5 flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "relative inline-block h-px w-8 bg-ink/20",
										children: /* @__PURE__ */ jsx("span", { className: "absolute inset-y-0 left-0 w-0 bg-gold transition-[width] duration-[400ms] ease-soft group-hover:w-full" })
									}), /* @__PURE__ */ jsx("span", {
										className: "text-ink/70",
										children: /* @__PURE__ */ jsx(Arrow, {})
									})]
								})
							]
						})]
					})
				}) }, a.id))
			})]
		})
	});
}
//#endregion
//#region src/components/sections/MakingProcess.jsx
function MakingProcess() {
	return /* @__PURE__ */ jsx("section", {
		id: "process",
		className: "relative scroll-mt-24 bg-paper-texture section-pad",
		"aria-labelledby": "process-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-max",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "職人の技",
				title: /* @__PURE__ */ jsx("span", {
					id: "process-heading",
					children: "工芸品ができるまで"
				}),
				action: /* @__PURE__ */ jsxs("a", {
					href: "/about",
					className: "btn-ghost group",
					children: ["詳しく見る ", /* @__PURE__ */ jsx(Arrow, {})]
				})
			}), /* @__PURE__ */ jsx("ol", {
				className: "mt-16 grid gap-12 md:grid-cols-5 md:gap-4",
				children: PROCESS_STEPS.map((s, i) => /* @__PURE__ */ jsxs("li", {
					className: "relative",
					children: [i < PROCESS_STEPS.length - 1 && /* @__PURE__ */ jsxs("span", {
						className: "absolute left-[calc(50%+3.5rem)] top-16 hidden h-px w-[calc(100%-7rem)] md:block",
						children: [/* @__PURE__ */ jsx("span", { className: "block h-full w-full origin-left bg-gradient-to-r from-gold/70 to-gold/30" }), /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 12 12",
							width: "10",
							height: "10",
							className: "absolute -right-1 -top-[4.5px] text-gold",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("path", {
								d: "M1 1l5 5-5 5",
								stroke: "currentColor",
								fill: "none",
								strokeWidth: "1.4"
							})
						})]
					}), /* @__PURE__ */ jsxs(Reveal, {
						delay: i * 120,
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 font-serif text-2xl font-semibold text-gold",
								children: s.no
							}),
							/* @__PURE__ */ jsx("div", {
								className: "group",
								children: /* @__PURE__ */ jsx(Photo, {
									src: s.img,
									alt: `${s.title}の工程`,
									rounded: "rounded-full",
									className: "mx-auto aspect-square w-28 shadow-card transition-transform duration-[400ms] ease-soft group-hover:scale-110 md:w-32"
								})
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-5 font-serif text-lg font-semibold text-ink",
								children: s.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 max-w-[16rem] font-sans text-sm text-ink/60",
								children: s.desc
							})
						]
					})]
				}, s.no))
			})]
		})
	});
}
//#endregion
//#region src/components/sections/History.jsx
function History() {
	return /* @__PURE__ */ jsx("section", {
		id: "history",
		className: "relative scroll-mt-24 bg-bg section-pad",
		"aria-labelledby": "history-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-max",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "歴史",
				title: /* @__PURE__ */ jsx("span", {
					id: "history-heading",
					children: "受け継がれる時"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative mt-16",
				children: [/* @__PURE__ */ jsx("span", { className: "absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent md:left-1/2" }), /* @__PURE__ */ jsx("ol", {
					className: "space-y-14",
					children: HISTORY.map((h, i) => /* @__PURE__ */ jsx("li", {
						className: "relative",
						children: /* @__PURE__ */ jsx(Reveal, {
							delay: i * 80,
							children: /* @__PURE__ */ jsxs("div", {
								className: `grid items-center gap-6 pl-12 md:grid-cols-2 md:gap-16 md:pl-0 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`,
								children: [
									/* @__PURE__ */ jsx("span", { className: "absolute left-[9px] top-2 h-3 w-3 rounded-full border-2 border-gold bg-bg md:left-1/2 md:-translate-x-1/2" }),
									/* @__PURE__ */ jsxs("div", {
										className: `[direction:ltr] ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`,
										children: [
											/* @__PURE__ */ jsx("p", {
												className: "font-serif text-4xl font-semibold text-gold md:text-5xl",
												children: h.year
											}),
											/* @__PURE__ */ jsx("h3", {
												className: "mt-3 font-serif text-xl font-semibold text-ink",
												children: h.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-2 font-sans text-sm text-ink/60",
												children: h.desc
											})
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "[direction:ltr]",
										children: /* @__PURE__ */ jsx(Photo, {
											src: h.img,
											alt: `${h.year}年の工芸`,
											className: "aspect-[16/10] w-full max-w-sm shadow-card"
										})
									})
								]
							})
						})
					}, h.year))
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/sections/Gallery.jsx
var SPAN = {
	tall: "row-span-2 aspect-[3/4]",
	wide: "aspect-[16/10]",
	base: "aspect-square"
};
function Gallery() {
	return /* @__PURE__ */ jsx("section", {
		id: "gallery",
		className: "relative scroll-mt-24 bg-paper-texture section-pad",
		"aria-labelledby": "gallery-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-max",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				eyebrow: "ギャラリー",
				title: /* @__PURE__ */ jsx("span", {
					id: "gallery-heading",
					children: "日本の美の記録"
				}),
				action: /* @__PURE__ */ jsxs("a", {
					href: "#artifacts",
					className: "btn-ghost group",
					children: ["すべての写真を見る ", /* @__PURE__ */ jsx(Arrow, {})]
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-14 grid auto-rows-auto grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
				children: GALLERY.map((g, i) => /* @__PURE__ */ jsx(Reveal, {
					delay: i % 4 * 80,
					className: g.span === "tall" ? "row-span-2" : "",
					children: /* @__PURE__ */ jsxs("figure", {
						className: "group relative h-full overflow-hidden rounded-card shadow-card",
						children: [/* @__PURE__ */ jsx(Photo, {
							src: g.img,
							alt: `${g.title}の工芸`,
							rounded: "rounded-card",
							className: `h-full w-full ${SPAN[g.span]}`,
							imgClassName: "transition-transform duration-[600ms] ease-soft group-hover:scale-[1.08]"
						}), /* @__PURE__ */ jsx("figcaption", {
							className: "absolute inset-0 flex items-end bg-gradient-to-t from-dark/70 via-dark/10 to-transparent p-5 opacity-0 transition-opacity duration-[400ms] ease-soft group-hover:opacity-100",
							children: /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2 font-serif text-lg text-bg",
								children: [g.title, /* @__PURE__ */ jsx(Arrow, { className: "text-bg" })]
							})
						})]
					})
				}, g.id))
			})]
		})
	});
}
//#endregion
//#region src/components/sections/Philosophy.jsx
/** Gold dust motes — few, GPU transforms only. */
function GoldDust() {
	return /* @__PURE__ */ jsx("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": "true",
		children: [
			{
				l: "14%",
				t: "30%",
				s: 3,
				d: 0
			},
			{
				l: "24%",
				t: "64%",
				s: 2,
				d: 1.5
			},
			{
				l: "40%",
				t: "22%",
				s: 4,
				d: .6
			},
			{
				l: "58%",
				t: "72%",
				s: 2,
				d: 2
			},
			{
				l: "70%",
				t: "38%",
				s: 3,
				d: 1
			},
			{
				l: "82%",
				t: "58%",
				s: 2,
				d: 2.4
			},
			{
				l: "90%",
				t: "28%",
				s: 3,
				d: .9
			}
		].map((d, i) => /* @__PURE__ */ jsx("span", {
			className: "absolute rounded-full",
			style: {
				left: d.l,
				top: d.t,
				width: d.s,
				height: d.s,
				background: "var(--gold)",
				boxShadow: "0 0 8px var(--gold)",
				animation: `breathe ${6 + d.d}s ease-in-out ${d.d}s infinite`,
				opacity: .7
			}
		}, i))
	});
}
function Philosophy() {
	return /* @__PURE__ */ jsxs("section", {
		id: "philosophy",
		className: "relative scroll-mt-24 overflow-hidden bg-dark text-bg section-pad",
		"aria-labelledby": "philosophy-heading",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute right-[-10%] top-1/2 h-[60vw] max-h-[560px] w-[60vw] max-w-[560px] -translate-y-1/2 rounded-full",
				style: { background: "radial-gradient(circle, rgba(199,155,82,0.16), transparent 68%)" }
			}),
			/* @__PURE__ */ jsx(GoldDust, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "container-max relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("p", {
						className: "eyebrow mb-6 text-gold",
						children: "職人の哲学"
					}) }),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 120,
						children: /* @__PURE__ */ jsxs("blockquote", { children: [/* @__PURE__ */ jsxs("h2", {
							id: "philosophy-heading",
							className: "font-serif text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.35] text-bg",
							children: [
								"美は、完璧の中にはなく、",
								/* @__PURE__ */ jsx("br", {}),
								"不完全の中に宿る。"
							]
						}), /* @__PURE__ */ jsx("footer", {
							className: "mt-8 font-serif text-lg text-gold",
							children: "— 千利休"
						})] })
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: 240,
						className: "mt-10",
						children: /* @__PURE__ */ jsx(Button, {
							to: "/about",
							className: "!bg-transparent !text-bg [border-color:rgba(247,244,239,0.35)]",
							children: "美の哲学を見る"
						})
					})
				] }), /* @__PURE__ */ jsx(Reveal, {
					delay: 160,
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full",
						style: {
							boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)",
							animation: "breathe 10s ease-in-out infinite"
						},
						children: [/* @__PURE__ */ jsx("img", {
							src: "/images/philobowl.webp",
							alt: "金継ぎが施された茶碗",
							loading: "lazy",
							decoding: "async",
							className: "h-full w-full object-cover"
						}), /* @__PURE__ */ jsx("span", {
							className: "pointer-events-none absolute inset-0 rounded-full",
							style: { boxShadow: "inset 0 0 80px 20px rgba(17,17,17,0.55)" }
						})]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/sections/CTA.jsx
function CTA() {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-paper-texture section-pad",
		"aria-labelledby": "cta-heading",
		children: [/* @__PURE__ */ jsx("svg", {
			className: "pointer-events-none absolute -right-16 top-8 h-48 w-80 text-gold",
			viewBox: "0 0 200 120",
			fill: "none",
			"aria-hidden": "true",
			children: [
				0,
				1,
				2
			].map((r) => [
				0,
				1,
				2,
				3,
				4
			].map((c) => /* @__PURE__ */ jsx("path", {
				d: `M${c * 44 - 20} ${r * 26 + 20}a22 22 0 0 1 44 0`,
				stroke: "currentColor",
				strokeWidth: "1",
				opacity: "0.22"
			}, `${r}-${c}`)))
		}), /* @__PURE__ */ jsxs("div", {
			className: "container-max relative flex flex-col items-center text-center",
			children: [
				/* @__PURE__ */ jsx(BrushStroke, { className: "mb-6 h-16 w-64 opacity-[0.1]" }),
				/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-6",
					children: "お問い合わせ"
				}) }),
				/* @__PURE__ */ jsx(Reveal, {
					delay: 100,
					children: /* @__PURE__ */ jsxs("h2", {
						id: "cta-heading",
						className: "max-w-2xl font-serif text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-ink text-balance",
						children: [
							"工芸の物語を、",
							/* @__PURE__ */ jsx("br", {}),
							"あなたの暮らしへ。"
						]
					})
				}),
				/* @__PURE__ */ jsx(Reveal, {
					delay: 200,
					children: /* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-prose font-sans text-ink/65",
						children: "ひとつひとつ手仕事で生まれる工芸品について、 お気軽にお問い合わせください。"
					})
				}),
				/* @__PURE__ */ jsx(Reveal, {
					delay: 300,
					className: "mt-10",
					children: /* @__PURE__ */ jsx(Button, {
						to: "/contact",
						children: "お問い合わせはこちら"
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/Home.jsx
function Home() {
	useDocumentMeta({
		title: "匠の技と美の世界",
		description: "受け継がれる伝統と、磨き抜かれた匠の技。日本の工芸品が語る美と心の物語を、静かな美術館のように巡る体験。"
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx(About$1, {}),
		/* @__PURE__ */ jsx(FeaturedArtifacts, {}),
		/* @__PURE__ */ jsx(MakingProcess, {}),
		/* @__PURE__ */ jsx(History, {}),
		/* @__PURE__ */ jsx(Gallery, {}),
		/* @__PURE__ */ jsx(Philosophy, {}),
		/* @__PURE__ */ jsx(CTA, {})
	] });
}
//#endregion
//#region src/components/ui/PageHero.jsx
/**
* Compact banner for subpages: breadcrumb + eyebrow + title + lede.
* Rendered statically (no scroll-reveal) so it's the immediate FCP/LCP paint
* on prerendered subpages. A gentle CSS fade-in plays on load only.
*/
function PageHero({ eyebrow, title, lede, breadcrumb }) {
	return /* @__PURE__ */ jsxs("header", {
		className: "relative overflow-hidden bg-paper-texture pb-16 pt-36 md:pb-24 md:pt-44",
		children: [/* @__PURE__ */ jsx("div", {
			className: "pointer-events-none absolute right-[-8%] top-[-10%] h-[36vw] max-h-[420px] w-[36vw] max-w-[420px] rounded-full",
			style: { background: "radial-gradient(circle, rgba(192,57,43,0.12), transparent 70%)" }
		}), /* @__PURE__ */ jsxs("div", {
			className: "container-max relative",
			children: [
				/* @__PURE__ */ jsxs("nav", {
					"aria-label": "パンくずリスト",
					className: "mb-6 flex items-center gap-2 font-sans text-xs text-ink/50",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "link-underline hover:text-ink",
							children: "ホーム"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "／"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-ink/70",
							children: breadcrumb ?? title
						})
					]
				}),
				eyebrow && /* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-5",
					children: eyebrow
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "max-w-3xl font-serif text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-tight text-ink",
					children: title
				}),
				lede && /* @__PURE__ */ jsx("p", {
					className: "mt-6 max-w-prose font-sans text-ink/65",
					children: lede
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/About.jsx
var VALUES = [
	{
		title: "素材への敬意",
		desc: "土、木、漆、鉄。自然が育んだ素材の声に耳を澄まします。",
		kanji: "素"
	},
	{
		title: "手仕事の時間",
		desc: "効率ではなく、心を込めた手間の中に美は宿ると信じています。",
		kanji: "手"
	},
	{
		title: "未来への継承",
		desc: "受け継いだ技を磨き、次の世代へと確かに手渡していきます。",
		kanji: "継"
	}
];
var STATS = [
	{
		value: "1200",
		unit: "年",
		label: "受け継がれる技"
	},
	{
		value: "48",
		unit: "名",
		label: "契約する職人"
	},
	{
		value: "17",
		unit: "産地",
		label: "日本各地の工房"
	}
];
function About() {
	useDocumentMeta({
		title: "私たちについて",
		description: "日本の伝統工芸の魅力と、職人たちの想いを世界に伝える「日本の工芸品」。素材への敬意、手仕事の時間、未来への継承という理念をご紹介します。"
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: "私たちについて",
			breadcrumb: "私たちについて",
			title: /* @__PURE__ */ jsxs(Fragment, { children: [
				"手のぬくもりを、",
				/* @__PURE__ */ jsx("br", {}),
				"次の時代へ。"
			] }),
			lede: "「日本の工芸品」は、全国の職人と歩みをともにし、その手仕事の美しさと物語を世界へ届けるために生まれました。"
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-paper-texture section-pad",
			"aria-labelledby": "story-heading",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-max grid items-center gap-14 lg:grid-cols-2 lg:gap-24",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Photo, {
					src: "/images/about.webp",
					alt: "工房で器を成形する職人の手",
					className: "aspect-[4/5] w-full shadow-card"
				}) }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("h2", {
					id: "story-heading",
					className: "font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight text-ink",
					children: "私たちの物語"
				}) }), /* @__PURE__ */ jsxs(Reveal, {
					delay: 120,
					className: "mt-8 max-w-prose space-y-5 font-sans text-ink/70",
					children: [
						/* @__PURE__ */ jsx("p", { children: "かつて日常に息づいていた手仕事の道具たち。 大量生産の時代の中で、その多くが姿を消そうとしています。" }),
						/* @__PURE__ */ jsx("p", { children: "私たちは、失われゆく技と美を守りたいという想いから、 日本各地の工房を訪ね、職人たちと信頼を重ねてきました。" }),
						/* @__PURE__ */ jsx("p", { children: "ひとつの器、一本の刀に宿る時間と祈り。 その価値を、まっすぐに伝えることが私たちの使命です。" })
					]
				})] })]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-bg section-pad",
			"aria-labelledby": "values-heading",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-max",
				children: [/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-4",
					children: "理念"
				}), /* @__PURE__ */ jsx("h2", {
					id: "values-heading",
					className: "font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold text-ink",
					children: "大切にしていること"
				})] }), /* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-6 md:grid-cols-3",
					children: VALUES.map((v, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 120,
						children: /* @__PURE__ */ jsxs("article", {
							className: "h-full rounded-card bg-paper p-8 shadow-card",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-ink font-serif text-2xl text-gold",
									children: v.kanji
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "font-serif text-xl font-semibold text-ink",
									children: v.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 font-sans text-sm text-ink/60",
									children: v.desc
								})
							]
						})
					}, v.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-dark text-bg section-pad",
			"aria-label": "実績",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-max grid gap-10 text-center sm:grid-cols-3",
				children: STATS.map((s, i) => /* @__PURE__ */ jsxs(Reveal, {
					delay: i * 120,
					children: [/* @__PURE__ */ jsxs("p", {
						className: "font-serif text-5xl font-semibold text-gold md:text-6xl",
						children: [s.value, /* @__PURE__ */ jsx("span", {
							className: "ml-1 text-2xl",
							children: s.unit
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-3 font-sans text-sm tracking-widest text-bg/60",
						children: s.label
					})]
				}, s.label))
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-paper-texture section-pad",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-max flex flex-col items-center text-center",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("h2", {
					className: "max-w-2xl font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold text-ink",
					children: "工芸品について、お話しませんか。"
				}) }), /* @__PURE__ */ jsx(Reveal, {
					delay: 150,
					className: "mt-8",
					children: /* @__PURE__ */ jsx(Button, {
						to: "/contact",
						children: "お問い合わせ"
					})
				})]
			})
		})
	] });
}
//#endregion
//#region src/pages/Contact.jsx
var DETAILS = [
	{
		label: "メール",
		value: "info@nihon-kogei.example.com"
	},
	{
		label: "電話",
		value: "03-1234-5678（平日 10:00–18:00）"
	},
	{
		label: "所在地",
		value: "〒600-8001 京都府京都市中京区 工芸通一丁目"
	}
];
var FAQ = [
	{
		q: "工芸品は購入できますか？",
		a: "本サイトは工芸文化を紹介する目的で運営しています。購入をご希望の場合は、各職人・工房をご案内いたします。"
	},
	{
		q: "海外への発送は可能ですか？",
		a: "提携工房により対応が異なります。お問い合わせフォームより、ご希望の国と品目をお知らせください。"
	},
	{
		q: "取材や掲載の依頼をしたい",
		a: "メディア関係のお問い合わせも歓迎しております。フォームの件名に「取材依頼」とご記入ください。"
	}
];
var FIELD = "w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 font-sans text-sm text-ink outline-none transition-colors duration-[250ms] ease-soft placeholder:text-ink/35 focus:border-gold";
function Contact() {
	useDocumentMeta({
		title: "お問い合わせ",
		description: "日本の工芸品に関するご質問、取材や掲載のご依頼はこちらから。メール、電話、フォームにてお気軽にお問い合わせください。"
	});
	const [sent, setSent] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		setSent(true);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: "お問い合わせ",
			breadcrumb: "お問い合わせ",
			title: "お気軽にご連絡ください",
			lede: "工芸品や職人に関するご質問、ご依頼など、どのようなことでもお寄せください。二営業日以内にご返信いたします。"
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-paper-texture section-pad",
			"aria-labelledby": "contact-heading",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-max grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("h2", {
					id: "contact-heading",
					className: "font-serif text-2xl font-semibold text-ink",
					children: "連絡先"
				}) }), /* @__PURE__ */ jsx("dl", {
					className: "mt-8 space-y-7",
					children: DETAILS.map((d, i) => /* @__PURE__ */ jsxs(Reveal, {
						as: "div",
						delay: i * 90,
						children: [/* @__PURE__ */ jsx("dt", {
							className: "eyebrow mb-2",
							children: d.label
						}), /* @__PURE__ */ jsx("dd", {
							className: "font-sans text-ink/80",
							children: d.value
						})]
					}, d.label))
				})] }), /* @__PURE__ */ jsx(Reveal, {
					delay: 120,
					children: sent ? /* @__PURE__ */ jsxs("div", {
						role: "status",
						className: "flex h-full min-h-[20rem] flex-col items-center justify-center rounded-card bg-paper p-10 text-center shadow-card",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ink font-serif text-2xl text-gold",
								children: "礼"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-serif text-xl font-semibold text-ink",
								children: "お問い合わせありがとうございます"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-sm font-sans text-sm text-ink/60",
								children: "内容を確認のうえ、担当者より二営業日以内にご返信いたします。"
							}),
							/* @__PURE__ */ jsxs("button", {
								className: "btn-ghost group mt-8",
								onClick: () => setSent(false),
								children: ["新しく入力する ", /* @__PURE__ */ jsx(Arrow, {})]
							})
						]
					}) : /* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "rounded-card bg-paper p-6 shadow-card sm:p-10",
						noValidate: true,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
									htmlFor: "name",
									className: "mb-2 block font-sans text-sm text-ink/70",
									children: ["お名前 ", /* @__PURE__ */ jsx("span", {
										className: "text-clay",
										children: "*"
									})]
								}), /* @__PURE__ */ jsx("input", {
									id: "name",
									name: "name",
									type: "text",
									required: true,
									autoComplete: "name",
									className: FIELD,
									placeholder: "山田 太郎"
								})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
									htmlFor: "email",
									className: "mb-2 block font-sans text-sm text-ink/70",
									children: ["メールアドレス ", /* @__PURE__ */ jsx("span", {
										className: "text-clay",
										children: "*"
									})]
								}), /* @__PURE__ */ jsx("input", {
									id: "email",
									name: "email",
									type: "email",
									required: true,
									autoComplete: "email",
									className: FIELD,
									placeholder: "you@example.com"
								})] })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "subject",
									className: "mb-2 block font-sans text-sm text-ink/70",
									children: "件名"
								}), /* @__PURE__ */ jsx("input", {
									id: "subject",
									name: "subject",
									type: "text",
									className: FIELD,
									placeholder: "工芸品について"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ jsxs("label", {
									htmlFor: "message",
									className: "mb-2 block font-sans text-sm text-ink/70",
									children: ["お問い合わせ内容 ", /* @__PURE__ */ jsx("span", {
										className: "text-clay",
										children: "*"
									})]
								}), /* @__PURE__ */ jsx("textarea", {
									id: "message",
									name: "message",
									required: true,
									rows: 5,
									className: `${FIELD} resize-none`,
									placeholder: "ご質問やご依頼の内容をご記入ください。"
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "mt-5 flex items-start gap-3 font-sans text-xs text-ink/60",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									required: true,
									className: "mt-1 h-4 w-4 accent-[color:var(--gold)]"
								}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("a", {
									href: "/privacy",
									className: "link-underline text-ink",
									children: "プライバシーポリシー"
								}), "に同意します。"] })]
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "submit",
								className: "btn-ink group mt-8 w-full justify-center sm:w-auto",
								children: ["送信する ", /* @__PURE__ */ jsx(Arrow, { className: "text-bg" })]
							})
						]
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-bg section-pad",
			"aria-labelledby": "faq-heading",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-max max-w-3xl",
				children: [/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-4",
					children: "よくある質問"
				}), /* @__PURE__ */ jsx("h2", {
					id: "faq-heading",
					className: "font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-ink",
					children: "お問い合わせの前に"
				})] }), /* @__PURE__ */ jsx("div", {
					className: "mt-10 divide-y divide-ink/10",
					children: FAQ.map((f, i) => /* @__PURE__ */ jsxs(Reveal, {
						as: "details",
						delay: i * 80,
						className: "group py-5",
						children: [/* @__PURE__ */ jsxs("summary", {
							className: "flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-ink",
							children: [f.q, /* @__PURE__ */ jsx("span", {
								className: "text-gold transition-transform duration-[250ms] ease-soft group-open:rotate-45",
								children: "＋"
							})]
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-3 font-sans text-sm text-ink/65",
							children: f.a
						})]
					}, f.q))
				})]
			})
		})
	] });
}
//#endregion
//#region src/components/ui/LegalPage.jsx
/**
* Shared layout for legal documents (privacy / terms).
* `sections` = [{ heading, body: string[] }]
*/
function LegalPage({ meta, eyebrow, title, updated, intro, sections }) {
	useDocumentMeta(meta);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageHero, {
		eyebrow,
		breadcrumb: title,
		title,
		lede: intro
	}), /* @__PURE__ */ jsx("article", {
		className: "bg-paper-texture section-pad",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-max max-w-prose",
			children: [updated && /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("p", {
				className: "mb-12 font-sans text-xs tracking-widest text-ink/45",
				children: ["最終更新日：", updated]
			}) }), /* @__PURE__ */ jsx("div", {
				className: "space-y-12",
				children: sections.map((s, i) => /* @__PURE__ */ jsxs(Reveal, {
					as: "section",
					delay: i * 40,
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "font-serif text-xl font-semibold text-ink",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mr-3 text-gold",
							children: String(i + 1).padStart(2, "0")
						}), s.heading]
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-4 space-y-3 font-sans text-sm leading-relaxed text-ink/70",
						children: s.body.map((p, j) => /* @__PURE__ */ jsx("p", { children: p }, j))
					})]
				}, s.heading))
			})]
		})
	})] });
}
//#endregion
//#region src/pages/Privacy.jsx
var SECTIONS$1 = [
	{
		heading: "個人情報の取り扱いについて",
		body: ["日本の工芸品（以下「当サイト」）は、お客様の個人情報を適切に保護することを重要な責務と考え、以下の方針に基づき個人情報を取り扱います。", "本ポリシーは、当サイトが提供するすべてのサービスに適用されます。"]
	},
	{
		heading: "取得する情報",
		body: ["お問い合わせフォームのご利用時に、お名前、メールアドレス、お問い合わせ内容などをお預かりします。", "また、サイトの改善を目的として、アクセス状況に関する統計情報を取得する場合があります。"]
	},
	{
		heading: "利用目的",
		body: ["お預かりした個人情報は、お問い合わせへの回答、サービスのご案内、およびサイト品質の向上のために利用いたします。", "ご本人の同意なく、利用目的の範囲を超えて個人情報を利用することはありません。"]
	},
	{
		heading: "第三者への提供",
		body: ["法令に基づく場合を除き、ご本人の同意なく個人情報を第三者へ提供することはありません。"]
	},
	{
		heading: "クッキー（Cookie）の使用",
		body: ["当サイトでは、利便性の向上とアクセス解析のためにクッキーを使用する場合があります。", "ブラウザの設定によりクッキーを無効にすることができますが、一部の機能がご利用いただけない場合があります。"]
	},
	{
		heading: "個人情報の管理",
		body: ["お預かりした個人情報は、不正アクセス、紛失、改ざん、漏洩などを防ぐため、適切な安全管理措置を講じます。"]
	},
	{
		heading: "開示・訂正・削除",
		body: ["ご本人からの個人情報の開示、訂正、削除のご請求には、合理的な範囲で速やかに対応いたします。", "ご希望の際は、お問い合わせフォームよりご連絡ください。"]
	},
	{
		heading: "ポリシーの改定",
		body: ["本ポリシーは、法令の変更やサービスの改善に伴い、予告なく改定される場合があります。", "改定後の内容は、当サイトに掲載した時点から効力を生じるものとします。"]
	}
];
function Privacy() {
	return /* @__PURE__ */ jsx(LegalPage, {
		meta: {
			title: "プライバシーポリシー",
			description: "日本の工芸品における個人情報の取り扱い、利用目的、クッキーの使用、開示・訂正・削除の手続きについてのご案内。"
		},
		eyebrow: "プライバシーポリシー",
		title: "プライバシーポリシー",
		updated: "2024年1月1日",
		intro: "当サイトは、お客様の個人情報を大切に取り扱います。本ポリシーでは、情報の取得と利用に関する方針をご説明します。",
		sections: SECTIONS$1
	});
}
//#endregion
//#region src/pages/Terms.jsx
var SECTIONS = [
	{
		heading: "総則",
		body: ["本利用規約（以下「本規約」）は、日本の工芸品（以下「当サイト」）が提供するサービスの利用条件を定めるものです。", "ご利用者は、本規約に同意のうえ当サイトをご利用いただくものとします。"]
	},
	{
		heading: "規約の適用",
		body: ["本規約は、ご利用者と当サイトとの間のサービス利用に関わる一切の関係に適用されます。"]
	},
	{
		heading: "禁止事項",
		body: ["法令または公序良俗に違反する行為、当サイトの運営を妨げる行為を禁止します。", "他者の権利を侵害する行為、および掲載情報の無断転載・改変を禁止します。"]
	},
	{
		heading: "知的財産権",
		body: ["当サイトに掲載される文章、画像、デザイン等の著作権は、当サイトまたは正当な権利者に帰属します。", "許可なくこれらを複製、転用、販売することはできません。"]
	},
	{
		heading: "免責事項",
		body: ["当サイトは、掲載情報の正確性に努めますが、その完全性を保証するものではありません。", "本サービスの利用により生じた損害について、当サイトは一切の責任を負わないものとします。"]
	},
	{
		heading: "サービスの変更・中断",
		body: ["当サイトは、ご利用者への事前の通知なく、サービス内容の変更または提供の中断を行うことができます。"]
	},
	{
		heading: "規約の変更",
		body: ["当サイトは、必要と判断した場合、ご利用者への通知なく本規約を変更することができます。", "変更後の規約は、当サイトに掲載した時点から効力を生じます。"]
	},
	{
		heading: "準拠法・裁判管轄",
		body: ["本規約の解釈にあたっては、日本法を準拠法とします。", "本サービスに関して紛争が生じた場合には、当サイト所在地を管轄する裁判所を専属的合意管轄とします。"]
	}
];
function Terms() {
	return /* @__PURE__ */ jsx(LegalPage, {
		meta: {
			title: "利用規約",
			description: "日本の工芸品のサービス利用条件、禁止事項、知的財産権、免責事項、準拠法などを定めた利用規約です。"
		},
		eyebrow: "利用規約",
		title: "利用規約",
		updated: "2024年1月1日",
		intro: "当サイトをご利用いただくにあたっての条件を定めています。ご利用の前に、以下の内容をご確認ください。",
		sections: SECTIONS
	});
}
//#endregion
//#region src/pages/NotFound.jsx
function NotFound() {
	useDocumentMeta({
		title: "ページが見つかりません",
		description: "お探しのページは見つかりませんでした。"
	});
	return /* @__PURE__ */ jsx("section", {
		className: "flex min-h-[80svh] items-center bg-paper-texture",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-max flex flex-col items-center text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-serif text-[clamp(5rem,18vw,12rem)] font-semibold leading-none text-gold",
					children: "四〇四"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-6 font-serif text-2xl font-semibold text-ink",
					children: "ページが見つかりません"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 max-w-md font-sans text-sm text-ink/60",
					children: "お探しのページは移動または削除された可能性があります。"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-10",
					children: /* @__PURE__ */ jsx(Button, {
						to: "/",
						children: "ホームへ戻る"
					})
				})
			]
		})
	});
}
//#endregion
//#region src/RouteTree.jsx
function RouteTree() {
	return /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, {
		element: /* @__PURE__ */ jsx(Layout, {}),
		children: [
			/* @__PURE__ */ jsx(Route, {
				index: true,
				element: /* @__PURE__ */ jsx(Home, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "about",
				element: /* @__PURE__ */ jsx(About, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "contact",
				element: /* @__PURE__ */ jsx(Contact, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "privacy",
				element: /* @__PURE__ */ jsx(Privacy, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "terms",
				element: /* @__PURE__ */ jsx(Terms, {})
			}),
			/* @__PURE__ */ jsx(Route, {
				path: "*",
				element: /* @__PURE__ */ jsx(NotFound, {})
			})
		]
	}) });
}
//#endregion
//#region src/entry-server.jsx
function render(url) {
	return renderToString(/* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, {
		location: url,
		children: /* @__PURE__ */ jsx(RouteTree, {})
	}) }));
}
//#endregion
export { render };
