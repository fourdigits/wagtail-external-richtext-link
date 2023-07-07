from wagtail.test.utils import WagtailPageTests

import json

from wagtail.admin.rich_text.editors.draftail import DraftailRichTextArea


FEATURES = (
    "new_tab_link",
)
def test_from_database_format():
    """
    Ensure database HTML is converted into Draftail frontend data structure as expected.
    """
    converter = DraftailRichTextArea(features=FEATURES).converter
    database_html = (
        '<p data-block-key="cfw9b">'
        '<a href="http://www.fourdigits.nl" rel="noopener noreferrer" target="_blank">'
        'Four Digits</a></p>'
    )
    data_json = converter.from_database_format(database_html)
    data = json.loads(data_json)
    actual_contentstate_data = data['entityMap']['0']
    expected_contentstate_data = {
        'mutability': 'MUTABLE',
        'type': 'NEW_TAB_LINK',
        'data': {
            'url': 'http://www.fourdigits.nl',
            'target': '_blank',
            'rel': 'noopener noreferrer'
        }
    }
    assert actual_contentstate_data == expected_contentstate_data

def test_to_database_format():
    """
    Ensure Draftail frontend data structure is converted into database HTML as expected.
    """
    converter = DraftailRichTextArea(features=FEATURES).converter
    contentstate_json = json.dumps({
        'blocks': [{
                'key': 'cfw9b',
                'type': 'unstyled',
                'depth': 0,
                'text': 'Four Digits',
                'inlineStyleRanges': [],
                'entityRanges': [{
                    'key': 0,
                    'offset': 0,
                    'length': 11
                }]
            }],
        'entityMap': {
                '0': {
                    'mutability': 'MUTABLE',
                    'type': 'NEW_TAB_LINK',
                    'data': {'url': 'http://www.fourdigits.nl', 'target': '_blank', 'rel': 'noopener noreferrer'}
                }
            }
    })
    actual_database_html = converter.to_database_format(contentstate_json)
    expected_database_html = (
        '<p '
        'data-block-key="cfw9b">'
        '<a href="http://www.fourdigits.nl" '
        'rel="noopener noreferrer" '
        'target="_blank">Four Digits</a></p>'
    )
    assert actual_database_html == expected_database_html
