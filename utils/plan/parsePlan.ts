
export function parseLearningSyllabus(input) {
  const lines = input
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.startsWith("PLAN_NAME;"));

  const plan = {
    plan_name: "",
    weeks: [],
  };

  let currentWeek = null;

  lines.forEach((line) => {
    const [planName, weekNum, dayNum, title, description, vocab, phrases, reading, writing, worksheet] = line.split(";");

    if (!plan.plan_name) {
      plan.plan_name = planName;
    }

    const weekNumber = parseInt(weekNum);
    const dayNumber = parseInt(dayNum);

    if (dayNumber === 0) {
      // Week-level information
      currentWeek = {
        number: weekNumber,
        title: title,
        description: description,
        days: [],
      };
      plan.weeks.push(currentWeek);
    } else if (currentWeek) {
      // Day-level information
      const day = {
        number: dayNumber,
        title: title,
        description: description,
        sections: {
          vocabulary: { description: vocab },
          phrases: { description: phrases },
          reading: { description: reading },
          writing: { description: writing },
          worksheet: { description: worksheet },
        },
      };
      currentWeek.days.push(day);
    }
  });

  return plan;
}