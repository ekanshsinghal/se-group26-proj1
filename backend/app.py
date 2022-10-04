import re
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
UserProfiles = db.Profiles


@app.route("/register", methods=["post"])
def register():
    try:
        req = request.get_json()
        firstName = req["firstName"]
        lastName = req["lastName"]
        name = {"First Name": firstName, "Last Name": lastName}
        email = req["email"]
        password = req["password"]
        confirmPassword = req["confirmPassword"]

        email_found = UserRecords.find_one({"Email": email})
        if email_found:
            return jsonify({'error': "This email already exists in database"}), 400
        if password != confirmPassword:
            return jsonify({'error': "Passwords should match!"}), 400
        
        else:
            hashed = bcrypt.hashpw(confirmPassword.encode("utf-8"), bcrypt.gensalt())
            user_input = {"Name": name, "Email": email, "Password": hashed}
            UserRecords.insert_one(user_input)
            
            #find the new created account and its email
            user_data = UserRecords.find_one({"Email": email})
            new_email = user_data["Email"]
            #if registered redirect to logged in as the registered user
            session["email"] = new_email
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
        email_found = UserRecords.find_one({"Email": email})
        print(email, password, email_found)
        if email_found:
            email_val = email_found["Email"]
            passwordcheck = email_found["Password"]
            #encode the password and check if it matches
            if bcrypt.checkpw(password.encode("utf-8"), passwordcheck):
                session["email"] = email_val
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
    if "email" in session:
        session.pop("email", None)
    return jsonify({'message': 'Logout successful'}), 200


# @app.route("/add")
# def add():
#     if "email" in session:
#         email = session["email"]
#         return render_template("new_application.html", email=email)
#     else:
#         return redirect(url_for("login"))


@app.route("/view_applications", methods=["GET"])
def view_applications():
    try:
        if "email" in session:
            email = session["email"]
            out = Applications.find({"Email": email})
            if out:
                applications_list = []
                # payload["msg"]="Applications present"
                for i in out:
                    del i['Email']
                    i['_id']=str(i['_id'])
                    applications_list.append(i)
                return jsonify({'message': 'Applications found', 'applications': applications_list}), 200
            else:
                return jsonify({'message': 'You have no applications'}), 200
        else:
            return jsonify({'error': "Not Logged in"}), 400
            
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400

