dev:
	sudo NODE_ENV=dev ./node_modules/.bin/webpack-dev-server\
	 --config build/webpack.config.js\
	 --public\
	 --color\
	 --progress\
	 --hot\
	 -d