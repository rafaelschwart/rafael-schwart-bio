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
  const summaryText = 'Dynamic and results-driven Technical Project Manager and Process Engineer with over 10 years of experience across Consumer Electronics, Augmented Reality, Medical Devices, Robotics, Aerospace, and Solar Energy industries. Expert in CAD, CAE, FEA, FMEA, GD&T, and project management tools (ERP, PDM, PLM). Adept at Lean Manufacturing, Six Sigma methodologies, and driving cross-functional teams to deliver high-performance products under tight deadlines.';
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
        'Manage CAPEX/OPEX budgets, implement PFMEA and Process Control Plans (PCP)',
        'Apply Six Sigma and 8D methodologies to drive yield improvements',
        'Coordinate contract manufacturers through pilot builds and ramp-ups'
      ]
    },
    {
      title: 'Senior Manufacturing Engineer - NPI',
      company: 'Magic Leap',
      location: 'Plantation, FL',
      period: '01/2023 to 05/2024',
      description: 'Boosted production efficiency by 15% through MES analytics and cleanroom optimization.',
      achievements: [
        'Developed PFMEA libraries for AR devices',
        'Conducted design-for-manufacturability reviews',
        'Trained production teams for scalable operations'
      ]
    },
    {
      title: 'Senior Manufacturing Engineer - Robotics',
      company: 'Stryker',
      location: 'Fort Lauderdale, FL',
      period: '01/2020 to 01/2023',
      description: 'Enhanced robotic assembly processes through MAPs redesign and SolidWorks simulation.',
      achievements: [
        'Led Kaizen/6S initiatives with PPAP compliance',
        'Closed NC/CAPA issues for surgical robotics',
        'Improved assembly through process optimization'
      ]
    },
    {
      title: 'Mechanical Engineer - Test Engineering & Automation',
      company: 'Gables Engineering',
      location: 'Coral Gables, FL',
      period: '07/2018 to 08/2019',
      description: 'Designed automated fixtures reducing test cycle times by over 50% for Boeing avionics.',
      achievements: [
        'Deployed PDM system improving ECN/ECO workflows',
        'Implemented automation solutions for aerospace',
        'Streamlined manufacturing processes'
      ]
    },
    {
      title: 'Mechanical Design Engineer',
      company: 'Robotray',
      location: 'Miami, FL',
      period: '11/2017 to 07/2018',
      description: 'Designed automation systems and CNC programs for high-speed bakery equipment.',
      achievements: [
        'Optimized material usage through FEA',
        'Introduced SolidWorks PDM for version control',
        'Developed automation for food processing'
      ]
    },
    {
      title: 'Mechanical Engineer - Solar Tracker Systems',
      company: 'TerraSmart',
      location: 'Naples, FL',
      period: '03/2017 to 10/2017',
      description: 'Modeled solar tracking structures for utility-scale deployments.',
      achievements: [
        'Designed solar tracking systems',
        'Improved manufacturing processes',
        'Contributed to utility-scale projects'
      ]
    },
    {
      title: 'Mechanical Design Engineer',
      company: 'Piece-makers LLC',
      location: 'Miami, FL',
      period: '12/2016 to 03/2017',
      description: 'Designed aerospace test fixtures and supported CAM programming.',
      achievements: [
        'Developed precision test fixtures',
        'Supported R&D prototyping',
        'Contributed to manufacturing bids'
      ]
    },
    {
      title: 'Mechanical Design Engineer',
      company: 'Prompt Aero Services',
      location: 'Miami, FL',
      period: '01/2016 to 11/2016',
      description: 'Developed FAA-compliant aerospace fixtures with FEA/CFD validation.',
      achievements: [
        'Created FAA-compliant designs',
        'Performed advanced FEA and CFD analysis',
        'Ensured regulatory compliance'
      ]
    },
    {
      title: 'Mechanical Design Engineer',
      company: 'General MRO Aerospace Inc.',
      location: 'Miami, FL',
      period: '05/2014 to 12/2015',
      description: 'Designed large-scale structural load fixtures for aerospace clients.',
      achievements: [
        'Developed structural load testing fixtures',
        'Improved NDT and plating processes',
        'Contributed to MRO operations'
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
    'Technical Skills': [
      'CAD, CAE, FEA, FMEA, GD&T',
      'ERP, PDM, PLM',
      'Lean Manufacturing',
      'Six Sigma',
      'SolidWorks',
      'MES Analytics'
    ],
    'Management': [
      'Project Management',
      'Process Engineering',
      'Cross-functional Teams',
      'NPI Operations',
      'CAPEX/OPEX Management',
      'Quality Control'
    ],
    'Industries': [
      'Consumer Electronics',
      'Augmented Reality',
      'Medical Devices',
      'Robotics',
      'Aerospace',
      'Solar Energy'
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

  // Save the PDF
  doc.save('Rafael_Schwart_Portfolio.pdf');
};
