import json
from django.template.loader import render_to_string
from django.http import HttpResponse
from django.db.models import Q

from hotels.models import Hotel, City

def get_hotels(request):
    results = []
    if request.is_ajax():

        if request.method == 'POST':
            format = 'json'
            mimetype = 'application/json'

            city = request.POST['city']
            date_range = request.POST['date_range']
            query = ''

            try:
                if city != '':
                    query = Q(city__name__icontains=city)

                if date_range != '':
                    date_range_array = date_range.split(' / ')
                    date_from = date_range_array[0]
                    date_thru = date_range_array[1]
                    query = query & Q(date_from__lte=date_from) & Q(date_thru__gte=date_thru)

                    #return HttpResponse(date_thru)
                if query != '':
                    o = Hotel.objects.filter(query)
                else :
                    o = Hotel.objects.all()
            except:
                o = Hotel.objects.none()


            html = render_to_string( 'hotels/results.html', { 'hotels': o } )
            res = {'html': html }
            return HttpResponse( json.dumps(res), mimetype )

