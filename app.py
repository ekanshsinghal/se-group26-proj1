from flask import Flask, render_template, request, url_for, redirect, session, jsonify
from pymongo import MongoClient, ReturnDocument
import bcrypt
import datetime
from bson.objectid import ObjectId

app = Flask(__name__)
app.secret_key = "testing"

client = MongoClient("mongodb+srv://se_test_user:se_test_user123@cluster0.npdziph.mongodb.net/?retryWrites=true&w=majority")
db = client.get_database("Test")
UserRecords = db.register
Applications = db.Applications

@app.route("/", methods=["post", "get"])
def register():
    message = ""
    if "email" in session:
        return redirect(url_for("home"))
    if request.method == "POST":
        firstname = request.form.get("firstname")
        lastname = request.form.get("lastname")
        print(firstname, lastname)
        name = {"First Name": firstname, "Last Name": lastname}
        email = request.form.get("email")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")

        # user_found = UserRecords.find_one({"Name": name})
        email_found = UserRecords.find_one({"Email": email})
        # if user_found:
        #     message = "There already is a user by that name"
        #     return render_template("register.html", message=message)
        if email_found:
            message = "This email already exists in database"
            return render_template("register.html", message=message)
        if password1 != password2:
            message = "Passwords should match!"
            return render_template("register.html", message=message)
        
        else:
            hashed = bcrypt.hashpw(password2.encode("utf-8"), bcrypt.gensalt())
            user_input = {"Name": name, "Email": email, "Password": hashed}
            UserRecords.insert_one(user_input)
            
            #find the new created account and its email
            user_data = UserRecords.find_one({"Email": email})
            new_email = user_data["Email"]
            #if registered redirect to logged in as the registered user
            return render_template("home.html", email=new_email)
    return render_template("register.html")

@app.route("/login", methods=["POST", "GET"])
def login():
    message = "Please login to your account"
    if "email" in session:
        return redirect(url_for("home"))

    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        #check if email exists in database
        email_found = UserRecords.find_one({"Email": email})
        if email_found:
            email_val = email_found["Email"]
            passwordcheck = email_found["Password"]
            #encode the password and check if it matches
            if bcrypt.checkpw(password.encode("utf-8"), passwordcheck):
                session["email"] = email_val
                return redirect(url_for("home"))
            else:
                if "email" in session:
                    return redirect(url_for("home"))
                message = "Wrong password"
                return render_template("login.html", message=message)
        else:
            message = "Email not found"
            return render_template("login.html", message=message)
    return render_template("login.html", message=message)

@app.route("/home")
def home():
    if "email" in session:
        email = session["email"]
        return render_template("home.html", email=email)
    else:
        return redirect(url_for("login"))

@app.route("/logout", methods=["POST", "GET"])
def logout():
    if "email" in session:
        session.pop("email", None)
        return render_template("signout.html")
    else:
        return render_template("register.html")


@app.route("/add")
def add():
    if "email" in session:
        email = session["email"]
        return render_template("new_application.html", email=email)
    else:
        return redirect(url_for("login"))


@app.route("/view", methods=["POST"])
def view():
    payload={"status":False,"msg":"","Applications":[]}

    #Use this if not using session

    # email = request.form["email"]
    # out = Applications.find({"Email": email})
    # if out:
    #     payload["status"]=True
    #     payload["msg"]="Applications present"
    #     for i in out:
    #         del i['_id']
    #         del i['Email']
    #         payload.append(i)
    # else:
    #     payload["msg"]="No Applications / Email does not exist"
    # return jsonify(payload),200


    #IF using session, use this:

    if "email" in session:
        payload["status"]=True
        email = session["email"]
        out = Applications.find({"Email": email})
        if out:
            payload["msg"]="Applications present"
            for i in out:
                del i['Email']
                i['_id']=str(i['_id'])
                payload["Applications"].append(i)
        else:
            payload["msg"]="No Applications"
    else:
        payload["msg"]="Session timed out"
    return jsonify(payload),200

@app.route("/add_application", methods=["POST", "GET"])
def add_application():
    if "email" in session:
        email = session["email"]
        company = request.form.get("company")
        title = request.form.get("title")
        jobid = request.form.get("jobid")
        url = request.form.get("url")
        date = request.form.get("date")
        status = request.form.get("status")
        application = {
            "Email": email,
            "Company": company,
            "Job Title": title,
            "Job ID": jobid,
            "URL / Application Link": url,
            # "Details": {
            #     "Industry": "Software Development",
            #     "Employment Type": "Full-time",
            #     "Seniority": "Entry Level",
            #     "Posted Date": datetime.datetime(2022, 7, 23),
            #     "Location": {
            #         "City": "Seattle",
            #         "State": "WA"
            #     },
            # },
            "Date": date,
            "Status": status
        }
        Applications.insert_one(application)
        res={"msg":"Addition successful"}
        return jsonify(res),200
        # return render_template("home.html", email=email)
    else:
        res={"msg":"Session timed out"}
        return jsonify(res),200


@app.route("/delete", methods=["POST"])
def delete_application():
    payload = {"status":False,"msg":""}

    #Use this if not using session

    # application_id = request.form["_id"]
    # email = request.form["email"]
    # delete_document = Applications.find_one_and_delete({"_id":ObjectId(application_id), "Email":email})
    # if delete_document == None:
    #     payload["msg"] = "No such application id or email"
    # else:
    #     payload["status"] = True
    #     payload["msg"] = "Deleted application"
    # return jsonify(payload),200


    #IF using session, use this:
    if "email" in session:
        email = session["email"]
        application_id = request.form["_id"]
        delete_document = Applications.find_one_and_delete({"_id":ObjectID(application_id), "Email":email})
        if delete_document == None:
            payload["msg"] = "No such application id or email"
        else:
            payload["status"] = True
            payload["msg"] = "Deleted application"
    else:
        payload["msg"] = "Session timed out"

    return jsonify(payload),200


@app.route("/modify", methods=["POST"])
def modify_application():
    payload = {"status":False,"msg":""}


    #Use this if not using session
    
    # application_id = request.form["_id"]
    # email = request.form["email"]
    # filter = {'_id':ObjectId(application_id), "email": email}
    # set_values = {"$set":{}}
    # for i in request.form:
    #     if i!="_id" and i!="email":
    #         set_values["$set"][i] = request.form[i]
    # modify_document = Application.find_one_and_update(filter, set_values, return_document = ReturnDocument.AFTER)
    # if modify_document == None:
    #     payload["msg"] = "No such application id or email"
    # else:
    #     payload["status"] = True
    #     payload["msg"] = "Modified application"
    # return jsonify(payload),200


    #IF using session, use this:
    
    if "email" in session:
        application_id = request.form["_id"]
        email = request.form["email"]
        filter = {'_id':ObjectId(application_id), "email": email}
        set_values = {"$set":{}}
        for i in request.form:
            if i!="_id" and i!="email":
                set_values["$set"][i] = request.form[i]
        modify_document = Application.find_one_and_update(filter, set_values, return_document = ReturnDocument.AFTER)
        if modify_document == None:
            payload["msg"] = "No such application id or email"
        else:
            payload["status"] = True
            payload["msg"] = "Modified application"
    else:
        payload["msg"] = "Session timed out"

    return jsonify(payload),200


if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=8000)
