function convertLiteral2Age(literal) {
    const match = literal.match(/^(\d+)([a-zA-Z]+)$/);
    if (!match) {
        return undefined;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    let factor;
    switch (unit) {
        case 'd':
            factor = 24 * 3600 * 1000;
            break;
        case 'h':
            factor = 3600 * 1000;
            break;
        case 'm':
            factor = 60 * 1000;
            break;
        case 's':
            factor = 1000;
            break;
        case 'ms':
            factor = 1;
            break;
    }

    // Return the string representing the mathematical expression
    return value * factor;
}

module.exports = convertLiteral2Age;