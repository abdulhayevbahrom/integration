class response {
  success(res, msg = "success", data = null) {
    return res.status(200).json({
      status: "success",
      message: msg,
      data: data,
    });
  }

  error(req, msg = "error", data = null) {
    return res.status(200).json({
      status: "error",
      message: msg,
      data: data,
    });
  }

  warning(res, msg = "warning", data = null) {
    return res.status(200).json({
      status: "warning",
      message: msg,
      data: data,
    });
  }

  notFound(res, msg = "not found", data = null) {
    return res.status(200).json({
      status: "not found",
      message: msg,
      data: data,
    });
  }

  serverError(res, msg = "server error", data = null) {
    return res.status(200).json({
      status: "server error",
      message: msg,
      data: data,
    });
  }
}

module.exports = new response();
