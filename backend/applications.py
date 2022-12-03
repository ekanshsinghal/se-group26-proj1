import re
from bson import ObjectId
from flask import Flask, request, session, jsonify
from pymongo import MongoClient, ReturnDocument
import bcrypt
from urllib.parse import urlparse, parse_qs
from flask_cors import CORS

def view_applications(Applications):
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
                    i['_id'] = str(i['_id'])
                    applications_list.append(i)
                return jsonify({'message': 'Applications found', 'applications': applications_list}), 200
            else:
                return jsonify({'message': 'You have no applications'}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400

def add_application(Applications):
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            application = {
                "email": req["email"],
                "companyName": req["companyName"],
                "jobTitle": req["jobTitle"],
                "jobId": req["jobId"],
                "description": req["description"] if "description" in req.keys() else None,
                "url": req["url"],
                "date": req["date"] if "date" in req.keys() else None,
                "status": req["status"]
            }
            try:
                Applications.insert_one(application)
                return jsonify({"message": "Application added successfully"}), 200
            except Exception as e:
                return jsonify({"error": "Unable to add Application"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400

def delete_application(Applications):
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            email = req["email"]
            _id = req["_id"]
            delete_document = Applications.find_one_and_delete(
                {"_id": ObjectId(_id), "email": email})
            if delete_document == None:
                return jsonify({"error": "No such Job ID found for this user's email"}), 400
            else:
                return jsonify({"message": "Job Application deleted successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400

def modify_application(Applications):
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            email = req["email"]
            _id = req["_id"]
            filter = {'_id': ObjectId(_id), "email": email}
            # filter = {"_id": jobId, "email": email}

            application = {
                "email": email,
                "companyName": req["companyName"],
                "jobTitle": req["jobTitle"],
                "jobId": req["jobId"],
                "description": req["description"],
                "url": req["url"],
                "date": req["date"],
                "status": req["status"]
            }
            set_values = {"$set": application}
            modify_document = Applications.find_one_and_update(
                filter, set_values, return_document=ReturnDocument.AFTER)
            if modify_document == None:
                return jsonify({"error": "No such Job ID found for this user's email"}), 400
            else:
                return jsonify({"message": "Job Application modified successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400