# SlopGuard — AI Package Hallucination & Supply Chain Scanner

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-facc15?style=for-the-badge&logo=vercel)](https://slopguard-nyzxis.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Built With: React + Vite + TS](https://img.shields.io/badge/Built%20With-React%20%7C%20Vite%20%7C%20TS%20%7C%20Tailwind%20v4-eab308?style=for-the-badge)](https://vitejs.dev/)

> **Live Demo:** [https://slopguard-nyzxis.vercel.app/](https://slopguard-nyzxis.vercel.app/)

**SlopGuard** is an industrial software supply chain security auditor and package hallucination detector. It protects modern development workflows against AI-generated dependency hallucinations (phantom packages), typosquatting vectors, and poisoned lifecycle install scripts across the npm, PyPI, and Cargo ecosystems.

---

## The Threat: AI Package Hallucinations

When developers ask LLMs (such as ChatGPT, Claude, Copilot, or Cursor) to write software, the models frequently hallucinate non-existent packages (e.g. `@next-auth/secure-cookies` or `scikit-learn-gpu`). 

Threat actors constantly scan for popular AI hallucinations, register those unclaimed package names on public registries, and publish malicious packages with `preinstall` scripts. When unsuspecting developers install the AI-recommended dependencies, their workstations and CI/CD pipelines are backdoored. **SlopGuard eliminates this attack surface.**

---

## Key Features

- **Two-Tier Industrial Checkpoint Layout**:
  - **Cargo Manifest Bay (35%)**: Multi-ecosystem manifest editor with syntax formatting for `package.json`, `requirements.txt`, and `Cargo.toml`.
  - **Decontamination Inspection Bay (65%)**: Scanned package triage cards detailing registry existence, download velocity, age, and AI hallucination risk scores.
- **Multi-Vector Threat Detection**:
  - **LLM Phantom Packages**: Detects packages that do not exist on public registries and are ripe for attacker squatting.
  - **Typosquatting Detection**: Identifies subtle name variations mimicking popular modules (e.g. `colourama` vs `colorama` or `request-http` vs `requests`).
  - **Malicious Lifecycle Hooks**: Flags suspicious `preinstall`/`postinstall` scripts that exfiltrate environment tokens or pipe curl to bash.
- **Automated Defense Claim Script Generator**: One-click modal generating copyable bash scripts to preemptively register safe placeholder packages on npm/PyPI to neutralize threat actor squatting.
- **Instructional Checkpoint Protocol**: Integrated "How to Use" guide modal walking security engineers through supply chain triage.

---

## How to Use

1. **Select Ecosystem & Manifest**:
   - Choose your target ecosystem (**npm**, **PyPI**, or **Cargo**).
   - Click a preset (*LLM-Hallucinated Next.js*, *Python Data Science Typosquats*, *Malicious Hook*, *Clean Enterprise*) or paste your manifest into the **Cargo Manifest Bay**.
2. **Audit Manifest**:
   - Click **Audit Manifest for Slop**. The engine evaluates download telemetry, registry existence, and hallucination scores.
3. **Triage Flagged Packages**:
   - Review the triage cards in the **Decontamination Bay**.
   - Note any **LLM PHANTOM PACKAGE** or **TYPOSQUAT VECTOR** badges.
4. **Generate Defensive Placeholders**:
   - Click **Generate Defense Script**.
   - Copy the generated bash script to publish safe inert placeholders to public registries before malicious actors can register them.

---

## Design System

- **Aesthetic**: Heavy-Duty Freight Terminal / Cargo Inspection Checkpoint
- **Palette**: Matte Slate Asphalt (`#0f141c`), High-Visibility Hazard Yellow (`#facc15` / `#eab308`), Safety Orange (`#f97316`), Diagonal Caution Stripes
- **Typography**: Bricolage Grotesque (punchy industrial headings), DM Sans (body copy), Red Hat Mono (manifests & code)
- **Layout**: Two-tier split cockpit with caution hazard warning header and floating defense generator modal

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/nyzxis/slopguard.git
cd slopguard

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## Author & Portfolio

Developed by **Arfa Danial (nyzxis)** as part of the Cybersecurity & AI Defense Suite.
- Portfolio: [https://nyzxis.vercel.app/](https://nyzxis.vercel.app/)
- GitHub: [@nyzxis](https://github.com/nyzxis)
