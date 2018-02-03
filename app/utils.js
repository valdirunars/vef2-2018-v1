//
// utils.js
// -----------------------

const errors = {
    invalidInput: {
        formatDate: new Error(`Cannot initiate Date from input`)
    }
}

function isValidDate(date) {
    return Object.prototype.toString.call(date) === "[object Date]" && isNaN(date.getTime()) === false;
}

function formatDate(dateString) {
    let date = new Date(dateString);

    if (false === isValidDate(date)) {
        throw errors.invalidInput.formatDate;
    }

    let day = date.getDate();

    // plus one to account for zero-indexing
    let month = date.getMonth() + 1;

    let year = date.getFullYear();

    return `${day}.${month}.${year}`
}

module.exports = {
    formatDate: formatDate,
    errors: errors
}
