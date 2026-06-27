from django.urls import path
from .views import NoteListCreate, NoteDelete, RegisterView

urlpatterns = [
    path('notes/', NoteListCreate.as_view()),
    path('notes/<int:pk>/', NoteDelete.as_view()),
    path('register/', RegisterView.as_view()),
]