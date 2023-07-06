from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField

from wagtail.admin.panels import FieldPanel


class TestPage(Page):
    """
    A page for testing purposes.
    """
    body = RichTextField()
    content_panels = Page.content_panels + [
        FieldPanel("body")
    ]
