<?php
namespace Craft;

class RedactorResourcesPlugin extends BasePlugin {

    function getName() {
        return Craft::t('Redactor Resources');
    }

    function getVersion() {
        return '1.0';
    }

    function getDeveloper() {
        return 'IMM';
    }

    public function getDescription() {
        return Craft::t('Allows for external imperavi js plugins.');
    }

    function getDeveloperUrl() {
        return 'http://imm.com';
    }

    public function getSourceLanguage() {
        return 'en';
    }

    protected function defineSettings() {
        return array(
            //'extraPluginJs'  => AttributeType::String,
            //'extraPluginCss' => AttributeType::String,
        );
    }

    public function getSettingsHtml() {
//        return craft()->templates->render('redactorresources/_settings', array(
//            'settings' => $this->getSettings()
//        ));
    }

    public function init() {
        if (craft()->request->isCpRequest()) {
            // Get settings
            //$settings = $this->getSettings();
            craft()->templates->includeJsResource("redactorresources/js/plugins.js");
            craft()->templates->includeCssResource("redactorresources/css/plugins.css");
        }
    }
}