from rest_framework import status, pagination
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView


from accounts.models import User, Following
from restaurants.models import Restaurant, RestaurantUpdate


# Create your views here.
from restaurants.serializer.RestaurantUpdateSerializer import RestaurantUpdateSerializer


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



class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50
    page_query_param = 'p'

    def get_paginated_response(self, data):
        response = Response(data)
        response['count'] = self.page.paginator.count
        response['next'] = self.get_next_link()
        response['previous'] = self.get_previous_link()
        return response



class RestaurantUpdateView(ListAPIView):
    # queryset = RestaurantUpdate.objects.all()
    serializer_class = RestaurantUpdateSerializer
    # print(queryset)
    pagination_class = CustomPagination
    queryset = RestaurantUpdate.objects.all()
    # paginate_by = 2
    def get_queryset(self):

        hee = self.kwargs['rest_id']
        print(hee)

        restaurant = Restaurant.objects.get(id=hee)
        print(restaurant)
        x = RestaurantUpdate.objects.filter(restaurant=restaurant)[0]
        print("DATEEEE")
        print(x.last_modified)
        return RestaurantUpdate.objects.filter(restaurant=restaurant)#.order_by('-datetime')

    def get(self, request, *args, **kwargs):
        serializer = RestaurantUpdateSerializer(self.get_queryset(), many=True)
        page = self.paginate_queryset(serializer.data)
        return self.get_paginated_response(page)
