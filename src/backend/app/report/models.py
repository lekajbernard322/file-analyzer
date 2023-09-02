from djongo import models


class Report(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=40)
    content = models.JSONField()
    created = models.DateTimeField(auto_now_add=True)

    objects = models.DjongoManager()

    class Meta:
        ordering = ['name']
