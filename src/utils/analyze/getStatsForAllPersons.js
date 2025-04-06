import { getLongestDrinkingStreak } from './getLongestDrinkingStreak';
import { getLongestSoberStreak } from './getLongestSoberStreak';
import { getMaxUnitsInOneDay } from './getMaxUnitsInOneDay';

export default function getStatsForAllPersons(data) {
  const { days, names, values } = data;

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
    const { maxUnitsInOneDay, maxUnitsInOneDayDates } = getMaxUnitsInOneDay(days, values, i);
    console.log(name, "maxUnitsInOneDayDates", maxUnitsInOneDayDates);

    return {
      name,
      total,
      avg: avg.toFixed(2),
      weeklyAvg,
      monthlyAvg,
      yearlyAvg,
      longestSoberStreak,
      longestDrinkingStreak,
      maxUnitsInOneDay,
      maxUnitsInOneDayDates
    };
  }).sort((a, b) => b.total - a.total);
}
