const calculateEnergyScore = (playList) => {
  const rawScore =
    playList?.reduce((acc, current) => acc + current.energy, 0) /
    playList?.length;

  const formattedScore = Math.floor(rawScore) * 100;

  return formattedScore;
};

export default calculateEnergyScore;
