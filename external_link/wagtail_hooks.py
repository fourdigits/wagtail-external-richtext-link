import wagtail.admin.rich_text.editors.draftail.features as draftail_features
from wagtail import hooks

from .handlers import NewTabLinkEntityElementHandler, new_tab_link_entity_decorator


@hooks.register("register_rich_text_features")
def register_new_tab_link_feature(features):
    # Append the "new_tab_link" feature to the default features
    features.default_features.append("new_tab_link")

    # Set feature name and type
    feature_name = "new_tab_link"
    type_ = "NEW_TAB_LINK"

    # Define the control for the feature
    control = {
        "type": type_,
        "label": "New tab 🔗",
        "description": "Open link in new tab",
    }

    # Register the feature with the Draftail editor plugin
    features.register_editor_plugin(
        "draftail",
        feature_name,
        draftail_features.EntityFeature(
            control, js=["js/newtab.js"], css={"all": ["css/newtab_form.css"]}
        ),
    )

    # Register the converter rule for the feature to handle database format conversion
    features.register_converter_rule(
        "contentstate",
        feature_name,
        {
            "from_database_format": {
                "a[target='_blank']": NewTabLinkEntityElementHandler(type_)
            },
            "to_database_format": {
                "entity_decorators": {type_: new_tab_link_entity_decorator}
            },
        },
    )
