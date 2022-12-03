import re
from bson import ObjectId
from flask import Flask, request, session, jsonify
from pymongo import MongoClient, ReturnDocument
import bcrypt
from urllib.parse import urlparse, parse_qs
from flask_cors import CORS


def delete_question(Questions):
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            email = req["email"]
            _id = req["_id"]
            delete_document = Questions.find_one_and_delete(
                {"_id": ObjectId(_id), "email": email})
            if delete_document == None:
                return jsonify({"error": "No such Question ID found for this user's email"}), 400
            else:
                return jsonify({"message": "Question deleted successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400

def add_question(Questions):
    try:
        # if "email" in session:
        if request:
            req = request.get_json()
            application = {
                "email": req["email"],
                "question": req["question"],
                "answer": req["answer"]
            }
            try:
                Questions.insert_one(application)
                return jsonify({"message": "Application added successfully"}), 200
            except Exception as e:
                return jsonify({"error": "Unable to add Application"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400

def view_questions(Questions):
    try:
        # if "email" in session:
        if request:
            # email = session["email"]
            email = request.args.get("email")
            out = Questions.find({"email": email})
            if out:
                questions_list = []
                # payload["msg"]="Applications present"
                for i in out:
                    del i['email']
                    i['_id'] = str(i['_id'])
                    questions_list.append(i)
                print(questions_list)
                return jsonify({'message': 'Applications found', 'questions': questions_list}), 200
            else:
                return jsonify({'message': 'You have no applications'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400
