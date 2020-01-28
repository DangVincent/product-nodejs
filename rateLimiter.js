const redis = require('redis');
const moment = require('moment');

// Check for redis url and create client
let redisClient;
if (process.env.REDIS_URL) {
    redisClient = redis.createClient(process.env.REDIS_URL)
    // Run on server otherwise.
} else {
    redisClient = redis.createClient()
}

module.exports = (req, res, next) => {
    redisClient.exists(req.headers.user, (err, reply) => {
        if (err) {
            console.log("Redis not working...")
            system.exit(0)
        }
        // if user exists
        if (reply === 1) {
            // check time interval in between request limits
            redisClient.get(req.headers.user, (err, reply) => {
                let data = JSON.parse(reply);
                let currentTime = moment().unix();
                let difference = (currentTime - data.startTime) / 60;
                if (difference >= 1) {
                    let body = {
                        'count': 1,
                        'startTime': moment().unix()
                    };
                    redisClient.set(req.headers.user, JSON.stringify(body));
                    // allow the request
                    next();
                }
                else if (difference < 1) {
                    if (data.count > 10) {
                        return res.json({ 
                            "error": 1, 
                            "message": "Too many requests have been made, please wait a minute to request again"
                        });
                    }
                    // update the count and allow the request
                    data.count++;
                    redisClient.set(req.headers.user, JSON.stringify(data));
                    // allow request
                    next();
                }
            });
        }
        // if user doesn't exist add new user
        else {
            let body = {
                'count': 1,
                'startTime': moment().unix()
            };
            redisClient.set(req.headers.user, JSON.stringify(body));
            // allow request
            next();
        };
    });
}