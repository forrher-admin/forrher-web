// Interim health copy — replace when Mae sends ForrHer-approved articles
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

export type SuggestionKind = "learn" | "tool" | "shop" | "care";

export type FlowSuggestion = {
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
  kind?: SuggestionKind;
};

export type TodayFlow = {
  slug: SituationSlug;
  label: string;
  intro: string;
  steps: FlowStep[];
  /** Maps answer keys (full or partial) to suggestion sets. Falls back to default. */
  results: Record<string, FlowSuggestion[]>;
  defaultSuggestions: FlowSuggestion[];
};

const learnCycle = {
  href: "/learn/understanding-your-cycle-basics",
  linkLabel: "Read cycle basics",
  kind: "learn" as const,
};

const learnHeavy = {
  href: "/learn/comfort-on-heavier-days",
  linkLabel: "Comfort on heavier days",
  kind: "learn" as const,
};

const learnKit = {
  href: "/learn/packing-a-simple-period-kit",
  linkLabel: "Period kit guide",
  kind: "learn" as const,
};

const toolPrep = {
  href: "/tools/period-prep-checklist",
  linkLabel: "Period prep checklist",
  kind: "tool" as const,
};

const toolKit = {
  href: "/tools/build-period-kit",
  linkLabel: "Build my period kit",
  kind: "tool" as const,
};

const toolWork = {
  href: "/tools/workday-period-plan",
  linkLabel: "Workday period plan",
  kind: "tool" as const,
};

const toolDoctor = {
  href: "/tools/questions-for-doctor",
  linkLabel: "Questions for your doctor",
  kind: "tool" as const,
};

const shopPouch = {
  href: "/shop/period-private-pouch",
  linkLabel: "View Private Pouch",
  kind: "shop" as const,
};

