// useJsonServer.js
import { useState, useEffect } from 'react';
import jsonServerManager from './index';

export const useJsonServer = ({
	dbFile = 'db.json',
	port = 8080,
	corsOptions = {},
	autoStart = true,
} = {}) => {
	const [isRunning, setIsRunning] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		const handleStart = () => setIsRunning(true);
		const handleStop = () => setIsRunning(false);
		const handleError = (err) => setError(err);
		const handleDatabaseUpdate = (newData) => setData(newData);

		jsonServerManager.on('started', handleStart);
		jsonServerManager.on('stopped', handleStop);
		jsonServerManager.on('error', handleError);
		jsonServerManager.on('databaseUpdated', handleDatabaseUpdate);

		if (autoStart && !jsonServerManager.isRunning) {
			jsonServerManager.start({ dbFile, port, corsOptions }).catch(handleError);
		}

		return () => {
			jsonServerManager.off('started', handleStart);
			jsonServerManager.off('stopped', handleStop);
			jsonServerManager.off('error', handleError);
			jsonServerManager.off('databaseUpdated', handleDatabaseUpdate);
		};
	}, [dbFile, port, corsOptions, autoStart]);

	const startServer = async () => {
		try {
			await jsonServerManager.start({ dbFile, port, corsOptions });
		} catch (err) {
			setError(err);
		}
	};

	const stopServer = async () => {
		try {
			await jsonServerManager.stop();
		} catch (err) {
			setError(err);
		}
	};

	return {
		isRunning,
		error,
		data,
		startServer,
		stopServer,
		baseUrl: `http://localhost:${port}`,
	};
};
