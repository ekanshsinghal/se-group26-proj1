import requests

class TestBackend:
    def __init__(self):
        self.fails = 0
        self.passed = 0
        self.serverURL = "http://127.0.0.1:8000/"

    def runTests(slef):
        pass

    def testLogin(self):
        email = "user@ncsu.edu".encode()
        password = "12345678".encode()
        r = requests.get(url = self.serverURL, data = {email, password})
        if r.status_code == 404:
            self.passed += 1
        
testObj = TestBackend()
testObj.testLogin()