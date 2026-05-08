"use client";

import { useEffect, useState } from "react";
import {
  deleteUserAPI,
  getUserProfileAPI,
  updateUserProfileAPI,
} from "@/features/mypage/api";
import { UpdateUserInfo } from "@/features/mypage/model";
import ProfilePassword from "@/features/mypage/components/ProfilePassword";
import ProfilePhoneNumber from "@/features/mypage/components/ProfilePhoneNumber";
import ProfileEmail from "@/features/mypage/components/ProfileEmail";
import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";
import { Button, Input } from "@repo/ui";
import PageLoading from "@/shared/components/layout/PageLoading";
import {
  ProfileFormValues,
  updateSchema,
} from "@/features/mypage/schemas/update-profile.schema";
import { toUpdateUserProfileRequest } from "@/features/mypage/mapper/profile.mapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/shared/lib/error";
import { useAuthStore } from "@/shared/store/auth.store";
import { logoutUser } from "@/features/auth/api";
import AddressForm from "@/shared/components/form/AddressForm";

export default function ProfileForm() {
  const { logout } = useAuthStore();
  const {
    register,
    trigger,
    getValues,
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(updateSchema),
    mode: "onBlur",
  });

  const [userInfo, setUserInfo] = useState<UpdateUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await getUserProfileAPI();
        setUserInfo(res);

        const [phone1, phone2, phone3] = res.userPhoneNumber.split("-");
        reset({
          userEmail: res.userEmail,
          phone1,
          phone2,
          phone3,
          userPassword: "",
          userPasswordCheck: "",
        });
        // console.log(res, "내정보");
      } catch (err) {
        setIsError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const onSubmitt = async (data: ProfileFormValues) => {
    const currentPhone = `${data.phone1}-${data.phone2}-${data.phone3}`;
    const originalPhone = userInfo?.userPhoneNumber;
    const isPhoneChanged = currentPhone !== originalPhone;
    if (isPhoneChanged && !isPhoneVerified) {
      setError("phone1", {
        type: "manual",
        message: "전화번호 변경 시 인증이 필요합니다.",
      });
      return;
    }

    const payload = toUpdateUserProfileRequest(data);
    try {
      await updateUserProfileAPI(payload);
      alert(
        "회원 정보 수정에 성공했습니다.\n다시 로그인 후 이용 부탁드립니다."
      );
      await logoutUser();
      logout();
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const fetchDeleteUser = async () => {
    const conf = confirm(
      "회원 탈퇴를 하시겠습니까?\n탈퇴 후 계정을 복구할 수 없습니다."
    );
    if (!conf) {
      return;
    }
    try {
      await deleteUserAPI();
      alert("회원탈퇴");
      await logoutUser();
      logout();
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("회원탈퇴 중 오류가 발생했습니다.");
      }
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }
  if (isError) {
    return <p>적립금 정보를 불러오지 못했습니다.</p>;
  }

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmitt)}>
        <div>
          <SignUpInputLabel htmlFor="userName" required>
            이름
          </SignUpInputLabel>
          <Input
            id="userName"
            type="text"
            placeholder={`${userInfo?.userName}`}
            status={"disabled"}
          />
        </div>
        <div>
          <SignUpInputLabel htmlFor="userId" required>
            아이디
          </SignUpInputLabel>
          <Input
            id="userId"
            type="text"
            placeholder={`${userInfo?.loginId}`}
            status={"disabled"}
          />
        </div>
        <ProfilePassword
          register={register}
          errors={errors}
          trigger={trigger}
        />
        <ProfilePhoneNumber
          register={register}
          errors={errors}
          control={control}
          trigger={trigger}
          getValues={getValues}
          setIsPhoneVerified={setIsPhoneVerified}
        />
        <ProfileEmail register={register} errors={errors} />
        <AddressForm />
        <Button type="submit" variant="gray" className="mt-6">
          수정
        </Button>
      </form>
      <div className="mt-18 flex justify-center">
        <p
          className="caption1 text-text-disabled cursor-pointer underline"
          onClick={fetchDeleteUser}
        >
          회원탈퇴
        </p>
      </div>
    </>
  );
}
