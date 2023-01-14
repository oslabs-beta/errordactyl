const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, out),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
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