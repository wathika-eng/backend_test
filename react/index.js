// index.js
const jsonServer = require('json-server');
const cors = require('cors');
const { watch } = require('node:fs/promises');
const path = require('path');
const EventEmitter = require('events');

class JsonServerManager extends EventEmitter {
	constructor() {
		super();
		this.server = null;
		this.router = null;
		this.isRunning = false;
	}

	/**
	 * Watches the database file for changes
	 * @param {string} dbFile - Path to the JSON database file
	 * @private
	 */
	async #watchDatabase(dbFile) {
		try {
			const watcher = watch(path.dirname(dbFile), { recursive: false });
			console.log(`👀 Watching for changes in ${dbFile}`);

			for await (const event of watcher) {
				if (event.filename === path.basename(dbFile)) {
					console.log('🔄 Database changed, reloading...');
					try {
						delete require.cache[require.resolve(path.resolve(dbFile))];
						this.router.db.read();
						console.log('✅ Database reloaded successfully');
						this.emit('databaseUpdated', this.router.db.getState());
					} catch (err) {
						console.error('Error reloading database:', err);
						this.emit('error', err);
					}
				}
			}
		} catch (err) {
			console.error('Error watching database file:', err);
			this.emit('error', err);
		}
	}

	/**
	 * Starts the JSON Server
	 * @param {Object} config - Server configuration
	 * @returns {Promise<void>}
	 */
	async start({
		dbFile = 'db.json',
		port = 8080,
		corsOptions = {
			origin: '*',
			methods: 'GET,POST,PUT,DELETE',
			allowedHeaders: 'Content-Type,Authorization',
		},
	} = {}) {
		if (this.isRunning) {
			throw new Error('Server is already running');
		}

		try {
			this.server = jsonServer.create();
			this.router = jsonServer.router(dbFile);
			const middlewares = jsonServer.defaults();

			this.server.use(cors(corsOptions));
			this.server.use(middlewares);
			this.server.use(this.router);

			await new Promise((resolve, reject) => {
				try {
					this.server.listen(port, () => {
						console.log(
							`🚀 JSON Server is running at http://localhost:${port}`
						);
						console.log(`📄 Using database file: ${dbFile}`);
						this.isRunning = true;
						this.emit('started', { port, dbFile });
						resolve();
					});
				} catch (err) {
					reject(err);
				}
			});

			this.#watchDatabase(dbFile);
		} catch (err) {
			this.emit('error', err);
			throw err;
		}
	}

	/**
	 * Stops the JSON Server
	 * @returns {Promise<void>}
	 */
	async stop() {
		if (!this.isRunning) {
			return;
		}

		return new Promise((resolve, reject) => {
			try {
				this.server.close(() => {
					this.isRunning = false;
					this.emit('stopped');
					resolve();
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	/**
	 * Gets the current database state
	 * @returns {Object}
	 */
	getState() {
		return this.router?.db.getState() || {};
	}
}

// Export a singleton instance
const jsonServerManager = new JsonServerManager();
module.exports = jsonServerManager;
