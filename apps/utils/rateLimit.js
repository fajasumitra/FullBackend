import { rateLimit } from 'express-rate-limit'

module.exports = app => {
    const limiter = rateLimit({
        windowMs: 60 * 60 * 1000,
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
        standardHeaders: 'draft-7', // Set `RateLimit` and `RateLimit-Policy` headers
        legacyHeaders: false,
    })

    app.use(limiter)
}
