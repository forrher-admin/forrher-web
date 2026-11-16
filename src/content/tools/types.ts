export type ToolOption = {
  id: string;
  label: string;
};

export type ToolStep =
  | {
      id: string;
      type: "single";
      question: string;
      help?: string;
      options: ToolOption[];
    }
  | {
      id: string;
      type: "multi";
      question: string;
      help?: string;
      options: ToolOption[];
    };

export type ToolDefinition = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  steps: ToolStep[];
  resultTitle: string;
  resultIntro: string;
  learnLinks: { href: string; label: string }[];
  /** Builds result lines from answers. */
  buildResult: (answers: Record<string, string | string[]>) => string[];
};
