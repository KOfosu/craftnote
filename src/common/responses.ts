import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export default class Responses {
  static success(res: Response, data: any,) {
    return res.status(HttpStatus.OK).json(data);
  }

  static badRequest(res: Response, message: string) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message });
  }
}