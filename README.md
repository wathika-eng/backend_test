# A simple JSON Server Setup

This file sets up a lightweight REST API using json-server. It reads data from a db.json file and serves it over HTTP. Perfect for prototyping, testing, or mocking APIs.

# Usage:

On the terminal, run the following commands:

```bash
npx json-server-setup db.json 5000
```

With cors

```bash
npx json-server-setup db.json 5000 --cors-origin "http://localhost:3000"
```

Or install it globally:

```bash
npm install -g json-server-setup
```

Then run:

```bash
json-server-setup db.json 5000
```

or with cors origin:

```bash
json-server-setup db.json 5000 --cors-origin "http://localhost:3000"
```

As a library:

```javascript
const createJsonServer = require('json-server-setup')

createJsonServer('db.json', 5000, {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
})
```

In ReactJS:

```javascript
import { useJsonServer } from 'json-server-setup'

function MyComponent() {
  const { isRunning, error, data, startServer, stopServer, baseUrl } =
    useJsonServer({
      dbFile: './data/db.json',
      port: 3001,
      autoStart: true
    })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <div>Server Status: {isRunning ? 'Running' : 'Stopped'}</div>
      <div>Server URL: {baseUrl}</div>

      <button onClick={startServer}>Start Server</button>
      <button onClick={stopServer}>Stop Server</button>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
```
