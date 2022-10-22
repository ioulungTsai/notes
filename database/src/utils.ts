import fs from "fs"

/**
 * Utility functions for Database processors
 */

// Get dbCongfig
const configPath = './dbconfig.json'
/**
 * Returns Database configuration
 * @param target : environment to return config for
 *
 * @return iDBconfig
 */
export interface iDBconfig {
  username: string;
  password: string;
  url: string;
}

export function getDBConfig(target: string) : iDBconfig {
  const config = JSON.parse(fs.readFileSync(configPath).toString())
  return config[target]
}

/**
 * Returns httpConfig needed by axios
 * @param config: database configuration
 *
 * @return httpConfig
 */
export function getHttpConfig(config: iDBconfig) : unknown {
  const credentials = `${config.username}:${config.password}`
  const auth = "Basic " + Buffer.from(credentials).toString('base64')
  const httpConfig = {
    headers: {
      "Content-Type": "application/json",
      "authorization": auth,
      "cache-control":"no-cache"
    }
  }
  return httpConfig
}
