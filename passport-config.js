const { getUserByNumeroAluno, getUserByEmail } = require('./database/users')

const LocalStrategy = require('passport-local').Strategy

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)

        if (user == null) {
            return done(null, false, {message: 'No user with that email'})
        }
        try {
            if (password != user.password) {
                return done(null, false, {message: 'Password incorrect'})
            }
            else {
                return done(null, user)
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, 
    authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, user.numeroAluno)
    })
    passport.deserializeUser(async (id, done) => {
        const userByNA = await getUserByNumeroAluno(id);
        return done(null, userByNA)
    })
}

module.exports = initialize