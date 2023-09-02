from rest_framework import serializers
from report.models import Report


class ReportListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = ('_id', 'name', 'created')
        read_only_fields = ('_id', 'name', 'created')


class ReportDetailsSerializer(ReportListSerializer):
    content = serializers.JSONField()

    class Meta:
        model = Report
        fields = ('_id', 'name', 'content', 'created')
        read_only_fields = ('_id', 'name', 'content', 'created')
