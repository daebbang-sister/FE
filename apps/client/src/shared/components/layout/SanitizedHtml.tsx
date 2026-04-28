"use client";
import DOMPurify from "dompurify";

type Props = {
  content: string;
};

export default function SanitizedHtml({ content }: Props) {
  const safeHTML = DOMPurify.sanitize(content);

  return (
    <section
      className="quill-content my-10"
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
}
