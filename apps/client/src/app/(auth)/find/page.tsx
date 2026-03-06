"use client";

import FindIdForm from "@/features/auth/components/FindIdForm";
import FindPasswordForm from "@/features/auth/components/FindPasswordForm";
import { TabButton } from "@repo/ui";
import { useState } from "react";

export default function Findpage() {
  const [tab, setTab] = useState(0);

  return (
    <section className="max-97.5 page-y w-97.5">
      <h1 className="title2 mb-12 text-center">아이디 / 비밀번호 찾기</h1>

      <div className="mb-9">
        <TabButton
          tabs={["아이디 찾기", "비밀번호 찾기"]}
          size="M"
          defaultIndex={0}
          onChange={setTab}
          className="w-full"
        />
      </div>

      {tab === 0 && <FindIdForm />}
      {tab === 1 && <FindPasswordForm />}
    </section>
  );
}
