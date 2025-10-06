import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePortfolioPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Rafael Schwart', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('PMP-Certified Technical Project Manager & Process Engineer', margin, yPosition);
  yPosition += 8;
  doc.text('Miami, FL | Born: January 1993, Caracas, Venezuela', margin, yPosition);
  yPosition += 6;
  doc.setTextColor(0, 119, 181);
  doc.textWithLink('linkedin.com/in/rafaelschwart', margin, yPosition, { url: 'https://www.linkedin.com/in/rafaelschwart/' });
  doc.setTextColor(0, 0, 0);
  yPosition += 6;
  doc.text('rrgschwart@hotmail.com', margin, yPosition);
  yPosition += 15;

  // Professional Summary
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Professional Summary', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summaryText = '10+ years of experience across Consumer Electronics, AR, Medical Devices, Robotics, Aerospace, and Solar Energy. Expert in CAD, CAE, FEA, FMEA, GD&T, ERP, PDM, PLM. Skilled in Lean Manufacturing, Six Sigma, Agile, and cross-functional leadership. Focus on driving innovation, operational excellence, and process optimization.';
  const summaryLines = doc.splitTextToSize(summaryText, pageWidth - 2 * margin);
  doc.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * 5 + 10;

  // Education
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Education', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('B.S. Mechanical Engineering', margin, yPosition);
  yPosition += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('University of Miami, 2014', margin, yPosition);
  yPosition += 12;

  // Certifications
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Certifications', margin, yPosition);
  yPosition += 8;

  const certifications = [
    'Project Management Professional (PMP) - PMI',
    'Six Sigma Green Belt - ASQ',
    'Agile Foundations'
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  certifications.forEach(cert => {
    doc.text(`• ${cert}`, margin, yPosition);
    yPosition += 6;
  });
  yPosition += 8;

  // Add new page for experience
  doc.addPage();
  yPosition = 20;

  // Experience Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Professional Experience', margin, yPosition);
  yPosition += 10;

  const experiences = [
    {
      title: 'Senior Operations Program Manager - NPI',
      company: 'Motorola Solutions',
      location: 'Miami, FL',
      period: '05/2024 to Present',
      description: 'Lead cross-functional alignment across R&D, Manufacturing, Logistics, and Quality to meet launch milestones for mission-critical communications systems.',
      achievements: [
        'Manage CAPEX/OPEX budgets, implement PFMEA and Process Control Plans (PCP), and integrate MES/MQS solutions into global supply chain operations',
        'Apply Six Sigma and 8D methodologies to drive yield improvements and reduce defect rates',
        'Coordinate contract manufacturers (Sanmina Penang, BCM) through pilot builds, ramp-ups, fixture validations, and supply chain escalations'
      ]
    },
    {
      title: 'Senior Manufacturing Engineer - NPI',
      company: 'Magic Leap',
      location: 'Plantation, FL',
      period: '01/2023 to 05/2024',
      description: 'Boosted production efficiency by 15% through MES analytics, Gauge R&R studies, and cleanroom optimization.',
      achievements: [
        'Developed PFMEA libraries and implemented manufacturing stability protocols for AR devices',
        'Conducted design-for-manufacturability reviews and trained production teams to ensure scalability of operations',
        'Established cleanroom protocols and optimized manufacturing processes'
      ]
    },
    {
      title: 'Senior Manufacturing Engineer - Robotics',
      company: 'Stryker',
      location: 'Fort Lauderdale, FL',
      period: '01/2020 to 01/2023',
      description: 'Enhanced robotic assembly processes through MAPs redesign and SolidWorks simulation.',
      achievements: [
        'Led Kaizen/6S initiatives, ensuring compliance with PPAP and supplier quality standards (SICR)',
        'Closed NC/CAPA issues and supported critical debug/rebuild operations for high-precision surgical robotics',
        'Improved robotic assembly through process optimization and control plan development'
      ]
    },
    {
      title: 'Mechanical Engineer - Test Engineering & Automation',
      company: 'Gables Engineering',
      location: 'Coral Gables, FL',
      period: '07/2018 to 08/2019',
      description: 'Designed automated fixtures reducing test cycle times by over 50% for Boeing avionics.',
      achievements: [
        'Deployed a PDM system improving ECN/ECO workflows and reducing design cycle times',
        'Developed automation solutions for aerospace test fixtures',
        'Streamlined manufacturing processes through engineering-led optimizations'
      ]
    },
    {
      title: 'Mechanical Design Engineer',
      company: 'Robotray',
      location: 'Miami, FL',
      period: '11/2017 to 07/2018',
      description: 'Designed automation systems and CNC programs for high-speed bakery and packaging equipment.',
      achievements: [
        'Optimized material usage through FEA, and introduced SolidWorks PDM for design version control',
        'Developed high-speed automation systems for food processing equipment',
        'Created CNC programs and CAM toolpaths for manufacturing bids'
      ]
    },
    {
      title: 'Mechanical Engineer - Solar Tracker Systems',
      company: 'TerraSmart',
      location: 'Naples, FL',
      period: '03/2017 to 10/2017',
      description: 'Modeled solar tracking structures, providing casting/welding process improvements for utility-scale deployments.',
      achievements: [
        'Designed solar tracking structures for utility-scale projects',
        'Improved manufacturing and assembly processes',
        'Contributed to renewable energy infrastructure development'
      ]
    },
    {
      title: 'Mechanical Design Engineer',
      company: 'Piece-makers LLC',
      location: 'Miami, FL',
      period: '12/2016 to 03/2017',
      description: 'Designed aerospace test fixtures, performed R&D prototyping, and supported CAM programming for manufacturing bids.',
      achievements: [
        'Developed precision test fixtures for aerospace applications',
        'Supported R&D prototyping and design validation',
        'Created CAM programs for manufacturing operations'
      ]
    },
    {
      title: 'Mechanical Design Engineer',
      company: 'Prompt Aero Services',
      location: 'Miami, FL',
      period: '01/2016 to 11/2016',
      description: 'Developed FAA-compliant aerospace fixtures and validated designs using FEA and CFD.',
      achievements: [
        'Created FAA-compliant designs for aerospace maintenance and repair',
        'Performed advanced FEA and CFD analysis for design validation',
        'Ensured regulatory compliance for aerospace fixtures and tooling'
      ]
    },
    {
      title: 'Mechanical Design Engineer',
      company: 'General MRO Aerospace Inc.',
      location: 'Miami, FL',
      period: '05/2014 to 12/2015',
      description: 'Designed and built large-scale structural load fixtures for aerospace clients.',
      achievements: [
        'Developed structural load testing fixtures for aerospace applications',
        'Improved NDT and plating processes through engineering-led optimizations',
        'Contributed to MRO operations and aerospace maintenance solutions'
      ]
    }
  ];

  experiences.forEach((exp, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.title, margin, yPosition);
    yPosition += 6;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`${exp.company} | ${exp.location} | ${exp.period}`, margin, yPosition);
    yPosition += 6;

    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(exp.description, pageWidth - 2 * margin);
    doc.text(descLines, margin, yPosition);
    yPosition += descLines.length * 5 + 3;

    exp.achievements.forEach(achievement => {
      const achLines = doc.splitTextToSize(`• ${achievement}`, pageWidth - 2 * margin - 5);
      doc.text(achLines, margin + 5, yPosition);
      yPosition += achLines.length * 5;
    });
    yPosition += 8;
  });

  // Add new page for skills
  doc.addPage();
  yPosition = 20;

  // Skills Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Skills & Competencies', margin, yPosition);
  yPosition += 10;

  const skills = {
    'Operations & Project Management': [
      'NPI (New Product Introduction)',
      'Lean Manufacturing',
      'Operational Excellence',
      'CAPEX/OPEX Management',
      'Supplier Quality',
      'Risk Management',
      'Customer-Centric Supply Chain'
    ],
    'Engineering & Technical': [
      'SolidWorks, Autodesk Inventor, CREO',
      'Mastercam, CAMWorks',
      'ERP, PDM/PLM Systems',
      'CNC Machining',
      'FEA, GD&T, PFMEA',
      'Control Plans, MES/MQS integration'
    ],
    'Methodologies': [
      'Six Sigma Green Belt',
      'Kaizen/6S',
      'Agile Foundations',
      '8D Problem Solving',
      'PPAP, SICR',
      'Design for Manufacturability (DFM)'
    ],
    'Industries': [
      'Consumer Electronics',
      'Augmented Reality',
      'Medical Devices (Robotics)',
      'Aerospace',
      'Solar Energy',
      'Automation & Food Processing'
    ]
  };

  Object.entries(skills).forEach(([category, skillList]) => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(category, margin, yPosition);
    yPosition += 6;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    skillList.forEach(skill => {
      doc.text(`• ${skill}`, margin + 5, yPosition);
      yPosition += 5;
    });
    yPosition += 6;
  });

  // Add new page for Recommendations
  doc.addPage();
  yPosition = 20;

  // Recommendations Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Professional Recommendations', margin, yPosition);
  yPosition += 10;

  const recommendations = [
    {
      name: 'Jose Gibaja',
      title: 'Principal Engineer at Stryker',
      relationship: 'Senior Engineer at Stryker',
      duration: '~2 years',
      summary: 'Jose Gibaja is a Principal Engineer and Technical Lead in Advanced Operations Robotics at Stryker. We collaborated closely on robotic arm modules, PFMEA/PCP deliverables, and fixture validation projects. His guidance was instrumental in strengthening my technical foundation and ensuring critical milestone success.'
    },
    {
      name: 'Joe Zeichmann',
      title: 'Senior Staff Engineer at Stryker',
      relationship: 'Senior Staff Engineer at Stryker',
      duration: '~2 years',
      summary: 'Joe Zeichmann highlighted my contributions to PFMEA/PCP creation, fixture design, and robot arm upgrades, as well as my ability to take ownership of challenging build and testing activities. He emphasized my passion, enthusiasm, and technical versatility in actuator assembly, force torque sensor swaps, and MAP template guidance for Stryker\'s Mako robotic systems.'
    },
    {
      name: 'Melody Chan',
      title: 'Senior Project Manager at Stryker',
      relationship: 'Senior Project Manager at Stryker',
      duration: '~2.5 years',
      summary: 'Melody Chan highlighted my initiative, problem-solving skills, and ability to thrive under tight deadlines when tackling challenging robotics upgrades. She recognized my natural project management abilities and encouraged my growth into leadership roles, helping shape my engineering career.'
    },
    {
      name: 'Alan Fitzpatrick',
      title: 'Senior Manager of Manufacturing Engineering at Stryker',
      relationship: 'Manager and Mentor at Stryker',
      duration: '~2.5 years',
      summary: 'Alan Fitzpatrick served as both mentor and manager during my time at Stryker. Our collaboration centered on process development and new product introduction initiatives, where his leadership ensured technical excellence and operational readiness. His support was critical in sharpening my technical problem-solving skills.'
    }
  ];

  recommendations.forEach((rec, index) => {
    // Check if we need a new page
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(rec.name, margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text(rec.title, margin, yPosition);
    yPosition += 5;
    doc.text(`Worked together: ${rec.duration}`, margin, yPosition);
    yPosition += 6;

    doc.setFont('helvetica', 'normal');
    const summaryLines = doc.splitTextToSize(rec.summary, pageWidth - 2 * margin);
    doc.text(summaryLines, margin, yPosition);
    yPosition += summaryLines.length * 5 + 8;
  });

  // Add new page for Employment Verification
  doc.addPage();
  yPosition = 20;

  // Employment Verification Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Employment Verification', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const verificationText = 'All professional recommendations and employment history can be verified through LinkedIn connections and direct contact with referenced professionals. Full recommendation letters are available upon request through my professional network.';
  const verificationLines = doc.splitTextToSize(verificationText, pageWidth - 2 * margin);
  doc.text(verificationLines, margin, yPosition);
  yPosition += verificationLines.length * 5 + 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('LinkedIn Profile:', margin, yPosition);
  yPosition += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 119, 181);
  doc.textWithLink('https://www.linkedin.com/in/rafaelschwart/', margin, yPosition, { url: 'https://www.linkedin.com/in/rafaelschwart/' });
  doc.setTextColor(0, 0, 0);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Contact Information:', margin, yPosition);
  yPosition += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Email: rrgschwart@hotmail.com', margin, yPosition);
  yPosition += 6;
  doc.text('Location: Miami, FL', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Professional References Available:', margin, yPosition);
  yPosition += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const companies = ['Motorola Solutions', 'Magic Leap', 'Stryker', 'Gables Engineering', 'Robotray', 'TerraSmart'];
  companies.forEach(company => {
    doc.text(`• ${company}`, margin + 5, yPosition);
    yPosition += 5;
  });

  // Save the PDF
  doc.save('Rafael_Schwart_Portfolio.pdf');
};
