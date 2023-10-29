import jwt from "jsonwebtoken";

const secretKey = "secretkeyappearshere";

class TokenAuth {
  static authToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Token is missing." });
    }

    try {
      const decoded = jwt.verify(token, secretKey);

      req.user = decoded;

      next();
    } catch (error) {
      res.status(403).json({ message: "Access denied. Invalid token." });
    }
  };
}

module.exports = TokenAuth;
