# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20160220_1725'),
    ]

    operations = [
        migrations.AddField(
            model_name='completedform',
            name='ipaddress',
            field=models.CharField(default=b'', max_length=255, null=True, blank=True),
        ),
    ]
