from draftjs_exporter.dom import DOM
from wagtail.admin.rich_text.converters.html_to_contentstate import (
    InlineEntityElementHandler,
)


class NewTabLinkEntityElementHandler(InlineEntityElementHandler):
    mutability = "MUTABLE"

    def get_attribute_data(self, attrs):
        """
        Override this method to add additional data to the entity.
        """
        return {
            "url": attrs["href"],
            "target": "_blank",
            "rel": "noopener noreferrer",
        }


def new_tab_link_entity_decorator(props):
    """
    Draft.js ContentState to database HTML.
    Converts the ``LINK`` entities into ``<a>`` tags with the right attributes.
    """
    return DOM.create_element(
        "a",
        {
            "href": props["url"],
            "target": "_blank",
            "rel": "noopener noreferrer",
        },
        props["children"],
    )
