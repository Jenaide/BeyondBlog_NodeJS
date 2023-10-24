/** user middleware
 * check login 
**/
const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}