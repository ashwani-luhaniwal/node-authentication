const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');

// Facebook Strategy
const FacebookTokenStrategyCallback = (accessToken, refreshToken, profile, done) => done(null, {
    accessToken,
    refreshToken,
    profile
});

passport.use(new FacebookTokenStrategy({
    clientID: '396970137541614',
    clientSecret: 'd51befba23c7f0edfe68354f4733174c'
}, FacebookTokenStrategyCallback));

// Google Strategy
/* const GoogleTokenStrategyCallback = (accessToken, refreshToken, profile, done) => done(null, {
    accessToken,
    refreshToken,
    profile
});

passport.use(new GoogleTokenStrategy({
    clientID: 'your-google-client-id',
    clientSecret: 'your-google-client-secret'
}, GoogleTokenStrategyCallback)); */

// authenticate function
const authenticateFacebook = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('facebook-token', { session: false }, (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
    })(req, res);
});

const authenticateGoogle = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('google-token', { session: false }, (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
    })(req, res);
});

module.exports = { authenticateFacebook, authenticateGoogle };
