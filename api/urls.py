from django.conf.urls import patterns, url
from django.views.generic import RedirectView

urlpatterns = patterns('',
    url(r'^$', RedirectView.as_view(url='/static/index.html')),
    url(r'^save_form$', "api.views.save_form"),
    url(r'^get_completed_forms$', "api.views.get_completed_forms"),
)