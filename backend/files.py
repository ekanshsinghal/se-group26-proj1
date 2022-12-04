from bson import ObjectId
from flask import request, jsonify, send_file, after_this_request
from pymongo import ReturnDocument
import boto3
import re
import os

s3 = boto3.client('s3', aws_access_key_id="AKIA5WCCAKRFZNMK4DEB",
                  aws_secret_access_key="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")

bucket_name = "job-tracker-resume-upload"


def upload_file(UserRecords, Files):
    try:
        file = request.files['file']
        email = str(request.files['email'].read())
        start = email.find("'")
        end = email.rfind("'")
        email = email[start+1:end].strip()
        email_found = UserRecords.find_one({"email": email})
        if email_found:
            _id = str(email_found["_id"])
        else:
            return jsonify({'error': "Email not found"}), 500
        if file:
            filename = _id+"--;--"+file.filename
            file.save(filename)
            s3.upload_file(
                Bucket=bucket_name,
                Filename=filename,
                Key=filename
            )
            Files.insert_one({
                "email": email,
                "filename": filename,
            })
            os.remove(filename)
            return jsonify({"message": "File Uploaded Successfully"}), 200
        else:
            return jsonify({'error': "Found Empty File"}), 500
    except:
        return jsonify({'error': "Something went wrong"}), 500


def view_files(Files):
    try:
        if request:
            email = request.args.get("email")
            out = Files.find({"email": email})
            if out:
                files = []
                for i in out:
                    i['filename'] = i['filename']
                    i['_id'] = str(i['_id'])
                    files.append(i)
                return jsonify({'message': 'Files found', 'files': files}), 200
            else:
                return jsonify({'message': 'You have no files'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': "Something went wrong"}), 500


def download_file(Files):
    try:
        if request:
            req = request.get_json()
            file = Files.find_one({"filename": req["filename"]})
            if file:
                if file["email"] == req["email"]:
                    s3.download_file(
                        bucket_name, file["filename"], req["filename"].split("--;--")[1])
                    return send_file(req["filename"].split("--;--")[1])
                else:
                    return jsonify({'message': 'You are not authorized to view this file'}), 501

            return jsonify({'message': 'Files found'}), 200
    except Exception:
        return jsonify({'error': 'Something went wrong'}), 500


def delete_file(Files):
    try:
        if request:
            req = request.get_json()
            df = Files.find_one_and_delete({"filename": req["filename"]})

            if df == None:
                return jsonify({"error": "No such Job ID found for this user's email"}), 500
            else:
                s3.delete_object(Bucket=bucket_name, Key=req["filename"])
                return jsonify({"message": "File Deleted Successfully"}), 200
    except Exception:
        return jsonify({'error': 'Something went wrong'}), 500
