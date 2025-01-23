module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Simple check (replace with JWT or session check)
  if (authorization !== "Bearer mock-token") {
    return res.status(401).json({ error: "Invalid token" });
  }

  next();
};
