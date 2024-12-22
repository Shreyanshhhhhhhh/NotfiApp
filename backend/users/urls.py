# filepath: users/urls.py
from django.urls import path
from .views import UserList, UserSignup
from .auth_views import CustomTokenObtainPairView

urlpatterns = [
    path('', UserList.as_view(), name='user-list'),
    path('signup/', UserSignup.as_view(), name='user-signup'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]