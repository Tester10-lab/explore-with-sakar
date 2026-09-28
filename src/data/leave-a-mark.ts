export interface CapacityFocusItem {
  title: string;
  description: string;
}

export interface CandidateProfile {
  role: string;
  description: string;
}

export interface ProjectPartnershipStep {
  title: string;
  description: string;
}

export interface ProjectAreaCategory {
  code: string;
  title: string;
  description: string;
  items: string[];
}

export interface ImplementationPhase {
  phase: string;
  title: string;
  description: string;
  steps: string[];
}

export interface FundingSource {
  title: string;
  description: string;
}

export interface AccountabilityPrinciple {
  title: string;
  description: string;
}

export interface ExpectedImpactItem {
  metric: string;
  description: string;
}

export interface ParticipantBenefit {
  title: string;
  description: string;
}

export interface PrecanHealthProject {
  title: string;
  partnerName: string;
  partnerUrl: string;
  badge: string;
  description: string;
  focusAreas: string[];
  contributionTypes: string[];
}

export interface ImpactVideoTakeaway {
  title: string;
  description: string;
}

export interface ImpactVideoHighlight {
  title: string;
  subtitle: string;
  youtubeId: string;
  youtubeUrl: string;
  author: string;
  badge: string;
  description: string;
  takeaways: ImpactVideoTakeaway[];
}

export interface LeaveAMarkData {
  title: string;
  subtitle: string;
  beyondTheMapPromise: {
    heading: string;
    paragraphs: string[];
  };
  partnership: {
    heading: string;
    intro: string;
    steps: ProjectPartnershipStep[];
  };
  projectAreas: {
    heading: string;
    intro: string;
    categories: ProjectAreaCategory[];
  };
  implementationModel: {
    heading: string;
    intro: string;
    phases: ImplementationPhase[];
  };
  resourceMobilisation: {
    heading: string;
    intro: string;
    sources: FundingSource[];
    transparencyNote: string;
  };
  transparency: {
    heading: string;
    principles: AccountabilityPrinciple[];
  };
  expectedImpact: {
    heading: string;
    items: ExpectedImpactItem[];
  };
  participantExperience: {
    heading: string;
    benefits: ParticipantBenefit[];
  };
  sustainability: {
    heading: string;
    pillars: string[];
  };
  precanHighlight: PrecanHealthProject;
  featuredVideo?: ImpactVideoHighlight;
  framework: {
    heading: string;
    intro: string;
    focusIntro: string;
    focusItems: CapacityFocusItem[];
  };
  whoShouldApply: {
    heading: string;
    intro: string;
    profiles: CandidateProfile[];
  };
  ultimateImpact: {
    heading: string;
    paragraphs: string[];
  };
}

