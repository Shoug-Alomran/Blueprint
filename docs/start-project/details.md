---
title: Start Project
description: Submit detailed Blueprint project information including goals, content, timeline, scope, and required deliverables for review.
role: Project Intake
scope: Structured intake and scope confirmation
constraints: Clear inputs, realistic timelines, static-site delivery boundaries
metrics: form completion quality, submission rate, kickoff speed
last_updated: 2026-03-03
robots: noindex,follow
---

# Start Project

Use this intake form to submit your project details in one pass.

<div class="bp-intake">
  <style>
    .bp-intake {
      --navy: #0f3d4a;
      --navy-mid: #115e59;
      --gold: #5eead4;
      --cream: #f6fbfb;
      --bg: #f3f8f8;
      --ink: #1f2937;
      --ink-light: #5f6f7b;
      --rule: var(--line-soft, rgba(15, 89, 101, 0.2));
      --input-border: rgba(15, 89, 101, 0.22);
      --input-focus: #0f766e;
      --section-bg: #ffffff;
      --shadow: var(--shadow-soft, 0 12px 28px rgba(15, 23, 42, 0.12));
      --required: #c0392b;
      margin-top: 1rem;
      width: 100%;
    }

    .bp-intake * { box-sizing: border-box; }

    .bp-intake .bp-intake-page {
      width: 100%;
      max-width: min(100%, 1040px);
      margin: 0 auto;
      background: linear-gradient(160deg, rgba(255, 255, 255, 0.99), rgba(241, 247, 247, 0.95));
      border: 1px solid var(--rule);
      border-radius: var(--radius-xl, 1rem);
      overflow: hidden;
      box-shadow: var(--shadow);
    }

    body.sg-hide-left-sidebar .bp-intake .bp-intake-page,
    body.sg-hide-right-sidebar .bp-intake .bp-intake-page,
    body.sg-hide-left-sidebar.sg-hide-right-sidebar .bp-intake .bp-intake-page {
      max-width: min(100%, 1320px);
    }

    .bp-intake .bp-intake-header {
      background: var(--bar-gradient, linear-gradient(120deg, #0f2933, #0f3d4a, #115e59));
      padding: 28px 30px 24px;
      position: relative;
    }

    .bp-intake .bp-intake-header::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--navy-mid), var(--gold), var(--navy-mid));
    }

    .bp-intake .bp-intake-header h2 {
      margin: 0;
      color: #fff;
      font-size: 1.55rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .bp-intake .bp-intake-header p {
      margin: 0.5rem 0 0;
      color: rgba(255, 255, 255, 0.72);
      font-size: 0.88rem;
    }

    .bp-intake .bp-intake-meta {
      margin-top: 0.8rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
      font-size: 0.7rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(221, 253, 249, 0.82);
    }

    .bp-intake .bp-form {
      background: transparent;
      padding: 0 0 1.2rem;
    }

    .bp-intake .bp-section {
      border-bottom: 1px solid var(--rule);
      padding: 1.35rem 1.35rem 1.2rem;
      background: rgba(255, 255, 255, 0.84);
    }

    .bp-intake .bp-section:last-of-type { border-bottom: 0; }

    .bp-intake .bp-section-label {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .bp-intake .bp-num {
      width: 1.7rem;
      height: 1.7rem;
      border-radius: 999px;
      background: linear-gradient(130deg, #0f4c58, #0f766e);
      color: #e8fffb;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.8rem;
      flex-shrink: 0;
    }

    .bp-intake .bp-title {
      margin: 0;
      font-size: 1rem;
      color: #0f4a53;
      font-weight: 700;
    }

    .bp-intake .bp-desc {
      margin: 0.1rem 0 0;
      color: var(--ink-light);
      font-size: 0.76rem;
    }

    .bp-intake .bp-row {
      display: grid;
      gap: 0.8rem;
      margin-bottom: 0.8rem;
    }

    .bp-intake .bp-cols-1 { grid-template-columns: 1fr; }
    .bp-intake .bp-cols-2 { grid-template-columns: 1fr 1fr; }
    .bp-intake .bp-cols-3 { grid-template-columns: 1fr 1fr 1fr; }

    .bp-intake .bp-field {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      min-width: 0;
    }

    .bp-intake label {
      font-size: 0.67rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-light);
      font-weight: 700;
    }

    .bp-intake .req {
      color: var(--required);
      margin-inline-start: 2px;
    }

    .bp-intake input[type="text"],
    .bp-intake input[type="email"],
    .bp-intake input[type="tel"],
    .bp-intake input[type="number"],
    .bp-intake input[type="date"],
    .bp-intake select,
    .bp-intake textarea {
      width: 100%;
      border: 1px solid var(--input-border);
      border-radius: 4px;
      padding: 0.6rem 0.72rem;
      font-size: 0.88rem;
      color: var(--ink);
      background: #ffffff;
      font-family: inherit;
      transition: border-color 180ms ease, box-shadow 180ms ease;
    }

    .bp-intake textarea { min-height: 88px; resize: vertical; }

    .bp-intake input:focus,
    .bp-intake select:focus,
    .bp-intake textarea:focus {
      outline: none;
      border-color: var(--input-focus);
      box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.16);
    }

    .bp-intake .bp-choice-grid {
      display: grid;
      gap: 0.6rem;
      grid-template-columns: 1fr 1fr;
    }

    .bp-intake .bp-choice-grid.bp-cols-3 { grid-template-columns: 1fr 1fr 1fr; }

    .bp-intake .bp-choice {
      border: 1px solid var(--input-border);
      border-radius: 4px;
      padding: 0.62rem 0.72rem;
      display: flex;
      gap: 0.55rem;
      align-items: flex-start;
      background: linear-gradient(160deg, rgba(255, 255, 255, 0.99), rgba(244, 249, 249, 0.95));
      transition: border-color 170ms ease, transform 170ms ease, box-shadow 170ms ease;
    }

    .bp-intake .bp-choice:hover {
      border-color: rgba(15, 118, 110, 0.45);
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(12, 42, 52, 0.08);
    }

    .bp-intake .bp-choice input { margin-top: 0.18rem; accent-color: var(--navy); }
    .bp-intake .bp-choice label {
      font-size: 0.86rem;
      text-transform: none;
      letter-spacing: 0;
      color: var(--ink);
      font-weight: 500;
      line-height: 1.35;
    }

    .bp-intake .bp-choice small {
      display: block;
      color: var(--ink-light);
      font-size: 0.74rem;
      margin-top: 0.1rem;
    }

    .bp-intake .bp-summary {
      border: 1px solid var(--rule);
      border-left: 3px solid #0f766e;
      border-radius: 4px;
      background: rgba(15, 118, 110, 0.06);
      padding: 0.8rem 0.9rem;
      font-size: 0.82rem;
      color: var(--ink-light);
      line-height: 1.6;
      margin-top: 0.4rem;
    }

    .bp-intake .bp-submit {
      padding: 1rem 1.35rem 0.2rem;
      border-top: 1px solid var(--rule);
      background: rgba(250, 255, 255, 0.76);
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      align-items: center;
      justify-content: space-between;
    }

    .bp-intake .bp-submit-note {
      font-size: 0.8rem;
      color: var(--ink-light);
      max-width: 42rem;
      line-height: 1.5;
    }

    .bp-intake .bp-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
    }

    .bp-intake .bp-btn {
      border: 1px solid rgba(15, 89, 101, 0.28);
      border-radius: 999px;
      padding: 0.55rem 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.96);
      color: #0f4a53;
    }

    .bp-intake .bp-btn.primary {
      background: var(--bar-gradient, linear-gradient(120deg, #0f2933, #0f3d4a, #115e59));
      border-color: rgba(15, 89, 101, 0.55);
      color: #fff;
    }

    .bp-intake .bp-status {
      margin: 0.6rem 1.35rem 0.8rem;
      border-radius: 6px;
      padding: 0.55rem 0.7rem;
      font-size: 0.8rem;
      display: none;
    }

    .bp-intake .bp-status.ok {
      display: block;
      background: rgba(14, 126, 104, 0.12);
      border: 1px solid rgba(14, 126, 104, 0.28);
      color: #0f5b4f;
    }

    .bp-intake .bp-status.err {
      display: block;
      background: rgba(186, 43, 43, 0.12);
      border: 1px solid rgba(186, 43, 43, 0.32);
      color: #7a1f1f;
    }

    [data-md-color-scheme="slate"] .bp-intake {
      --ink: #e6fbfa;
      --ink-light: #b6d7d5;
      --rule: rgba(45, 212, 191, 0.16);
      --input-border: rgba(94, 234, 212, 0.18);
      --input-focus: #2dd4bf;
      --shadow: 0 18px 40px rgba(2, 6, 23, 0.38);
      --required: #fda4af;
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-intake-page {
      background: linear-gradient(160deg, rgba(9, 18, 30, 0.98), rgba(12, 24, 36, 0.96));
      border-color: rgba(45, 212, 191, 0.18);
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-section {
      background: rgba(7, 18, 27, 0.78);
      border-bottom-color: rgba(45, 212, 191, 0.12);
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-title,
    [data-md-color-scheme="slate"] .bp-intake label,
    [data-md-color-scheme="slate"] .bp-intake .bp-choice label,
    [data-md-color-scheme="slate"] .bp-intake .bp-submit-note {
      color: #def7f5;
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-desc,
    [data-md-color-scheme="slate"] .bp-intake .bp-choice small,
    [data-md-color-scheme="slate"] .bp-intake .bp-summary {
      color: #b6d7d5;
    }

    [data-md-color-scheme="slate"] .bp-intake input[type="text"],
    [data-md-color-scheme="slate"] .bp-intake input[type="email"],
    [data-md-color-scheme="slate"] .bp-intake input[type="tel"],
    [data-md-color-scheme="slate"] .bp-intake input[type="number"],
    [data-md-color-scheme="slate"] .bp-intake input[type="date"],
    [data-md-color-scheme="slate"] .bp-intake select,
    [data-md-color-scheme="slate"] .bp-intake textarea {
      border-color: rgba(94, 234, 212, 0.22);
      background: rgba(10, 23, 33, 0.94);
      color: #effcfb;
      box-shadow: inset 0 1px 2px rgba(2, 6, 23, 0.28);
    }

    [data-md-color-scheme="slate"] .bp-intake input::placeholder,
    [data-md-color-scheme="slate"] .bp-intake textarea::placeholder {
      color: #86a8a6;
    }

    [data-md-color-scheme="slate"] .bp-intake input:focus,
    [data-md-color-scheme="slate"] .bp-intake select:focus,
    [data-md-color-scheme="slate"] .bp-intake textarea:focus {
      background: rgba(12, 28, 40, 0.98);
      box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.18);
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-choice {
      border-color: rgba(94, 234, 212, 0.16);
      background: linear-gradient(160deg, rgba(8, 20, 30, 0.96), rgba(10, 24, 35, 0.94));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-choice:hover {
      border-color: rgba(94, 234, 212, 0.34);
      box-shadow: 0 10px 24px rgba(2, 6, 23, 0.24);
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-choice input {
      accent-color: #2dd4bf;
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-summary,
    [data-md-color-scheme="slate"] .bp-intake .bp-submit {
      border-color: rgba(45, 212, 191, 0.14);
      background: rgba(8, 20, 30, 0.7);
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-btn {
      border-color: rgba(94, 234, 212, 0.24);
      background: rgba(12, 28, 40, 0.92);
      color: #def7f5;
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-btn.primary {
      background: linear-gradient(135deg, #0f766e, #14b8a6);
      border-color: rgba(94, 234, 212, 0.24);
      color: #f0fdfa;
      box-shadow: 0 14px 28px rgba(8, 145, 128, 0.22);
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-status.ok {
      background: rgba(20, 184, 166, 0.12);
      border-color: rgba(45, 212, 191, 0.24);
      color: #a7f3d0;
    }

    [data-md-color-scheme="slate"] .bp-intake .bp-status.err {
      background: rgba(239, 68, 68, 0.14);
      border-color: rgba(248, 113, 113, 0.24);
      color: #fecaca;
    }

    @media (max-width: 900px) {
      .bp-intake .bp-cols-2,
      .bp-intake .bp-cols-3,
      .bp-intake .bp-choice-grid,
      .bp-intake .bp-choice-grid.bp-cols-3 {
        grid-template-columns: 1fr;
      }
    }

    @media print {
      .md-header,
      .md-tabs,
      .md-sidebar,
      .md-footer,
      .header-actions,
      .bp-intake .bp-actions,
      .bp-intake .bp-status,
      .md-search,
      .md-top,
      .md-header__option,
      .md-content .md-content__button {
        display: none !important;
      }

      .md-main,
      .md-main__inner,
      .md-content,
      .md-content__inner,
      .md-grid {
        max-width: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      .bp-intake .bp-intake-page {
        border: 0;
      }
    }
  </style>

  <div class="bp-intake-page" id="bp-intake-print-root">
    <div class="bp-intake-header">
      <h2>Project Intake Form</h2>
      <p>Fill this before kickoff so scope, timeline, and delivery are confirmed quickly.</p>
      <div class="bp-intake-meta">
        <span>Blueprint Studio</span>
        <span>blueprint@shoug-tech.com</span>
        <span>blueprint.shoug-tech.com</span>
      </div>
    </div>

    <form class="bp-form" id="bp-intake-form" novalidate>
      <input type="hidden" name="_subject" value="Blueprint Intake Form Submission">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">1</span><div><h3 class="bp-title">Client Information</h3><p class="bp-desc">Core contact and communication details</p></div></div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>Full Name <span class="req">*</span></label><input required name="client_name" type="text" placeholder="For example: Shoug Alomran"></div>
          <div class="bp-field"><label>Email Address <span class="req">*</span></label><input required name="client_email" type="email" placeholder="For example: name@example.com"></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>Phone / WhatsApp</label><input name="client_phone" type="tel" placeholder="For example: +966 5X XXX XXXX"></div>
          <div class="bp-field"><label>University / Organization (if applicable)</label><input name="client_org" type="text" placeholder="For example: Prince Sultan University"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Preferred Communication Language</label><select name="client_lang"><option value="">Select...</option><option>English</option><option>Arabic</option><option>Both</option></select></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">2</span><div><h3 class="bp-title">Website Tier & Project Brief</h3><p class="bp-desc">Tier selection and project fundamentals</p></div></div>
        <div class="bp-choice-grid bp-cols-3">
          <div class="bp-choice"><input id="tier1" name="tier" type="radio" value="Tier 1"><label for="tier1">Tier 1<small>Personal Presence · 600 SAR</small></label></div>
          <div class="bp-choice"><input id="tier2" name="tier" type="radio" value="Tier 2"><label for="tier2">Tier 2<small>Growth Site · 950 SAR</small></label></div>
          <div class="bp-choice"><input id="tier3" name="tier" type="radio" value="Tier 3"><label for="tier3">Tier 3<small>Advanced Build · 1400 SAR</small></label></div>
        </div>
        <div class="bp-row bp-cols-2" style="margin-top:0.8rem;">
          <div class="bp-field"><label>Project / Website Title</label><input name="project_title" type="text" placeholder="For example: Senior Design Project Showcase"></div>
          <div class="bp-field"><label>Course / Department (if academic)</label><input name="project_course" type="text" placeholder="For example: CS 499 / Computer Science"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Project Description <span class="req">*</span></label><textarea required name="project_desc" placeholder="What is this site for, who uses it, and what should they find?"></textarea></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>Target Audience</label><input name="audience" type="text" placeholder="For example: instructors, recruiters, classmates, clients"></div>
          <div class="bp-field"><label>Primary Goal of the Site</label><input name="goal" type="text" placeholder="For example: present the project clearly and collect interest"></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">3</span><div><h3 class="bp-title">Structure Planning</h3><p class="bp-desc">Sections, page depth, and navigation expectations</p></div></div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>Estimated Number of Sections <span class="req">*</span></label><input required name="section_count" type="number" min="1" max="40" placeholder="For example: 6"></div>
          <div class="bp-field"><label>Estimated Pages per Section</label><input name="pages_per_section" type="number" min="1" max="30" placeholder="For example: 2"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Sections List <span class="req">*</span></label><textarea required name="sections_list" placeholder="For example: Home&#10;About&#10;Services&#10;Portfolio&#10;Contact"></textarea></div>
        </div>
        <div class="bp-summary">A section means one main top navigation item, for example: Home, About, Services, Portfolio, or Contact.</div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Navigation Notes</label><textarea name="nav_notes" placeholder="Grouping, ordering, and preferred naming (optional)"></textarea></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">4</span><div><h3 class="bp-title">Content Readiness</h3><p class="bp-desc">Current status of source material and missing items</p></div></div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Overall Content Status</label><select name="content_status"><option value="">Select...</option><option>Ready now</option><option>Partially ready</option><option>Draft exists, needs cleanup</option><option>Not started yet</option></select></div>
        </div>
        <div class="bp-choice-grid bp-cols-3">
          <div class="bp-choice"><input id="cnt_text" name="cnt_text" type="checkbox" value="Written text"><label for="cnt_text">Written Text</label></div>
          <div class="bp-choice"><input id="cnt_images" name="cnt_images" type="checkbox" value="Images / logos"><label for="cnt_images">Images / Logos</label></div>
          <div class="bp-choice"><input id="cnt_report" name="cnt_report" type="checkbox" value="Report / paper"><label for="cnt_report">Report / Paper</label></div>
          <div class="bp-choice"><input id="cnt_code" name="cnt_code" type="checkbox" value="Code / repo"><label for="cnt_code">Code / Repo</label></div>
          <div class="bp-choice"><input id="cnt_data" name="cnt_data" type="checkbox" value="Data / results"><label for="cnt_data">Data / Results</label></div>
          <div class="bp-choice"><input id="cnt_refs" name="cnt_refs" type="checkbox" value="References"><label for="cnt_refs">References</label></div>
        </div>
        <div class="bp-row bp-cols-1" style="margin-top:0.8rem;">
          <div class="bp-field"><label>Content Notes</label><textarea name="content_notes" placeholder="For example: final screenshots are ready, team bios are still being written, and the logo is available as SVG"></textarea></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">5</span><div><h3 class="bp-title">Report Options</h3><p class="bp-desc">Choose how your report or document should be shown</p></div></div>
        <div class="bp-choice-grid bp-cols-2">
          <div class="bp-choice"><input id="rep_none" name="rep_none" type="checkbox" value="No report needed"><label for="rep_none">No report needed</label></div>
          <div class="bp-choice"><input id="rep_pdf" name="rep_pdf" type="checkbox" value="Show PDF on the site"><label for="rep_pdf">Show PDF on the site</label></div>
          <div class="bp-choice"><input id="rep_hosted" name="rep_hosted" type="checkbox" value="Open report as a html page"><label for="rep_hosted">Open report as a html page</label></div>
          <div class="bp-choice"><input id="rep_download" name="rep_download" type="checkbox" value="Let visitors download the html version"><label for="rep_download">Let visitors download the html version</label></div>
        </div>
        <div class="bp-row bp-cols-1" style="margin-top:0.8rem;">
          <div class="bp-field"><label>Report Notes</label><textarea name="report_notes" placeholder="For example: I have a final Word file, I want it visible on the site, and I also want a download option"></textarea></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">6</span><div><h3 class="bp-title">Add-Ons</h3><p class="bp-desc">Optional extras and scope extensions</p></div></div>
        <div class="bp-choice-grid bp-cols-3">
          <div class="bp-choice"><input id="ao_bilingual" name="ao_bilingual" type="checkbox" value="Bilingual Setup"><label for="ao_bilingual">Bilingual Setup<small>300 SAR</small></label></div>
          <div class="bp-choice"><input id="ao_domain" name="ao_domain" type="checkbox" value="Custom Domain"><label for="ao_domain">Custom Domain Setup<small>250 SAR</small></label></div>
          <div class="bp-choice"><input id="ao_priority" name="ao_priority" type="checkbox" value="Priority Delivery"><label for="ao_priority">Priority Delivery<small>200 SAR</small></label></div>
          <div class="bp-choice"><input id="ao_monthly" name="ao_monthly" type="checkbox" value="Monthly Maintenance"><label for="ao_monthly">Monthly Maintenance<small>50 SAR</small></label></div>
          <div class="bp-choice"><input id="ao_daily" name="ao_daily" type="checkbox" value="Daily Maintenance"><label for="ao_daily">Daily Maintenance</label></div>
          <div class="bp-choice"><input id="ao_extra" name="ao_extra" type="checkbox" value="Extra Sections"><label for="ao_extra">Extra Sections<small>150 SAR per section</small></label></div>
        </div>
        <div class="bp-row bp-cols-2" style="margin-top:0.8rem;">
          <div class="bp-field"><label>Custom Domain Name (if applicable)</label><input name="custom_domain" type="text" placeholder="For example: myproject.com"></div>
          <div class="bp-field"><label>Number of Extra Sections (if applicable)</label><input name="extra_sections" type="number" min="1" max="20" placeholder="For example: 3"></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">7</span><div><h3 class="bp-title">Timeline & Design Direction</h3><p class="bp-desc">Deadline context and creative preferences</p></div></div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>Target Launch / Submission Date <span class="req">*</span></label><input required name="deadline" type="date"></div>
          <div class="bp-field"><label>Is This Deadline Fixed?</label><select name="deadline_flex"><option value="">Select...</option><option>Fixed</option><option>Flexible</option><option>Prefer earlier if possible</option></select></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Deadline Context</label><textarea name="deadline_notes" placeholder="Course submission, event launch, exam date, or other context"></textarea></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>Color Direction</label><input name="color_dir" type="text" placeholder="For example: minimal, academic, modern, premium"></div>
          <div class="bp-field"><label>Brand Colors (hex or description)</label><input name="brand_colors" type="text" placeholder="For example: #0f3d4a, #5eead4, white"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Reference Sites</label><textarea name="references" placeholder="For example: https://example.com for structure, a clean portfolio layout, and a docs-style sidebar"></textarea></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>GitHub / Portfolio Link</label><input name="portfolio_link" type="text" placeholder="For example: https://github.com/username/project"></div>
          <div class="bp-field"><label>Design Notes</label><input name="design_notes" type="text" placeholder="For example: clean typography, no heavy animations, avoid bright red"></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">8</span><div><h3 class="bp-title">Website Address & Repository</h3><p class="bp-desc">Choose how you want the site address to work</p></div></div>
        <div class="bp-choice-grid bp-cols-3">
          <div class="bp-choice"><input id="domain_free" name="domain_type" type="radio" value="Free GitHub Pages"><label for="domain_free"><strong>Free GitHub Pages</strong><small>Uses a GitHub web address, for example: username.github.io/project-name</small></label></div>
          <div class="bp-choice"><input id="domain_custom" name="domain_type" type="radio" value="Custom Domain"><label for="domain_custom"><strong>Custom Domain</strong><small>Uses your own domain, for example: myproject.com</small></label></div>
          <div class="bp-choice"><input id="domain_subdomain" name="domain_type" type="radio" value="ShougTech Subdomain"><label for="domain_subdomain"><strong>Subdomain on shoug-tech.com</strong><small>Uses a website address under my domain, for example: mylife.shoug-tech.com</small></label></div>
        </div>
        <div class="bp-row bp-cols-1" style="margin-top:0.8rem;">
          <div class="bp-field"><label>Preferred Website Address</label><input name="preferred_site_address" type="text" placeholder="For example: username.github.io/project-name, mylife.shoug-tech.com, or myproject.com"></div>
        </div>
        <div class="bp-row bp-cols-2" style="margin-top:0.8rem;">
          <div class="bp-field"><label>GitHub Username (if you have one)</label><input name="github_user" type="text" placeholder="For example: shougalomran"></div>
          <div class="bp-field"><label>Existing Repository (if applicable)</label><input name="github_repo" type="text" placeholder="For example: senior-design-site"></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">9</span><div><h3 class="bp-title">Team & Final Notes</h3><p class="bp-desc">Collaboration setup, referrals, and special constraints</p></div></div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>Solo or Team Project?</label><select name="is_team"><option value="">Select...</option><option>Solo</option><option>Team</option></select></div>
          <div class="bp-field"><label>Number of Team Members (if team)</label><input name="team_count" type="number" min="1" max="20"></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>Supervisor / Instructor (if applicable)</label><input name="supervisor" type="text" placeholder="For example: Dr. Ahmed Alharbi"></div>
          <div class="bp-field"><label>How Did You Hear About Blueprint?</label><input name="referral" type="text" placeholder="For example: Instagram, friend, university group chat"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Team Members (names and roles, one per line)</label><textarea name="team_members" placeholder="For example: Sara - UI design&#10;Omar - backend&#10;Lama - content review"></textarea></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Special Requirements or Constraints</label><textarea name="special_req" placeholder="For example: must be bilingual, ready before final presentation, and easy to update after delivery"></textarea></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>Anything Else Blueprint Should Know Before the Project Begins</label><textarea name="anything_else" placeholder="For example: the client wants a simple handoff, and final content will be approved one week before launch"></textarea></div>
        </div>
        <div class="bp-summary">By submitting, you confirm details are accurate. Final scope and pricing are confirmed in writing before implementation.</div>
      </section>

      <div class="bp-submit">
        <p class="bp-submit-note">Choose one: download as PDF for your records, add to cart if you want to continue shopping, or send directly to Blueprint.</p>
        <div class="bp-actions">
          <button class="bp-btn" type="button" onclick="bpIntakeExportPDF()">Download PDF</button>
          <button class="bp-btn" type="button" onclick="bpIntakeAddToCart()">Add to Cart</button>
          <button class="bp-btn primary" type="submit">Send to Blueprint</button>
        </div>
      </div>
      <div class="bp-status" id="bp-intake-status"></div>
    </form>
  </div>

  <script>
    (function () {
      var form = document.getElementById('bp-intake-form');
      var statusEl = document.getElementById('bp-intake-status');
      function resolveEmailEndpoint() {
        if (window.BLUEPRINT_EMAIL_ENDPOINT) return window.BLUEPRINT_EMAIL_ENDPOINT;
        var meta = document.querySelector('meta[name="blueprint-email-endpoint"]');
        if (meta && meta.content) return meta.content;
        if (window.BLUEPRINT_INTAKE_ENDPOINT) return window.BLUEPRINT_INTAKE_ENDPOINT;
        return 'https://blueprint-footer-intake-worker.shoug-alomran.workers.dev/submit';
      }

      function setStatus(type, msg) {
        statusEl.className = 'bp-status ' + type;
        statusEl.textContent = msg;
      }

      window.bpIntakeExportPDF = function () {
        window.print();
      };

      function addCartItem(item) {
        if (typeof window.cartAdd !== 'function') {
          throw new Error('Storefront cart is not available.');
        }
        window.cartAdd(item);
      }

      function pushSummaryLine(lines, label, value) {
        var text = String(value || '').trim();
        if (!text) return;
        lines.push(label + ': ' + text.replace(/\s+/g, ' '));
      }

      function getCheckedValues(fd, names) {
        return names
          .map(function (name) {
            return String(fd.get(name) || '').trim();
          })
          .filter(Boolean);
      }

      function buildProjectMeta(fd) {
        var lines = [];
        var contentAssets = getCheckedValues(fd, ['cnt_text', 'cnt_images', 'cnt_report', 'cnt_code', 'cnt_data', 'cnt_refs']);
        var reportNeeds = getCheckedValues(fd, ['rep_none', 'rep_pdf', 'rep_hosted', 'rep_download']);
        var summary = String(fd.get('project_desc') || '').trim().replace(/\s+/g, ' ');
        var briefId = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);

        pushSummaryLine(lines, 'Project', fd.get('project_title'));
        pushSummaryLine(lines, 'Tier', fd.get('tier'));
        pushSummaryLine(lines, 'Audience', fd.get('audience'));
        pushSummaryLine(lines, 'Goal', fd.get('goal'));
        pushSummaryLine(lines, 'Summary', summary.length > 180 ? summary.slice(0, 177) + '...' : summary);
        pushSummaryLine(lines, 'Sections', fd.get('section_count'));
        pushSummaryLine(lines, 'Pages per section', fd.get('pages_per_section'));
        pushSummaryLine(lines, 'Content status', fd.get('content_status'));
        if (contentAssets.length) pushSummaryLine(lines, 'Provided assets', contentAssets.join(', '));
        if (reportNeeds.length) pushSummaryLine(lines, 'Report needs', reportNeeds.join(', '));
        pushSummaryLine(lines, 'Launch date', fd.get('deadline'));
        pushSummaryLine(lines, 'Deadline flexibility', fd.get('deadline_flex'));
        pushSummaryLine(lines, 'Domain', fd.get('domain_type'));
        pushSummaryLine(lines, 'Design direction', fd.get('color_dir'));
        pushSummaryLine(lines, 'Language', fd.get('client_lang'));

        return {
          briefId: briefId,
          source: 'start-project',
          projectSummary: lines
        };
      }

      function getTierItem(fd, projectMeta) {
        var tier = fd.get('tier');
        var titles = {
          'Tier 1': 'Tier 1, Personal Presence',
          'Tier 2': 'Tier 2, Project Documentation',
          'Tier 3': 'Tier 3, Research Documentation'
        };
        var prices = {
          'Tier 1': 600,
          'Tier 2': 950,
          'Tier 3': 1400
        };

        if (!tier || !prices[tier]) {
          return null;
        }

        return {
          id: 'start-project-website-' + tier.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + projectMeta.briefId,
          title: titles[tier],
          option: 'Website Package',
          price: prices[tier],
          qty: 1,
          href: '',
          meta: projectMeta
        };
      }

      function getAddonItems(fd, projectMeta) {
        var items = [];

        if (fd.get('ao_bilingual')) {
          items.push({
            id: 'start-project-addon-bilingual-setup-' + projectMeta.briefId,
            title: 'Bilingual Setup (Arabic + English)',
            option: 'Add-On',
            price: 300,
            qty: 1,
            href: '',
            meta: projectMeta
          });
        }

        if (fd.get('ao_domain')) {
          items.push({
            id: 'start-project-addon-custom-domain-' + projectMeta.briefId,
            title: 'Custom Domain Setup',
            option: 'Add-On',
            price: 250,
            qty: 1,
            href: '',
            meta: projectMeta
          });
        }

        if (fd.get('ao_priority')) {
          items.push({
            id: 'start-project-addon-priority-delivery-' + projectMeta.briefId,
            title: 'Priority Delivery',
            option: 'Add-On',
            price: 200,
            qty: 1,
            href: '',
            meta: projectMeta
          });
        }

        if (fd.get('ao_monthly')) {
          items.push({
            id: 'start-project-addon-monthly-maintenance-' + projectMeta.briefId,
            title: 'Monthly Maintenance',
            option: 'Add-On',
            price: 50,
            qty: 1,
            href: '',
            meta: projectMeta
          });
        }

        var extraSections = Number(fd.get('extra_sections') || 0);
        if (fd.get('ao_extra') && extraSections > 0) {
          items.push({
            id: 'start-project-addon-additional-section-' + projectMeta.briefId,
            title: 'Additional Section',
            option: 'Add-On',
            price: 150,
            qty: extraSections,
            href: '',
            meta: projectMeta
          });
        }

        return items;
      }

      window.bpIntakeAddToCart = function () {
        var fd = new FormData(form);
        var projectMeta = buildProjectMeta(fd);
        var serviceItem = getTierItem(fd, projectMeta);
        var addonItems = getAddonItems(fd, projectMeta);
        var items = [];

        if (serviceItem) {
          items.push(serviceItem);
        }

        items = items.concat(addonItems);

        if (!items.length) {
          setStatus('err', 'Select a website tier or priced add-on first, then add it to cart.');
          return;
        }

        try {
          items.forEach(addCartItem);
          setStatus('ok', 'Added to cart. You can continue building the order or open the cart.');
        } catch (error) {
          setStatus('err', 'Cart is unavailable on this page.');
        }
      };

      function buildFallbackMailto(fd) {
        var lines = [];
        fd.forEach(function (value, key) {
          if (!value || key.charAt(0) === '_') return;
          lines.push(key + ': ' + value);
        });
        var subject = 'Blueprint Intake Form Submission';
        var body = lines.join('\n');
        return 'mailto:blueprint@shoug-tech.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      }

      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var fd = new FormData(form);
        setStatus('ok', 'Sending...');

        try {
          var resp = await fetch(resolveEmailEndpoint(), {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: fd
          });

          if (!resp.ok) {
            var errorMsg = 'Failed to send';
            try {
              var errorData = await resp.json();
              if (errorData && errorData.error) errorMsg = String(errorData.error);
            } catch (_) {
              try {
                var errorText = await resp.text();
                if (errorText) errorMsg = errorText;
              } catch (_) {}
            }
            throw new Error(errorMsg);
          }

          setStatus('ok', 'Submitted successfully. Blueprint will receive your intake form directly by email.');
          form.reset();
        } catch (err) {
          var mailtoUrl = buildFallbackMailto(fd);
          window.location.href = mailtoUrl;
          setStatus('err', 'Direct send was blocked. Opened your email client with the form details prefilled.');
        }
      });
    })();
  </script>
</div>
