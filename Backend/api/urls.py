from django.urls import path,include
from accounts.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import *

urlpatterns = [
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
path('register/', RegisterView.as_view()),
path('protected-view/', ProtectedView.as_view() ),


## predict stock

path('predict/',StockPredectionAPIVIEW.as_view(),name='stock-prediction')
]