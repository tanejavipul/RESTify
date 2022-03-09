from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User, Following
from restaurants.models import Restaurant


# Create your views here.

class FollowUnfollowView(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            if not Restaurant.objects.filter(id=self.kwargs['rest_id']).exists():
                return Response({'Error': "Restaurant not Found"}, status=status.HTTP_404_NOT_FOUND)
            result = False
            if Following.objects.filter(user=self.request.user, restaurant=self.kwargs['rest_id']).exists():
                result = True
            return Response({'result': result}, status=status.HTTP_200_OK)
        return Response({'Error': "User not Authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            if Following.objects.filter(user=self.request.user, restaurant=self.kwargs['rest_id']).exists():
                return Response({'Success': "User already follows restaurant."}, status=status.HTTP_400_BAD_REQUEST)
            if not Restaurant.objects.filter(id=self.kwargs['rest_id']).exists():
                return Response({'Error': "Restaurant not Found"}, status=status.HTTP_404_NOT_FOUND)
            try:
                Following.objects.create(user=self.request.user,
                                         restaurant=Restaurant.objects.get(id=self.kwargs['rest_id']))
                return Response({'Success': "User now follows restaurant."}, status=status.HTTP_200_OK)
            except:
                return Response({'Error': "User Cannot Follow"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Error': "User not Authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            if not Restaurant.objects.filter(id=self.kwargs['rest_id']).exists():
                return Response({'Error': "Restaurant not Found"}, status=status.HTTP_404_NOT_FOUND)

            try:
                Following.objects.filter(user=self.request.user,
                                         restaurant=Restaurant.objects.get(id=self.kwargs['rest_id'])).delete()
                return Response({'Success': "User does not follow restaurant anymore."}, status=status.HTTP_200_OK)
            except:
                return Response({'Error': "User Cannot UnFollow"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Error': "User not Authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
