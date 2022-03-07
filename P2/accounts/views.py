from django.shortcuts import render

# Create your views here.
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

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




# class ProfileEditView(UpdateAPIView):
#     queryset = User.objects.all()
#     serializer_class = ProfileEditSerializer
#     permission_classes = [IsAuthenticated]
#
#     def get_object(self):
#         return self.request.user

    # def update(self, request, *args, **kwargs):
    #     print("jeffff")
    #     print(request.user.username)
    #     # instance = self.get_object()
    #     # instance.name = request.data.get("name")
    #     # instance.save()
    #     #
    #     # serializer = self.get_serializer(instance)
    #     # serializer.is_valid(raise_exception=True)
    #     # self.perform_update(serializer)
    #
    #     # return Response(serializer.data)
    #     return Response(self.get_serializer(request.user).data)







