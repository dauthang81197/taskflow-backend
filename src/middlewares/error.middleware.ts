import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err);
  console.error("❌ Error:", next);
  let message = "Internal Server Error";
  let status = 500;

  if (err instanceof Error) {
    message = err.message;
  }

  // Nếu bạn muốn hỗ trợ custom error có status
  if (typeof err === "object" && err !== null && "status" in err) {
    const typedErr = err as { status?: number; message?: string };
    status = typedErr.status ?? status;
    message = typedErr.message ?? message;
  }

  res.status(status).json({
    success: false,
    message,
  });
};
