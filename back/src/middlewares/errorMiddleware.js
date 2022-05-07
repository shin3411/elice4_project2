function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  if (process.env.NODE_ENV !== 'production') {
    console.log("\x1b[35m%s\x1b[0m", error);
  } else {
    logger.error( error.message );
  }
  res.status(400).send({ errorMessage: error.message });
}

export { errorMiddleware };
