from django.urls import path
from .views import NoteListCreate, NoteDelete, RegisterView, ChatView

urlpatterns = [
    path('notes/', NoteListCreate.as_view()),
    path('notes/<int:pk>/', NoteDelete.as_view()),
    path('register/', RegisterView.as_view()),
    path('chat/', ChatView.as_view()),
]