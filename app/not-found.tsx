"use client";

import StylizedButton from "@/components/StylizedButton";
import { Button } from "@/components/worksheet/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="center flex-col gap-4 text-4xl">
      Parece que te has perdido 😅😄
      <Link href="/">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}
