from unittest.main import main
from flask import app
# from flask.typing import StatusCode
import unittest
import sys, os, inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from backend.app import app

class FlaskTest(unittest.TestCase):

    def testLogin(self):
        tester = app.test_client(self)
        response = tester.post("/login", json={"email": "rrangar@ncsu.edu", "password": "12345678"})
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)
        # print(statuscode)
    
    def testWrongLogin(self):
        tester = app.test_client(self)
        response = tester.post("/login", json={"email": "xyz@ncsu.edu", "password": "jytfyjtyj"})
        statuscode = response.status_code
        # User account not found
        self.assertEqual(statuscode, 400)
        # print(statuscode)



if __name__=="__main__":
     unittest.main()