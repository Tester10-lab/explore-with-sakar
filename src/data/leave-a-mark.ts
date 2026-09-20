export interface CapacityFocusItem {
  title: string;
  description: string;
}

export interface CandidateProfile {
  role: string;
  description: string;
}

export interface LeaveAMarkData {
  title: string;
  subtitle: string;
  beyondTheMapPromise: {
    heading: string;
    paragraphs: string[];
  };
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
  subtitle: 'Strategic Volunteer Tourism',
  beyondTheMapPromise: {
    heading: 'The "Beyond the Map" Promise',
    paragraphs: [
      'Traditional "voluntourism" often focuses on short-term, unskilled manual labor that feels good but leaves little lasting impact. We take a different approach. We believe true volunteering means matching your actual professional skills with local communities that need structural, strategic, and administrative empowerment. We don’t just want you to paint a wall; we want you to help build the blueprint.',
      '"Leave a Mark" is a specialized branch of our journeys designed for professionals—project managers, financial planners, writers, and strategists—who want to dedicate a portion of their travel to high-level community development.',
      'Many local NGOs, community groups, and grassroots initiatives in Nepal have the passion and the workforce, but they lack the administrative frameworks to secure funding or execute complex logistics. This program places you behind the scenes as a quiet architect for change. You will work alongside local leaders to translate their raw, passionate intentions into concrete, actionable realities.',
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
    ],
  },
  ultimateImpact: {
    heading: 'The Ultimate Impact',
    paragraphs: [
      'When your journey ends and you return home, the project documents you helped create will remain. The timelines will be executed, the funding proposals will be submitted, and the organizational frameworks will empower the local team for years to come. By applying your professional expertise, you leave behind an invisible but indestructible infrastructure. You leave a lasting mark on the map.',
    ],
  },
};
