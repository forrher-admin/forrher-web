import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

type MarkdownProps = {
  content: string;
  className?: string;
};

export function Markdown({ content, className = "" }: MarkdownProps) {
  return (
    <div className={`space-y-4 text-base text-text ${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-heading text-3xl text-text">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-heading text-2xl text-text">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-heading text-xl text-text">{children}</h3>
          ),
          p: ({ children }) => <p className="text-muted">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-5 text-muted">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-5 text-muted">{children}</ol>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline underline-offset-2"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
