// PLACEHOLDER: replace with ForrHer-approved content
import type { SituationSlug } from "@/lib/situations";

export type FlowOption = {
  id: string;
  label: string;
};

export type FlowStep = {
  id: string;
  question: string;
  options: FlowOption[];
};

export type FlowSuggestion = {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
};

export type TodayFlow = {
  slug: SituationSlug;
  label: string;
  intro: string;
  steps: FlowStep[];
  /** Maps "stepId:optionId|..." answer keys to suggestion sets. Falls back to default. */
  results: Record<string, FlowSuggestion[]>;
  defaultSuggestions: FlowSuggestion[];
};

export const todayFlows: TodayFlow[] = [
  {
    slug: "period-started",
    label: "Period started",
    intro: "Let’s make today a little easier, one small step at a time.",
    steps: [
      {
        id: "prepared",
        question: "Did you have what you needed when it started?",
        options: [
          { id: "yes", label: "Yes, I was ready" },
          { id: "somewhat", label: "Somewhat" },
          { id: "no", label: "Not really" },
        ],
      },
      {
        id: "setting",
        question: "Where are you spending most of today?",
        options: [
          { id: "home", label: "At home" },
          { id: "work", label: "At work or school" },
          { id: "out", label: "Out and about" },
        ],
      },
    ],
    results: {},
    defaultSuggestions: [
      {
        title: "Settle what you need first",
        body: "Check products, spare underwear, and a way to freshen up. Small readiness often lowers stress.",
        href: "/tools",
        linkLabel: "Browse tools",
      },
      {
        title: "Learn a little, gently",
        body: "If you want calm reading on cycle basics, Learn has short articles in plain language.",
        href: "/learn",
        linkLabel: "Open Learn",
      },
    ],
  },
  {
    slug: "cramps",
    label: "Cramps",
    intro: "Cramps can ask a lot of your day. We’ll keep this practical and kind.",
    steps: [
      {
        id: "intensity",
        question: "How strong do they feel right now?",
        options: [
          { id: "mild", label: "Mild" },
          { id: "medium", label: "Medium" },
          { id: "strong", label: "Strong" },
        ],
      },
      {
        id: "support",
        question: "What kind of support would help most?",
        options: [
          { id: "rest", label: "Rest and warmth" },
          { id: "pace", label: "A slower pace today" },
          { id: "plan", label: "A simple plan for work" },
        ],
      },
    ],
    results: {
      "intensity:strong|support:rest": [
        {
          title: "Make space to rest",
          body: "If you can, reduce demands for a while. Warmth, quiet, and hydration are common comfort choices people try.",
        },
        {
          title: "Know when to ask for care",
          body: "Strong pain that feels unusual for you deserves professional advice. ForrHer does not diagnose.",
        },
      ],
    },
    defaultSuggestions: [
      {
        title: "Ease the day, not push through",
        body: "Short breaks, heat if it helps you, and lighter movement can feel kinder than forcing a full pace.",
      },
      {
        title: "Prepare for later",
        body: "A workday period plan or checklist can help you feel more in control.",
        href: "/tools",
        linkLabel: "See tools",
      },
    ],
  },
  {
    slug: "heavy-flow",
    label: "Heavy flow",
    intro: "Heavy days can feel relentless. We’ll focus on comfort and readiness.",
    steps: [
      {
        id: "change",
        question: "How often are you needing to change products?",
        options: [
          { id: "usual", label: "About usual for me" },
          { id: "more", label: "More than usual" },
          { id: "unsure", label: "I’m not sure" },
        ],
      },
      {
        id: "energy",
        question: "How is your energy?",
        options: [
          { id: "ok", label: "Managing" },
          { id: "low", label: "Quite low" },
          { id: "drained", label: "Very drained" },
        ],
      },
    ],
    results: {},
    defaultSuggestions: [
      {
        title: "Keep backups close",
        body: "Extra products in your bag, desk, or bathroom can reduce worry on heavier days.",
        href: "/learn/comfort-on-heavier-days",
        linkLabel: "Read comfort tips",
      },
      {
        title: "Protect your energy",
        body: "If you can, schedule demanding tasks for another day and drink water regularly.",
      },
    ],
  },
  {
    slug: "a-leak",
    label: "A leak",
    intro: "Leaks happen. Let’s get you back to feeling steady.",
    steps: [
      {
        id: "now",
        question: "What do you need most right now?",
        options: [
          { id: "clean", label: "Clean up and change" },
          { id: "cover", label: "Cover and keep going" },
          { id: "home", label: "Get home or to a private space" },
        ],
      },
      {
        id: "after",
        question: "After this moment, what would help?",
        options: [
          { id: "kit", label: "Build a better kit" },
          { id: "plan", label: "A plan for next time" },
          { id: "rest", label: "Just rest today" },
        ],
      },
    ],
    results: {},
    defaultSuggestions: [
      {
        title: "Handle the moment first",
        body: "Change what you can, rinse or blot if possible, and give yourself a minute. You are not alone in this.",
      },
      {
        title: "Build a small kit",
        body: "Spare underwear, products, and a bag for used items can make the next surprise easier.",
        href: "/learn/packing-a-simple-period-kit",
        linkLabel: "Period kit guide",
      },
    ],
  },
  {
    slug: "feeling-tired",
    label: "Feeling tired",
    intro: "Tiredness deserves care, not guilt. We’ll keep suggestions light.",
    steps: [
      {
        id: "sleep",
        question: "How was your rest last night?",
        options: [
          { id: "ok", label: "Mostly okay" },
          { id: "poor", label: "Poor" },
          { id: "broken", label: "Very broken" },
        ],
      },
      {
        id: "load",
        question: "How full is your day?",
        options: [
          { id: "light", label: "Light" },
          { id: "normal", label: "Normal" },
          { id: "heavy", label: "Heavy" },
        ],
      },
    ],
    results: {},
    defaultSuggestions: [
      {
        title: "Lower the bar kindly",
        body: "Choose one must-do and let the rest be flexible. Rest is productive too.",
      },
      {
        title: "Check the bigger picture",
        body: "If tiredness feels new or lasting, a professional can help you explore causes. ForrHer shares general information only.",
        href: "/learn",
        linkLabel: "Browse Learn",
      },
    ],
  },
  {
    slug: "travelling",
    label: "Travelling",
    intro: "Travel plus a period asks for a little extra planning.",
    steps: [
      {
        id: "trip",
        question: "What kind of travel is this?",
        options: [
          { id: "day", label: "A day trip" },
          { id: "overnight", label: "Overnight" },
          { id: "longer", label: "Longer travel" },
        ],
      },
      {
        id: "access",
        question: "How easy is it to access bathrooms and supplies?",
        options: [
          { id: "easy", label: "Easy enough" },
          { id: "mixed", label: "Mixed" },
          { id: "hard", label: "Hard" },
        ],
      },
    ],
    results: {},
    defaultSuggestions: [
      {
        title: "Pack for independence",
        body: "Bring more products than you think you need, plus a spare layer and a sealable bag.",
        href: "/learn/packing-a-simple-period-kit",
        linkLabel: "Kit ideas",
      },
      {
        title: "Plan change points",
        body: "Note where you can pause on the journey. A simple checklist helps when you’re moving fast.",
        href: "/tools",
        linkLabel: "Tools",
      },
    ],
  },
  {
    slug: "work-day",
    label: "Work day",
    intro: "A work day with period needs can still be manageable with a clear plan.",
    steps: [
      {
        id: "privacy",
        question: "How private is your workplace?",
        options: [
          { id: "private", label: "Mostly private" },
          { id: "shared", label: "Shared spaces" },
          { id: "public", label: "Very public" },
        ],
      },
      {
        id: "need",
        question: "What would help most at work today?",
        options: [
          { id: "supplies", label: "Supplies nearby" },
          { id: "breaks", label: "More breaks" },
          { id: "focus", label: "A shorter focus list" },
        ],
      },
    ],
    results: {},
    defaultSuggestions: [
      {
        title: "Set a workday period plan",
        body: "Keep products at your desk or bag, schedule bathroom breaks, and protect one lighter block if you can.",
        href: "/tools",
        linkLabel: "Open tools",
      },
      {
        title: "Keep language simple with yourself",
        body: "You do not need to explain everything. Meeting your own needs is enough.",
      },
    ],
  },
  {
    slug: "something-feels-different",
    label: "Something feels different",
    intro: "Noticing a change is wise. We’ll stay calm and non-diagnostic.",
    steps: [
      {
        id: "change",
        question: "What feels different?",
        options: [
          { id: "pain", label: "Pain or cramps" },
          { id: "bleeding", label: "Bleeding pattern" },
          { id: "energy", label: "Energy or mood" },
          { id: "other", label: "Something else" },
        ],
      },
      {
        id: "duration",
        question: "How long have you noticed it?",
        options: [
          { id: "today", label: "Just today" },
          { id: "days", label: "A few days" },
          { id: "longer", label: "Longer than a week" },
        ],
      },
    ],
    results: {},
    defaultSuggestions: [
      {
        title: "Write down what you notice",
        body: "Timing, intensity, and what changed can help a professional understand your experience.",
      },
      {
        title: "Prepare questions for a visit",
        body: "A short list of questions can make appointments feel clearer and less rushed.",
        href: "/tools",
        linkLabel: "Doctor questions tool",
      },
    ],
  },
];

export function getTodayFlow(slug: string | undefined) {
  if (!slug) return undefined;
  return todayFlows.find((flow) => flow.slug === slug);
}

export function buildAnswerKey(
  steps: FlowStep[],
  answers: Record<string, string>,
) {
  return steps
    .map((step) => `${step.id}:${answers[step.id] ?? ""}`)
    .join("|");
}

export function getSuggestions(
  flow: TodayFlow,
  answers: Record<string, string>,
): FlowSuggestion[] {
  const key = buildAnswerKey(flow.steps, answers);
  return flow.results[key] ?? flow.defaultSuggestions;
}
