/**
 * All config needed for the app should be parsed from environment variables in this file.
 * This goes for config needed in server code as well as config needed in browser code.
 * - If the config is needed in a Node js file, you should import it directly from here.
 */
const { cleanEnv, str } = require('envalid')

// Config is loaded for the `next build` command, too, and we don't want to complain
// about missing environment variables in that phase.

/**
 * Envalid parses NODE_ENV automatically, and provides the following
 * shortcut (boolean) properties for checking its value:
 *   env.isProduction    // true if NODE_ENV === 'production'
 *   env.isDevelopment   // true if NODE_ENV === 'development'
 *
 */
module.exports = cleanEnv(process.env, {
  DATABASE_URL: str(),
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  BUCKET_NAME: str(),
  REGION: str(),
  ACCESS_KEY: str(),
  SECRET_KEY: str(),

  NODE_ENV: str({
    choices: ['development', 'production'],
    default: 'production',
  }),
})
