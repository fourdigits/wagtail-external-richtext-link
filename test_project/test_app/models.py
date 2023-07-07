try:
    from wagtail.fields import RichTextField
    from wagtail.models import Page
except ModuleNotFoundError:
    from wagtail.core.models import Page
    from wagtail.core.fields import RichTextField

from wagtail.admin.panels import FieldPanel


class TestPage(Page):
    """
    A page for testing purposes.
    """

    body = RichTextField(features="new_tab_link")
    content_panels = Page.content_panels + [FieldPanel("body")]
