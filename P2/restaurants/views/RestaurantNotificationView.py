from rest_framework import status, pagination
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from blogs.models import BlogPost
from restaurants.models import Restaurant, RestaurantNotification

# Create your views here.
from restaurants.serializer.RestaurantNotificationSerializer import RestaurantNotificationSerializer
from restaurants.views import NotificationSelector as NS


class RestaurantAddNotificationView(APIView):
    # BAD REQUEST
    def post(self, request, *args, **kwargs):

        if request.user.is_authenticated:
            if not Restaurant.objects.filter(id=self.kwargs['rest_id']).exists():
                return Response({'Error': "Restaurant not Found"}, status=status.HTTP_404_NOT_FOUND)
            if Restaurant.objects.get(id=self.kwargs['rest_id']).owner.id != request.user.id:
                user = request.user.username
                rest = Restaurant.objects.get(id=self.kwargs['rest_id']).name
                output = "'" + user + "' cannot make update for '" + str(rest) + "' as they are not owner."
                return Response({'Error': output}, status=status.HTTP_403_FORBIDDEN)

            restaurant = Restaurant.objects.get(id=self.kwargs['rest_id'])
            message = NS.getRestaurantNotificationTitle(kwargs.get(NS.REST_NOTI), restaurant)
            if message == "":
                return Response({'Error': "Could not update"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            new_update = RestaurantNotification.objects.create(
                    restaurant=Restaurant.objects.get(id=self.kwargs['rest_id']), title=message)
            return Response(
                    {'id': new_update.id, 'title': new_update.title, 'restaurant': new_update.restaurant.name},
                    status=status.HTTP_200_OK)

        return Response({'Error': "User not Authenticate."}, status=status.HTTP_401_UNAUTHORIZED)


class RestaurantNotificationView(ListAPIView):
    serializer_class = RestaurantNotificationSerializer
    queryset = RestaurantNotification.objects.all()

    def get(self, request, *args, **kwargs):
        if not Restaurant.objects.filter(id=self.kwargs['rest_id']).exists():
            return Response({'Error': "Restaurant not found."}, status=status.HTTP_404_NOT_FOUND)
        return super().get(self, request, *args, **kwargs)


    def get_queryset(self):
        restaurant = Restaurant.objects.get(id=self.kwargs['rest_id'])
        return RestaurantNotification.objects.filter(restaurant=restaurant).order_by('-last_modified')


class RestaurantAllNotificationView(ListAPIView):
    serializer_class = RestaurantNotificationSerializer
    queryset = RestaurantNotification.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        x = RestaurantNotification.objects.all().prefetch_related('restaurant__owner', 'restaurant__followers').filter(restaurant__followers__user=self.request.user).order_by('-last_modified')
        # print(x)
        # print(len(x))
        return x
