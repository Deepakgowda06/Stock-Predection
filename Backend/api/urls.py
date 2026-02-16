from django.urls import path,include
from accounts import views as Userviews

urlpatterns = [

path('register/', Userviews.RegisterView.as_view()),

]