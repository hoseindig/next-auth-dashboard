"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import Loading from "@/components/Loading";
// import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      //fake wait
      const user = getUser();
      if (!user) {
        router.replace("/auth");
      } else router.replace("/dashboard");
    }, 1000);
  }, []);

  return (
    <>
      <Loading />
    </>
  );
}
