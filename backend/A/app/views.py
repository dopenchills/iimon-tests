import json

from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt

from .models import Item

@csrf_exempt
def items(request: HttpRequest):
    if request.method == 'GET':
        all_items = Item.objects.all()
        
        item_list = []
        for item in all_items:
            item_list.append({
                "name": item.name,
                "price": item.price
            })
        
        return JsonResponse(item_list, safe=False)

    elif request.method == 'POST':
        body: dict = json.loads(request.body)
        
        try:
            item = Item(
                name=body["name"],
                price=int(body["price"])
            )

            item.save()

            return JsonResponse({
                "message": "success"
            })
        
        except KeyError:
            return JsonResponse({
                "message": "request body is formatted in a wrong way"
            })
