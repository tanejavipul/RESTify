from django.contrib.auth import logout
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User
from accounts.serializer import SignUpSerializer, ProfileSerializer


class SignUpView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SignUpSerializer


class ProfileView(RetrieveAPIView, UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class LogOutView(APIView):
    def get(self, request):
        print(request.user.is_authenticated)
        if request.user.is_authenticated:
            token = RefreshToken(request.data.get('refresh'))
            token.blacklist()
            # for token in OutstandingToken.objects.filter(user=request.user):
            #     BlacklistedToken.objects.get_or_create(token=token)
            # print('get')
            # print(request.user.auth_token.delete())
        return Response(status=status.HTTP_200_OK)





