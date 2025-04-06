import { getLongestDrinkingStreak } from './getLongestDrinkingStreak';

export default function getStatsForAllPersons(data) {
  const { names, values } = data;

  // Finn lengste edru-periode for en person (0-enheter på rad)
  function getLongestSoberStreak(values, personIndex) {
    let maxStreak = 0;
    let currentStreak = 0;

    for (const row of values) {
      const val = row[personIndex];
      if (val === 0) {
        currentStreak++;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    }

    return maxStreak;
  }

  return names.map((name, i) => {
    let total = 0;
    let registeredDays = 0;

    values.forEach(row => {
      const val = row[i];
      if (val !== "" && val !== null && val !== undefined && !isNaN(val)) {
        total += val;
        registeredDays += 1;
      }
    });

    const avg = registeredDays > 0 ? total / registeredDays : 0;
    const weeklyAvg = (avg * 7).toFixed(2);
    const monthlyAvg = (avg * 365 / 12).toFixed(2);
    const yearlyAvg = (avg * 365).toFixed(0);
    const longestSoberStreak = getLongestSoberStreak(values, i);
    const longestDrinkingStreak = getLongestDrinkingStreak(values, i);

    return {
      name,
      total,
      avg: avg.toFixed(2),
      weeklyAvg,
      monthlyAvg,
      yearlyAvg,
      longestSoberStreak,
      longestDrinkingStreak,
    };
  }).sort((a, b) => b.total - a.total);
}