@app.route("/add_application", methods=["POST"])
def add_application():
    try:
        if "email" in session:
            email = session["email"]
            req = request.get_json()
            company = req["company"]
            title = req["title"]
            jobid = req["jobid"]
            url = req["url"]
            date = req["date"]
            status = req["status"]
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
            try:
                Applications.insert_one(application)
                return jsonify({"message": "Application added successfully"}),200
            except Exception as e:
                return jsonify({"error": "Unable to add Application"}),400
        else:
            return jsonify({'error': "Not Logged in"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/delete_application", methods=["POST"])
def delete_application():
    try:
        if "email" in session:
            email = session["email"]
            req = request.get_json()
            jobid = req["jobid"]
            delete_document = Applications.find_one_and_delete({"Job ID":jobid, "Email":email})
            if delete_document == None:
                return jsonify({"error": "No such Job ID found for this user's email"}), 400
            else:
                return jsonify({"message": "Job Application deleted successfully"}), 200
        else:
            return jsonify({'error': "Not Logged in"}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/modify_application", methods=["POST"])
def modify_application():
    try:
        if "email" in session:
            email = session["email"]
            req = request.get_json()
            # filter = {'_id':ObjectId(application_id), "email": email}
            company = req["company"]
            title = req["title"]
            jobid = req["jobid"]
            url = req["url"]
            date = req["date"]
            status = req["status"]
            
            filter = {"Job ID": jobid, "Email": email}

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
            set_values = {"$set": application}
            modify_document = Applications.find_one_and_update(filter, set_values, return_document = ReturnDocument.AFTER)
            if modify_document == None:
                return jsonify({"error": "No such Job ID found for this user's email"}), 400
            else:
                return jsonify({"message": "Job Application modified successfully"}), 200
        else:
            return jsonify({'error': "Not Logged in"}), 400
    
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/create_profile", methods=["post"])
def create_profile():
    try:
        if "email" in session:
            email = session["email"]
            email_found = UserProfiles.find_one({"Email": email})
            if email_found:
                return jsonify({"error": "Profile already created."}),400
            else:
                req = request.get_json()
                firstname = req["firstName"]
                lastname = req["lastName"]
                name = {"First Name": firstname, "Last Name": lastname}
                email = req["email"]
                phone = req["phone"]
                city = req["city"]
                state = req["state"]
                location = {"City": city, "State": state}
                resume = req["resume"]
                github = req["gitHub"]
                linkedin = req["linkedin"]
                skills = req["skills"].split(",")
                about = req["about"]
                interests = req["interests"].split(",")
                company = req["company"]
                job_title = req["jobTitle"]
                description = req["jobDescription"]
                city = req["jobCity"]
                state = req["jobState"]
                job_location = {"City": city, "State": state}
                job_from_date = req["jobFrom"]
                job_to_date = req["toFrom"]
                curent_job = req["curentJob"]
                experience = {
                    "Company": company,
                    "Job Title": job_title,
                    "Description": description,
                    "Location": job_location,
                    "From": job_from_date,
                    "To": job_to_date,
                    "Current Job": curent_job
                }
                institution = req["institution"]
                major = req["major"]
                degree = req["degree"]
                courses = req["courses"].split(",")
                city = req["universityCity"]
                state = req["universityState"]
                university_location = {"City": city, "State": state}
                university_from_date = req["universityFromDate"]
                university_to_date = req["universityToDate"]
                curent_university = req["curentUniversity"]
                education = {
                    "Institution": institution,
                    "Major": major,
                    "Degree": degree,
                    "Courses": courses,
                    "Location": university_location,
                    "From": university_from_date,
                    "To": university_to_date,
                    "Currently Attending": curent_university
                }
                user_profile = {
                    "Name": name, 
                    "Email": email, 
                    "Phone": phone,
                    "Location": location,
                    "Resume": resume,
                    "GitHub": github,
                    "LinkedIn": linkedin,
                    "Skills": skills,
                    "About": about,
                    "Interests": interests,
                    "Experience": experience,
                    "Education": education
                }
                try:
                    UserProfiles.insert_one(user_profile)
                    return jsonify({"message": "Profile created successfully"}),200
                except Exception as e:
                    return jsonify({"error": "Unable to create profile"}),400
        else:
            return jsonify({'error': "Not Logged in"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


@app.route("/view_profile", methods=["GET"])
def view_profile():
    payload = {"status":False,"msg":""}
    if "email" in session:
        email = session["email"]
        filter = {"Email": email}
        profile = UserProfiles.find(filter)
        if profile == None:
            payload["msg"] = "No such user profile or email found"
        else:
            payload["status"] = True
            payload["msg"] = "Found User Profile"
            # payload["profile"] = profile
            for p in profile:
                p['_id'] = str(p['_id'])
                payload["profile"] = p
    else:
        payload["msg"] = "Session timed out"

    return jsonify(payload),200


@app.route("/modify_profile", methods=["POST"])
def modify_profile(): 
    try:
        if "email" in session:
            email = session["email"]
            email_found = UserProfiles.find_one({"Email": email})
            if not email_found:
                return jsonify({"error": "Profile not found."}),400
            else:
                req = request.get_json()
                firstname = req["firstName"]
                lastname = req["lastName"]
                name = {"First Name": firstname, "Last Name": lastname}
                email = req["email"]
                phone = req["phone"]
                city = req["city"]
                state = req["state"]
                location = {"City": city, "State": state}
                resume = req["resume"]
                github = req["gitHub"]
                linkedin = req["linkedin"]
                skills = req["skills"].split(",")
                about = req["about"]
                interests = req["interests"].split(",")
                company = req["company"]
                job_title = req["jobTitle"]
                description = req["jobDescription"]
                city = req["jobCity"]
                state = req["jobState"]
                job_location = {"City": city, "State": state}
                job_from_date = req["jobFrom"]
                job_to_date = req["toFrom"]
                curent_job = req["curentJob"]
                experience = {
                    "Company": company,
                    "Job Title": job_title,
                    "Description": description,
                    "Location": job_location,
                    "From": job_from_date,
                    "To": job_to_date,
                    "Current Job": curent_job
                }
                institution = req["institution"]
                major = req["major"]
                degree = req["degree"]
                courses = req["courses"].split(",")
                city = req["universityCity"]
                state = req["universityState"]
                university_location = {"City": city, "State": state}
                university_from_date = req["universityFromDate"]
                university_to_date = req["universityToDate"]
                curent_university = req["curentUniversity"]
                education = {
                    "Institution": institution,
                    "Major": major,
                    "Degree": degree,
                    "Courses": courses,
                    "Location": university_location,
                    "From": university_from_date,
                    "To": university_to_date,
                    "Currently Attending": curent_university
                }
                user_profile = {
                    "Name": name, 
                    "Email": email, 
                    "Phone": phone,
                    "Location": location,
                    "Resume": resume,
                    "GitHub": github,
                    "LinkedIn": linkedin,
                    "Skills": skills,
                    "About": about,
                    "Interests": interests,
                    "Experience": experience,
                    "Education": education
                }

                set_values = {"$set":user_profile}
                filter = {"Email": email}
                modify_document = UserProfiles.find_one_and_update(filter, set_values, return_document = ReturnDocument.AFTER)
                if modify_document == None:
                    return jsonify({"error": "Unable to modify profile"}),400
                else:
                    return jsonify({"message": "Profile modified successfully"}),200    
        else:
            return jsonify({'error': "Not Logged in"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400    

@app.route("/clear_profile", methods=["POST"])
def clear_profile():
    
    try:
            
        if "email" in session:
            email = session["email"]
            req = request.get_json()
            email_to_delete = req["email"]
            if email != email_to_delete:
                return jsonify({'error': "Email not matching"}), 400
            delete_user = UserRecords.find_one({"Email":email_to_delete})
            if delete_user == None:
                return jsonify({'error': "User email not found"}), 400
            delete_profile = UserProfiles.find_one_and_delete({"Email":email_to_delete})
            if delete_profile == None:
                return jsonify({'error': "Profile not found"}), 400
            else:
                return jsonify({"message": "User Profile cleared successfully"}), 200
        else:
            return jsonify({'error': "Not Logged in"}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400

if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=8000)
