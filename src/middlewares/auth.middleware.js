export const authMiddleware = (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader) return next();

    if (!tokenHeader.startsWith("Bearer"))
      return res.status(400).json({ error: "Token must start with Bearer" });

    const token = tokenHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decode;

    return next();
  } catch (error) {
    next();
  }
};
