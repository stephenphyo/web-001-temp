const cookieOptions = {
    httpOnly: false,             // Prevent XSS Attacks
    sameSite: 'Strict',        // Prevent CSRF Attacks
    secure: process.env.NODE_ENV !== 'Development'
};

module.exports = cookieOptions;