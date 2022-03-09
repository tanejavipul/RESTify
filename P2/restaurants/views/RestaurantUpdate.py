from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User, Following
from restaurants.models import Restaurant, RestaurantUpdate


# Create your views here.
class RestaurantUpdateBlogMenuView(APIView):
    def get_update_message(self, message):
        if message == "blog":
            return " added a new blog."
        return " made some updates to their menu."

    def post(self, request, *args, **kwargs):
        message = self.get_update_message(kwargs.get("blogOrMenu"))

        if request.user.is_authenticated:
            if not Restaurant.objects.filter(id=self.kwargs['rest_id']).exists():
                return Response({'Error': "Restaurant not Found"}, status=status.HTTP_404_NOT_FOUND)
            if Restaurant.objects.get(id=self.kwargs['rest_id']).owner.id != request.user.id:
                user = request.user.username
                rest = Restaurant.objects.get(id=self.kwargs['rest_id']).name
                output = "'" + user + "' cannot make update for '" + str(rest) + "' as they are not owner"
                return Response({'Error': output}, status=status.HTTP_403_FORBIDDEN)

            restaurant = Restaurant.objects.get(id=self.kwargs['rest_id'])
            message = restaurant.name + message
            print(message)

            try:
                new_update = RestaurantUpdate.objects.create(
                    restaurant=Restaurant.objects.get(id=self.kwargs['rest_id']), title=message)
                return Response(
                    {'id': new_update.id, 'title': new_update.title, 'restaurant': new_update.restaurant.name},
                    status=status.HTTP_200_OK)
            except:
                return Response({'Error': "Could not update"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'Error': "User not Authenticated"}, status=status.HTTP_401_UNAUTHORIZED)



class RestaurantUpdateView(APIView):
    def get(self, request):
        pass
