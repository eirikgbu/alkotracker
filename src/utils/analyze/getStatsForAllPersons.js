export default function getStatsForAllPersons(data) {
    const { names, values } = data;
  
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
      const weeklyAvg = (avg * 7).toFixed(2);  // Ukentlig snitt beregnet
      const monthlyAvg = (avg * 365/12).toFixed(2);  // Månedlig snitt beregnet
      const yearlyAvg = (avg * 365).toFixed(0);  // Årlig snitt beregnet
  
      return { name, total, avg: avg.toFixed(2), weeklyAvg, monthlyAvg, yearlyAvg };  // Runder kun på visning
    }).sort((a, b) => b.total - a.total);
  }
  