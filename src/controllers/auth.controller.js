import { createHash, isValidPassword, generateJWToken } from "../dirname.js";
import { userService, authService } from "../services/services.js";

export const registerUserController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingUserName = await userService.findByName(userName);

    console.log(existingUserName);

    if (existingUserName) {
      return res
        .status(400)
        .json({ error: "El nombre de usuario ya está en uso." });
    }

    const existingEmail = await userService.findByEmail(email);

    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Formato de correo electrónico inválido." });
    }

    const hashedPassword = createHash(password);
    const newUser = {
      userName,
      email,
      password: hashedPassword,
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await authService.save(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al registrar al usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - Todos los campos deben ser obligatorios`
      );
      return res
        .status(400)
        .json({ error: "Se requieren correo electrónico y contraseña." });
    }
    const user = await userService.findByEmail(email);
    if (user === null || !isValidPassword(user, password)) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [DELETE] ${
          req.originalUrl
        } Correo electrónico o contraseña incorrectos.`
      );
      return res
        .status(401)
        .json({ error: "Correo electrónico o contraseña incorrectos." });
    }
    const token = generateJWToken(user);
    req.logger.info(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Sesión iniciada`
    );
    return res.status(200).json({
      status: "Sesión iniciada",
      token: token,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Error al iniciar sesión:`,
      error
    );
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};
