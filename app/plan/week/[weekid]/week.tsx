"use client";
import { getPlan } from "@/actions/calls";
import { useGetPlan, useGetWeek } from "@/actions/queries";
import { Card } from "@/components/Card";

export default function Week({ id }) {
  const { data: plan, error } = useGetWeek({ weekId: id });

  return (
    <div className="px-36">
      <h1 className="text-8xl font-bold">Semanas</h1>
      <h1 className="text-8xl font-bold text-primary">{plan?.data.plan_name}</h1>
      <div className="grid grid-cols-2 gap-16 gap-y-32 py-32">
        {plan?.data?.map((day) => (
          <Card to={`${id}/day/${day.id}`} item={day}></Card>
        ))}
      </div>
    </div>
  );
}
