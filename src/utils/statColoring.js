export const getGradientColor = (value, min, max, inverted = false) => {
    if (max === min) return "#ffffff";
    const ratio = (value - min) / (max - min);
    const adjustedRatio = inverted ? 1 - ratio : ratio;
    const hue = 120 * adjustedRatio;
    return `hsl(${hue}, 75%, 75%)`;
};

export const getMinMaxPerRow = (stats, visibleRows) => {
    const result = {};
    visibleRows.forEach(({ key }) => {
        const values = stats
            .map((s) => parseFloat(s[key]))
            .filter((v) => !isNaN(v));
        result[key] = {
            min: Math.min(...values),
            max: Math.max(...values),
        };
    });
    return result;
};
