---
title: ابدأ مشروعك
role: استقبال المشروع
scope: جمع متطلبات المشروع وتأكيد النطاق
constraints: مدخلات واضحة، مدة واقعية، التزام بنطاق المواقع الثابتة
metrics: جودة تعبئة النموذج، معدل الإرسال، سرعة بدء التنفيذ
last_updated: 2026-03-03
---

# ابدأ مشروعك

استخدم هذا النموذج لتجميع تفاصيل مشروعك وإرسالها بشكل كامل من البداية.

<div class="bp-intake" dir="rtl">
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
      direction: rtl;
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
      text-align: start;
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
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      color: #f6fffd !important;
      font-size: 1.95rem;
      font-weight: 800;
      line-height: 1.2;
      letter-spacing: 0;
    }

    .bp-intake .bp-intake-header p {
      margin: 0.5rem 0 0;
      color: rgba(240, 255, 252, 0.92);
      font-size: 1.02rem;
      line-height: 1.7;
      max-width: 74ch;
    }

    .bp-intake .bp-intake-meta {
      margin-top: 0.85rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
      font-size: 0.84rem;
      letter-spacing: 0;
      color: rgba(225, 252, 247, 0.95);
    }

    .bp-intake .bp-form { background: transparent; padding: 0 0 1.2rem; }

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

    .bp-intake .bp-title { margin: 0; font-size: 1rem; color: #0f4a53; font-weight: 700; }
    .bp-intake .bp-desc { margin: 0.1rem 0 0; color: var(--ink-light); font-size: 0.76rem; }

    .bp-intake .bp-row { display: grid; gap: 0.8rem; margin-bottom: 0.8rem; }
    .bp-intake .bp-cols-1 { grid-template-columns: 1fr; }
    .bp-intake .bp-cols-2 { grid-template-columns: 1fr 1fr; }
    .bp-intake .bp-cols-3 { grid-template-columns: 1fr 1fr 1fr; }

    .bp-intake .bp-field { display: flex; flex-direction: column; gap: 0.35rem; min-width: 0; }

    .bp-intake label {
      font-size: 0.67rem;
      letter-spacing: 0;
      color: var(--ink-light);
      font-weight: 700;
    }

    .bp-intake .req { color: var(--required); margin-inline-start: 2px; }

    .bp-intake input[type="text"],
    .bp-intake input[type="email"],
    .bp-intake input[type="tel"],
    .bp-intake input[type="number"],
    .bp-intake input[type="date"],
    .bp-intake select,
    .bp-intake textarea {
      width: 100%;
      border: 2px solid #8aa3b0;
      border-radius: 10px;
      padding: 0.72rem 0.85rem;
      font-size: 0.88rem;
      color: var(--ink);
      background: #fdfefe;
      box-shadow: inset 0 1px 2px rgba(15, 42, 52, 0.08);
      font-family: inherit;
      transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
    }

    .bp-intake input::placeholder,
    .bp-intake textarea::placeholder {
      color: #7b8d99;
    }

    .bp-intake textarea { min-height: 88px; resize: vertical; }

    .bp-intake input:focus,
    .bp-intake select:focus,
    .bp-intake textarea:focus {
      outline: none;
      border-color: #0f766e;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.2);
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
      border-right: 3px solid #0f766e;
      border-left: 0;
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

    .bp-intake .bp-actions { display: flex; flex-wrap: wrap; gap: 0.55rem; }

    .bp-intake .bp-btn {
      border: 1px solid rgba(15, 89, 101, 0.28);
      border-radius: 999px;
      padding: 0.55rem 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.96);
      color: #0f4a53;
    }

    .bp-intake .bp-btn.primary {
      background: var(--bar-gradient, linear-gradient(120deg, #0f2933, #0f3d4a, #115e59));
      border-color: rgba(15, 89, 101, 0.55);
      color: #fff;
    }

    .bp-intake .bp-status { margin: 0.6rem 1.35rem 0.8rem; border-radius: 6px; padding: 0.55rem 0.7rem; font-size: 0.8rem; display: none; }
    .bp-intake .bp-status.ok { display: block; background: rgba(14, 126, 104, 0.12); border: 1px solid rgba(14, 126, 104, 0.28); color: #0f5b4f; }
    .bp-intake .bp-status.err { display: block; background: rgba(186, 43, 43, 0.12); border: 1px solid rgba(186, 43, 43, 0.32); color: #7a1f1f; }

    @media (max-width: 900px) {
      .bp-intake .bp-cols-2,
      .bp-intake .bp-cols-3,
      .bp-intake .bp-choice-grid,
      .bp-intake .bp-choice-grid.bp-cols-3 { grid-template-columns: 1fr; }
    }
  </style>

  <div class="bp-intake-page" id="bp-intake-print-root">
    <div class="bp-intake-header">
      <h2>نموذج استقبال المشروع</h2>
      <p>عبئ النموذج قبل بدء التنفيذ حتى نثبت النطاق والمدة والمخرجات بشكل واضح.</p>
      <div class="bp-intake-meta">
        <span>بلو برنت ستوديو</span>
        <span>blueprint@shoug-tech.com</span>
        <span>blueprint.shoug-tech.com</span>
      </div>
    </div>

    <form class="bp-form" id="bp-intake-form" novalidate>
      <input type="hidden" name="_subject" value="بلو برنت Intake Form Submission">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">1</span><div><h3 class="bp-title">بيانات العميل</h3><p class="bp-desc">بيانات التواصل والتعريف الأساسية</p></div></div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>الاسم الكامل <span class="req">*</span></label><input required name="client_name" type="text"></div>
          <div class="bp-field"><label>البريد الإلكتروني <span class="req">*</span></label><input required name="client_email" type="email"></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>رقم الجوال / واتساب</label><input name="client_phone" type="tel"></div>
          <div class="bp-field"><label>الجامعة / الجهة (إن وجدت)</label><input name="client_org" type="text"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>لغة التواصل المفضلة</label><select name="client_lang"><option value="">اختر...</option><option>العربية</option><option>الإنجليزية</option><option>كلاهما</option></select></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">2</span><div><h3 class="bp-title">نوع الخدمة</h3><p class="bp-desc">اختر الخدمة التي تريد البدء بها</p></div></div>
        <div class="bp-choice-grid bp-cols-2">
          <div class="bp-choice"><input id="svc_website_ar" name="service_type" type="radio" value="Website Package"><label for="svc_website_ar">باقة موقع<small>الباقة 1 أو 2 أو 3</small></label></div>
          <div class="bp-choice"><input id="svc_cv_basic_ar" name="service_type" type="radio" value="CV Basic"><label for="svc_cv_basic_ar">قالب سيرة ذاتية, Basic<small>68 ريال</small></label></div>
          <div class="bp-choice"><input id="svc_cv_pro_ar" name="service_type" type="radio" value="CV Pro"><label for="svc_cv_pro_ar">قالب سيرة ذاتية, Pro<small>95 ريال</small></label></div>
          <div class="bp-choice"><input id="svc_cv_done_ar" name="service_type" type="radio" value="CV Already Done"><label for="svc_cv_done_ar">سيرة ذاتية جاهزة مسبقا<small>تنسيق/إعادة بناء</small></label></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">3</span><div><h3 class="bp-title">باقة الموقع وملخص المشروع</h3><p class="bp-desc">تحديد الباقة ومدخلات المشروع الأساسية</p></div></div>
        <div class="bp-choice-grid bp-cols-3">
          <div class="bp-choice"><input id="tier1_ar" name="tier" type="radio" value="Tier 1"><label for="tier1_ar">الباقة 1<small>حضور شخصي</small></label></div>
          <div class="bp-choice"><input id="tier2_ar" name="tier" type="radio" value="Tier 2"><label for="tier2_ar">الباقة 2<small>موقع نمو</small></label></div>
          <div class="bp-choice"><input id="tier3_ar" name="tier" type="radio" value="Tier 3"><label for="tier3_ar">الباقة 3<small>بناء متقدم</small></label></div>
        </div>
        <div class="bp-row bp-cols-2" style="margin-top:0.8rem;">
          <div class="bp-field"><label>عنوان المشروع / الموقع</label><input name="project_title" type="text"></div>
          <div class="bp-field"><label>المقرر / القسم (إذا كان أكاديميا)</label><input name="project_course" type="text"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>وصف المشروع <span class="req">*</span></label><textarea required name="project_desc" placeholder="ما الهدف من الموقع؟ من يستخدمه؟ وما الذي يجب أن يجده؟"></textarea></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>الجمهور المستهدف</label><input name="audience" type="text"></div>
          <div class="bp-field"><label>الهدف الرئيسي للموقع</label><input name="goal" type="text"></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">4</span><div><h3 class="bp-title">تخطيط الهيكل</h3><p class="bp-desc">الأقسام، عمق الصفحات، وتوقعات التنقل</p></div></div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>عدد الأقسام المتوقع <span class="req">*</span></label><input required name="section_count" type="number" min="1" max="40"></div>
          <div class="bp-field"><label>عدد الصفحات المتوقع لكل قسم</label><input name="pages_per_section" type="number" min="1" max="30"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>قائمة الأقسام</label><textarea name="sections_list" placeholder="كل قسم في سطر"></textarea></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>ملاحظات التنقل</label><textarea name="nav_notes" placeholder="التجميع، الترتيب، والأسماء المفضلة (اختياري)"></textarea></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">5</span><div><h3 class="bp-title">جاهزية المحتوى</h3><p class="bp-desc">حالة المواد المتوفرة وما هو الناقص</p></div></div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>الحالة العامة للمحتوى</label><select name="content_status"><option value="">اختر...</option><option>جاهز بالكامل</option><option>جاهز جزئيا</option><option>مسودة تحتاج ترتيب</option><option>لم يبدأ بعد</option></select></div>
        </div>
        <div class="bp-choice-grid bp-cols-3">
          <div class="bp-choice"><input id="cnt_text_ar" name="cnt_text" type="checkbox" value="Written text"><label for="cnt_text_ar">نصوص مكتوبة</label></div>
          <div class="bp-choice"><input id="cnt_images_ar" name="cnt_images" type="checkbox" value="Images / logos"><label for="cnt_images_ar">صور / شعارات</label></div>
          <div class="bp-choice"><input id="cnt_report_ar" name="cnt_report" type="checkbox" value="Report / paper"><label for="cnt_report_ar">تقرير / ورقة</label></div>
          <div class="bp-choice"><input id="cnt_code_ar" name="cnt_code" type="checkbox" value="Code / repo"><label for="cnt_code_ar">كود / مستودع</label></div>
          <div class="bp-choice"><input id="cnt_data_ar" name="cnt_data" type="checkbox" value="Data / results"><label for="cnt_data_ar">بيانات / نتائج</label></div>
          <div class="bp-choice"><input id="cnt_refs_ar" name="cnt_refs" type="checkbox" value="References"><label for="cnt_refs_ar">مراجع</label></div>
        </div>
        <div class="bp-row bp-cols-1" style="margin-top:0.8rem;">
          <div class="bp-field"><label>ملاحظات المحتوى</label><textarea name="content_notes" placeholder="ما المفقود؟ ما صيغة الملفات؟ وما الذي سيصل لاحقا؟"></textarea></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">6</span><div><h3 class="bp-title">إدراج التقرير</h3><p class="bp-desc">طريقة عرض التقرير أو الملف ضمن التسليم النهائي</p></div></div>
        <div class="bp-choice-grid bp-cols-2">
          <div class="bp-choice"><input id="rep_none_ar" name="rep_none" type="checkbox" value="Not applicable"><label for="rep_none_ar">غير مطلوب</label></div>
          <div class="bp-choice"><input id="rep_pdf_ar" name="rep_pdf" type="checkbox" value="Embedded PDF"><label for="rep_pdf_ar">PDF مدمج</label></div>
          <div class="bp-choice"><input id="rep_hosted_ar" name="rep_hosted" type="checkbox" value="HTML Hosted"><label for="rep_hosted_ar">HTML مستضاف</label></div>
          <div class="bp-choice"><input id="rep_download_ar" name="rep_download" type="checkbox" value="HTML Standalone"><label for="rep_download_ar">HTML مستقل</label></div>
        </div>
        <div class="bp-row bp-cols-1" style="margin-top:0.8rem;">
          <div class="bp-field"><label>ملاحظات التقرير</label><textarea name="report_notes" placeholder="مثال: ملف Word يحتاج تحويل، أو تقرير نهائي جاهز"></textarea></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">7</span><div><h3 class="bp-title">الإضافات</h3><p class="bp-desc">خيارات اختيارية وتوسعة النطاق</p></div></div>
        <div class="bp-choice-grid bp-cols-3">
          <div class="bp-choice"><input id="ao_bilingual_ar" name="ao_bilingual" type="checkbox" value="Bilingual Setup"><label for="ao_bilingual_ar">إعداد ثنائي اللغة<small>300 ريال</small></label></div>
          <div class="bp-choice"><input id="ao_domain_ar" name="ao_domain" type="checkbox" value="Custom Domain"><label for="ao_domain_ar">إعداد دومين مخصص<small>250 ريال</small></label></div>
          <div class="bp-choice"><input id="ao_priority_ar" name="ao_priority" type="checkbox" value="Priority Delivery"><label for="ao_priority_ar">تسليم مستعجل<small>200 ريال</small></label></div>
          <div class="bp-choice"><input id="ao_monthly_ar" name="ao_monthly" type="checkbox" value="Monthly Maintenance"><label for="ao_monthly_ar">صيانة شهرية</label></div>
          <div class="bp-choice"><input id="ao_daily_ar" name="ao_daily" type="checkbox" value="Daily Maintenance"><label for="ao_daily_ar">صيانة يومية</label></div>
          <div class="bp-choice"><input id="ao_extra_ar" name="ao_extra" type="checkbox" value="Extra Sections"><label for="ao_extra_ar">أقسام إضافية</label></div>
        </div>
        <div class="bp-row bp-cols-2" style="margin-top:0.8rem;">
          <div class="bp-field"><label>اسم الدومين المطلوب (إن وجد)</label><input name="custom_domain" type="text" placeholder="example.com"></div>
          <div class="bp-field"><label>عدد الأقسام الإضافية (إن وجد)</label><input name="extra_sections" type="number" min="1" max="20"></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">8</span><div><h3 class="bp-title">المدة والتوجه البصري</h3><p class="bp-desc">تفاصيل الموعد والتفضيلات التصميمية</p></div></div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>تاريخ الإطلاق / التسليم <span class="req">*</span></label><input required name="deadline" type="date"></div>
          <div class="bp-field"><label>هل الموعد ثابت؟</label><select name="deadline_flex"><option value="">اختر...</option><option>ثابت</option><option>مرن</option><option>أفضل قبل الموعد إن أمكن</option></select></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>سياق الموعد</label><textarea name="deadline_notes" placeholder="موعد تسليم أكاديمي، إطلاق عام، اختبار، أو غيره"></textarea></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>توجه الألوان</label><input name="color_dir" type="text" placeholder="هادئ، جريء، احترافي، بسيط..."></div>
          <div class="bp-field"><label>ألوان الهوية (HEX أو وصف)</label><input name="brand_colors" type="text" placeholder="#0f3d4a, #5eead4"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>مواقع مرجعية</label><textarea name="references" placeholder="روابط أو وصف مختصر للمواقع القريبة من ذوقك"></textarea></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>رابط GitHub / بورتفوليو</label><input name="portfolio_link" type="text"></div>
          <div class="bp-field"><label>ملاحظات تصميم</label><input name="design_notes" type="text" placeholder="الخطوط، أسلوب الترتيب، وما يجب تجنبه"></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">9</span><div><h3 class="bp-title">الدومين والمستودع</h3><p class="bp-desc">طريقة النشر وحالة المستودع الحالية</p></div></div>
        <div class="bp-choice-grid bp-cols-2">
          <div class="bp-choice"><input id="domain_free_ar" name="domain_type" type="radio" value="Free GitHub Pages"><label for="domain_free_ar">GitHub Pages مجاني</label></div>
          <div class="bp-choice"><input id="domain_custom_ar" name="domain_type" type="radio" value="Custom Domain"><label for="domain_custom_ar">دومين مخصص</label></div>
        </div>
        <div class="bp-row bp-cols-2" style="margin-top:0.8rem;">
          <div class="bp-field"><label>اسم مستخدم GitHub (إن وجد)</label><input name="github_user" type="text"></div>
          <div class="bp-field"><label>مستودع موجود مسبقا (إن وجد)</label><input name="github_repo" type="text"></div>
        </div>
      </section>

      <section class="bp-section">
        <div class="bp-section-label"><span class="bp-num">10</span><div><h3 class="bp-title">الفريق والملاحظات النهائية</h3><p class="bp-desc">تفاصيل التعاون، الإحالة، والمتطلبات الخاصة</p></div></div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>هل المشروع فردي أم جماعي؟</label><select name="is_team"><option value="">اختر...</option><option>فردي</option><option>جماعي</option></select></div>
          <div class="bp-field"><label>عدد أعضاء الفريق (إن كان جماعيا)</label><input name="team_count" type="number" min="1" max="20"></div>
        </div>
        <div class="bp-row bp-cols-2">
          <div class="bp-field"><label>المشرف / المدرس (إن وجد)</label><input name="supervisor" type="text"></div>
          <div class="bp-field"><label>كيف تعرفت على بلو برنت؟</label><input name="referral" type="text"></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>أسماء أعضاء الفريق وأدوارهم (كل عضو في سطر)</label><textarea name="team_members"></textarea></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>متطلبات أو قيود خاصة</label><textarea name="special_req"></textarea></div>
        </div>
        <div class="bp-row bp-cols-1">
          <div class="bp-field"><label>أي تفاصيل إضافية يجب أن يعرفها فريق بلو برنت قبل البدء</label><textarea name="anything_else"></textarea></div>
        </div>
        <div class="bp-summary">بإرسال النموذج أنت تؤكد صحة البيانات. اعتماد النطاق والسعر النهائي يتم كتابيا قبل التنفيذ.</div>
      </section>

      <div class="bp-submit">
        <p class="bp-submit-note">تقدر تحمل نسخة PDF، أو ترسل النموذج مباشرة إلى بلو برنت.</p>
        <div class="bp-actions">
          <button class="bp-btn" type="button" onclick="bpIntakeExportPDF()">تحميل PDF</button>
          <button class="bp-btn primary" type="submit">إرسال إلى بلو برنت</button>
        </div>
      </div>
      <div class="bp-status" id="bp-intake-status"></div>
    </form>
  </div>

  <script>
    (function () {
      var form = document.getElementById('bp-intake-form');
      var statusEl = document.getElementById('bp-intake-status');
      var endpoint = 'https://formsubmit.co/ajax/blueprint@shoug-tech.com';

      function setStatus(type, msg) {
        statusEl.className = 'bp-status ' + type;
        statusEl.textContent = msg;
      }

      window.bpIntakeExportPDF = function () {
        window.print();
      };

      function buildFallbackMailto(fd) {
        var lines = [];
        fd.forEach(function (value, key) {
          if (!value || key.charAt(0) === '_') return;
          lines.push(key + ': ' + value);
        });
        var subject = 'نموذج استقبال مشروع بلو برنت';
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
        setStatus('ok', 'جاري الإرسال...');

        try {
          var resp = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: fd
          });

          if (!resp.ok) {
            throw new Error('Failed to send');
          }

          setStatus('ok', 'تم الإرسال بنجاح. سيصل نموذجك مباشرة إلى بريد بلو برنت.');
          form.reset();
        } catch (err) {
          var mailtoUrl = buildFallbackMailto(fd);
          window.location.href = mailtoUrl;
          setStatus('err', 'تعذر الإرسال المباشر. تم فتح تطبيق البريد مع البيانات جاهزة للإرسال.');
        }
      });
    })();
  </script>
</div>
