from rest_framework.generics import get_object_or_404, UpdateAPIView, ListAPIView, CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import MenuItem, Restaurant
from restaurants.serializer.MenuSerializer import MenuSerializer, EditMenuSerializer, AddMenuSerializer


class MenuView(ListAPIView):
    serializer_class = MenuSerializer
    queryset = MenuItem.objects.all()

    def get_queryset(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])
        return MenuItem.objects.filter(restaurant=restaurant)


class EditMenuView(UpdateAPIView):
    # queryset = MenuItem.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EditMenuSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        return context

    def get_object(self):
        return get_object_or_404(MenuItem, id=self.kwargs['menu_id'])


class AddMenuView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddMenuSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        return context
