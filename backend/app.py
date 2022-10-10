import re
from bson import ObjectId
from flask import Flask, request, session, jsonify
from pymongo import MongoClient, ReturnDocument
import bcrypt
from urllib.parse import urlparse, parse_qs


app = Flask(__name__)
app.secret_key = "testing"

client = MongoClient("mongodb+srv://se_test_user:se_test_user123@cluster0.npdziph.mongodb.net/?retryWrites=true&w=majority")
db = client.get_database("Test")
UserRecords = db.register
Applications = db.Applications
UserProfiles = db.Profiles


@app.route("/register", methods=["post"])
def register():
    try:
        req = request.get_json()
        name = {"firstName": req["firstName"], "lastName": req["lastName"]}
        email = req["email"]
        password = req["password"]
        confirmPassword = req["confirmPassword"]

        email_found = UserRecords.find_one({"email": email})
        if email_found:
            return jsonify({'error': "This email already exists in database"}), 400
        if password != confirmPassword:
            return jsonify({'error': "Passwords should match!"}), 400
        
        else:
            hashed = bcrypt.hashpw(confirmPassword.encode("utf-8"), bcrypt.gensalt())
            user_input = {"name": name, "email": email, "password": hashed}
            UserRecords.insert_one(user_input)
            
            # #find the new created account and its email
            # user_data = UserRecords.find_one({"email": email})
            # new_email = user_data["email"]
            # #if registered redirect to logged in as the registered user
            # session["email"] = new_email
            return jsonify({'message': 'Login successful'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/login", methods=["POST"])
def login():
    try:
        req = request.get_json()
        email = req["email"]
        password = req["password"]

        #check if email exists in database
        email_found = UserRecords.find_one({"email": email})
        if email_found:
            # email_val = email_found["email"]
            passwordcheck = email_found["password"]
            #encode the password and check if it matches
            if bcrypt.checkpw(password.encode("utf-8"), passwordcheck):
                # session["email"] = email_val
                return jsonify({'message': 'Login successful'}), 200
            else:
                if "email" in session:
                    return jsonify({'message': 'Login successful'}), 200
                return jsonify({'error': "Wrong password"}), 400
        else:
            return jsonify({'error': "Email not found"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/logout", methods=["POST", "GET"])
def logout():
    # if "email" in session:
    #     session.pop("email", None)
    return jsonify({'message': 'Logout successful'}), 200


@app.route("/view_applications", methods=["GET"])
def view_applications():
    try:
        # if "email" in session:
        if request:
            # email = session["email"]
            email = request.args.get("email")
            out = Applications.find({"email": email})
            if out:
                applications_list = []
                # payload["msg"]="Applications present"
                for i in out:
                    del i['email']
                    i['_id']=str(i['_id'])
                    applications_list.append(i)
                return jsonify({'message': 'Applications found', 'applications': applications_list}), 200
            else:
                return jsonify({'message': 'You have no applications'}), 200
        # else:
        #     return jsonify({'error': "Not Logged in"}), 400
            
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400

@app.route("/add_application", methods=["POST"])
def add_application():
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            application = {
                "email": req["email"],
                "companyName": req["companyName"],
                "jobTitle": req["jobTitle"],
                "jobId": req["jobId"],
                "description": req["description"],
                "url": req["url"],
                # "details": {
                #     "Industry": "Software Development",
                #     "Employment Type": "Full-time",
                #     "Seniority": "Entry Level",
                #     "Posted Date": datetime.datetime(2022, 7, 23),
                #     "Location": {
                #         "City": "Seattle",
                #         "State": "WA"
                #     },
                # },
                "date": req["date"],
                "status": req["status"]
            }
            try:
                Applications.insert_one(application)
                return jsonify({"message": "Application added successfully"}),200
            except Exception as e:
                return jsonify({"error": "Unable to add Application"}),400
        # else:
        #     return jsonify({'error': "Not Logged in"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/delete_application", methods=["POST"])
def delete_application():
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            email = req["email"]
            _id = req["_id"]
            # delete_document = Applications.find_one_and_delete({"_id":jobId, "email":email})
            delete_document = Applications.find_one_and_delete({"_id":ObjectId(_id), "email":email})
            if delete_document == None:
                return jsonify({"error": "No such Job ID found for this user's email"}), 400
            else:
                return jsonify({"message": "Job Application deleted successfully"}), 200
        # else:
        #     return jsonify({'error': "Not Logged in"}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/modify_application", methods=["POST"])
def modify_application():
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            email = req["email"]
            _id = req["_id"]
            filter = {'_id':ObjectId(_id), "email": email}
            # filter = {"_id": jobId, "email": email}

            application = {
                "email": session["email"],
                "companyName": req["companyName"],
                "jobTitle": req["jobTitle"],
                "jobId": req["jobId"],
                "description": req["description"],
                "url": req["url"],
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
                "date": req["date"],
                "status": req["status"]
            }
            set_values = {"$set": application}
            modify_document = Applications.find_one_and_update(filter, set_values, return_document = ReturnDocument.AFTER)
            if modify_document == None:
                return jsonify({"error": "No such Job ID found for this user's email"}), 400
            else:
                return jsonify({"message": "Job Application modified successfully"}), 200
        # else:
        #     return jsonify({'error': "Not Logged in"}), 400
    
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/create_profile", methods=["post"])
def create_profile():
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            email = req["email"]
            email_found = UserProfiles.find_one({"email": email})
            if email_found:
                return jsonify({"error": "Profile already created."}),400
            else:
                user_profile = {
                    "firstName": req["firstName"],
                    "lastName": req["lastName"],
                    "email": req["email"], 
                    "phone": req.get("phone"),
                    "city": req.get("city"),
                    "state": req.get("state"),
                    "resume": req.get("resume"),
                    "gitHub": req.get("gitHub"),
                    "linkedIn": req.get("linkedin"),
                    "skills": req.get("skills", '').split(","),
                    "about": req.get("about"),
                    "interests": req.get("interests", '').split(","),
                    "companyName": req.get("companyName"),
                    "jobTitle": req.get("jobTitle"),
                    "description": req.get("description"),
                    "jobCity": req.get("jobCity"),
                    "jobState": req.get("jobState"),
                    "jobFrom": req.get("jobDate"),
                    "toFrom": req.get("jobDate"),
                    "curentJob": req.get("curentJob"),
                    "institution": req.get("institution"),
                    "major": req.get("major"),
                    "degree": req.get("degree"),
                    "courses": req.get("courses", '').split(","),
                    "universityCity": req.get("universityCity"),
                    "universityState": req.get("universityState"),
                    "universityFromDate": req.get("universityDate"),
                    "universityToDate": req.get("universityDate"),
                    "curentUniversity": req.get("curentUniversity")
                }
                try:
                    UserProfiles.insert_one(user_profile)
                    return jsonify({"message": "Profile created successfully"}),200
                except Exception as e:
                    return jsonify({"error": "Unable to create profile"}),400
        # else:
        #     return jsonify({'error': "Not Logged in"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/view_profile", methods=["GET"])
def view_profile():
    try:
        # if "email" in session:
        if request:
            email = request.args.get("email")
            filter = {"email": email}
            profile = UserProfiles.find(filter)
            if profile == None:
                return jsonify({'message': "Create a profile first", "profile": {}}), 200
            else:
                # payload["profile"] = profile
                profile_out = {}
                for p in profile:
                    p['_id'] = str(p['_id'])
                    profile_out = p
                return jsonify({'message': "Found User Profile", "profile": profile_out}), 200
        # else:
        #     return jsonify({'error': "Not Logged in"}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/modify_profile", methods=["POST"])
def modify_profile(): 
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            _id = req["_id"]
            email = req["email"]
            email_found = UserProfiles.find_one({"_id": ObjectId(_id), "email": email})
            if not email_found:
                return jsonify({"error": "Profile not found."}),400
            else:
                user_profile = {
                    "firstName": req["firstName"],
                    "lastName": req["lastName"],
                    "email": req["email"], 
                    "phone": req.get("phone"),
                    "city": req.get("city"),
                    "state": req.get("state"),
                    "resume": req.get("resume"),
                    "gitHub": req.get("gitHub"),
                    "linkedIn": req.get("linkedin"),
                    "skills": req.get("skills", '').split(","),
                    "about": req.get("about"),
                    "interests": req.get("interests", '').split(","),
                    "companyName": req.get("companyName"),
                    "jobTitle": req.get("jobTitle"),
                    "description": req.get("description"),
                    "jobCity": req.get("jobCity"),
                    "jobState": req.get("jobState"),
                    "jobFrom": req.get("jobDate"),
                    "toFrom": req.get("jobDate"),
                    "curentJob": req.get("curentJob"),
                    "institution": req.get("institution"),
                    "major": req.get("major"),
                    "degree": req.get("degree"),
                    "courses": req.get("courses", '').split(","),
                    "universityCity": req.get("universityCity"),
                    "universityState": req.get("universityState"),
                    "universityFromDate": req.get("universityDate"),
                    "universityToDate": req.get("universityDate"),
                    "curentUniversity": req.get("curentUniversity")
                }

                set_values = {"$set":user_profile}
                filter = {"email": email}
                modify_document = UserProfiles.find_one_and_update(filter, set_values, return_document = ReturnDocument.AFTER)
                if modify_document == None:
                    return jsonify({"error": "Unable to modify profile"}),400
                else:
                    return jsonify({"message": "Profile modified successfully"}),200    
        # else:
        #     return jsonify({'error': "Not Logged in"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400    

@app.route("/clear_profile", methods=["POST"])
def clear_profile():
    try:
        if request:
            req = request.get_json()
            email_to_delete = req["email"]
            _id = req["_id"]
            delete_user = UserRecords.find_one({"email":email_to_delete})
            if delete_user == None:
                return jsonify({'error': "User email not found"}), 400
            delete_profile = UserProfiles.find_one_and_delete({"_id": ObjectId(_id), "email":email_to_delete})
            if delete_profile == None:
                return jsonify({'error': "Profile not found"}), 400
            else:
                return jsonify({"message": "User Profile cleared successfully"}), 200
        # else:
        #     return jsonify({'error': "Not Logged in"}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=8000)
