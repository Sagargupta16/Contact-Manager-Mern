const GRADIENT_PAIRS = [
  ["#c2704e", "#d4a574"],
  ["#8b6d5c", "#b8977e"],
  ["#a85d3e", "#c98b6a"],
  ["#9b7653", "#c4a882"],
  ["#b5654a", "#dab894"],
  ["#7a6352", "#a89078"],
];

export const getGradient = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.codePointAt(i) + ((hash << 5) - hash);
  }
  const pair = GRADIENT_PAIRS[Math.abs(hash) % GRADIENT_PAIRS.length];
  return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
};
