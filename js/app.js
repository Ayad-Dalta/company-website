/**
 * ApexBridge Engineering & Materials - Core Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  renderServices();
  renderMosulDamSection();
  renderPortfolio();
  renderTestimonials();
  renderFAQ();
  initConsultationForm();
  initToastContainer();
});

/* ==========================================================================
   Theme Manager
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('apex_theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('apex_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} theme mode`, 'info');
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggleBtn i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

/* ==========================================================================
   Mobile Drawer & Navigation
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  function openDrawer() {
    if (mobileNavDrawer) mobileNavDrawer.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
  }

  function closeDrawer() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function initToastContainer() {
  if (!document.getElementById('toastContainer')) {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer') || document.body;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-circle-check';
  if (type === 'info') icon = 'fa-circle-info';
  if (type === 'warning') icon = 'fa-triangle-exclamation';
  if (type === 'danger') icon = 'fa-circle-xmark';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   Render Services & Dynamic Service Inspection Modal
   ========================================================================== */
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid || !APEX_DATA.services) return;

  grid.innerHTML = APEX_DATA.services.map(svc => `
    <div class="service-card">
      <div class="service-icon">
        <i class="fa-solid ${svc.icon}"></i>
      </div>
      <h3>${svc.title}</h3>
      <p>${svc.shortDesc}</p>
      <ul class="service-deliverables">
        ${svc.deliverables.map(d => `<li><i class="fa-solid fa-check"></i> ${d}</li>`).join('')}
      </ul>
      <button class="btn btn-secondary btn-sm" onclick="openServiceDetailsModal('${svc.id}')">
        <i class="fa-solid fa-arrow-right"></i> View Service Scope
      </button>
    </div>
  `).join('');
}

function openServiceDetailsModal(serviceId) {
  const svc = APEX_DATA.services.find(s => s.id === serviceId);
  if (!svc) return;

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBox = document.getElementById('modalContent');
  if (!modalBackdrop || !modalBox) return;

  modalBox.innerHTML = `
    <button class="modal-close" onclick="closeGlobalModal()"><i class="fa-solid fa-xmark"></i></button>
    <div style="margin-bottom: 1.5rem; text-align: center;">
      <div class="service-icon" style="margin: 0 auto 1rem auto;">
        <i class="fa-solid ${svc.icon}"></i>
      </div>
      <h2 style="font-size: 1.75rem;">${svc.title}</h2>
    </div>
    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${svc.fullDesc}</p>
    <h4 style="margin-bottom: 0.75rem; color: var(--brand-orange);">Key Deliverables & Accreditation:</h4>
    <ul class="service-deliverables" style="margin-bottom: 2rem;">
      ${svc.deliverables.map(d => `<li style="font-size: 1rem;"><i class="fa-solid fa-shield-halved"></i> ${d}</li>`).join('')}
    </ul>
    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button class="btn btn-secondary" onclick="closeGlobalModal()">Close</button>
      <button class="btn btn-primary" onclick="closeGlobalModal(); openConsultationModal('${svc.title}')">
        <i class="fa-solid fa-calendar-check"></i> Book Consultation
      </button>
    </div>
  `;

  modalBackdrop.classList.add('active');
}

function closeGlobalModal() {
  const modalBackdrop = document.getElementById('modalBackdrop');
  if (modalBackdrop) modalBackdrop.classList.remove('active');
}

/* ==========================================================================
   Render Portfolio & Testimonials & FAQ
   ========================================================================== */
function renderPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  if (!grid || !APEX_DATA.portfolio) return;

  grid.innerHTML = APEX_DATA.portfolio.map(item => `
    <div class="portfolio-card">
      <img src="${item.image}" alt="${item.title}" class="portfolio-img" loading="lazy">
      <div class="portfolio-content">
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--brand-cyan); margin-bottom: 0.5rem; font-weight: 600;">
          <span><i class="fa-solid fa-location-dot"></i> ${item.location}</span>
          <span>Completed ${item.yearCompleted}</span>
        </div>
        <h3>${item.title}</h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">${item.summary}</p>
        <div style="background: var(--bg-surface); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.85rem;">
          <strong>Span:</strong> ${item.spanLength} | <strong>Type:</strong> ${item.bridgeType}
        </div>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid || !APEX_DATA.testimonials) return;

  grid.innerHTML = APEX_DATA.testimonials.map(t => `
    <div class="service-card" style="padding: 2rem;">
      <div style="display: flex; items-center; gap: 1rem; margin-bottom: 1.25rem;">
        <img src="${t.avatar}" alt="${t.name}" style="width: 54px; height: 54px; border-radius: 50%; object-fit: cover; border: 2px solid var(--brand-orange);">
        <div>
          <h4 style="font-size: 1.1rem; margin: 0;">${t.name}</h4>
          <p style="font-size: 0.85rem; color: var(--brand-cyan); margin: 0;">${t.role}</p>
        </div>
      </div>
      <p style="font-style: italic; color: var(--text-secondary); font-size: 0.95rem;">"${t.quote}"</p>
    </div>
  `).join('');
}

function renderFAQ() {
  const container = document.getElementById('faqContainer');
  if (!container || !APEX_DATA.faq) return;

  container.innerHTML = APEX_DATA.faq.map((item, idx) => `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 1rem; overflow: hidden;">
      <button onclick="toggleFAQ(${idx})" style="width: 100%; text-align: left; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 1.05rem;">
        <span><i class="fa-solid fa-circle-question" style="color: var(--brand-orange); margin-right: 0.75rem;"></i> ${item.q}</span>
        <i id="faqIcon-${idx}" class="fa-solid fa-chevron-down" style="transition: transform 0.3s ease;"></i>
      </button>
      <div id="faqAnswer-${idx}" style="display: none; padding: 0 1.5rem 1.25rem 1.5rem; color: var(--text-secondary); font-size: 0.95rem; border-top: 1px solid var(--border-color);">
        ${item.a}
      </div>
    </div>
  `).join('');
}

function toggleFAQ(idx) {
  const ans = document.getElementById(`faqAnswer-${idx}`);
  const icon = document.getElementById(`faqIcon-${idx}`);
  if (!ans || !icon) return;

  if (ans.style.display === 'none') {
    ans.style.display = 'block';
    icon.style.transform = 'rotate(180deg)';
  } else {
    ans.style.display = 'none';
    icon.style.transform = 'rotate(0deg)';
  }
}

/* ==========================================================================
   Consultation Booking Modal & RFQ Form
   ========================================================================== */
function openConsultationModal(presetService = '') {
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBox = document.getElementById('modalContent');
  if (!modalBackdrop || !modalBox) return;

  modalBox.innerHTML = `
    <button class="modal-close" onclick="closeGlobalModal()"><i class="fa-solid fa-xmark"></i></button>
    <div style="margin-bottom: 1.5rem;">
      <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-handshake" style="color: var(--brand-orange);"></i> Engineering Consultation Request</h2>
      <p style="color: var(--text-secondary); font-size: 0.95rem;">Connect with our licensed structural engineers (PE/SE) for project feasibility, FEA stress modeling, or custom material quotes.</p>
    </div>
    <form id="consultationForm" onsubmit="handleConsultationSubmit(event)">
      <div class="form-group">
        <label>Full Name / Principal Lead</label>
        <input type="text" class="form-control" required placeholder="e.g. Eng. Sarah Jenkins">
      </div>
      <div class="form-group">
        <label>Organization / Department of Transportation</label>
        <input type="text" class="form-control" required placeholder="e.g. Pacific Infrastructure DOT">
      </div>
      <div class="form-group">
        <label>Service Area Required</label>
        <select class="form-control" id="consultServiceSelect">
          <option value="Structural FEA Analysis" ${presetService.includes('Structural') ? 'selected' : ''}>Structural FEA & Dynamic Wind Modeling</option>
          <option value="Geotechnical Pier Design" ${presetService.includes('Geotechnical') ? 'selected' : ''}>Geotechnical & Deep Foundation Design</option>
          <option value="Cable-Stayed Engineering" ${presetService.includes('Cable') ? 'selected' : ''}>Cable-Stayed & Suspension Towers</option>
          <option value="Bridge Rehabilitation" ${presetService.includes('Rehabilitation') ? 'selected' : ''}>Bridge Rehabilitation & NDT Testing</option>
          <option value="Custom Steel Fabrication" ${presetService.includes('Fabrication') ? 'selected' : ''}>Custom Steel Fabrication & QC Oversight</option>
        </select>
      </div>
      <div class="form-group">
        <label>Bridge Span Length & Project Scope Details</label>
        <textarea class="form-control" rows="3" required placeholder="Describe span length, expected load capacity, location, or specific ASTM steel grades..."></textarea>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem;">
        <button type="button" class="btn btn-secondary" onclick="closeGlobalModal()">Cancel</button>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> Submit Engineering RFQ</button>
      </div>
    </form>
  `;

  modalBackdrop.classList.add('active');
}

function handleConsultationSubmit(e) {
  e.preventDefault();
  closeGlobalModal();
  showToast('RFQ & Consultation submitted! A senior PE/SE engineer will contact you within 24 hours.', 'success');
}

/* ==========================================================================
   Mosul Dam Mega-Project Renderer
   ========================================================================== */
function renderMosulDamSection() {
  const container = document.getElementById('mosulDamContainer');
  if (!container || !APEX_DATA.mosulDamProject) return;

  const m = APEX_DATA.mosulDamProject;

  container.innerHTML = `
    <div class="mosul-card-wrapper">
      <div class="mosul-grid">
        <div class="mosul-content">
          <div class="section-tag" style="background: rgba(0, 240, 255, 0.12); color: var(--brand-cyan); border-color: rgba(0, 240, 255, 0.3);">
            <i class="fa-solid fa-water"></i> FEATURED MEGA-PROJECT SPOTLIGHT
          </div>
          <h2 style="font-size: 2.25rem; margin-bottom: 0.5rem;">${m.title}</h2>
          <p style="color: var(--brand-orange); font-weight: 600; margin-bottom: 1.25rem; font-size: 1.1rem;">
            <i class="fa-solid fa-location-dot"></i> ${m.location}
          </p>
          <p style="color: var(--text-secondary); margin-bottom: 1.75rem; font-size: 1.05rem; line-height: 1.7;">
            ${m.overview}
          </p>

          <!-- Key Metrics Badges -->
          <div class="mosul-stats-grid">
            <div class="mosul-stat-box">
              <span class="mosul-stat-val">${m.damHeight}</span>
              <span class="mosul-stat-lbl">Dam Height</span>
            </div>
            <div class="mosul-stat-box">
              <span class="mosul-stat-val">${m.crestLength}</span>
              <span class="mosul-stat-lbl">Crest Length</span>
            </div>
            <div class="mosul-stat-box">
              <span class="mosul-stat-val">${m.reservoirCapacity}</span>
              <span class="mosul-stat-lbl">Reservoir Volume</span>
            </div>
            <div class="mosul-stat-box">
              <span class="mosul-stat-val">${m.protectedPopulation}</span>
              <span class="mosul-stat-lbl">Population Protected</span>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem;">
            <button class="btn btn-primary" onclick="openMosulDamModal()">
              <i class="fa-solid fa-file-pdf"></i> View Technical Case Study & Specs
            </button>
            <button class="btn btn-secondary" onclick="openConsultationModal('Mosul Dam Geotechnical Scope')">
              <i class="fa-solid fa-handshake"></i> Consult on Similar Hydro Projects
            </button>
          </div>
        </div>

        <div class="mosul-visual">
          <div class="mosul-img-wrapper">
            <img src="${m.image}" alt="${m.title}" loading="lazy">
            <div class="mosul-overlay-badge">
              <i class="fa-solid fa-shield-halved" style="color: var(--brand-teal); font-size: 1.5rem;"></i>
              <div>
                <strong style="display: block; font-size: 0.95rem;">Karst Geotechnical Grouting</strong>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">240m Continuous Grout Curtain</span>
              </div>
            </div>
          </div>

          <!-- Hydro Services Grid -->
          <div class="mosul-services-mini">
            ${m.keyServices.map(s => `
              <div class="mosul-service-item">
                <i class="fa-solid ${s.icon}"></i>
                <div>
                  <strong>${s.title}</strong>
                  <p>${s.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function openMosulDamModal() {
  const m = APEX_DATA.mosulDamProject;
  if (!m) return;

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBox = document.getElementById('modalContent');
  if (!modalBackdrop || !modalBox) return;

  modalBox.innerHTML = `
    <button class="modal-close" onclick="closeGlobalModal()"><i class="fa-solid fa-xmark"></i></button>
    <div style="margin-bottom: 1.5rem;">
      <span class="section-tag" style="font-size: 0.75rem; padding: 0.25rem 0.75rem;"><i class="fa-solid fa-water"></i> GEOTECHNICAL CASE STUDY</span>
      <h2 style="font-size: 1.6rem; margin-top: 0.5rem; margin-bottom: 0.35rem;">${m.title}</h2>
      <p style="color: var(--brand-cyan); font-weight: 600; font-size: 0.9rem;">${m.location} | Project Value: ${m.budget}</p>
    </div>
    
    <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6;">${m.overview}</p>

    <h4 style="color: var(--brand-orange); margin-bottom: 0.75rem;"><i class="fa-solid fa-boxes-packing"></i> Certified Materials & Engineering Quantities Shipped</h4>
    <ul class="service-deliverables" style="margin-bottom: 1.5rem; background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      ${m.materialsDelivered.map(item => `<li style="font-size: 0.9rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-circle-check" style="color: var(--brand-teal);"></i> ${item}</li>`).join('')}
    </ul>

    <h4 style="color: var(--brand-cyan); margin-bottom: 0.75rem;"><i class="fa-solid fa-chart-line"></i> Safety & Real-Time Monitoring Protocols</h4>
    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">ApexBridge implemented non-stop 24/7 piezometric pore-pressure sensing arrays and satellite synthetic aperture radar (InSAR) differential interferometry to monitor sinkhole formation risk in real-time.</p>

    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button class="btn btn-secondary" onclick="closeGlobalModal()">Close</button>
      <button class="btn btn-primary" onclick="closeGlobalModal(); openConsultationModal('Mosul Dam Grouting')">
        <i class="fa-solid fa-calendar-check"></i> Book Engineering Consultation
      </button>
    </div>
  `;

  modalBackdrop.classList.add('active');
}

