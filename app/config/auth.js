exports.jwt = {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_TOKEN_EXPIRY ? process.env.JWT_TOKEN_EXPIRY : 3600,
    refresh_token_expiry: process.env.JWT_TOKEN_REFRESH_EXPIRY ? process.env.JWT_TOKEN_REFRESH_EXPIRY : 3660
};
