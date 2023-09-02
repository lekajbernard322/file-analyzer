from django.urls import reverse
from django.utils.http import urlencode

from rest_framework import status
from rest_framework.test import APITestCase

REPORTS_URL = reverse('report:report-list')
DLL_STATISTICS_URL = reverse('report:report-dll-statistics')
FUNCTION_STATISTICS_URL = reverse('report:report-function-statistics')


def get_detail_url(report_id):
    return reverse('report:report-detail', args=[report_id])


def get_dll_occurrences_url(dlls):
    return f"{reverse('report:report-dll-occurrences-count')}?{urlencode(dlls)}"


class ReportApiTestCase(APITestCase):
    fixtures = ['report_fixture.json']

    def test_fetch_report_list(self):
        response = self.client.get(REPORTS_URL)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)
        self.assertIn('_id', response.data[0])
        self.assertIn('name', response.data[0])
        self.assertIn('created', response.data[0])
        self.assertNotIn('content', response.data[0])

    def test_fetch_single_report(self):
        response = self.client.get(get_detail_url("61b60624815f4b7823ec5bd6"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('_id', response.data)
        self.assertIn('name', response.data)
        self.assertIn('created', response.data)
        self.assertIn('content', response.data)
        self.assertEqual('chrome_pe_metadata.json', response.data['name'])

    def test_fetch_single_report_that_doesnt_exist(self):
        response = self.client.get(get_detail_url("71b60624815f4b7823ec5bd6"))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_fetch_dll_statistics(self):
        response = self.client.get(DLL_STATISTICS_URL)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(27.4, response.data['averageNumberOfDlls'])
        self.assertEqual(5, response.data['minNumberOfDlls'])
        self.assertEqual(92, response.data['maxNumberOfDlls'])

    def test_fetch_function_statistics(self):
        response = self.client.get(FUNCTION_STATISTICS_URL)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(423.6, response.data['averageNumberOfFunctions'])
        self.assertEqual(85, response.data['minNumberOfFunctions'])
        self.assertEqual(1235, response.data['maxNumberOfFunctions'])

    def test_fetch_dll_occurrences(self):
        response = self.client.get(get_dll_occurrences_url({'dlls': 'kernel32.dll,advapi32.dll'}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        self.assertEqual('advapi32.dll', response.data[0]['_id'])
        self.assertEqual(2, response.data[0]['occurrences'])

        self.assertEqual('kernel32.dll', response.data[1]['_id'])
        self.assertEqual(4, response.data[1]['occurrences'])

    def test_fetch_dll_occurrences_without_input_parameters(self):
        response = self.client.get(get_dll_occurrences_url({'dlls': ''}))

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)




