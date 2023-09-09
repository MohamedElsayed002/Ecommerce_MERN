import jwt from 'jsonwebtoken'


export const authenticateUser = (req, res, next) => {

    const { token } = req.cookies
    if (!token) throw new Error('authentication invalid');
  
    try {
      let decoded = jwt.verify(token,'Mohamed')
      const {userId,email,name,role} = decoded
      req.user = {userId,email,name,role}
      next();
    } catch (error) {
      throw new Error('authentication invalid');
    }
  };
  