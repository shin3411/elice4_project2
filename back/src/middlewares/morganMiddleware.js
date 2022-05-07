import morgan from "morgan";

const stream = {
    write: message => logger.http(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "production";
};

morgan.token("status", function (req, res) {
    return res.statusCode;
});

// morgan.token("request", function (req, res) {
//     return "Request_" + JSON.stringify(req.body);
// });

// Build the morgan middleware
// morgan 함수의 인자(format)로는 short, dev, common, combined 가 올 수 있다. (정보의 노출 수준)
// 보통 배포시에는 combined 혹은 common 에 필요한 정보들을 추가하여 사용하는 것을 추천 || 추후 배포 시 사용 -> 주소,IP_ :remote-addr :remote-user |
const morganMiddleware = morgan( 
    `HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms`,
    { stream, skip }
);

export { morganMiddleware };