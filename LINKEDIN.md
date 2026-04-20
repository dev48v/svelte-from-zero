Day 19 - Svelte compiles your UI into plain JavaScript. No virtual DOM. No runtime framework. Just code.


🚀TechFromZero Series - SvelteFromZero


🌐 Try it live: https://svelte-from-zero.vercel.app


This isn't a Hello World. It's a real live-data app:
📐 Browser → +page.ts load → Typed API Lib → CoinGecko → Svelte UI


🔗 The full code (with step-by-step commits you can follow):
https://github.com/dev48v/svelte-from-zero


🧱 What I built (step by step):
1️⃣ SvelteKit + TypeScript + Vite scaffold (no CLI wizards, just the files that matter)

2️⃣ Dark theme + sticky header + shared layout in one CSS file - no Tailwind build needed

3️⃣ One typed module wrapping every CoinGecko call - getTopCoins, getCoin, getCoinChart

4️⃣ Home page renders top 50 coins pre-fetched on the server (first paint already has data)

5️⃣ Client-side search that matches name OR ticker - zero extra API calls per keystroke

6️⃣ Dynamic /coin/[id] route with price, rank, 24h/7d/30d change, supply, ATH, ATL

7️⃣ A 7-day price sparkline built as pure SVG in about 30 lines - no chart library

8️⃣ Global error page + @sveltejs/adapter-vercel pinned to Node 20 for a clean deploy


💡 Every file has detailed comments explaining WHY, not just what. Written for any beginner who wants to learn Svelte by reading real code - with full clarity on each step.


👉 If you're a beginner learning Svelte, clone it and read the commits one by one. Each commit = one concept. Each file = one lesson. Built from scratch, so nothing is hidden.


🔥 This is Day 19 of a 50-day series. A new technology every day. Follow along!


🌐 See all days: https://dev48v.infy.uk/techfromzero.php


#TechFromZero #Day19 #Svelte #SvelteKit #LearnByDoing #OpenSource #BeginnerGuide #100DaysOfCode #CodingFromScratch
