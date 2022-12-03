from bson import ObjectId
from flask import request, jsonify
from pymongo import ReturnDocument


def delete_question(Questions):
    try:
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
        if request:
            req = request.get_json()
            question = {
                "email": req["email"],
                "question": req["question"],
                "answer": req["answer"]
            }
            try:
                Questions.insert_one(question)
                return jsonify({"message": "Question added successfully"}), 200
            except Exception as e:
                return jsonify({"error": "Unable to add Question"}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


def view_questions(Questions):
    try:
        if request:
            email = request.args.get("email")
            out = Questions.find({"email": email})
            if out:
                questions_list = []
                for i in out:
                    del i['email']
                    i['_id'] = str(i['_id'])
                    questions_list.append(i)
                print(questions_list)
                return jsonify({'message': 'Questions found', 'questions': questions_list}), 200
            else:
                return jsonify({'message': 'You have no questions'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400


def modify_question(Questions):
    try:
        if request:
            req = request.get_json()
            email = req["email"]
            _id = req["_id"]
            filter = {'_id': ObjectId(_id), "email": email}
            question = {
                "email": req["email"],
                "question": req["question"],
                "answer": req["answer"]
            }
            set_values = {"$set": question}
            modify_document = Questions.find_one_and_update(
                filter, set_values, return_document=ReturnDocument.AFTER)
            if modify_document == None:
                return jsonify({"error": "No such Job ID found for this user's email"}), 400
            else:
                return jsonify({"message": "Question modified successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 400
