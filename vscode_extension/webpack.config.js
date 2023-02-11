const path = require('path');

module.exports = {
  mode: "development",
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
      alias: {
        utils: path.resolve(__dirname, './src/utils.ts'),
        constant: path.resolve(__dirname, './src/constant.ts'),
        providers: path.resolve(__dirname, './src/providers/'),
        components: path.resolve(__dirname, './src/components/'),
        containers: path.resolve(__dirname, './src/containers/'),
      },
  },
  plugins: [],
  module: {
    rules: [
			{
				test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [{loader: 'ts-loader'}]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			}
		]
  }

};