module.exports = function() {
    let rules = [];

    // Add support for loading HTML files.
    rules.push({
        test: /\.html$/,
        loaders: ['html-loader']
    });

    rules.push({
        test: /\.svg$/,
        loaders: [
            {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-transform-arrow-functions']
                }
            },
            {
                loader: "react-svg-loader",
                options: {
                    es5: true
                }
            }
        ]
    });

    // Add support for loading images.
    rules.push({
        // only include svg that doesn't have font in the path or file name by using negative lookahead
        test: /\.(png|jpe?g|gif|webp)$/,
        loaders: [
            {
                loader: 'file-loader',
                options: {
                    name: path => {
                        if (!/node_modules|bower_components/.test(path)) {
                            return (
                                Config.fileLoaderDirs.images +
                                '/[name].[ext]?[hash]'
                            );
                        }

                        return (
                            Config.fileLoaderDirs.images +
                            '/vendor/' +
                            path
                                .replace(/\\/g, '/')
                                .replace(
                                    /((.*(node_modules|bower_components))|images|image|img|assets)\//g,
                                    ''
                                ) +
                            '?[hash]'
                        );
                    },
                    publicPath: Config.resourceRoot
                }
            },

            {
                loader: 'img-loader',
                options: Config.imgLoaderOptions
            }
        ]
    });

    // Add support for loading fonts.
    rules.push({
        test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
        loader: 'file-loader',
        options: {
            name: path => {
                if (!/node_modules|bower_components/.test(path)) {
                    return Config.fileLoaderDirs.fonts + '/[name].[ext]?[hash]';
                }

                return (
                    Config.fileLoaderDirs.fonts +
                    '/vendor/' +
                    path
                        .replace(/\\/g, '/')
                        .replace(
                            /((.*(node_modules|bower_components))|fonts|font|assets)\//g,
                            ''
                        ) +
                    '?[hash]'
                );
            },
            publicPath: Config.resourceRoot
        }
    });

    // Add support for loading cursor files.
    rules.push({
        test: /\.(cur|ani)$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]?[hash]',
            publicPath: Config.resourceRoot
        }
    });

    return rules;
};
