from django.shortcuts import render

# Create your views here.
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from accounts.models import User
from accounts.serializer import SignUpSerializer, ProfileSerializer


class SignUpView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SignUpSerializer
    # permission_classes = [IsAuthenticated]
    # #
    # def get_object(self):
    #     return self.request.user
    #

class ProfileView(RetrieveAPIView, UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

