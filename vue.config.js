module.exports = {
	devServer: {
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hot: true,
		liveReload: true,
		client: {
			webSocketURL: 'ws://localhost:8080/ws',
		},
	},
	publicPath: './',
};
