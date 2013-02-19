from django.conf.urls import patterns, url
from django.views.generic import DetailView, ListView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from hotels.models import Hotel

from hotels import views

#urlpatterns = patterns('',
#    url(r'^$', views.index, name='index'),
    # ex: /polls/5/
#    url(r'^(?P<city_id>\d+)/city/$', views.city, name='city'),
#    url(r'^(?P<id>\d+)/hotel/$', views.hotel, name='hotel'),
#    url(r'^get_hotels/$', views.hotel, name='get_hotels'),
#)


urlpatterns = patterns('',
    url(r'^$',
        ListView.as_view(
            queryset=Hotel.objects.all(),
            context_object_name='hotels',
            template_name='hotels/index.html'),
        name='index'),
    url(r'^(?P<pk>\d+)/$',
        DetailView.as_view(
            model=Hotel,
            template_name='hotels/hotel_detail.html'),
        name='hotel'),
    url(r'^get_hotels/$', views.get_hotels, name='get_hotels'),
)

urlpatterns += staticfiles_urlpatterns()