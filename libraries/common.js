module.exports.dayLeft = (date) => {
  return Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24));
};
