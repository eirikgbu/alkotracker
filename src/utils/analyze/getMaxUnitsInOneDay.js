export function getMaxUnitsInOneDay(days, values, personIndex) {
    let maxUnitsInOneDay = 0;
    let maxUnitsInOneDayDates = [];

    for (let i = 0; i < values.length; i++) {
        const val = values[i][personIndex];
        const day = days[i];

        if (val > maxUnitsInOneDay) {
            maxUnitsInOneDay = val;
            maxUnitsInOneDayDates = [day];
        } else if (val === maxUnitsInOneDay) {
            maxUnitsInOneDayDates.push(day);
        }
    }

    return { maxUnitsInOneDay, maxUnitsInOneDayDates };
}
