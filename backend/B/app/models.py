from django.contrib.auth.models import User
from django.db import models

class Post(models.Model):
    # on_delete=models.PROTECT because Posts are asset to the company. 
    user    = models.ForeignKey(User, on_delete=models.PROTECT)
    content = models.TextField()
