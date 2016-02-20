from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url(r'^save_form$', "api.views.save_form"),
    url(r'^get_completed_forms$', "api.views.get_completed_forms"),
)