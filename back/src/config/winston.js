import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import moment from "moment";
import "moment-timezone";

const logDir = __dirname + '/logs';  // 로그 파일 저장 경로 설정
const { combine, printf } = winston.format;

// 한국 시간 설정
moment.tz.setDefault("Asia/Seoul");
const timestamp = () => moment().format("YYYY-MM-DD HH:mm:ss");

// log level
const levels = { 
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'cyan',
}

// Define log format
const logFormat = printf(({ level, message }) => {
  return `${timestamp()} ${level}: ${message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    // timestamp({
    //   format: 'YYYY-MM-DD HH:mm:ss',
    // }),
    logFormat,
  ),
  transports: [
    // http 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'http',
      colorize: true,
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,  // 30일치 로그 파일 저장
      zippedArchive: true, 
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/errors',  // error.log 파일은 errors 폴더를 만들어 저장 
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// Production 환경이 아닌 경우(dev 등) 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),  // 색깔 넣어서 출력
      winston.format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
    )
  }));
}

winston.addColors(colors);

export { logger };