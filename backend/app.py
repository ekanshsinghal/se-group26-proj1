from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
import auth
import applications
import questions

app = Flask(__name__)
app.secret_key = "testing"
CORS(app)

client = MongoClient(
    "mongodb+srv://mongo:yWXYQRPzPLGeE1AX@cluster0.cp3anun.mongodb.net/?retryWrites=true&w=majority", tlsAllowInvalidCertificates=True)
db = client.get_database("development")
UserRecords = db.register
Applications = db.Applications
UserProfiles = db.Profiles
Questions = db.QA


@app.route("/")
def hello():
    return "Hello, Track your job on :3000"


@app.route("/register", methods=["post"])
def register():
    return auth.register(UserRecords)


@app.route("/login", methods=["POST"])
def login():
    return auth.login(UserRecords)


@app.route("/logout", methods=["POST", "GET"])
def logout():
    return auth.logout()


@app.route("/view_applications", methods=["GET"])
def view_applications():
    return applications.view_applications(Applications)


@app.route("/view_questions", methods=["GET"])
def view_questions():
    return questions.view_questions(Questions)


@app.route("/add_application", methods=["POST"])
def add_application():
    return applications.add_application(Applications)


@app.route("/add_question", methods=["POST"])
def add_question():
    return questions.add_question(Questions)


@app.route("/delete_application", methods=["POST"])
def delete_application():
    return applications.delete_application(Applications)


@app.route("/delete_question", methods=["POST"])
def delete_question():
    return questions.delete_question(Questions)


@app.route("/modify_application", methods=["POST"])
def modify_application():
    return applications.modify_application(Applications)


@app.route("/modify_question", methods=["POST"])
def modify_question():
    return questions.modify_question(Questions)


@app.route("/create_profile", methods=["post"])
def create_profile():
    return auth.create_profile(UserProfiles)


@app.route("/view_profile", methods=["GET"])
def view_profile():
    return auth.view_profile(UserProfiles)


@app.route("/modify_profile", methods=["POST"])
def modify_profile():
    return auth.modify_profile(UserProfiles)


@app.route("/clear_profile", methods=["POST"])
def clear_profile():
    return auth.clear_profile(UserProfiles, UserRecords)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
