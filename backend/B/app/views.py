from django.http import HttpRequest
from django.shortcuts import render

from .models import Post

def index(request: HttpRequest):
    all_posts = Post.objects.select_related("user").all()

    return render(
        request,
        'index.html',
        context = {
            "all_posts": all_posts,
            "user": request.user
        }
    )

def login(request: HttpRequest):
    pass

def signin(request: HttpRequest):
    pass

def posts(request: HttpRequest):
    pass
