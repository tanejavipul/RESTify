from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User, Following
from restaurants.models import Restaurant, OwnerNotification, RestaurantNotification
from restaurants.serializer.OwnerNotificationSerializer import OwnerNotificationSerializer

# Create your views here.
from restaurants.views import NotificationSelector as NS


class OwnerNotificationAddView(APIView):

    def post(self, request, *args, **kwargs):


        if request.user.is_authenticated:
            if not Restaurant.objects.filter(id=self.kwargs['rest_id']).exists():
                return Response({'Error': "Restaurant not Found"}, status=status.HTTP_404_NOT_FOUND)
            restaurant = Restaurant.objects.get(id=self.kwargs['rest_id'])
            message = NS.getOwnerNotificationTitle(kwargs.get(NS.OWNER_NOTI), self.request.user, restaurant)
            if message == "":
                return Response({'Error': "Could not update"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            try:
                new_update = OwnerNotification.objects.create(restaurant=restaurant, title=message, user=request.user)
                return Response(
                    {'id': new_update.id, 'title': new_update.title, 'restaurant': new_update.restaurant.name},
                    status=status.HTTP_200_OK)
            except:
                return Response({'Error': "Could not update"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'Error': "User not Authenticated"}, status=status.HTTP_401_UNAUTHORIZED)


class OwnerNotificationView(ListAPIView):
    serializer_class = OwnerNotificationSerializer
    queryset = OwnerNotification.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        x = OwnerNotification.objects.all().filter(restaurant=self.request.user.restaurant).order_by('-last_modified')
        return x