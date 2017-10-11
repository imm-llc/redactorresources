# redactorresources
Allows for external imperavi js/css plugins in Craft CMS.

## Installation
Download repo or clone into `craft/plugins`

## Usage
This plugin will scan for `js/redactor/*.js` and `css/redactor/*.css` in your site's public directory. Whatever it finds it will load into the Craft CMS client portal. Place any [Impaveri](https://imperavi.com/redactor/plugins/) plugins that you want to use in the appropriate `js/redactor` or `css/redactor directories`.

## Important Notes
1. The plugin will not create `js/redactor/*.js` and `css/redactor/*.css` in your site's public directory if they do not exist. You need to make these. 
2. [Impaveri](https://imperavi.com/redactor/plugins/) plugins are not configured to load correctly for usage by the Craft CMS client portal by default. In each JavaScript plugin, you must replace `$.Redactor.prototype` with `RedactorPlugins` so as to assign the plugin code to the existing Craft redactor object. More information can be found [here](https://craftcms.stackexchange.com/questions/12776/redactor-extension-plugin-loading-js-before-redactor-js).

