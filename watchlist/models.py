from django.conf import settings
from django.db import models


class Media(models.Model):
    MEDIA_TYPE_CHOICES = [
        ('Movie', 'Movie'),
        ('TV', 'TV'),
    ]

    STATUS_CHOICES = [
        ('Watched', 'Watched'),
        ('Unwatched', 'Unwatched'),
    ]

    title = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    rating = models.IntegerField(default=0)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)

    def __str__(self):
        return self.title
