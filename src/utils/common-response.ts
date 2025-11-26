export class CommonResponse {
  static success(res, data = null, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, message = "Error", statusCode = 400, errorCode = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errorCode,
    });
  }

  static paginated<T extends object>(res, data: T, message = "Success") {
    return res.status(200).json({
      success: true,
      message,
      ...data,
    });
  }
}
