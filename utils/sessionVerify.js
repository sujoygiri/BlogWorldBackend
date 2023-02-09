const verifySession = async (req, res, next) => {
    let userId = req.session.userId
    if (userId) {
        // let sessionData = await req.sessionStore.get(userId)
        res.locals.userId = userId
        next()
    } else {
        let error = new Error('You are not logged in')
        error.status = 401
        next(error)
    }
};

module.exports = verifySession