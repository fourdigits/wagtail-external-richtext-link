Newtab feature for Richtextfield Wagtail
=========================================

This is a custom feature for the richtextfield in wagtail. This feature provides a way to add links that always open in a new tab.

------------
Quick start
------------
1. Go to your settings and add `external_link` to your `INSTALLED_APPS`

    INSTALLED_APPS = [

        "...",
        "external_link",
        "...",

    ]


2. Go to the settings file and add `new_tab_link` to the `RICHTEXT_FEATURES`
3. When adding or editing a page in the wagtail admin there will be a `New tab` button in the `Richtextfield`