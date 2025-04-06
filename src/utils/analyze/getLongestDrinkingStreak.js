export function getLongestDrinkingStreak(values, personIndex) {
    let maxStreak = 0;
    let currentStreak = 0;

    for (const row of values) {
        const val = row[personIndex];
        if (val > 0) {
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
