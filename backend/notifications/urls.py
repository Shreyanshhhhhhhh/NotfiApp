# filepath: notifications/urls.py
from django.urls import path
from users.views import NotificationListCreate, NotificationDetail

urlpatterns = [
    path('', NotificationListCreate.as_view(), name='notification-list-create'),
    path('<int:pk>/', NotificationDetail.as_view(), name='notification-detail'),
]