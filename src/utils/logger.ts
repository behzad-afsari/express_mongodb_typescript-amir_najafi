import winston, { level } from "winston";

export default winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({format : "YYYY-MM-DD HH:mm:ss"}),
        // winston.format.printf(info => `${info}` +" >> "+ `${info.level}` +" >> "+ `${info.message}`)
        // winston.format.printf(info => " >> "+ `${info.level}` +" >> "+ `${info.message}`)
        winston.format.printf(({level, message, timestamp})=>{
            return `${timestamp} | ${message}`
            // return `${timestamp} | ${level} | ${message}`
        })
    ),
    transports:[
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({format : "YYYY-MM-DD HH:mm:ss"}),
                winston.format.printf(({level, message, timestamp})=>{
                    return `${timestamp} | ${level} | ${message}`
                })
                // winston.format.simple()
                // winston.format.prettyPrint()
            )
        }),
        new winston.transports.File({filename : "./logs/error.log",level: "error" , maxsize: 100*1024*1024 , maxFiles: 10}),
        new winston.transports.File({filename : "./logs/warn.log",level: "warn" , maxsize: 100*1024*1024 , maxFiles: 10}),
        new winston.transports.File({filename : "./logs/info.log",level: "info" , maxsize: 100*1024*1024 , maxFiles: 10})
    ]
})