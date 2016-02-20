from django.db import models

class CompletedForm(models.Model):
    data = models.TextField()
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    def __unicode__(self):
        return u'%s' % (self.created)

    class Meta:
        verbose_name = 'CompletedForm'
        verbose_name_plural = 'CompletedForms'
        app_label = "api"