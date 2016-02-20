from django.http import HttpResponse
import datetime
import json
from api.models import Fish

def json_custom_parser(obj):
    if isinstance(obj, datetime.datetime) or isinstance(obj, datetime.date):
        dot_ix = 19
        return obj.isoformat()[:dot_ix]
    else:
        raise TypeError(obj)

def download_pdf(request):
    from pyPdf import PdfFileWriter, PdfFileReader
    import StringIO
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter

    packet = StringIO.StringIO()
    # create a new PDF with Reportlab
    can = canvas.Canvas(packet, pagesize=letter)
    can.drawString(10, 100, "Hello world")
    can.drawString(100,750,"Welcome to Reportlab!")
    can.save()

    #move to the beginning of the StringIO buffer
    packet.seek(0)
    new_pdf = PdfFileReader(packet)
    # read your existing PDF
    existing_pdf = PdfFileReader(file("original.pdf", "rb"))
    output = PdfFileWriter()
    # add the "watermark" (which is the new pdf) on the existing page
    page = existing_pdf.getPage(0)
    page.mergePage(new_pdf.getPage(0))
    output.addPage(page)
    # finally, write "output" to a real file
    outputStream = file("destination.pdf", "wb")
    output.write(outputStream)
    outputStream.close()


def delete_fish(request):
    """
        Expects as input:
            - An id located in:
                - request.body if Angular.js
                - request.POST['id'] if backbone / jquery
    """
    fish_id = request.body #change this depending on how your frontend sends data, as POST or in the body

    Fish.objects.filter(id=fish_id).delete()
    return HttpResponse(json.dumps({
        "status": "success"
    }, default=json_custom_parser), content_type='application/json', status=200)

def save_fish(request):
    """
        Expects as input:
            - A json string location in:
                - request.body if Angular.js
                - request.POST['fish_info'] if backbone / jquery
    """

    fish_info = request.body #change this depending on how your frontend sends data, as POST or in the body

    fsh = Fish(**json.loads(fish_info))
    fsh.save()
    return HttpResponse(json.dumps({
        "status": "success",
        "id": fsh.id,
        "data": list(Fish.objects.filter(id=fsh.id).values())[0] #lololol
    }, default=json_custom_parser), content_type='application/json', status=200)

def get_fish(request):
    fishies = Fish.objects.all()
    return HttpResponse(json.dumps({
        "status": "success",
        "data": list(fishies.values())
    }, default=json_custom_parser), content_type='application/json', status=200)
