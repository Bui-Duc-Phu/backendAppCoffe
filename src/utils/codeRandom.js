function codeRandom(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

module.exports = codeRandom