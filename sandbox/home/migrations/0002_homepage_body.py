# Generated by Django 3.2.20 on 2023-07-05 10:55

import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="homepage",
            name="body",
            field=wagtail.fields.RichTextField(default="Test"),
            preserve_default=False,
        ),
    ]
