# Repository audit

_Generated from `src/content/repository-map.ts` by `npm run docs:inventory`._

**Scope:** all 95 repositories visible for github.com/Asad2512-dev on 2026-11-08
(24 public, 71 private).

**Method:** private repositories were attached to the build session read-only and read through the GitHub REST API
(metadata, `docs/ARCHITECTURE.md`, README, root manifests, full file tree, Android/iOS app labels); public repositories
were read with shallow, blob-less git clones. Every default branch's `docs/ARCHITECTURE.md` was retrieved (95/95).
Technologies come from `composer.json`, `package.json`, `pubspec.yaml`, `requirements.txt` and the architecture docs.
No credentials were printed or committed. Private repositories appear under neutral aliases; real names are kept in a local, git-ignored file.

| Result | Count |
|---|---|
| Architecture docs read | 95 |
| — substantive | 91 |
| — stub (README-only repo) | 3 |
| — empty repository | 1 |
| Repositories mapped to projects | 75 |
| Distinct projects with repositories | 49 |
| Learning / practice | 7 |
| Assessment tasks | 2 |
| Forks | 2 |
| Third-party / not original | 2 |
| Unpublished pending confirmation | 6 |
| Profile | 1 |

## Reconciliation (target: 41 projects)

- **49 distinct projects** are backed by repositories after grouping multi-repo products
  (MenuWave ×4, BiteRush ×5, CoreSY ×6, Tangled Synapses ×6, LabelBuddy ×2, BuildExa ×2, WeCare ×2, GreenGuide ×2, Flames & Shakes ×2, GoBirr ×2, Mood Panda ×2, Askio AI ×2, CodeByAsad ×2).
- **6 more** are listed in the profile README without a repository (EVM, Supervisor Allocation, Pak Enterprises Tiles, Dr. Farhan Siddique, RCR-DeepFake, FreqKAN).
- **ExamCell** (flagship) maps to a private repository whose default branch is empty — the case study uses profile content only.
- **Total published: 55.** Nothing in the evidence justifies removing exactly 14; to reach 41, set `published: false` on entries in `src/content/projects/catalog.ts` (candidates are listed in CONTENT-GAPS.md).
- **Provenance flags:** BiteRush (6amMart base) and GoBirr (eDemand rebrand) are labelled “customised”; two private repositories (an adapted copy of an open-source project and a third-party commercial codebase) are excluded as not original work.
- Profile apps without repositories: Smart Cubz, Urdu Poetry, Campus Ride — not published (no description to show).

## Repositories

