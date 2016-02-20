from django.contrib import admin

from api.models import CompletedForm
class CompletedFormAdmin(admin.ModelAdmin):
    list_display = ('created',)
admin.site.register(CompletedForm, CompletedFormAdmin)
