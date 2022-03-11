from rest_framework.generics import RetrieveAPIView, get_object_or_404, UpdateAPIView, RetrieveUpdateAPIView, \
    CreateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import MenuItem, Restaurant
from restaurants.serializer.MenuSerializer import MenuSerializer, EditMenuSerializer, AddMenuSerializer


class MenuView(RetrieveAPIView):
    serializer_class = MenuSerializer

    def get_object(self):
        return get_object_or_404(MenuItem, id=self.kwargs['restaurant_id'])


# Not working yet
class EditMenuView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EditMenuSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        return context

    # def get_object(self):
    #     return get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])


class AddMenuView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddMenuSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        return context
