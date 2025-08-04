"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./auth.module.scss";
import axios from "axios";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validatePhone = (value: string) => {
    const pattern = /^09\d{9}$/;
    return pattern.test(value);
  };

  const handleLogin = async () => {
    if (!validatePhone(phone)) {
      setError("شماره تلفن نامعتبر است.");
      return;
    }

    try {
      const res = await axios.get(
        "https://randomuser.me/api/?results=1&nat=us"
      );
      const user = res.data.results[0];
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>ورود</h2>
      <Input
        label="شماره موبایل"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="مثلاً 09123456789"
        error={error}
      />
      <Button onClick={handleLogin}>ورود</Button>
    </div>
  );
}
