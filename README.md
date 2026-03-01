# Blueprint by ShougTech

Blueprint by ShougTech is a structured digital studio focused on building digital gardens, project documentation systems, and workshop websites for students and creators.

We specialize in lightweight, static websites deployed using modern Git-based workflows to ensure speed, security, and long-term maintainability.

---

## Mission

To help students and early professionals establish a clean, structured, and professional online presence without unnecessary technical complexity.

---

## What We Build

### Digital Gardens
Personal knowledge spaces designed to grow over time.
- Structured navigation
- Clean information architecture
- Responsive design
- Long-term maintainability

### Project Documentation Systems
Organized, searchable documentation for academic or technical projects.
- Structured chapters
- Search integration
- Resource organization
- Git-based deployment

### Workshop & Course Sites
Clean workshop or course websites with clear learning structures.
- Organized modules
- Resource sections
- Embedded materials
- Professional layout

---

## Technical Approach

Blueprint projects prioritize:

- Static deployment
- GitHub-based workflows
- GitHub Pages hosting
- Optional custom domain configuration
- HTTPS configuration
- Clean information architecture

We intentionally do **not** provide:
- Backend systems
- Databases
- User authentication
- Dashboards
- Payment integrations
- Full-stack web applications

For full-stack development, refer to ShougTech.

---

## Service Model

Blueprint operates on a structured base + add-on system:

- Base package (static site)
- Optional custom domain configuration
- Optional bilingual setup
- Optional additional pages
- Optional priority delivery

All projects include limited revision rounds to maintain clarity and efficiency.

---

## Workflow

1. Inquiry submission
2. Content & structure checklist
3. Initial draft delivery
4. Revision phase
5. Deployment & final handover

---

## Ownership & Repository Policy

Client project repositories may be:
- Managed by Blueprint
- Or transferred upon request after project completion

Custom domain ownership always remains with the client.

---

## License

This repository and its contents are proprietary.

Copyright © 2026 Shoug Fawaz Alomran  
All rights reserved.

No permission is granted to copy, modify, distribute, or reuse any part of this project without explicit written permission.

---

Blueprint by ShougTech  
Structured. Intentional. Built to last.

---

## GitHub Pages Deployment (MkDocs)

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that builds and deploys the MkDocs site to GitHub Pages on every push to `main`.

Required one-time repository settings:

1. Go to `Settings` → `Pages`.
2. Set `Source` to **GitHub Actions**.
3. Ensure your default deployment branch is `main`.

After that, push to `main` and GitHub will publish the site automatically.
