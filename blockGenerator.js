const constants = require('./consts');


module.exports = {
  generateBlock: (side) => {
    const weight = Math.floor(Math.random() * constants.maxWeight) + constants.minWeight;
    return {
      weight: weight,
      shape: constants.shapes[Math.floor(Math.random() * constants.shapes.length)],
      color: constants.colors[Math.floor(Math.random() * constants.colors.length)],
      step: Math.floor(Math.random() * constants.lastStep) + constants.firstStep,
      size: weight * 10,
      side: side
    }
  }
};
