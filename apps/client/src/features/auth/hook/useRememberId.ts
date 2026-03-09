import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type LoginFormValues = {
  id: string;
  password: string;
};

type useRememberIdParams = {
  setValue: UseFormSetValue<LoginFormValues>;
};

const STORAGE_KEYS = {
  REMEMBER_ID: "login_remember_id",
  SAVED_ID: "login_saved_id",
} as const;

export function useRememberId({ setValue }: useRememberIdParams) {
  const [rememberId, setRememberId] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ID) === "true";
  });

  useEffect(() => {
    if (!rememberId) return;

    const savedId = localStorage.getItem(STORAGE_KEYS.SAVED_ID);
    if (savedId) {
      setValue("id", savedId, { shouldValidate: true });
    }
  }, [setValue, rememberId]);

  function handleRememberIdChange(checked: boolean) {
    setRememberId(checked);

    localStorage.setItem(STORAGE_KEYS.REMEMBER_ID, String(checked));

    if (!checked) {
      localStorage.removeItem(STORAGE_KEYS.SAVED_ID);
      setValue("id", "", { shouldValidate: true });
    }
  }

  const saveId = (id: string) => {
    if (rememberId) {
      localStorage.setItem(STORAGE_KEYS.SAVED_ID, id);
      return;
    } else {
      localStorage.removeItem(STORAGE_KEYS.SAVED_ID);
    }
  };

  return {
    rememberId,
    handleRememberIdChange,
    saveId,
  };
}
