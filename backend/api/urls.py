from django.urls import path
from .views import NoteListCreate, NoteDelete

urlpatterns = [
    path('notes/', NoteListCreate.as_view()),
    path('notes/<int:pk>/', NoteDelete.as_view()),
]