const shopOrganizer = {
  href: "/shop/period-everyday-organizer",
  linkLabel: "View Everyday Organizer",
  kind: "shop" as const,
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
      {
        id: "focus",
        question: "What would help most right now?",
        options: [
          { id: "supplies", label: "Supplies and readiness" },
          { id: "plan", label: "A simple plan" },
          { id: "calm", label: "A calmer pace" },
        ],
      },
    ],
    results: {
      "prepared:no": [
        {
          title: "Gather what you need first",
          body: "Products, spare underwear, and a discreet disposal option can settle the moment quickly.",
          ...toolKit,
        },
        {
          title: "A pouch for privacy",
          body: "A private pouch can make disposal feel calmer when you are away from home.",
          ...shopPouch,
        },
        {
          title: "Keep learning gently",
          body: "Short, plain-language reading can help you feel steadier next time.",
          ...learnCycle,
        },
      ],
      "setting:work": [
        {
          title: "Shape a workday plan",
          body: "Keep supplies nearby, protect short breaks, and keep your task list kind.",
          ...toolWork,
        },
        {
          title: "Stay organised discreetly",
          body: "An everyday organizer keeps essentials together without drawing attention.",
          ...shopOrganizer,
        },
      ],
      "setting:out|focus:supplies": [
        {
          title: "Pack for being out",
          body: "A small kit and a private pouch can reduce worry while you are moving around.",
          ...toolKit,
        },
        {
          title: "Private disposal, anywhere",
          body: "Carry a pouch that seals quietly when you need it.",
          ...shopPouch,
        },
      ],
      "focus:plan": [
        {
          title: "Use a short prep checklist",
          body: "A few calm steps now can make the rest of the day feel more manageable.",
          ...toolPrep,
        },
        {
          title: "Readiness ideas",
          body: "Simple kit ideas for home, work, or travel.",
          ...learnKit,
        },
      ],
    },
    defaultSuggestions: [
      {
        title: "Settle what you need first",
        body: "Check products, spare underwear, and a way to freshen up. Small readiness often lowers stress.",
        ...toolPrep,
      },
      {
        title: "Learn a little, gently",
        body: "If you want calm reading on cycle basics, Learn has short articles in plain language.",
        ...learnCycle,
      },
      {
        title: "Keep essentials together",
        body: "An organizer can hold what you need for the day without fuss.",
        ...shopOrganizer,
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
      {
        id: "next",
        question: "Do you want a next step beyond today?",
        options: [
          { id: "no", label: "Just today for now" },
          { id: "prep", label: "Prep for next time" },
          { id: "questions", label: "Questions for a professional" },
        ],
      },
    ],
    results: {
      "intensity:strong|support:rest": [
        {
          title: "Make space to rest",
          body: "If you can, reduce demands for a while. Warmth, quiet, and hydration are common comfort choices people try.",
          kind: "care",
        },
        {
          title: "Know when to ask for care",
          body: "Strong pain that feels unusual for you deserves professional advice. ForrHer does not diagnose.",
          kind: "care",
        },
        {
          title: "Prepare questions if you seek care",
          body: "A short list can make a visit feel clearer and less rushed.",
          ...toolDoctor,
        },
      ],
      "support:plan": [
        {
          title: "A calmer workday plan",
          body: "Protect breaks, keep supplies close, and shorten your must-do list.",
          ...toolWork,
        },
        {
          title: "Comfort reading",
          body: "Gentle ideas for heavier or uncomfortable days.",
          ...learnHeavy,
        },
      ],
      "next:questions": [
        {
          title: "Questions to ask your doctor",
          body: "Write what you notice and what you want to understand. This is not a diagnosis tool.",
          ...toolDoctor,
        },
        {
          title: "Cycle basics for context",
          body: "Plain-language reading can help you describe your experience.",
          ...learnCycle,
        },
      ],
      "next:prep": [
        {
          title: "Prep for next time",
          body: "A checklist and a small kit can lower stress when cramps return.",
          ...toolPrep,
        },
        {
          title: "Build a comfort-ready kit",
          body: "Include warmth options, products, and anything that helps you feel steady.",
          ...toolKit,
        },
      ],
    },
    defaultSuggestions: [
      {
        title: "Ease the day, not push through",
        body: "Short breaks, heat if it helps you, and lighter movement can feel kinder than forcing a full pace.",
        kind: "care",
      },
      {
        title: "Prepare for later",
        body: "A workday period plan or checklist can help you feel more in control.",
        ...toolWork,
      },
      {
        title: "Keep comfort items close",
        body: "An everyday organizer can hold heat pads, products, and small comforts.",
        ...shopOrganizer,
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
      {
        id: "place",
        question: "Where will you spend most of today?",
        options: [
          { id: "home", label: "At home" },
          { id: "out", label: "Out or at work" },
        ],
      },
    ],
    results: {
      "change:more": [
        {
          title: "Keep backups close",
          body: "Extra products and a discreet disposal option can reduce worry on heavier days.",
          ...learnHeavy,
        },
        {
          title: "Private disposal support",
          body: "A sealed pouch can help when you need to change away from home.",
          ...shopPouch,
        },
        {
          title: "If this feels new or concerning",
          body: "Write what you notice and consider questions for a professional. ForrHer does not diagnose.",
          ...toolDoctor,
        },
      ],
      "energy:drained": [
        {
          title: "Protect your energy",
          body: "If you can, schedule demanding tasks for another day and drink water regularly.",
          kind: "care",
        },
        {
          title: "A lighter workday plan",
          body: "Shorten the must-do list and keep supplies within reach.",
          ...toolWork,
        },
      ],
      "place:out": [
        {
          title: "Ready kit for being out",
          body: "Pack more products than usual, spare underwear, and a private pouch.",
          ...toolKit,
        },
        {
          title: "Comfort tips for heavier days",
          body: "Practical, non-medical ideas in plain language.",
          ...learnHeavy,
        },
      ],
    },
    defaultSuggestions: [
      {
        title: "Keep backups close",
        body: "Extra products in your bag, desk, or bathroom can reduce worry on heavier days.",
        ...learnHeavy,
      },
      {
        title: "Build a heavier-day kit",
        body: "Choose products and privacy items that match how you move through the day.",
        ...toolKit,
      },
      {
        title: "Organise what you need",
        body: "An everyday organizer can keep spares tidy and reachable.",
        ...shopOrganizer,
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
    results: {
      "now:clean": [
        {
          title: "Handle the moment first",
          body: "Change what you can, rinse or blot if possible, and give yourself a minute.",
          kind: "care",
        },
        {
          title: "Discreet disposal",
          body: "A private pouch can make the next step feel calmer and more private.",
          ...shopPouch,
        },
      ],
      "after:kit": [
        {
          title: "Build a leak-ready kit",
          body: "Spare underwear, products, wipes, and a sealable pouch help next time.",
          ...toolKit,
        },
        {
          title: "Kit packing ideas",
          body: "A short guide for work, school, or travel.",
          ...learnKit,
        },
        {
          title: "Everyday organizer",
          body: "Keep those pieces together so you are not searching when you are stressed.",
          ...shopOrganizer,
        },
      ],
      "after:plan": [
        {
          title: "A calm prep checklist",
          body: "A few steps before your next period can reduce surprise stress.",
          ...toolPrep,
        },
        {
          title: "Private pouch for next time",
          body: "Carry a sealed option for discreet disposal anywhere.",
          ...shopPouch,
        },
      ],
    },
    defaultSuggestions: [
      {
        title: "Handle the moment first",
        body: "Change what you can, rinse or blot if possible, and give yourself a minute. You are not alone in this.",
        kind: "care",
      },
      {
        title: "Build a small kit",
        body: "Spare underwear, products, and a bag for used items can make the next surprise easier.",
        ...learnKit,
      },
      {
        title: "Private pouch",
        body: "Leak-resistant disposal support for privacy and dignity.",
        ...shopPouch,
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
      {
        id: "period",
        question: "Is this around your period?",
        options: [
          { id: "yes", label: "Yes" },
          { id: "maybe", label: "Maybe" },
          { id: "no", label: "Not really" },
        ],
      },
    ],
    results: {
      "load:heavy": [
        {
          title: "Lower the bar kindly",
          body: "Choose one must-do and let the rest be flexible. Rest is productive too.",
          kind: "care",
        },
        {
          title: "A lighter workday plan",
          body: "Protect breaks and shrink the focus list for today.",
          ...toolWork,
        },
      ],
      "period:yes": [
        {
          title: "Period days can ask more of you",
          body: "Gentle readiness and comfort planning can help without pushing harder.",
          ...toolPrep,
        },
        {
          title: "Cycle basics",
          body: "Plain-language reading about everyday cycle patterns.",
          ...learnCycle,
        },
      ],
      "sleep:broken|load:heavy": [
        {
          title: "Protect recovery first",
          body: "If you can, delay non-urgent tasks and keep food, water, and rest nearby.",
          kind: "care",
        },
        {
          title: "If tiredness feels new or lasting",
          body: "A professional can help you explore causes. Prepare a few clear questions.",
          ...toolDoctor,
        },
      ],
    },
    defaultSuggestions: [
      {
        title: "Lower the bar kindly",
        body: "Choose one must-do and let the rest be flexible. Rest is productive too.",
        kind: "care",
      },
      {
        title: "Check the bigger picture",
        body: "If tiredness feels new or lasting, a professional can help you explore causes. ForrHer shares general information only.",
        ...learnCycle,
      },
      {
        title: "Doctor questions, if needed",
        body: "A short list can make an appointment feel clearer.",
        ...toolDoctor,
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
      {
        id: "pack",
        question: "How packed are you already?",
        options: [
          { id: "ready", label: "Mostly ready" },
          { id: "partial", label: "Partly packed" },
          { id: "notyet", label: "Not yet" },
        ],
      },
    ],
    results: {
      "access:hard": [
        {
          title: "Pack for independence",
          body: "Bring more products than you think you need, plus a spare layer and a sealed pouch.",
          ...toolKit,
        },
        {
          title: "Private pouch for travel",
          body: "Discreet disposal when bathrooms or bins are limited.",
          ...shopPouch,
        },
      ],
      "trip:longer|pack:notyet": [
        {
          title: "Travel prep checklist",
          body: "A calm list so you do not forget the small things that matter on the road.",
          ...toolPrep,
        },
        {
          title: "Organizer for the journey",
          body: "Keep period and everyday essentials in one place inside your bag.",
          ...shopOrganizer,
        },
        {
          title: "Kit packing ideas",
          body: "Simple guidance for building a kit that travels well.",
          ...learnKit,
        },
      ],
      "trip:day": [
        {
          title: "Day-trip readiness",
          body: "A compact kit and one backup set of products is often enough.",
          ...toolKit,
        },
        {
          title: "Discreet disposal",
          body: "Carry a private pouch if you may need to change while out.",
          ...shopPouch,
        },
      ],
    },
    defaultSuggestions: [
      {
        title: "Pack for independence",
        body: "Bring more products than you think you need, plus a spare layer and a sealable bag.",
        ...learnKit,
      },
      {
        title: "Build a travel kit",
        body: "Choose what belongs in your bag before you leave.",
        ...toolKit,
      },
      {
        title: "Everyday organizer",
        body: "Keep travel essentials neat and reachable.",
        ...shopOrganizer,
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
      {
        id: "after",
        question: "Want something ready for next time?",
        options: [
          { id: "yes", label: "Yes, a kit or plan" },
          { id: "no", label: "Just today" },
        ],
      },
    ],
    results: {
      "need:supplies": [
        {
          title: "Set supplies within reach",
          body: "Desk drawer, bag, or locker — wherever you can access quietly.",
          ...toolWork,
        },
        {
          title: "Everyday organizer at work",
          body: "Keep products and small comforts together without fuss.",
          ...shopOrganizer,
        },
      ],
      "privacy:public|need:supplies": [
        {
          title: "Discreet workday support",
          body: "A compact kit and private pouch can help in shared or public spaces.",
          ...shopPouch,
        },
        {
          title: "Workday period plan",
          body: "Plan bathroom breaks and keep language simple with yourself.",
          ...toolWork,
        },
      ],
      "need:focus": [
        {
          title: "Shorten the must-do list",
          body: "One priority block and protected breaks often feel kinder than a full push.",
          ...toolWork,
        },
      ],
      "after:yes": [
        {
          title: "Prep checklist for next workday",
          body: "A short list so next time starts calmer.",
          ...toolPrep,
        },
        {
          title: "Build a work kit",
          body: "Choose what belongs at your desk or in your bag.",
          ...toolKit,
        },
      ],
    },
    defaultSuggestions: [
      {
        title: "Set a workday period plan",
        body: "Keep products at your desk or bag, schedule bathroom breaks, and protect one lighter block if you can.",
        ...toolWork,
      },
      {
        title: "Keep language simple with yourself",
        body: "You do not need to explain everything. Meeting your own needs is enough.",
        kind: "care",
      },
      {
        title: "Organizer for work days",
        body: "Discreet storage for products and comfort items.",
        ...shopOrganizer,
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
      {
        id: "support",
        question: "What would help most right now?",
        options: [
          { id: "notes", label: "Write it down" },
          { id: "questions", label: "Prepare questions" },
          { id: "read", label: "Calm reading" },
        ],
      },
    ],
    results: {
      "duration:longer": [
        {
          title: "Prepare questions for a visit",
          body: "A short list of what changed, when, and what you want to understand can help.",
          ...toolDoctor,
        },
        {
          title: "Write down what you notice",
          body: "Timing, intensity, and what feels different from your usual pattern.",
          kind: "care",
        },
      ],
      "change:bleeding": [
        {
          title: "Note the pattern calmly",
          body: "Heavier, lighter, longer, or irregular — write what you observe without self-diagnosis.",
          ...learnHeavy,
        },
        {
          title: "Questions for a professional",
          body: "Bring clear questions if you decide to seek care.",
          ...toolDoctor,
        },
      ],
      "support:questions": [
        {
          title: "Questions to ask your doctor",
          body: "Practical prompts for a calm conversation. ForrHer does not diagnose.",
          ...toolDoctor,
        },
        {
          title: "Cycle basics for context",
          body: "Plain-language reading that may help you describe your experience.",
          ...learnCycle,
        },
      ],
      "support:read": [
        {
          title: "Calm reading first",
          body: "Start with gentle, general information — never a substitute for professional care.",
          ...learnCycle,
        },
      ],
    },
    defaultSuggestions: [
      {
        title: "Write down what you notice",
        body: "Timing, intensity, and what changed can help a professional understand your experience.",
        kind: "care",
      },
      {
        title: "Prepare questions for a visit",
        body: "A short list of questions can make appointments feel clearer and less rushed.",
        ...toolDoctor,
      },
      {
        title: "Gentle Learn reading",
        body: "General information in plain language while you decide next steps.",
        ...learnCycle,
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
  const exact = buildAnswerKey(flow.steps, answers);
  if (flow.results[exact]) return flow.results[exact];

  let best: FlowSuggestion[] | undefined;
  let bestScore = 0;

  for (const [key, suggestions] of Object.entries(flow.results)) {
    const parts = key.split("|").filter(Boolean);
    if (!parts.length) continue;

    const matched = parts.every((part) => {
      const [stepId, optionId] = part.split(":");
      return Boolean(stepId && optionId && answers[stepId] === optionId);
    });

    if (matched && parts.length > bestScore) {
      bestScore = parts.length;
      best = suggestions;
    }
  }

  return best ?? flow.defaultSuggestions;
}
