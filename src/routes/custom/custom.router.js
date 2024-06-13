import { Router } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import config from "../../config/config.js";
import { getCookie } from "../../middlewars/getCookie.js";
import multer from "multer";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.upload = multer({ dest: "uploads/" });
    this.init();
  }

  getRouter() {
    return this.router;
  }
  init() {
    this.router.use(cookieParser());
    this.router.use(getCookie);
  }

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      getCookie,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      getCookie,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      getCookie,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      getCookie,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  handlePolicies = (policies) => async (req, res, next) => {
    try {
      if (policies.includes("PUBLIC")) return next();

      const cookies = req.headers.cookie;
      if (!cookies) {
        req.logger.info(
          `[${new Date().toLocaleString()}] [handlePolicies] ${
            req.originalUrl
          } Cookies no encontradas`
        );
        return res.status(401).send("Cookies no encontradas");
      }

      const cookieArray = cookies.split(";").map((cookie) => cookie.trim());

      let token;
      for (const cookie of cookieArray) {
        if (cookie.startsWith("token=")) {
          token = cookie.split("token=")[1];
          break;
        }
      }

      if (!token) {
        req.logger.info(
          `[${new Date().toLocaleString()}] [handlePolicies] ${
            req.originalUrl
          } Token no encontrado en las cookies`
        );
        return res.status(401).send("Token no encontrado en las cookies");
      }

      jwt.verify(token, config.privateKey, (error, credential) => {
        if (error) {
          req.logger.info(
            `[${new Date().toLocaleString()}] [handlePolicies] ${
              req.originalUrl
            } Token inválido o expirado`
          );
          return res.status(403).send("Token inválido o expirado");
        }

        const user = credential.user;

        if (!policies.includes(user.role.toUpperCase())) {
          req.logger.info(
            `[${new Date().toLocaleString()}] [handlePolicies] ${
              req.originalUrl
            } El usuario no tiene privilegios, revisa tus roles!`
          );
          return res
            .status(403)
            .send("El usuario no tiene privilegios, revisa tus roles!");
        }

        req.user = user;
        next();
      });
    } catch (error) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [handlePolicies] ${
          req.originalUrl
        } Error interno del servidor: ${error.message}`
      );
      res.status(500).render("error", {
        error: "Error interno del servidor",
        cssFileName: "error.css",
      });
    }
  };

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) =>
      res.status(200).send({ status: "Success", payload });
    res.sendInternalServerError = (error) =>
      res.status(500).send({ status: "Error", error });
    res.sendClientError = (error) =>
      res
        .status(400)
        .send({ status: "Client Error, Bad request from client.", error });
    res.sendUnauthorizedError = (error) =>
      res
        .status(401)
        .send({ error: "User not authenticated or missing token." });
    res.sendForbiddenError = (error) =>
      res.status(403).send({
        error:
          "Token invalid or user with no access, Unauthorized please check your roles!",
      });
    next();
  };

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...item) => {
      try {
        await callback.apply(this, item);
      } catch (error) {
        console.error(error);
        item[1].status(500).send(error);
      }
    });
  }
}
