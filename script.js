'use strict';

/* ============================================================
   DATA
   ============================================================ */


const EVENTS = [
  {
    id: 'e1',
    title: 'Full Moon Birthday Bash',
    date: 'Fri, Apr 3, 2026',
    time: '7:00 PM ET',
    location: '276 Court St, Brooklyn, NY',
    platform: 'partiful',
    thumbnail: 'https://media0.giphy.com/media/qBUOTxKwa6hhK/giphy.gif',
    url: 'https://partiful.com/e/1CERVRRWhkRWidQ6YH9i',
  },
  {
    id: 'e2',
    title: 'AI For Social Good',
    date: 'Wed, Apr 16, 2026',
    time: '8:00–10:00 PM ET',
    location: 'Collider Studio, 54 Franklin St, New York, NY',
    platform: 'luma',
    thumbnail: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/gallery-images/0n/c4b8aff1-e354-412f-847c-ce0ff6a98dab.png',
    url: 'https://lu.ma/evt-0gmzVsbpG5AFXG1',
  },
];

const PROJECTS = [
  // Working Families
  {
    id: 'p1',
    domain: 'working-families',
    title: 'Benefits Navigator Toolkit',
    description: 'A curated guide to public benefits programs — eligibility, how to apply, and how to avoid common pitfalls. Built for working families navigating complex systems.',
    url: '#',
  },
  {
    id: 'p2',
    domain: 'working-families',
    title: 'Time Tax Resource Hub',
    description: 'Resources and templates to reduce the administrative burden on low-income families — from simplifying benefit renewals to streamlining school enrollment.',
    url: '#',
  },
  {
    id: 'p3',
    domain: 'working-families',
    title: 'Local Mutual Aid Directory',
    description: 'A neighborhood-by-neighborhood directory of mutual aid groups, community fridges, and peer support networks in the Philadelphia area.',
    url: '#',
  },

  // Organizing
  {
    id: 'p4',
    domain: 'organizing',
    title: 'Voter Access Resource Guide',
    description: 'A plain-language guide to voting rights, registration deadlines, ID requirements, and early voting options — updated each election cycle.',
    url: '#',
  },
  {
    id: 'p5',
    domain: 'organizing',
    title: 'Local Volunteering Connector',
    description: 'A lightweight tool to match people with volunteer opportunities at local nonprofits, food banks, and community organizations based on skills and availability.',
    url: '#',
  },
  {
    id: 'p6',
    domain: 'organizing',
    title: 'Civic Engagement Starter Kit',
    description: 'For people who want to get more civically active but don\'t know where to start — a curated set of first steps, from attending a city council meeting to joining a neighborhood association.',
    url: '#',
  },

  // Make Love Not War
  {
    id: 'p7',
    domain: 'make-love',
    title: 'Ethical Consumption Guide',
    description: 'A practical, non-preachy guide to spending money more intentionally — from supply chain transparency to supporting worker-owned businesses.',
    url: '#',
  },
  {
    id: 'p8',
    domain: 'make-love',
    title: 'Carbon Footprint Reduction Toolkit',
    description: 'Evidence-based actions ranked by impact — focused on the highest-leverage personal and household choices, not guilt-tripping over straws.',
    url: '#',
  },
  {
    id: 'p9',
    domain: 'make-love',
    title: 'Peace & Anti-War Resource Library',
    description: 'A reading and action list for people who want to understand and oppose militarism, support conflict resolution, and find peace-building organizations to support.',
    url: '#',
  },
];

/* ============================================================
   HELPERS
   ============================================================ */

/** Escape HTML to avoid XSS when injecting user-defined strings */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   RENDER EVENTS
   ============================================================ */

function renderEvents() {
  const grid = document.querySelector('.events-grid');
  if (!grid) return;

  if (EVENTS.length === 0) {
    grid.innerHTML = '<p class="events-empty">No upcoming events.</p>';
    return;
  }

  grid.innerHTML = EVENTS.map(e => `
    <div class="event-card">
      <img class="event-thumbnail" src="${esc(e.thumbnail)}" alt="${esc(e.title)} cover" />
      <div class="event-card-body">
        <div class="event-header">
          <span class="event-title">${esc(e.title)}</span>
          <span class="platform-badge ${esc(e.platform)}">${esc(e.platform)}</span>
        </div>
        <div class="event-meta">
          <span><strong>${esc(e.date)}</strong> &middot; ${esc(e.time)}</span>
          <span>${esc(e.location)}</span>
        </div>
        <a class="event-rsvp" href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">RSVP &rarr;</a>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   RENDER PROJECTS
   ============================================================ */

function renderProjects() {
  const grids = document.querySelectorAll('.projects-grid[data-domain]');
  grids.forEach(grid => {
    const domain = grid.dataset.domain;
    const domainProjects = PROJECTS.filter(p => p.domain === domain);

    if (domainProjects.length === 0) {
      grid.innerHTML = '<p style="color:var(--gray);font-size:.9rem;padding:.5rem 0">No projects yet.</p>';
      return;
    }

    grid.innerHTML = domainProjects.map(p => {
      const action = p.url && p.url !== '#'
        ? `<a class="project-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Learn more &rarr;</a>`
        : `<span class="project-coming-soon">Coming soon</span>`;

      return `
        <div class="project-card">
          <h4 class="project-title">${esc(p.title)}</h4>
          <p class="project-description">${esc(p.description)}</p>
          ${action}
        </div>
      `.trim();
    }).join('');
  });
}

/* ============================================================
   TABS
   ============================================================ */

function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn[role="tab"]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
        const panel = document.getElementById(b.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
      });
      // Activate clicked
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const activePanel = document.getElementById(btn.getAttribute('aria-controls'));
      if (activePanel) activePanel.hidden = false;
    });
  });
}

/* ============================================================
   ACCORDIONS
   ============================================================ */

const ALLOW_MULTIPLE_OPEN = false;

function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const bodyId = header.getAttribute('aria-controls');
      const body = bodyId ? document.getElementById(bodyId) : null;

      // Close all others if single-open mode
      if (!ALLOW_MULTIPLE_OPEN) {
        headers.forEach(h => {
          if (h !== header) {
            h.setAttribute('aria-expanded', 'false');
            const otherId = h.getAttribute('aria-controls');
            const otherBody = otherId ? document.getElementById(otherId) : null;
            if (otherBody) otherBody.hidden = true;
          }
        });
      }

      // Toggle current
      const newExpanded = !isExpanded;
      header.setAttribute('aria-expanded', String(newExpanded));
      if (body) body.hidden = !newExpanded;
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  renderProjects();
  initTabs();
  initAccordions();
});
