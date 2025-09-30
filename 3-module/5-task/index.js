function getMinMax(str) {
  let parts = str.split(' ');
  let numbers = parts
    .map(item => parseFloat(item))
    .filter(num => !isNaN(num));
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}