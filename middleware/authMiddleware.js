import jwt from 'jsonwebtoken'


export const authenticateUser = (req, res, next) => {

    const { token } = req.cookies
    if (!token) throw new Error('authentication invalid');
  
    try {
      let decoded = jwt.verify(token,'Mohamed')
      const {userId,email,name,role} = decoded
      const testUser = userId === '6502f84ac56ad737ad8ad829'
      req.user = {userId,email,name,role,testUser}
      next();
    } catch (error) {
      throw new Error('authentication invalid');
    }
  };
  