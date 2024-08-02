"use client";

import { useGetDay } from "@/actions/queries";
import Vocabulary from "./vocabulary/vocabulary";

export default function Day({ weekId, dayId }) {
  const { data: day, error } = useGetDay({ weekId, dayId });
  console.log({ day: day.data, error });
  console.log(
    JSON.stringify({
      ...day.data.vocabulary,
      ...day.data.phrases,
      ...day.data.grammar,
      ...day.data.reading,
      ...day.data.writing,
      ...day.data.worksheet,
    })
  );

  return <div>YOOOOOOOOOOOOO</div>;
}
