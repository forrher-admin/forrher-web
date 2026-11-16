// PLACEHOLDER: replace with ForrHer-approved content
import type { ToolDefinition } from "@/content/tools/types";

function selectedLabels(
  options: { id: string; label: string }[],
  selected: string | string[] | undefined,
) {
  const ids = Array.isArray(selected) ? selected : selected ? [selected] : [];
  return options.filter((option) => ids.includes(option.id)).map((o) => o.label);
}

export const toolDefinitions: ToolDefinition[] = [
  {
    slug: "period-prep-checklist",
    title: "Period Prep Checklist",
    summary: "A calm checklist so the start of your period feels less rushed.",
    intro:
      "Answer a few questions and get a simple prep list for the days ahead. General guidance only.",
    steps: [
      {
        id: "timing",
        type: "single",
        question: "When do you expect your period?",
        options: [
          { id: "soon", label: "In the next few days" },
          { id: "week", label: "Around a week" },
          { id: "unsure", label: "I’m not sure" },
        ],
      },
      {
        id: "places",
        type: "multi",
        question: "Where do you want to be prepared?",
        help: "Choose all that apply.",
        options: [
          { id: "home", label: "Home" },
          { id: "work", label: "Work or school" },
          { id: "bag", label: "Everyday bag" },
          { id: "travel", label: "Travel" },
        ],
      },
      {
        id: "priorities",
        type: "multi",
        question: "What matters most to prepare?",
        options: [
          { id: "products", label: "Enough products" },
          { id: "privacy", label: "Private disposal" },
          { id: "comfort", label: "Comfort items" },
          { id: "clothes", label: "Spare clothes or underwear" },
        ],
      },
    ],
    resultTitle: "Your period prep checklist",
    resultIntro: "Use what fits. Skip what does not. This is not medical advice.",
    learnLinks: [
      {
        href: "/learn/packing-a-simple-period-kit",
        label: "Packing a simple period kit",
      },
      {
        href: "/learn/understanding-your-cycle-basics",
        label: "Understanding your cycle basics",
      },
    ],
    buildResult(answers) {
      const lines: string[] = [];
      const places = selectedLabels(
        [
          { id: "home", label: "Home" },
          { id: "work", label: "Work or school" },
          { id: "bag", label: "Everyday bag" },
          { id: "travel", label: "Travel" },
        ],
        answers.places,
      );
      const priorities = selectedLabels(
        [
          { id: "products", label: "Enough products" },
          { id: "privacy", label: "Private disposal" },
          { id: "comfort", label: "Comfort items" },
          { id: "clothes", label: "Spare clothes or underwear" },
        ],
        answers.priorities,
      );

      lines.push("Check products you trust and restock early.");
      if (places.includes("Work or school")) {
        lines.push("Place a small set of supplies at work or school.");
      }
      if (places.includes("Everyday bag")) {
        lines.push("Refresh the kit in your everyday bag.");
      }
      if (places.includes("Travel")) {
        lines.push("Pack extras before travel days.");
      }
      if (priorities.includes("Private disposal")) {
        lines.push("Add a discreet disposal option, such as a private pouch.");
      }
      if (priorities.includes("Comfort items")) {
        lines.push("Set aside comfort items you already use (heat, water, rest).");
      }
      if (priorities.includes("Spare clothes or underwear")) {
        lines.push("Pack spare underwear in a sealed bag.");
      }
      if (answers.timing === "unsure") {
        lines.push("Keep a basic kit ready even if timing feels unclear.");
      }
      lines.push("Choose one kind task to lighten your load on day one.");
      return lines;
    },
  },
  {
    slug: "build-period-kit",
    title: "Build My Period Kit",
    summary: "Choose what belongs in a small kit for real life.",
    intro:
      "Pick the pieces that fit your day. You can print or save the result when you are done.",
    steps: [
      {
        id: "setting",
        type: "single",
        question: "Where will this kit live most often?",
        options: [
          { id: "bag", label: "In my bag" },
          { id: "desk", label: "At work or school" },
          { id: "home", label: "At home" },
          { id: "travel", label: "For travel" },
        ],
      },
      {
        id: "items",
        type: "multi",
        question: "What do you want in the kit?",
        help: "Choose all that feel useful.",
        options: [
          { id: "pads", label: "Pads or liners" },
          { id: "tampons", label: "Tampons or cup supplies" },
          { id: "wipes", label: "Wipes or tissues" },
          { id: "underwear", label: "Spare underwear" },
          { id: "pouch", label: "Private disposal pouch" },
          { id: "pain", label: "Comfort / pain-relief items you already use" },
          { id: "treat", label: "A small comfort treat" },
        ],
      },
      {
        id: "size",
        type: "single",
        question: "How compact should it be?",
        options: [
          { id: "tiny", label: "Very small" },
          { id: "medium", label: "Everyday size" },
          { id: "full", label: "Full organizer" },
        ],
      },
    ],
    resultTitle: "Your period kit list",
    resultIntro: "A personal packing list based on your choices.",
    learnLinks: [
      {
        href: "/learn/packing-a-simple-period-kit",
        label: "Packing a simple period kit",
      },
      {
        href: "/shop/period-everyday-organizer",
        label: "Period & Everyday Organizer",
      },
      {
        href: "/shop/period-private-pouch",
        label: "Period Private Pouch",
      },
    ],
    buildResult(answers) {
      const items = selectedLabels(
        [
          { id: "pads", label: "Pads or liners" },
          { id: "tampons", label: "Tampons or cup supplies" },
          { id: "wipes", label: "Wipes or tissues" },
          { id: "underwear", label: "Spare underwear" },
          { id: "pouch", label: "Private disposal pouch" },
          { id: "pain", label: "Comfort / pain-relief items you already use" },
          { id: "treat", label: "A small comfort treat" },
        ],
        answers.items,
      );

      const lines = items.map((item) => `Include: ${item}`);
      if (answers.setting === "travel") {
        lines.push("Pack one extra day of products beyond what you expect.");
      }
      if (answers.size === "tiny") {
        lines.push("Use a slim pouch and keep only the essentials.");
      }
      if (answers.size === "full") {
        lines.push("Consider an everyday organizer with labeled compartments.");
      }
      if (!items.includes("Private disposal pouch")) {
        lines.push("Optional: add a private pouch for discreet disposal.");
      }
      if (lines.length === 0) {
        lines.push("Start with products you trust, wipes, and spare underwear.");
      }
      return lines;
    },
  },
  {
    slug: "workday-period-plan",
    title: "Workday Period Plan",
    summary: "A gentle plan for getting through work or school on a period day.",
    intro:
      "Shape a realistic day. This is practical planning, not medical advice.",
    steps: [
      {
        id: "intensity",
        type: "single",
        question: "How demanding does today feel?",
        options: [
          { id: "light", label: "Manageable" },
          { id: "medium", label: "A bit much" },
          { id: "heavy", label: "Very demanding" },
        ],
      },
      {
        id: "supports",
        type: "multi",
        question: "What support can you use today?",
        options: [
          { id: "supplies", label: "Supplies at my desk or bag" },
          { id: "breaks", label: "Short breaks" },
          { id: "water", label: "Water nearby" },
          { id: "lighter", label: "A lighter task list" },
          { id: "privacy", label: "A more private bathroom route" },
        ],
      },
      {
        id: "boundary",
        type: "single",
        question: "What boundary would help most?",
        options: [
          { id: "meetings", label: "Fewer back-to-back meetings" },
          { id: "commute", label: "A gentler commute plan" },
          { id: "after", label: "Protecting rest after work" },
          { id: "none", label: "Just get through today" },
        ],
      },
    ],
    resultTitle: "Your workday period plan",
    resultIntro: "Keep what helps. Leave the rest.",
    learnLinks: [
      {
        href: "/learn/comfort-on-heavier-days",
        label: "Comfort on heavier days",
      },
      {
        href: "/shop/period-everyday-organizer",
        label: "Period & Everyday Organizer",
      },
    ],
    buildResult(answers) {
      const supports = selectedLabels(
        [
          { id: "supplies", label: "Supplies at my desk or bag" },
          { id: "breaks", label: "Short breaks" },
          { id: "water", label: "Water nearby" },
          { id: "lighter", label: "A lighter task list" },
          { id: "privacy", label: "A more private bathroom route" },
        ],
        answers.supports,
      );

      const lines = [
        "Name one must-do task and one flexible task.",
        ...supports.map((item) => `Plan for: ${item.toLowerCase()}.`),
      ];

      if (answers.intensity === "heavy") {
        lines.push("Protect at least two short reset breaks.");
      }
      if (answers.boundary === "meetings") {
        lines.push("Where possible, leave buffer time between meetings.");
      }
      if (answers.boundary === "after") {
        lines.push("Keep the evening light and rest-friendly.");
      }
      if (answers.boundary === "commute") {
        lines.push("Choose the commute option that feels least stressful today.");
      }
      lines.push("You do not owe anyone a detailed explanation.");
      return lines;
    },
  },
  {
    slug: "questions-for-doctor",
    title: "Questions to Ask Your Doctor",
    summary: "Build a short, calm list of questions for a health visit.",
    intro:
      "This helps you prepare — it does not diagnose or replace professional care.",
    steps: [
      {
        id: "topics",
        type: "multi",
        question: "What do you want to talk about?",
        help: "Choose all that apply.",
        options: [
          { id: "pain", label: "Pain or cramps" },
          { id: "bleeding", label: "Bleeding pattern" },
          { id: "cycle", label: "Cycle timing" },
          { id: "energy", label: "Energy, mood, or sleep" },
          { id: "other", label: "Something else that feels different" },
        ],
      },
      {
        id: "duration",
        type: "single",
        question: "How long have you noticed this?",
        options: [
          { id: "days", label: "A few days" },
          { id: "weeks", label: "A few weeks" },
          { id: "months", label: "Longer" },
          { id: "unsure", label: "I’m not sure" },
        ],
      },
      {
        id: "goals",
        type: "multi",
        question: "What do you hope to leave with?",
        options: [
          { id: "understand", label: "A clearer understanding" },
          { id: "options", label: "Possible next options" },
          { id: "when", label: "When to come back" },
          { id: "urgent", label: "What needs urgent attention" },
        ],
      },
    ],
    resultTitle: "Questions you can take with you",
    resultIntro:
      "Edit these in your own words. Bring notes about timing and what changed.",
    learnLinks: [
      {
        href: "/learn/understanding-your-cycle-basics",
        label: "Understanding your cycle basics",
      },
    ],
    buildResult(answers) {
      const topics = selectedLabels(
        [
          { id: "pain", label: "Pain or cramps" },
          { id: "bleeding", label: "Bleeding pattern" },
          { id: "cycle", label: "Cycle timing" },
          { id: "energy", label: "Energy, mood, or sleep" },
          { id: "other", label: "Something else that feels different" },
        ],
        answers.topics,
      );
      const goals = selectedLabels(
        [
          { id: "understand", label: "A clearer understanding" },
          { id: "options", label: "Possible next options" },
          { id: "when", label: "When to come back" },
          { id: "urgent", label: "What needs urgent attention" },
        ],
        answers.goals,
      );

      const lines: string[] = [];
      for (const topic of topics) {
        lines.push(`What could be connected to my ${topic.toLowerCase()}?`);
      }
      if (answers.duration) {
        lines.push(
          "I have noticed this for a while — what details would help you understand my timeline?",
        );
      }
      if (goals.includes("Possible next options")) {
        lines.push("What options are reasonable for someone in my situation?");
      }
      if (goals.includes("When to come back")) {
        lines.push("When should I follow up if nothing changes?");
      }
      if (goals.includes("What needs urgent attention")) {
        lines.push("Which symptoms mean I should seek care sooner?");
      }
      if (lines.length === 0) {
        lines.push("What feels most important to check based on what I described?");
      }
      lines.push("Is there anything I should track before my next visit?");
      return lines;
    },
  },
];

export function getToolDefinition(slug: string) {
  return toolDefinitions.find((tool) => tool.slug === slug);
}

export function listTools() {
  return toolDefinitions.map(({ slug, title, summary }) => ({
    slug,
    title,
    summary,
  }));
}
