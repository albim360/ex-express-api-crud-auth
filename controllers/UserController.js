const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const prisma = new PrismaClient();

async function signup(req, res) {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    res.status(500).json({ error: "Errore durante la registrazione" });
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Email non valida" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Password non valida" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Errore durante il login:", error);
    res.status(500).json({ error: "Errore durante il login" });
  }
}
