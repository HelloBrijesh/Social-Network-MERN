import { JWT_ACCESS_SECRET, ACCESS_TOKEN_EXIRY } from "../config";
import jwt from "jsonwebtoken";

class jwtService {
  static sign(
    payload,
    secret = JWT_ACCESS_SECRET,
    expiry = ACCESS_TOKEN_EXIRY
  ) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = JWT_ACCESS_SECRET) {
    return jwt.verify(token, secret);
  }
}

export default jwtService;
