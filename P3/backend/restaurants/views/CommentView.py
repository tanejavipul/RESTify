from rest_framework.generics import ListAPIView, CreateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Comment, Restaurant
from restaurants.serializer.CommentSerializer import CommentSerializer, AddCommentSerializer


class CommentView(ListAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get_queryset(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])
        return Comment.objects.filter(restaurant=restaurant).order_by('-datetime')


class AddCommentView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddCommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["restaurant_id"] = self.kwargs['restaurant_id']
        return context
