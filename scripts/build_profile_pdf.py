"""Build a single all-in-one profile PDF for Rafael Schwart.

Sources merged:
  - public/llms.txt (canonical AI-agent bio)
  - C:/dev/Obsidian Vault/wiki/Biography/* (richer per-employer notes, recommenders, certs)
  - Claude memory files at ~/.claude/projects/.../memory/* (identity, professional profile)

Renders via Playwright Chromium (already installed for the NotebookLM skill).
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUT = PROJECT_ROOT / "profile" / "Rafael_Schwart_Profile.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Rafael Schwart — Compiled Profile</title>
<style>
  @page { size: Letter; margin: 0.7in; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    color: #1a1a1a;
    line-height: 1.5;
    font-size: 10.5pt;
    margin: 0;
  }
  /* Cover */
  .cover {
    page-break-after: always;
    padding: 1in 0.5in;
    text-align: center;
    background: linear-gradient(135deg, #0a2540 0%, #1d4ed8 100%);
    color: white;
    height: 9.6in;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .cover h1 { font-size: 36pt; margin: 0 0 8pt; letter-spacing: -0.5pt; }
  .cover .subtitle { font-size: 16pt; opacity: 0.95; margin-bottom: 32pt; font-weight: 300; }
  .cover .contact { font-size: 11pt; opacity: 0.9; line-height: 1.9; }
  .cover .meta {
    margin-top: 48pt;
    padding-top: 16pt;
    border-top: 1px solid rgba(255,255,255,0.3);
    font-size: 9pt;
    opacity: 0.7;
  }

  /* Body */
  h1, h2, h3, h4 { color: #0a2540; line-height: 1.25; }
  h2 {
    font-size: 18pt;
    margin: 28pt 0 8pt;
    padding-bottom: 4pt;
    border-bottom: 2px solid #1d4ed8;
  }
  h2:first-of-type { margin-top: 0; }
  h3 {
    font-size: 13pt;
    margin: 16pt 0 4pt;
    color: #1d4ed8;
  }
  h4 { font-size: 11pt; margin: 10pt 0 2pt; }
  p { margin: 6pt 0; }
  ul { margin: 4pt 0 8pt; padding-left: 18pt; }
  li { margin: 2pt 0; }
  a { color: #1d4ed8; text-decoration: none; word-break: break-word; }

  .lead { font-size: 11.5pt; color: #333; }
  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12pt;
    font-size: 9.5pt;
    color: #555;
    margin: 4pt 0 8pt;
  }
  .meta-row span::before { content: "·  "; color: #1d4ed8; font-weight: bold; }
  .meta-row span:first-child::before { content: ""; }

  .role-block {
    margin: 14pt 0 18pt;
    padding-left: 12pt;
    border-left: 3px solid #1d4ed8;
    page-break-inside: avoid;
  }
  .role-title { font-weight: 600; font-size: 12pt; color: #0a2540; }
  .role-company { color: #1d4ed8; font-weight: 500; }
  .role-meta { font-size: 9.5pt; color: #666; margin: 2pt 0 6pt; }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16pt;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12pt;
  }

  .card {
    border: 1px solid #e5e7eb;
    padding: 10pt 12pt;
    border-radius: 4pt;
    background: #fafbfc;
    page-break-inside: avoid;
  }
  .card h4 { margin-top: 0; color: #0a2540; }
  .badge {
    display: inline-block;
    background: #eff6ff;
    color: #1d4ed8;
    padding: 1pt 6pt;
    border-radius: 3pt;
    font-size: 8.5pt;
    font-weight: 500;
    margin: 1pt 2pt 1pt 0;
  }

  .tag-list { line-height: 2; }
  .source-link {
    font-size: 9pt;
    color: #555;
    word-break: break-all;
  }

  .section-page-break { page-break-before: always; }

  table { width: 100%; border-collapse: collapse; font-size: 9.5pt; margin: 6pt 0 12pt; }
  th, td { text-align: left; padding: 4pt 8pt; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  th { background: #f3f4f6; font-weight: 600; color: #0a2540; }

  footer {
    margin-top: 40pt;
    padding-top: 12pt;
    border-top: 1px solid #e5e7eb;
    font-size: 8.5pt;
    color: #888;
  }
</style>
</head>
<body>

<!-- ============== COVER ============== -->
<div class="cover">
  <h1>Rafael Schwart</h1>
  <div class="subtitle">Senior Operations Program Manager (NPI)<br/>Motorola Solutions · Miami, FL</div>
  <div class="contact">
    rafaelschwart.com<br/>
    rrgschwart@hotmail.com<br/>
    linkedin.com/in/rafaelschwart<br/>
    Born Caracas, Venezuela · January 1993 · Bilingual EN/ES
  </div>
  <div class="meta">
    Compiled profile — generated 2026-04-26<br/>
    Sources: rafaelschwart.com/llms.txt · Obsidian mind-map vault · local memory files
  </div>
</div>

<!-- ============== SUMMARY ============== -->
<h2>Professional Summary</h2>
<p class="lead">
  PMP-certified <strong>Technical Project Manager</strong> and <strong>Process Engineer</strong> with
  10+ years of experience across Consumer Electronics, Augmented Reality, Medical Devices, Robotics,
  Aerospace, and Solar Energy. Currently leading NPI operations at <strong>Motorola Solutions</strong>
  in Miami, FL.
</p>
<p>
  Expert in CAD, CAE, FEA, FMEA, GD&amp;T, and project-management tooling (ERP, PDM, PLM). Adept at
  Lean Manufacturing and Six Sigma methodologies, driving cross-functional teams to deliver
  high-performance products under tight deadlines.
</p>
<p>
  Concurrent founder/CTO across three side ventures: <strong>Tiento Labs</strong> (CTO, sports
  blockchain), <strong>Recovrz</strong> (co-founder, athletic recovery), and <strong>Earth
  Robotics</strong> (mechanical engineer, sustainable robotics).
</p>

<h3>Mission</h3>
<p>
  Passionate about leveraging technical expertise to develop cutting-edge technologies and continuously
  optimize processes.
</p>

<!-- ============== CONTACT ============== -->
<h2>Contact</h2>
<div class="grid-2">
  <div class="card">
    <h4>Public-facing</h4>
    <ul>
      <li><strong>Email:</strong> rrgschwart@hotmail.com</li>
      <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rafaelschwart/">linkedin.com/in/rafaelschwart</a></li>
      <li><strong>Website:</strong> <a href="https://rafaelschwart.com">rafaelschwart.com</a></li>
      <li><strong>Location:</strong> Miami, Florida</li>
      <li><strong>Phone:</strong> Available upon request</li>
    </ul>
  </div>
  <div class="card">
    <h4>Domain &amp; admin</h4>
    <ul>
      <li><strong>Workspace email:</strong> Hi@rafaelschwart.com</li>
      <li><strong>Domain:</strong> rafaelschwart.com (registrar: IONOS)</li>
      <li><strong>GitHub:</strong> <a href="https://github.com/rafaelschwart">github.com/rafaelschwart</a></li>
      <li><strong>Repo:</strong> rafael-schwart-bio (private)</li>
    </ul>
  </div>
</div>

<!-- ============== EDUCATION ============== -->
<h2>Education</h2>
<div class="role-block">
  <div class="role-title">Bachelor of Science (B.S.) in Mechanical Engineering</div>
  <div class="role-company">University of Miami</div>
  <div class="role-meta">2010 – 2014 · Graduated 2014</div>
  <p>Comprehensive education in Mechanical Engineering, covering CAD, FEA, and manufacturing processes.</p>
  <p class="source-link">Diploma: <a href="https://drive.google.com/file/d/1NAQa9Kw5Zhb1YZoNg6kXXUB-_FbAMNKl/view?usp=sharing">Google Drive</a></p>
</div>

<!-- ============== EXPERIENCE ============== -->
<h2 class="section-page-break">Experience (newest → oldest)</h2>

<div class="role-block">
  <div class="role-title">Senior Operations Program Manager — NPI</div>
  <div class="role-company"><a href="https://www.motorolasolutions.com">Motorola Solutions</a></div>
  <div class="role-meta">05/2024 – Present · Miami, FL · Mission-critical communications</div>
  <p>Lead cross-functional alignment across R&amp;D, Manufacturing, Logistics, and Quality to meet launch milestones for mission-critical communications systems.</p>
  <ul>
    <li>Manage CAPEX/OPEX budgets; implement PFMEA and Process Control Plans (PCP); integrate MES/MQS solutions into global supply chain operations.</li>
    <li>Apply Six Sigma and 8D methodologies to drive yield improvements and reduce defect rates.</li>
    <li>Coordinate contract manufacturers (Sanmina Penang, BCM) through pilot builds, ramp-ups, fixture validations, and supply chain escalations.</li>
  </ul>
</div>

<div class="role-block">
  <div class="role-title">Senior Manufacturing Engineer — NPI</div>
  <div class="role-company"><a href="https://www.magicleap.com">Magic Leap</a></div>
  <div class="role-meta">01/03/2023 – 05/24/2024 · Plantation, FL · Augmented Reality</div>
  <p>Boosted production efficiency by <strong>15%</strong> through MES analytics, Gauge R&amp;R studies, and cleanroom optimization for next-generation AR optical devices.</p>
  <ul>
    <li>Developed PFMEA libraries and implemented manufacturing stability protocols for AR devices.</li>
    <li>Conducted design-for-manufacturability reviews; trained production teams to ensure scalability.</li>
    <li>Established cleanroom protocols and optimized PFMEAs.</li>
    <li>Cross-functional partnership with Design Engineering, Manufacturing, Quality, and Operations.</li>
  </ul>
  <p class="source-link">Employment verification: <a href="https://drive.google.com/file/d/1oY8w8qy4pr_gRZ5gEVyl1lWRRQMqjWaK/view?usp=drive_link">Google Drive letter</a></p>
</div>

<div class="role-block">
  <div class="role-title">Senior Manufacturing Engineer — Robotics</div>
  <div class="role-company"><a href="https://www.stryker.com">Stryker</a></div>
  <div class="role-meta">01/2020 – 01/2023 · Fort Lauderdale, FL · Surgical robotics</div>
  <p>Enhanced robotic assembly processes through MAPs redesign and SolidWorks simulation for high-precision surgical robotics.</p>
  <ul>
    <li>Led Kaizen / 6S initiatives; ensured compliance with PPAP and supplier quality standards (SICR).</li>
    <li>Closed NC/CAPA issues; supported critical debug/rebuild operations.</li>
    <li>Improved robotic assembly through MAPs and SolidWorks-based process redesign.</li>
  </ul>
  <p><strong>HR-verified skills:</strong> CAD–PTC Creo · Lean &amp; Six Sigma · Project Management, WBS, Risk Mitigation · PFMEA · PCP · Statistical Analysis · RCA · Pareto · 8D</p>
  <p class="source-link">Employment verification: <a href="https://drive.google.com/file/d/1G2VtB20hJUGoyxSDWz53OtADO1Pk8x2S/view?usp=drive_link">Google Drive letter</a></p>
</div>

<div class="role-block">
  <div class="role-title">Mechanical Engineer — Test Engineering &amp; Automation</div>
  <div class="role-company"><a href="https://www.gableseng.com">Gables Engineering</a></div>
  <div class="role-meta">07/24/2017 – 08/14/2019 · Coral Gables, FL · Aerospace (Boeing avionics)</div>
  <p>Designed automated fixtures <strong>reducing test cycle times by &gt;50%</strong> for Boeing avionics.</p>
  <ul>
    <li>Deployed a PDM system improving ECN/ECO workflows and reducing design cycle times.</li>
    <li>Implemented automation solutions for aerospace test equipment.</li>
    <li>Streamlined manufacturing processes through innovative fixture design.</li>
    <li>Created quality assurance manuals and operator guides for aerospace systems.</li>
  </ul>
  <p class="source-link">Employment verification: <a href="https://drive.google.com/file/d/1xa-fAODnaGyCMsBTxdrShp0ZvehnaXo1/view?usp=drive_link">Google Drive letter</a></p>
</div>

<div class="role-block">
  <div class="role-title">Mechanical Design Engineer</div>
  <div class="role-company"><a href="https://robotray.com">Robotray</a></div>
  <div class="role-meta">11/2017 – 07/2018 · Miami, FL · Food-processing automation</div>
  <p>Designed automation systems and CNC programs for high-speed bakery and packaging equipment.</p>
  <ul>
    <li>Optimized material usage through FEA analysis.</li>
    <li>Introduced SolidWorks PDM for design version control.</li>
    <li>Developed high-performance automation solutions for the food processing industry.</li>
  </ul>
</div>

<div class="role-block">
  <div class="role-title">Mechanical Engineer — Solar Tracker Systems</div>
  <div class="role-company"><a href="https://www.terrasmart.com">TerraSmart</a></div>
  <div class="role-meta">03/2017 – 10/2017 · Naples, FL · Solar / renewables</div>
  <p>Modeled solar tracking structures, providing casting/welding process improvements for utility-scale deployments.</p>
  <ul>
    <li>Designed and optimized solar tracking systems for large-scale installations.</li>
    <li>Improved manufacturing processes for renewable energy infrastructure.</li>
    <li>Contributed to utility-scale solar energy projects.</li>
  </ul>
</div>

<div class="role-block">
  <div class="role-title">Mechanical Design Engineer</div>
  <div class="role-company"><a href="https://piece-makers.com/">Piece-makers LLC</a></div>
  <div class="role-meta">12/2016 – 03/2017 · Miami, FL · Aerospace fixtures &amp; R&amp;D</div>
  <p>Designed aerospace test fixtures, performed R&amp;D prototyping, and supported CAM programming for manufacturing bids.</p>
</div>

<div class="role-block">
  <div class="role-title">Mechanical Design Engineer</div>
  <div class="role-company"><a href="https://www.promptaero.com/">Prompt Aero Services</a></div>
  <div class="role-meta">01/2016 – 11/2016 · Miami, FL · Aerospace (FAA-regulated)</div>
  <p>Developed FAA-compliant aerospace fixtures and validated designs using FEA and CFD.</p>
</div>

<div class="role-block">
  <div class="role-title">Mechanical Design Engineer <em>(first post-graduation role)</em></div>
  <div class="role-company"><a href="https://www.generalmroaerospace.com/">General MRO Aerospace Inc.</a></div>
  <div class="role-meta">05/2014 – 12/2015 · Miami, FL · Aerospace MRO</div>
  <p>Designed and built large-scale structural load fixtures for aerospace clients. Improved NDT and plating processes through engineering-led optimizations.</p>
</div>

<!-- ============== SKILLS ============== -->
<h2 class="section-page-break">Skills</h2>
<div class="grid-3">
  <div class="card">
    <h4>Technical</h4>
    <p class="tag-list">
      <span class="badge">CAD</span><span class="badge">CAE</span><span class="badge">FEA</span>
      <span class="badge">FMEA</span><span class="badge">GD&amp;T</span><span class="badge">ERP</span>
      <span class="badge">PDM</span><span class="badge">PLM</span><span class="badge">Lean Mfg</span>
      <span class="badge">Six Sigma</span><span class="badge">SolidWorks</span>
      <span class="badge">Inventor</span><span class="badge">PTC Creo</span>
      <span class="badge">Mastercam</span><span class="badge">MES Analytics</span>
    </p>
  </div>
  <div class="card">
    <h4>Management</h4>
    <p class="tag-list">
      <span class="badge">Project Management</span><span class="badge">Process Eng</span>
      <span class="badge">Cross-functional</span><span class="badge">NPI Ops</span>
      <span class="badge">CAPEX/OPEX</span><span class="badge">Quality Control</span>
      <span class="badge">WBS</span><span class="badge">Risk Mitigation</span>
      <span class="badge">8D</span><span class="badge">RCA</span>
      <span class="badge">Pareto</span><span class="badge">Stat Analysis</span>
    </p>
  </div>
  <div class="card">
    <h4>Industries</h4>
    <p class="tag-list">
      <span class="badge">Consumer Electronics</span><span class="badge">Augmented Reality</span>
      <span class="badge">Medical Devices</span><span class="badge">Robotics</span>
      <span class="badge">Aerospace</span><span class="badge">Solar Energy</span>
      <span class="badge">Food-Processing Automation</span>
    </p>
  </div>
</div>

<!-- ============== CERTIFICATIONS ============== -->
<h2>Certifications</h2>
<table>
  <thead><tr><th>Credential</th><th>Issuer</th><th>Status</th><th>Verification</th></tr></thead>
  <tbody>
    <tr>
      <td><strong>Project Management Professional (PMP)</strong></td>
      <td>Project Management Institute (PMI)</td>
      <td>Certified</td>
      <td><a href="https://www.credly.com/badges/f6c6c143-768b-4b63-836a-ca062b99639a">Credly badge</a> ·
          <a href="https://drive.google.com/file/d/1JKohOdgfwKokcy-hL8WHf0pze3dp6vX-/view?usp=sharing">Diploma</a></td>
    </tr>
    <tr>
      <td><strong>Six Sigma Green Belt</strong></td>
      <td>ASQ (American Society for Quality)</td>
      <td>Certified</td>
      <td><a href="https://drive.google.com/file/d/1fIUGdS8duNPwlG2wxCVrj9yv7frJTR7j/view?usp=sharing">Diploma</a></td>
    </tr>
    <tr>
      <td><strong>Agile Foundations</strong></td>
      <td>Professional Development</td>
      <td>Certified</td>
      <td>—</td>
    </tr>
    <tr>
      <td><strong>B.S. Mechanical Engineering</strong></td>
      <td>University of Miami</td>
      <td>Graduated 2014</td>
      <td><a href="https://drive.google.com/file/d/1NAQa9Kw5Zhb1YZoNg6kXXUB-_FbAMNKl/view?usp=sharing">Diploma</a></td>
    </tr>
  </tbody>
</table>

<!-- ============== SIDE PROJECTS ============== -->
<h2>Side Projects (concurrent with day job)</h2>

<div class="role-block">
  <div class="role-title">Chief Technology Officer</div>
  <div class="role-company"><a href="https://www.tientolabs.com">Tiento Labs</a></div>
  <div class="role-meta">Blockchain · Sports tech</div>
  <p>Blockchain platform that tokenizes football-player formation rights and provides verified scouting data, connecting fans with professional football talent.</p>
  <ul>
    <li>Architect blockchain infrastructure for tokenizing player formation rights.</li>
    <li>Develop secure platforms for fan investment in professional football players.</li>
    <li>Build verification systems for player stats and scouting data using blockchain.</li>
    <li>Lead technical team in creating scalable solutions; implement smart contracts and decentralized systems for sports investment.</li>
  </ul>
</div>

<div class="role-block">
  <div class="role-title">Co-Founder</div>
  <div class="role-company"><a href="https://www.recovrz.com">Recovrz</a></div>
  <div class="role-meta">Athletic recovery · Consumer brand</div>
  <p>Athletic recovery company providing next-generation solutions to help athletes recover better and reach new performance heights.</p>
  <ul>
    <li>Develop and market advanced recovery products including nose strips for improved breathing during recovery.</li>
    <li>Create comprehensive recovery bundles for optimal performance enhancement.</li>
    <li>Target both professional and amateur athletes seeking recovery solutions.</li>
  </ul>
</div>

<div class="role-block">
  <div class="role-title">Mechanical Engineer</div>
  <div class="role-company"><a href="https://www.earthrobotics.co/">Earth Robotics</a></div>
  <div class="role-meta">Sustainable robotics · Environmental monitoring</div>
  <p>Sustainable robotics solutions for environmental applications.</p>
  <ul>
    <li>Design and develop robotic systems for environmental monitoring and sustainability.</li>
    <li>Perform structural analysis and optimization using CAD/FEA tools.</li>
    <li>Collaborate on mechatronic integration and sensor deployment; support field testing and validation of robotic platforms.</li>
  </ul>
</div>

<!-- ============== RECOMMENDATIONS ============== -->
<h2 class="section-page-break">Professional References</h2>
<p>Four references on file from Rafael's tenure at Stryker (Senior Manufacturing Engineer — Robotics, 2020–2023):</p>
<table>
  <thead><tr><th>Recommender</th><th>Title at Stryker</th><th>Letter</th></tr></thead>
  <tbody>
    <tr><td><strong>Jose Gibaja</strong></td><td>Principal Engineer</td>
        <td><a href="https://drive.google.com/file/d/1gsqFCu4JNY6-6nbR1ym2mCNjVzYt-fWF/view?usp=drive_link">Google Drive</a></td></tr>
    <tr><td><strong>Joe Zeichmann</strong></td><td>Senior Staff Engineer</td>
        <td><a href="https://drive.google.com/file/d/12BXRuEfVv9GFW5c1fcSluN-37kefTSYz/view?usp=drive_link">Google Drive</a></td></tr>
    <tr><td><strong>Melody Chan</strong></td><td>Project Manager</td>
        <td><a href="https://drive.google.com/file/d/1EyDO2Iokxw6xLZIG26hUYYUY6n0iLzWU/view?usp=drive_link">Google Drive</a></td></tr>
    <tr><td><strong>Alan Fitzpatrick</strong></td><td>Manufacturing Manager</td>
        <td><a href="https://drive.google.com/file/d/1UhJ70FumtafzIgLPVOQGZjqzQkGQhoNs/view?usp=drive_link">Google Drive</a></td></tr>
  </tbody>
</table>

<!-- ============== EMPLOYMENT VERIFICATION ============== -->
<h2>Employment Verification (official letters)</h2>
<table>
  <thead><tr><th>Employer</th><th>Title(s)</th><th>Period</th><th>Letter</th></tr></thead>
  <tbody>
    <tr><td><strong>Magic Leap, Inc.</strong></td><td>Senior Manufacturing Engineer (NPI)</td>
        <td>01/03/2023 – 05/24/2024</td>
        <td><a href="https://drive.google.com/file/d/1oY8w8qy4pr_gRZ5gEVyl1lWRRQMqjWaK/view?usp=drive_link">Google Drive</a></td></tr>
    <tr><td><strong>Stryker Corporation</strong></td>
        <td>Senior Engineer (Sustaining); Senior Manufacturing Engineer (Robotics)</td>
        <td>02/17/2020 – 12/28/2022</td>
        <td><a href="https://drive.google.com/file/d/1G2VtB20hJUGoyxSDWz53OtADO1Pk8x2S/view?usp=drive_link">Google Drive</a></td></tr>
    <tr><td><strong>Gables Engineering, Inc.</strong></td>
        <td>Mechanical Engineer, Automation &amp; Test Engineering</td>
        <td>07/24/2017 – 08/14/2019</td>
        <td><a href="https://drive.google.com/file/d/1xa-fAODnaGyCMsBTxdrShp0ZvehnaXo1/view?usp=drive_link">Google Drive</a></td></tr>
  </tbody>
</table>

<!-- ============== RESUME ============== -->
<h2>Resume</h2>
<p>Latest resume PDF (hosted on Google Drive, linked from the live website):</p>
<p><a href="https://drive.google.com/file/d/1yhTym6ORlev6c89RBAvwhabD7aFD7R2K/view?usp=drive_link">Resume — Google Drive</a></p>

<!-- ============== SECTION URLS ============== -->
<h2>Live Website Sections</h2>
<table>
  <thead><tr><th>Section</th><th>URL</th></tr></thead>
  <tbody>
    <tr><td>About</td><td><a href="https://rafaelschwart.com/about">rafaelschwart.com/about</a></td></tr>
    <tr><td>Experience</td><td><a href="https://rafaelschwart.com/experience">rafaelschwart.com/experience</a></td></tr>
    <tr><td>Skills</td><td><a href="https://rafaelschwart.com/skills">rafaelschwart.com/skills</a></td></tr>
    <tr><td>Certifications</td><td><a href="https://rafaelschwart.com/certifications">rafaelschwart.com/certifications</a></td></tr>
    <tr><td>Projects</td><td><a href="https://rafaelschwart.com/projects">rafaelschwart.com/projects</a></td></tr>
    <tr><td>Recommendations</td><td><a href="https://rafaelschwart.com/recommendations">rafaelschwart.com/recommendations</a></td></tr>
    <tr><td>Employment Verification</td><td><a href="https://rafaelschwart.com/employment-verification">rafaelschwart.com/employment-verification</a></td></tr>
    <tr><td>Contact</td><td><a href="https://rafaelschwart.com/contact">rafaelschwart.com/contact</a></td></tr>
    <tr><td>AI-agent bio</td><td><a href="https://rafaelschwart.com/llms.txt">rafaelschwart.com/llms.txt</a></td></tr>
  </tbody>
</table>

<footer>
  <strong>About this document.</strong> Compiled by Claude on 2026-04-26 from three local sources:
  (1) <code>public/llms.txt</code> — the canonical AI-agent bio shipped with the site;
  (2) the <code>C:/dev/Obsidian Vault/wiki/Biography/</code> master vault — richer per-employer notes, recommenders,
  certifications, and side projects (gitignored, lives only on this machine);
  (3) Claude's persistent memory files at
  <code>~/.claude/projects/c--dev-rafael-schwart-bio/memory/</code>.
  Generated via Playwright + Chromium. No external network calls were made; all content originated
  on this machine.
</footer>

</body>
</html>
"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_content(HTML, wait_until="domcontentloaded")
    page.emulate_media(media="print")
    page.pdf(
        path=str(OUT),
        format="Letter",
        print_background=True,
        margin={"top": "0.7in", "right": "0.7in", "bottom": "0.7in", "left": "0.7in"},
    )
    browser.close()

print(f"PDF written to: {OUT}")
print(f"Size: {OUT.stat().st_size / 1024:.1f} KB")
