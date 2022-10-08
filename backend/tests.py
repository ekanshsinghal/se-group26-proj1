import requests
import pprint
import json

class TestBackend:
    def __init__(self):
        self.fails = 0
        self.passed = 0
        self.serverURL = "http://192.168.0.142:8000"

    def runTests(self):
        self.testLogin()
        self.testRegister()

    def testLogin(self):
        req = {}
        req["email"] = "rrangar@ncsu.edu"
        req["password"] = "12345678"
        urlToSend = self.serverURL + "/login"
        r = requests.post(url = urlToSend, json = req)
        if r.status_code == 200:
            self.passed += 1
            print("Login Passed")
        elif r.status_code == 400:
            self.fails += 1
            print("Login Failed")
            pprint.pprint(json.loads(r.content))

    def testRegister(self):
        req = {}
        req["firstName"] = "Rahul"
        req["lastName"] = "RK"
        req["email"] = "rrangar2@ncsu.edu"
        req["password"] = "12345678"
        req["confirmPassword"] = "12345678"
        urlToSend = self.serverURL + "/register"
        r = requests.post(url = urlToSend, json = req)
        if r.status_code == 200:
            self.passed += 1
            print("Register Passed")
        elif r.status_code == 400:
            self.fails += 1
            print("Register Failed")
            pprint.pprint(json.loads(r.content))


testObj = TestBackend()
testObj.runTests()