const jsonServer = require('json-server');

// Create a JSON server with user-provided or default configurations
const createJsonServer = (dbFile = 'db.json', port = 8080) => {
	const server = jsonServer.create();
	const router = jsonServer.router(dbFile);
	const middlewares = jsonServer.defaults();

	server.use(middlewares);
	server.use(router);

	server.listen(port, () => {
		console.log(`JSON Server is running at http://localhost:${port}`);
	});

	return server;
};

// Handle user input from command-line arguments or environment variables
if (require.main === module) {
	const args = process.argv.slice(2);

	// Command-line arguments: `node index.js <dbFile> <port>`
	const dbFile = args[0] || process.env.DB_FILE || 'db.json';
	const port = parseInt(args[1] || process.env.PORT || 8080, 10);

	createJsonServer(dbFile, port);
}

module.exports = createJsonServer;