export const LEAVE_A_MARK_CONTENT: LeaveAMarkData = {
  title: 'Leave a Mark',
  subtitle: 'Strategic Community Impact Journey',
  beyondTheMapPromise: {
    heading: 'Strategic Community Impact Philosophy',
    paragraphs: [
      'Leave a Mark is an initiative that connects travellers, professionals and local communities to create meaningful social impact through knowledge exchange, collaboration and responsible resource mobilisation.',
      'The initiative moves beyond conventional volunteering by focusing on strengthening existing community efforts through skills, strategic support and carefully planned projects. Rather than transactional manual labor, we partner directly with local grassroots leaders to build durable capacity, transparent frameworks, and lasting community resilience.',
      'Many local community groups and rural initiatives in Nepal have the passion and local trust, but benefit from specialized strategic support to secure funding, scale operations, or structure long-term execution plans. Leave a Mark bridges this gap with professional knowledge and respectful partnership.',
    ],
  },
  partnership: {
    heading: 'Project Identification & Community Partnership',
    intro: 'Every initiative begins with authentic local dialogue to ensure we address real priorities, respect existing knowledge systems, and build genuine community ownership.',
    steps: [
      {
        title: 'Identification of Genuine Needs',
        description: 'Deep engagement with community members to pinpoint real, urgent priorities rather than imposing external assumptions.',
      },
      {
        title: 'Collaboration with Local Leaders',
        description: 'Direct partnership with indigenous representatives, local NGOs, municipal leaders, and community elders from day one.',
      },
      {
        title: 'Feasibility & Sustainability Assessment',
        description: 'Rigorous analysis of available local resources, technical viability, ecological impact, and long-term maintenance.',
      },
      {
        title: 'Agreement on Goals & Responsibilities',
        description: 'Formal consensus on shared objectives, clear roles, decision-making protocols, and mutual accountability.',
      },
    ],
  },
  projectAreas: {
    heading: 'Core Project Focus Areas',
    intro: 'Our strategic initiatives span three interconnected pillars designed to empower youth, strengthen local livelihoods, and preserve natural and cultural heritage.',
    categories: [
      {
        code: 'Pillar I',
        title: 'Education & Youth Development',
        description: 'Building modern skills, health awareness, and educational infrastructure for the next generation.',
        items: [
          'Learning support & academic reinforcement',
          'Digital literacy & technology access',
          'Career mentorship & professional guidance',
          'Skill development & vocational workshops',
          'Health & Wellbeing awareness programs',
          'Community health & preventive activities',
        ],
      },
      {
        code: 'Pillar II',
        title: 'Research, Documentation & Livelihoods',
        description: 'Fostering local economic independence, enterprise development, and women empowerment.',
        items: [
          'Supporting local grassroots micro-enterprises',
          'Skill enhancement for local artisans & farmers',
          'Market linkage & sustainable trade networks',
          'Grassroots research & impact documentation',
          'Women-led cooperative empowerment',
        ],
      },
      {
        code: 'Pillar III',
        title: 'Environment & Heritage Conservation',
        description: 'Protecting fragile Himalayan biodiversity, indigenous knowledge, and cultural legacy.',
        items: [
          'Reforestation & watershed conservation activities',
          'Community ecological awareness & waste management',
          'Oral history & tangible cultural documentation',
          'Indigenous forest guardian support',
        ],
      },
    ],
  },
  implementationModel: {
    heading: '4-Phase Implementation Model',
    intro: 'A structured, goal-oriented process that guarantees efficiency, community involvement, and clear measurable milestones.',
    phases: [
      {
        phase: 'Phase 1',
        title: 'Understanding',
        description: 'Initial immersion, site visits, needs assessment, and stakeholder dialogues.',
        steps: ['Field community visit', 'Comprehensive needs assessment', 'In-depth discussion with key stakeholders'],
      },
      {
        phase: 'Phase 2',
        title: 'Planning',
        description: 'Co-designing actionable plans, budgets, metrics, and timelines.',
        steps: ['Define clear project objectives', 'Prepare detailed activity plan', 'Estimate required resources and timeline'],
      },
      {
        phase: 'Phase 3',
        title: 'Implementation',
        description: 'Collaborative execution alongside local teams with continuous monitoring.',
        steps: ['Conduct planned field activities', 'Engage participants & local partners', 'Monitor progress & adjust as needed'],
      },
      {
        phase: 'Phase 4',
        title: 'Evaluation',
        description: 'Measuring impact, gathering feedback, and publishing transparent reports.',
        steps: ['Document project outcomes', 'Collect community & participant feedback', 'Prepare comprehensive impact report'],
      },
    ],
  },
  resourceMobilisation: {
    heading: 'Resource Mobilisation & Funding Plan',
    intro: 'Funding directly supports project implementation. Resource mobilisation is carried out transparently alongside execution to ensure every project has the required support to achieve its intended outcome.',
    sources: [
      {
        title: 'Participant Contribution',
        description: 'Direct project allocations contributed by conscious travellers and skilled professionals.',
      },
      {
        title: 'Strategic Partners',
        description: 'Collaborations with values-aligned organizations, educational institutions, and impact funds.',
      },
      {
        title: 'CSR Collaboration',
        description: 'Corporate Social Responsibility sponsorships matching corporate resources with community needs.',
      },
      {
        title: 'Institutional Support',
        description: 'Grants and technical assistance from developmental organizations and government bodies.',
      },
      {
        title: 'Individual Supporters',
        description: 'Micro-donations and community sponsorships from global advocates.',
      },
    ],
    transparencyNote: 'Funding requirements are identified based on the approved project plan. All financial management is audited and published openly to maintain complete integrity.',
  },
  transparency: {
    heading: 'Transparency & Accountability',
    principles: [
      {
        title: 'Clear Project Budget',
        description: 'Detailed financial breakdowns published prior to project execution.',
      },
      {
        title: 'Defined Use of Resources',
        description: 'Every rupee and resource is tracked to its specific project deliverable.',
      },
      {
        title: 'Documentation of Activities',
        description: 'Regular photo, video, and written logs capturing real-time field progress.',
      },
      {
        title: 'Progress Updates',
        description: 'Frequent milestone reports delivered to community leaders and supporters.',
      },
      {
        title: 'Outcome Reporting',
        description: 'Thorough post-project evaluation evaluating success against initial targets.',
      },
      {
        title: 'Community Decision Involvement',
        description: 'Local stakeholders retain veto power and veto-free input at every stage.',
      },
    ],
  },
  expectedImpact: {
    heading: 'Expected Impact',
    items: [
      {
        metric: 'People Reached',
        description: 'Direct beneficiaries receiving health, educational, and economic support.',
      },
      {
        metric: 'Skills Transferred',
        description: 'Practical knowledge passed to local leaders, teachers, and healthcare workers.',
      },
      {
        metric: 'Systems Strengthened',
        description: 'Durable administrative, financial, and operational frameworks established.',
      },
      {
        metric: 'Resources Created',
        description: 'Tangible tools, digital assets, libraries, and medical awareness materials left behind.',
      },
      {
        metric: 'Long-term Benefits',
        description: 'Self-sustaining community models that continue to grow long after projects complete.',
      },
    ],
  },
  participantExperience: {
    heading: 'What Travellers & Professionals Gain',
    benefits: [
      {
        title: 'Cultural Understanding',
        description: 'Immersive, authentic connection with rural Nepali life, values, and traditions.',
      },
      {
        title: 'Community Connection',
        description: 'Deep, respectful relationships built on mutual learning and shared goals.',
      },
      {
        title: 'Professional Contribution',
        description: 'The gratification of applying your professional skills where they create life-changing impact.',
      },
      {
        title: 'Meaningful Travel Experience',
        description: 'Transformative journey that enriches your life while leaving a lasting positive legacy.',
      },
    ],
  },
  sustainability: {
    heading: 'Sustainability Plan',
    pillars: [
      'Local ownership & leadership transition',
      'Continuous training of local field teams',
      'Long-term institutional partnerships',
      'Ongoing monitoring & impact evaluation',
    ],
  },
  precanHighlight: {
    title: 'PRECAN Health Impact Projects',
    partnerName: 'Prevent Cancer Nepal (PRECAN)',
    partnerUrl: 'https://www.precan.org/',
    badge: 'Featured Public Health Initiative',
    description: 'Through Leave a Mark, travellers and professionals have the opportunity to engage with meaningful public health initiatives in Nepal alongside PRECAN (Prevent Cancer Nepal). These projects focus on cancer prevention, health awareness, early detection and strengthening community-based health initiatives.',
    focusAreas: [
      'Cancer prevention & community health awareness',
      'Early screening & detection outreach',
      'Strengthening rural public health infrastructure',
      'Health literacy & educational campaigns',
    ],
    contributionTypes: [
      'Conducting health awareness workshops & community talks',
      'Assisting with medical research support & data collection',
      'Documenting community health outcomes & patient stories',
      'Skill-sharing with local healthcare volunteers & staff',
    ],
  },
  featuredVideo: {
    title: 'Reusable Pad Making Program',
    subtitle: 'Empowering with Dignity',
    youtubeId: 'Bjf7Q75cm38',
    youtubeUrl: 'https://www.youtube.com/watch?v=Bjf7Q75cm38',
    author: 'Himshikhara Socio-Cultural',
    badge: 'Grassroots Action in the Field',
    description:
      'A hands-on grassroots initiative empowering rural women and adolescent girls in Nepal through reusable sanitary pad production, hygiene awareness, and sustainable livelihood generation.',
    takeaways: [
      {
        title: 'Sustainable Health & Hygiene',
        description: 'Providing washable, eco-friendly menstrual solutions that protect rural women from infections and reduce waste.',
      },
      {
        title: 'Breaking Social Taboos with Dignity',
        description: 'Creating safe community spaces to openly discuss menstrual hygiene, overcoming stigma and isolation.',
      },
      {
        title: 'Women-Led Micro-Enterprise',
        description: 'Training local women in tailoring, quality craftsmanship, and cooperative management for economic independence.',
      },
      {
        title: 'Education & Community Resilience',
        description: 'Helping girls stay consistently enrolled in school while educating entire households on preventive reproductive health.',
      },
    ],
  },
  framework: {
    heading: 'The Framework: The 3-Month Execution Model',
    intro:
      'Rather than open-ended volunteering, our projects are highly structured, goal-oriented, and bound by strict timelines. This ensures your time is utilized efficiently and the community receives a finished product.',
    focusIntro: 'When you join a "Leave a Mark" initiative, your core focus will be on capacity building:',
    focusItems: [
      {
        title: 'Project Proposal Structuring',
        description: 'Drafting comprehensive, persuasive proposals that local organizations can use to secure grants and partnerships.',
      },
      {
        title: 'Deliverable Breakdowns',
        description: 'Taking a massive, overwhelming community goal and breaking it down into manageable, daily tasks for local teams.',
      },
      {
        title: 'Timeline Compression',
        description: 'Engineering tight, realistic execution schedules (such as a focused 3-month rollout) to ensure projects do not stall.',
      },
      {
        title: 'Financial & Resource Planning',
        description: 'Assisting with budgeting, resource allocation, and funding models to ensure long-term sustainability.',
      },
    ],
  },
  whoShouldApply: {
    heading: 'Who Should Apply?',
    intro: 'This program is not for the passive tourist. It is designed for:',
    profiles: [
      {
        role: 'Project Managers & Strategists',
        description: 'Those who know how to build timelines and ensure deliverables are met.',
      },
      {
        role: 'Financial Analysts & Accountants',
        description: 'Professionals who can help grassroots organizations build transparent, sustainable budgets.',
      },
      {
        role: 'Grant Writers & Communicators',
        description: "Those who can articulate a community's needs into compelling, professional proposals.",
      },
      {
        role: 'Healthcare Professionals & Advocates',
        description: 'Medical professionals and health advocates passionate about preventive health and cancer awareness.',
      },
    ],
  },
  ultimateImpact: {
    heading: 'The Ultimate Impact',
    paragraphs: [
      'When your journey ends and you return home, the project documents you helped create will remain. The timelines will be executed, the funding proposals will be submitted, and the organizational frameworks will empower the local team for years to come. By applying your professional expertise, you leave behind an invisible but indestructible infrastructure. You leave a lasting mark on the map.',
    ],
  },
};
