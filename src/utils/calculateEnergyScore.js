const calculateEnergyScore = (energyScore) => {
  const score = energyScore.reduce((acc, cur) => acc + cur, 0);
  const finalScore = Math.floor((score * 100) / energyScore.length);

  return finalScore;
};

export default calculateEnergyScore;
