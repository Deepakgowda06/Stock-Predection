from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from django.contrib.auth.models import User


class RegisterView(generics.CreateAPIView):
    query_set=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[]
    
