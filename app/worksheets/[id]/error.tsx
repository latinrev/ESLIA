'use client'

import StylizedButton from "@/components/StylizedButton"
import { Button } from "@/components/worksheet/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Error(){
    const router = useRouter()
    return <div className="text-4xl center flex-col gap-4">
        Parece que te has perdido 😅😄
        <Link href='/worksheets'>
        <Button >
            Volver a mis hojas de ejercicios
        </Button>
        </Link>
    </div>
}