| Repository | Default branch | Architecture doc | Technologies | Associated project | Status |
|---|---|---|---|---|---|
| 🔒 unlisted-private-1 | main | substantive | Laravel, PHP, Sanctum, Stripe, Vue, AWS S3, Twilio | — | third-party — Third-party commercial codebase — authorship unconfirmed |
| [advanced-js](https://github.com/Asad2512-dev/advanced-js) | main | substantive | — | — | learning — Advanced JavaScript code-along notes |
| 🔒 arkaf-edge-private-1 | main | substantive | Next.js, React, TypeScript, Tailwind CSS, GSAP, Three.js | arkaf-edge | project |
| [Asad2512-dev](https://github.com/Asad2512-dev/Asad2512-dev) | main | stub | — | — | profile — GitHub profile README |
| [autocategory-ai-platform](https://github.com/Asad2512-dev/autocategory-ai-platform) | main | substantive | Laravel, PHP, Sanctum, Tailwind CSS, Vite, FastAPI | autocategory-ai | project |
| 🔒 tangled-synapses-private-1 | main | substantive | Next.js, React, TypeScript, Tailwind CSS, GSAP | tangled-synapses | project |
| 🔒 beyond-today-private-1 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, GetX | beyond-today | project |
| 🔒 biterush-private-1 | main | substantive | Flutter, Firebase, Firebase Auth, FCM, GetX, Google Maps, Pusher | biterush | project |
| 🔒 biterush-private-2 | main | substantive | Flutter, Firebase, Firebase Auth, FCM, GetX, Google Maps, Pusher | biterush | project |
| 🔒 biterush-private-3 | main | substantive | Next.js, React, TypeScript, GSAP, Firebase | biterush | project |
| 🔒 biterush-private-4 | main | substantive | Flutter, Firebase, FCM, GetX, Google Maps | biterush | project |
| 🔒 biterush-private-5 | main | substantive | Laravel, PHP, Stripe, React, Vite, Firebase, OpenAI, Pusher, AWS S3, Twilio, Inertia | biterush | project |
| 🔒 blogbyasad-private-1 | main | substantive | Laravel, PHP, Tailwind CSS, Alpine.js, Vite, Spatie Permission | blogbyasad | project |
| 🔒 blueprint-health-fitness-private-1 | main | substantive | Flutter, GetX | blueprint-health-fitness | project |
| 🔒 tangled-synapses-private-2 | main | substantive | Next.js, React, TypeScript, Tailwind CSS, GSAP | tangled-synapses | project |
| 🔒 buildexa-private-1 | main | substantive | Laravel, PHP, Tailwind CSS, Vite | buildexa | project |
| 🔒 buildexa-private-2 | main | substantive | PHP | buildexa | project |
| [chatie_chat_app](https://github.com/Asad2512-dev/chatie_chat_app) | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, FCM | — | unpublished — Simple Firebase chat app — limited product scope; confirm before publishing |
| 🔒 clinic-token-private-1 | main | substantive | Flutter, GetX, SQLite | clinic-token | project |
| [ClubSync](https://github.com/Asad2512-dev/ClubSync) | main | substantive | — | clubsync | project |
| [codebyasad](https://github.com/Asad2512-dev/codebyasad) | main | substantive | Laravel, PHP, Sanctum, Vue, Redis, AWS S3 | codebyasad | project |
| [codebyasad-v2](https://github.com/Asad2512-dev/codebyasad-v2) | main | stub | Next.js, React, TypeScript, Tailwind CSS, GSAP, Three.js | codebyasad | project |
| 🔒 coresy-private-1 | main | substantive | Flutter, BLoC | coresy | project |
| 🔒 coresy-private-2 | main | substantive | Flutter, BLoC | coresy | project |
| 🔒 coresy-private-3 | main | substantive | Flutter, BLoC, go_router, Dio | coresy | project |
| 🔒 coresy-private-4 | main | substantive | Flutter, BLoC, go_router | coresy | project |
| 🔒 coresy-private-5 | main | substantive | Flutter, BLoC, go_router, Dio | coresy | project |
| 🔒 coresy-private-6 | main | substantive | Flutter, BLoC, go_router, Dio, Google Maps | coresy | project |
| 🔒 cypher-private-1 | main | substantive | Flutter, GetX, Dio | cypher | project |
| 🔒 devprismic-private-1 | main | substantive | Laravel, PHP, Filament | devprismic | project |
| 🔒 unlisted-private-2 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, GetX | — | assessment — ShopEasy — e-commerce task app |
| 🔒 gobirr-private-1 | main | substantive | Stripe, Flutter, Firebase, Cloud Firestore, Firebase Auth, FCM, BLoC, Dio, Hive, Google Maps, Stripe (mobile) | gobirr | project |
| 🔒 gobirr-private-2 | main | substantive | Stripe, Flutter, Firebase, Cloud Firestore, Firebase Auth, FCM, BLoC, Dio, Hive, Google Maps, Stripe (mobile) | gobirr | project |
| [eduford](https://github.com/Asad2512-dev/eduford) | main | substantive | — | — | learning — HTML/CSS landing-page exercise |
| 🔒 eiva-private-1 | main | substantive | scikit-learn, PyTorch | eiva | project |
| 🔒 tangled-synapses-private-3 | main | substantive | Next.js, React, TypeScript, Tailwind CSS, GSAP | tangled-synapses | project |
| [EShopee-Flutter-eCommerce-App](https://github.com/Asad2512-dev/EShopee-Flutter-eCommerce-App) | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, Provider | — | fork — Fork of an open-source FlutterFire e-commerce app |
| 🔒 examcell-private-1 | main | empty-repo | — | examcell | project |
| 🔒 flames-and-shakes-private-1 | main | substantive | Laravel, PHP, Sanctum, Livewire, Tailwind CSS, Alpine.js | flames-and-shakes | project |
| 🔒 flames-and-shakes-private-2 | master | substantive | Laravel, PHP, Sanctum, Tailwind CSS, Vite, Spatie Permission | flames-and-shakes | project |
| [flutter_practice](https://github.com/Asad2512-dev/flutter_practice) | main | substantive | Flutter, Firebase, Firebase Auth, GetX | — | learning — Flutter practice |
| 🔒 askio-ai-private-1 | main | substantive | Flutter, GetX | askio-ai | project |
| [git-github-roadmap](https://github.com/Asad2512-dev/git-github-roadmap) | main | substantive | — | — | learning — Git & GitHub practice |
| [google-dsa-prep](https://github.com/Asad2512-dev/google-dsa-prep) | main | substantive | — | — | learning — Daily DSA practice in Python |
| 🔒 greenguide-private-1 | main | substantive | Express, MySQL | greenguide | project |
| [GreenGuide](https://github.com/Asad2512-dev/GreenGuide) | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, GetX, Gemini | greenguide | project |
| [hoppscotch](https://github.com/Asad2512-dev/hoppscotch) | main | substantive | Vue, NestJS, PostgreSQL, Prisma | — | fork — Fork of hoppscotch/hoppscotch |
| 🔒 jordanian-sports-private-1 | main | substantive | Flutter, GetX | jordanian-sports | project |
| [Js-fundamentals](https://github.com/Asad2512-dev/Js-fundamentals) | main | substantive | — | — | learning — JavaScript fundamentals demos |
| 🔒 labelbuddy-private-1 | main | substantive | Laravel, PHP, Sanctum, Stripe, Tailwind CSS, Vite | labelbuddy | project |
| 🔒 labelbuddy-private-2 | main | substantive | Flutter, GetX | labelbuddy | project |
| 🔒 voice-library-private-1 | main | substantive | Django | voice-library | project |
| [library-api-nestjs](https://github.com/Asad2512-dev/library-api-nestjs) | main | substantive | TypeScript, NestJS, MongoDB | librarypro-api | project |
| [linea-frontend](https://github.com/Asad2512-dev/linea-frontend) | main | substantive | — | — | learning — Student portfolio submission (static HTML/CSS) |
| 🔒 lite-nurse-clinic-private-1 | main | substantive | Flutter, GetX | lite-nurse-clinic | project |
| 🔒 loombyte-private-1 | main | substantive | Next.js, React, TypeScript, GSAP, Three.js | loombyte | project |
| 🔒 unlisted-private-3 | main | substantive | Next.js, React, TypeScript, Tailwind CSS, Vite, MySQL, PostgreSQL, Drizzle, SQLite, OpenAI | — | third-party — Adapted copy of a third-party open-source project — not original work |
| 🔒 tangled-synapses-private-4 | main | substantive | Next.js, React, TypeScript, Tailwind CSS, GSAP | tangled-synapses | project |
| 🔒 muatabarea-private-1 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, FCM, GetX, Google Maps | muatabarea | project |
| 🔒 menuwave-private-1 | main | substantive | Laravel, PHP, Sanctum, Stripe, Tailwind CSS, Alpine.js, Vite, GSAP | menuwave | project |
| 🔒 menuwave-private-2 | main | substantive | Flutter, GetX | menuwave | project |
| 🔒 menuwave-private-3 | main | substantive | Flutter, GetX, Dio, SQLite | menuwave | project |
| 🔒 menuwave-private-4 | main | substantive | Flutter, Riverpod, go_router, SQLite | menuwave | project |
| [mood_panda](https://github.com/Asad2512-dev/mood_panda) | main | substantive | Flutter | mood-panda | project |
| 🔒 mood-panda-private-1 | main | substantive | Flutter, Firebase, Cloud Firestore, FCM | mood-panda | project |
| [my-flyn](https://github.com/Asad2512-dev/my-flyn) | main | substantive | Flutter, GetX | — | assessment — Assignment app (README says it follows assignment instructions) |
| 🔒 askio-ai-private-2 | main | substantive | Flutter, GetX | askio-ai | project |
| 🔒 unlisted-private-4 | main | substantive | Flutter, GetX, Dio | — | unpublished — Odyssey Hub — no description or feature modules; confirm |
| 🔒 online-barber-private-1 | master | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, FCM, GetX, Google Maps | online-barber | project |
| 🔒 unlisted-private-5 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, GetX | — | unpublished — PingCoin — limited evidence of scope; confirm |
| 🔒 prepx-private-1 | main | substantive | Laravel, PHP, Tailwind CSS, Vite | prepx | project |
| 🔒 qik-e-private-1 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, GetX | qik-e | project |
| 🔒 rayvon-scents-private-1 | main | substantive | Laravel, PHP, Tailwind CSS, Alpine.js, Vite, Pusher | rayvon-scents | project |
| 🔒 read-holy-quran-private-1 | main | substantive | Laravel, PHP, Livewire, Tailwind CSS, Vite | read-holy-quran | project |
| 🔒 safe-city-private-1 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, FCM, GetX, Google Maps | safe-city | project |
| [session_buddy](https://github.com/Asad2512-dev/session_buddy) | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, GetX | — | unpublished — Session Buddy — no description; confirm |
| 🔒 signlink-private-1 | main | substantive | — | signlink | project |
| [smart-log-analyzer](https://github.com/Asad2512-dev/smart-log-analyzer) | main | substantive | TypeScript | smart-log-analyzer | project |
| 🔒 budget-mart-private-1 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, FCM, GetX, Google Maps | budget-mart | project |
| 🔒 quicksaver-private-1 | main | substantive | Flutter, GetX | quicksaver | project |
| 🔒 softheal-private-1 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, FCM, GetX, Dio, SQLite, Hive | softheal | project |
| 🔒 smart-splitter-private-1 | main | substantive | Flutter, GetX | smart-splitter | project |
| 🔒 football-app-private-1 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, GetX | football-app | project |
| [stock-management-](https://github.com/Asad2512-dev/stock-management-) | master | substantive | Flutter | — | unpublished — Stock management app — no description; confirm before publishing |
| 🔒 student-boys-hostel-private-1 | main | substantive | Flutter | student-boys-hostel | project |
| 🔒 sugarwell-private-1 | main | substantive | Flutter, Firebase, Cloud Firestore, Firebase Auth, FCM, GetX, Provider, go_router, Dio, Hive | sugarwell | project |
| 🔒 tangled-synapses-private-5 | main | substantive | Next.js, React, TypeScript, Tailwind CSS, GSAP | tangled-synapses | project |
| 🔒 tangled-synapses-private-6 | main | substantive | Next.js, React, TypeScript, Tailwind CSS, GSAP | tangled-synapses | project |
| [tasks](https://github.com/Asad2512-dev/tasks) | main | substantive | Flutter | — | unpublished — Tasks Master — starter-level scope; confirm before publishing |
| 🔒 top-coaches-private-1 | main | stub | — | top-coaches | project |
| 🔒 totalcashpro-private-1 | main | substantive | Laravel, PHP, Sanctum, Stripe, Tailwind CSS, Alpine.js, Vite, GSAP | totalcashpro | project |
| [unisecure](https://github.com/Asad2512-dev/unisecure) | main | substantive | Laravel, PHP, Sanctum, Tailwind CSS, Vite | unisecure | project |
| 🔒 wecare-private-1 | main | substantive | Flutter, GetX | wecare | project |
| 🔒 wecare-private-2 | main | substantive | Laravel, PHP, Sanctum, Tailwind CSS, Alpine.js, Vite, Pusher | wecare | project |
| 🔒 zawaaral-private-1 | main | substantive | — | zawaaral | project |
