const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}], // change importing css to less
        config,
    );
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#ffffff",
            "@text-color-secondary-dark": "#ffffff",

            // dark theme
            // menu
            "@menu-dark-color": "@text-color-secondary-dark",
            "@menu-dark-bg": "#ffffff",
            "@menu-dark-arrow-color": "#ffcc00",
            "@menu-dark-highlight-color": "#ffcc00",
            "@menu-dark-item-active-bg": "@primary-color",
            "@menu-dark-submenu-bg": "#ffffff",
            // Layout
            "@layout-sider-background": "#ffffff"
        },
        javascriptEnabled: true,
    })(config, env);

    return config;
};