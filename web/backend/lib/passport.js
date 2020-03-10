module.exports = function (app) {
    var database = require("./database");
    async function findUser(id, pw) {
        let data;
        let user = await database.findOneListing("users", {
            id: id,
            pw: pw
        });
        if (user) {
            data={
                id:user.id,
                user_name:user.user_name,
                nickname:user.nickname
            }
        } else {
            user = await database.findOneListing("doctors", {
                id: id,
                pw: pw
            });
            if(user){
                data={
                    id:user.id,
                    doctor_name:user.doctor_name
                }
            }
        }
        return data;
    }

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        console.log("serializeUser");
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        console.log("deserializeUser");
        done(null, id);
    });

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        session: true,
    },
        async function (id, pw, done) {
            const user = await findUser(id, pw);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
    ));
    return passport;
}