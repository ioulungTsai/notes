/**
 * Main application router for gateway
 */
import { app } from "./app"

// Import & use test-api
import * as testapi from './test-api'
app.use('/test', testapi.router)

const port = process.env.port || 8080;

app.listen(port, () => {
  console.log(`server up and listening on the port ${port}!`);
});

process.on("SIGINT", function() {
  process.exit()
})
