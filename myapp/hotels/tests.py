import unittest
from django.test import TestCase
from django.core.urlresolvers import reverse
from django.test.client import Client

from hotels.models import Hotel

class SimpleTest(unittest.TestCase):

    def test_if_ajax_call_works(self):
        client = Client()

        result = client.post(reverse('get_hotels'), {'city': '', 'date_range' : ''},
                                HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(result.status_code, 200)


