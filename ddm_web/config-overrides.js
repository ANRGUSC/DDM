const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}], // change importing css to less
        config,
    );
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#990000",
            "@text-color-secondary-dark": "#990000",

            // dark theme
            // menu
            "@menu-dark-color": "@text-color-secondary-dark",
            "@menu-dark-bg": "#ffcc02",
            "@menu-dark-arrow-color": "#fff",
            "@menu-dark-highlight-color": "#fff",
            "@menu-dark-item-active-bg": "@primary-color",
            "@menu-dark-submenu-bg": "#ffcc02",
            // Layout
            "@layout-sider-background": "#ffcc02"
        },
        javascriptEnabled: true,
    })(config, env);

    return config;
};