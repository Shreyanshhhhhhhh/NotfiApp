# filepath: /c:/Users/DELL/Programming/Projects/NotificationApp/backend/users/views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from notifications.models import Notification
from .serializers import UserSerializer
from notifications.serializers import NotificationSerializer

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class UserSignup(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        user = CustomUser.objects.filter(email=request.data['email']).first()
        if user:
            return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
        print("Request data:", request.data)  # Print request data
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        print("Serializer errors:", serializer.errors)  # Print serializer errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NotificationListCreate(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationDetail(generics.RetrieveAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer