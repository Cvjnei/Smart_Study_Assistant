from django.db import models

# Create Models

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)

    def __str__(self):
        return self.title