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
    permission_classes = [IsAuthenticated]
    serializer_class = EditMenuSerializer

    def get_object(self):
        return get_object_or_404(MenuItem, id=self.kwargs['menu_item_id'])

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["menu_item_id"] = self.kwargs['menu_item_id']
        return context

    def check_permissions(self, request):
        user_id = request.user.id
        menu_item = get_object_or_404(MenuItem, id=self.kwargs['menu_item_id'])
        rest_id = menu_item.restaurant_id

        restaurant = get_object_or_404(Restaurant, id=rest_id)

        # not owner of the restaurant that owns the menu
        if user_id != restaurant.owner_id:
            self.permission_denied(self.request)


class AddMenuView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddMenuSerializer
