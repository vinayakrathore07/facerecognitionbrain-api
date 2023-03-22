const handleRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "unable to register" });
  }
};
