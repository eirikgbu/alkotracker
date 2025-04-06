export function getMaxUnitsInOneDay(values, personIndex) {
    let maxUnits = 0;

    for (const row of values) {
        const val = row[personIndex];
        if (val > maxUnits) {
            maxUnits = val;
        }
    }
    return maxUnits;
}
