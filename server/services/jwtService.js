import { JWT_ACCESS_SECRET } from "../config";
import jwt from "jsonwebtoken";

class jwtService {
  static sign(payload, secret = JWT_ACCESS_SECRET, expiry = "15m") {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = JWT_ACCESS_SECRET) {
    return jwt.verify(token, secret);
  }
}

export default jwtService;
