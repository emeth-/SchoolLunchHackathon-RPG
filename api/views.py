from django.http import HttpResponse
import datetime
import json
from api.models import CompletedForm

def json_custom_parser(obj):
    if isinstance(obj, datetime.datetime) or isinstance(obj, datetime.date):
        dot_ix = 19
        return obj.isoformat()[:dot_ix]
    else:
        raise TypeError(obj)

def save_form(request):
    """
        Expect Input:
            request.POST['data'] = A json string of the form data:
    """

    nf = CompletedForm(**{
        "data": request.POST['data'],
        "ipaddress": request.META['REMOTE_ADDR']
    })
    nf.save()

    return HttpResponse(json.dumps({
        "status": "success",
        "id": nf.id,
    }, default=json_custom_parser), content_type='application/json', status=200)

def get_completed_forms(request):
    completed_forms = []
    cfo = CompletedForm.objects.all()
    if 'id' in request.POST:
        cfo = cfo.filter(pk=request.POST['id'])
        
    for c in cfo.order_by('-created'):
        try:
            completed_forms.append({
                "ipaddress": c.ipaddress,
                "id": c.id,
                "data": json.loads(c.data),
                "created": c.created
            })
        except ValueError:
            #Not valid json, just skip it.
            pass

    return HttpResponse(json.dumps({
        "status": "success",
        "data": completed_forms
    }, default=json_custom_parser), content_type='application/json', status=200)
