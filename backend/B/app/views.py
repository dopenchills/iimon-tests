from django.http import HttpRequest
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout

from django.contrib.auth.models import User
from .models import Post

from .forms import LoginForm, SignupForm, PostForm

def index(request: HttpRequest):
    all_posts = Post.objects.select_related("user").all()

    return render(
        request,
        'index.html',
        context = {
            "all_posts": all_posts,
            "user": request.user,
            "form": PostForm()
        }
    )

def login(request: HttpRequest):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if not form.is_valid():
            return render(
                request,
                'login.html',
                context={
                    "form": LoginForm(request.POST)
                }
            )

        authenticated_user = authenticate(
            request,
            username=request.POST["username"],
            password=request.POST["password"]
        )
        if authenticated_user is not None:
            auth_login(request, authenticated_user)
            return redirect("index")
        else:
            return render(
                request,
                'login.html',
                context={
                    "form": LoginForm(request.POST)
                }
            )
    else:
        return render(
            request,
            'login.html',
            context={
                "form": LoginForm()
            }
        )

def logout(request: HttpRequest):
    auth_logout(request)
    return redirect("index")

def signup(request: HttpRequest):
    if request.method == "POST":
        form = SignupForm(request.POST)
        if not form.is_valid():
            return render(
                request,
                'signin.html',
                context={
                    "form": SignupForm(request.POST)
                }
            )

        User.objects.create_user(
            username=request.POST["username"],
            email=request.POST["email"],
            password=request.POST["password"]
        )

        authenticated_user = authenticate(
            request,
            username=request.POST["username"],
            password=request.POST["password"]
        )

        if authenticated_user is not None:
            auth_login(request, authenticated_user)
            return redirect("index")
        else:
            return render(
                request,
                'signin.html',
                context={
                    "form": SignupForm(request.POST)
                }
            )

    else:
        return render(
            request,
            'signin.html',
            context={
                "form": SignupForm()
            }
        )

def posts(request: HttpRequest):
    if request.method == "POST":
        form = PostForm(request.POST)
        if not form.is_valid():
            return redirect("index")
        
        if not request.user.is_authenticated:
            return redirect("index")

        Post(user=request.user, content=request.POST["content"]).save()
        return redirect("index")
    else:
        return redirect("index")
