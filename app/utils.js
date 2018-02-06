//
// utils.js
// -----------------------

const errors = {
  invalidInput: {
    formatDate: new Error('Cannot initiate Date from input'),
  },
};

function isValidDate(date) {
  return Object.prototype.toString.call(date) === '[object Date]' && Number.isNaN(date.getTime()) === false;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  if (isValidDate(date) === false) {
    throw errors.invalidInput.formatDate;
  }

  const day = date.getDate();

  // plus one to account for zero-indexing
  const month = date.getMonth() + 1;

  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

module.exports = {
  formatDate,
  errors,
};
