const createJsonServer = require('../index');
const jsonServer = require('json-server');

jest.mock('json-server', () => ({
	create: jest.fn(() => ({
		use: jest.fn(),
		listen: jest.fn((port, callback) => callback()),
	})),
	router: jest.fn(),
	defaults: jest.fn(),
}));

describe('createJsonServer', () => {
	it('should create and start a JSON server with default values', () => {
		const mockRouter = {};
		const mockMiddlewares = {};

		jsonServer.router.mockReturnValue(mockRouter);
		jsonServer.defaults.mockReturnValue(mockMiddlewares);

		const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

		const server = createJsonServer();

		// Assertions
		expect(jsonServer.create).toHaveBeenCalled();
		expect(jsonServer.router).toHaveBeenCalledWith('db.json');
		expect(jsonServer.defaults).toHaveBeenCalled();
		expect(server.use).toHaveBeenCalledWith(mockMiddlewares);
		expect(server.use).toHaveBeenCalledWith(mockRouter);
		expect(server.listen).toHaveBeenCalledWith(8080, expect.any(Function));
		expect(consoleSpy).toHaveBeenCalledWith(
			'JSON Server is running at http://localhost:8080'
		);

		consoleSpy.mockRestore();
	});

	it('should create and start a JSON server with user-provided dbFile and port', () => {
		const mockRouter = {};
		const mockMiddlewares = {};

		jsonServer.router.mockReturnValue(mockRouter);
		jsonServer.defaults.mockReturnValue(mockMiddlewares);

		const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

		const server = createJsonServer('custom-db.json', 3000);

		// Assertions
		expect(jsonServer.router).toHaveBeenCalledWith('custom-db.json');
		expect(server.listen).toHaveBeenCalledWith(3000, expect.any(Function));
		expect(consoleSpy).toHaveBeenCalledWith(
			'JSON Server is running at http://localhost:3000'
		);

		consoleSpy.mockRestore();
	});
});
