<?php
namespace Craft;

class RedactorResourcesPlugin extends BasePlugin {

    public function getName() {
        return Craft::t('Redactor Resources');
    }

    public function getVersion() {
        return '1.0';
    }

    public function getDeveloper() {
        return 'IMM';
    }

    public function getDescription() {
        return Craft::t('Allows for external imperavi js plugins.');
    }

    public function getDeveloperUrl() {
        return 'http://imm.com';
    }

    public function getPluginUrl() {
        return 'https://github.com/imm-llc/redactorresources';
    }

    public function getDocumentationUrl() {
        return $this->getPluginUrl() . '/blob/master/README.md';
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


        // @TODO Change to this
        // search in public dir
        // if (craft()->request->isCpRequest()) {
        //     $arrJsDir = preg_grep('/^([^.])/', scandir("js/redactor/"));
        //     $arrCssDir = preg_grep('/^([^.])/', scandir("css/redactor/"));
        //     foreach($arrJsDir as $strFile){
        //         craft()->templates->includeJsFile("/js/redactor/".$strFile);
        //     }
        //     foreach($arrCssDir as $strFile){
        //         craft()->templates->includeCssFile("/css/redactor/".$strFile);
        //     }
        // }


    }
}