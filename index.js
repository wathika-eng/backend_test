#!/usr/bin/env node

const jsonServer = require('json-server');
const cors = require('cors');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/**
 * Creates and starts a JSON Server with user-provided configurations.
 * @param {string} dbFile - Path to the JSON database file.
 * @param {number} port - Port number to run the server on.
 * @param {object} corsOptions - CORS configuration options.
 * @returns {import('express').Express} The running JSON Server instance.
 */
const createJsonServer = (
	dbFile = 'db.json',
	port = 8080,
	corsOptions = {}
) => {
	const server = jsonServer.create();
	const router = jsonServer.router(dbFile);
	const middlewares = jsonServer.defaults();

	// Apply CORS middleware if options are provided
	server.use(cors(corsOptions));

	// Use JSON Server middlewares and router
	server.use(middlewares);
	server.use(router);

	// Start the server
	server.listen(port, () => {
		console.log(`🚀 JSON Server is running at http://localhost:${port}`);
		console.log(`📄 Using database file: ${dbFile}`);
	});

	return server;
};

// CLI Support
if (require.main === module) {
	const argv = yargs(hideBin(process.argv))
		.scriptName('json-server-setup')
		.usage('Usage: $0 <dbFile> <port> [options]')
		.command(
			'$0 <dbFile> <port>',
			'Start the JSON Server with the given configuration',
			(yargs) => {
				yargs
					.positional('dbFile', {
						describe: 'Path to the JSON database file',
						type: 'string',
						default: 'db.json',
					})
					.positional('port', {
						describe: 'Port number to run the server on',
						type: 'number',
						default: 8080,
					});
			}
		)
		.option('cors-origin', {
			describe: 'CORS origin(s) to allow (default: *)',
			type: 'string',
			default: '*',
		})
		.option('cors-methods', {
			describe:
				'Comma-separated list of allowed HTTP methods (default: GET, POST, PUT, DELETE)',
			type: 'string',
			default: 'GET, POST, PUT, DELETE',
		})
		.option('cors-headers', {
			describe:
				'Comma-separated list of allowed HTTP headers (default: Content-Type, Authorization)',
			type: 'string',
			default: 'Content-Type, Authorization',
		})
		.example('$0 db.json 5000', 'Start JSON Server on port 5000 using db.json')
		.example(
			'$0 db.json 5000 --cors-origin "http://localhost:3000"',
			'Allow CORS requests from http://localhost:3000'
		)
		.help('h')
		.alias('h', 'help')
		.version('1.0.0')
		.alias('v', 'version')
		.epilog(
			'For more information, visit https://github.com/wathika-eng/json-server-setup'
		).argv;

	// Extract CORS options
	const corsOptions = {
		origin: argv['cors-origin'],
		methods: argv['cors-methods'],
		allowedHeaders: argv['cors-headers'],
	};

	// Start the server
	createJsonServer(argv.dbFile, argv.port, corsOptions);
}

module.exports = createJsonServer;
