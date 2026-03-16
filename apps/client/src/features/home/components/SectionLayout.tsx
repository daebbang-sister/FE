import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@repo/ui";

type Props = {
  title: string;
  description?: string;
  moreLink: string;
  children: ReactNode;
};

export default function SectionLayout({
  title,
  description,
  moreLink,
  children,
}: Props) {
  return (
    <div>
      <div className="mb-18 text-center">
        <h2 className="title2">{title}</h2>
        {description && (
          <p className="text-text-disabled mt-4">{description}</p>
        )}
      </div>

      {children}

      <div className="mt-30 flex justify-center">
        <Link href={moreLink}>
          <Button variant="stroke" className="w-67.5">
            전체 보러 가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
