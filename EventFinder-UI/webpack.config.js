const path = require('path');

module.exports = {
    entry: './src/App.jsx', // Entry point of your application 
    output: {
        filename: 'bundle.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist'), // Output directory (absolute path)
        publicPath: '/' // Base path for all assets
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // Serve content from this directory
        compress: true, // Enable gzip compression
        port: 8080, // Port number
        open: true, // Open the default browser when server starts
        writeToDisk: true // Write files to disk (useful for webpack-dev-server)
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i, // Match images based on file extensions
                include: path.resolve(__dirname, 'src/main/resources/images'), // Restrict processing to this directory
                use: [
                    {
                        loader: 'file-loader', // Use file-loader to handle images
                        options: {
                            name: '[name].[ext]', // Output file name format
                            outputPath: 'images/', // Specify where images should be copied to in the output directory
                            publicPath: '/images/' // Specify the path for browser access
                        }
                    }
                ]
            }
        ]
    }
};
