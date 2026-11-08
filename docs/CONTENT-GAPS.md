# Content gaps — needs confirmation from Asad

Updated after the full 95-repository audit (2026-11-08). Private repository names are kept out of git — see `private/` locally. Nothing below is shown on the site as fact;
each item is either omitted or appears in a case study's Evidence section as limited evidence.
Per-project gaps are also in `pending` on each entry and in the “Missing” column of PROJECT-INVENTORY.md.

## Decisions only you can make

1. **41 vs 55 projects.** The evidence supports 55 distinct projects. To publish exactly 41, set
   `published: false` on 14 entries in `src/content/projects/catalog.ts`. Reasonable candidates (thinnest evidence):
   Muatabarea, Cypher, LoomByte, Top Coaches, Football App, Smart Splitter, Mood Panda, Budget Mart, Safe City,
   Student Hostel Manager, Rayvon Scents, Zawaaral 3PL, Pak Enterprises Tiles, Dr. Farhan Siddique.
   Or tell me which projects you consider one product and I will merge them.
2. **Six unpublished repositories** (classified `unpublished` in the repository map; two are private and
   listed under aliases) — publish or keep hidden? Public ones: chatie_chat_app, stock-management-, tasks, session_buddy.
3. **Third-party bases.** BiteRush (6amMart) and GoBirr (eDemand) are shown as “customised”. If you built
   significant features on top, list them so the case study can say what is yours.
   Two private repositories are excluded as not original work (see the local full audit) — confirm.
4. **Ownership split** on MenuWave and TotalCashPro: sole engineer, lead, or part of a team (Buildexa)?

## Flagship gaps

- **ExamCell** — its repository is empty. Push the code, or confirm stack, AI features and a demo link.
- **MenuWave / TotalCashPro** — screenshots (desktop + POS/kitchen/signage devices), measured production outcomes.

## Evidence still missing

- **Résumé PDF** → `public/resume/Muhammad-Asad-Ullah-Resume.pdf` (the HTML résumé works without it).
- **Screenshots** for any project → `public/images/projects/<slug>/`, then add to `screenshots` in its entry.
- **Store links** for published apps: GoBirr, Beyond Today, Lite Nurse Clinic, Blueprint, Online Barber,
  QuickSaver, Top Coaches, SmartPrepX; and the apps with no repository: Smart Cubz, Urdu Poetry.
- **Research outputs** (paper, preprint or repo) for RCR-DeepFake, FreqKAN and EIVA.
- **Repositories** for EVM, Supervisor Allocation, Pak Enterprises Tiles, Dr. Farhan Siddique.
- **Askio AI** — which model powers the chat; is the second NUML app repository part of it?
- **Voice Library** — was it the 2025 MNS University competition winner?
- **Cyphersol figures** (25% stability, 30% faster delivery) — evidence, or keep labelled self-reported.
- **Availability** — remote only, or relocation too (`profile.availability`).
- Optional: a domain email (e.g. hello@codebyasad.com) instead of Gmail.
