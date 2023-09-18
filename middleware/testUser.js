


export const testUser = (req, res, next) => {
    console.log(req.user.testUser,'dddd')
    if (!req.user.testUser) {
        next()
    }else {
        throw new Error('test user. read only!')

    }
}