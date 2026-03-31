"use client";

import * as React from "react";
import { Bold, Heading2, Heading3, Italic, Link as LinkIcon, List, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type BlogEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type EditorAction = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: (selectedText: string) => string;
};

const editorActions: EditorAction[] = [
  { label: "H2", icon: Heading2, action: (text) => `## ${text || "Section title"}` },
  { label: "H3", icon: Heading3, action: (text) => `### ${text || "Subsection title"}` },
  { label: "Bold", icon: Bold, action: (text) => `**${text || "bold text"}**` },
  { label: "Italic", icon: Italic, action: (text) => `*${text || "emphasis"}*` },
  { label: "List", icon: List, action: (text) => `- ${text || "List item"}` },
  { label: "Quote", icon: Quote, action: (text) => `> ${text || "Quoted text"}` },
  { label: "Link", icon: LinkIcon, action: (text) => `[${text || "Link text"}](https://example.com)` },
];

export default function BlogEditor({ value, onChange, placeholder }: BlogEditorProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const applyAction = (formatter: (selectedText: string) => string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const selectedText = value.slice(start, end);
    const replacement = formatter(selectedText);
    const nextValue = `${value.slice(0, start)}${replacement}${value.slice(end)}`;

    onChange(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursorPosition = start + replacement.length;
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 p-3">
        {editorActions.map(({ label, icon: Icon, action }) => (
          <Button
            key={label}
            type="button"
            variant="outline"
            size="sm"
            className="h-9 rounded-lg bg-white"
            onClick={() => applyAction(action)}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={14}
        className="min-h-[320px] resize-y rounded-none border-0 bg-transparent px-4 py-4 font-mono text-sm leading-7 shadow-none focus-visible:ring-0"
      />

      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500">
        Supports headings, bold, italic, bullet lists, blockquotes, and links using markdown-style formatting.
      </div>
    </div>
  );
}
