module.exports = function (source) {
    const callback = this.async();
    const newSource = source.replace(/\('node:([^']+)'\)/g, "('$1')");

    // Asynchronously return the result
    callback(null, newSource);
};