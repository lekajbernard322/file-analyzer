from django.http import Http404
from rest_framework import viewsets, status, filters
from report.models import Report
from report.additional_services import get_dll_statistics, get_function_statistics, get_dll_occurrences_count
from report.serializers import ReportListSerializer, ReportDetailsSerializer
from rest_framework.pagination import LimitOffsetPagination
from bson.objectid import ObjectId
from rest_framework.decorators import action
from rest_framework.response import Response


class ReportViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    pagination_class = LimitOffsetPagination

    @action(methods=['get'], detail=False, url_name='dll-statistics', url_path='dll-statistics')
    def get_dll_statistics(self, _):
        return Response(get_dll_statistics(Report.objects))

    @action(methods=['get'], detail=False, url_name='function-statistics',
            url_path='function-statistics')
    def get_function_statistics(self, _):
        return Response(get_function_statistics(Report.objects))

    @action(methods=['get'], detail=False, url_name='dll-occurrences-count',
            url_path='dll-occurrences-count')
    def get_dll_occurrences_count(self, request):
        dlls_lower_split = request.GET.get('dlls', '').lower().split(',')
        dlls = list(filter(None, dlls_lower_split))

        if len(dlls) == 0:
            return Response('List of DLL names are required!', status.HTTP_400_BAD_REQUEST)

        return Response(get_dll_occurrences_count(dlls, Report.objects))

    def get_object(self):
        object_id = ObjectId(self.kwargs['pk'])
        try:
            return Report.objects.get(pk=object_id)
        except Report.DoesNotExist:
            raise Http404("Report with given ID does not exist!")

    def get_serializer_class(self):
        match self.action:
            case 'retrieve':
                return ReportDetailsSerializer
            case _:
                return ReportListSerializer
