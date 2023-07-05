# wagtail-external-richtext-link

[![PyPI - Version](https://img.shields.io/pypi/v/wagtail-external-link-richtext.svg)](https://pypi.org/project/wagtail-external-link-richtext/)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/wagtail-external-link-richtext.svg)](https://pypi.org/project/wagtail-external-link-richtext/)

-----

A simple app that gives you the option to add links to the richtext editor in Wagtail that always open in a new tab.

**Table of Contents**

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)

## Installation

```console
$ pip install wagtail-external-link-richtext
```

## Configuration

Add `wagtail_external_link` to your `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ...
    'wagtail_external_link',
    # ...
]
```

Add `"new_tab_link"` to your `RICHTEXT_FEATURES` in your settings:

```python
RICHTEXT_FEATURES = [
    # ...
    'new_tab_link',
    # ...
]
```

## Usage

When you add a `RichTextField` to your model, you will now see a new button called `New tab 🔗` in the richtext editor:
1. Select the text you want to link or just place the cursor where you want the link to be.
2. Click the `New tab 🔗` button.
3. If you didn't select any text, enter some text for the link. This will be the text that is displayed.
4. Enter the URL you want to link to.
5. Click `Submit`.
6. The link will be added to the richtext editor.
7. Save the page.

Correct way to render the link in your template:

```django
{% load wagtailcore_tags %}

{{ page.body|richtext }}
```

## License

`wagtail-external-richtext-link` is distributed under the terms of the [MIT](https://spdx.org/licenses/MIT.html) license.
