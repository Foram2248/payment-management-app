from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd
from bson import ObjectId

app = Flask(__name__)

# Handle CORS error for all routes and origins
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})
# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["payment_db"]
collection = db["payments"]

# Home Route
@app.route('/')
def home():
    return 'Welcome to the Payment Management App!'

# Fetch payments with filtering, pagination
@app.route("/payments", methods=["GET"])
def get_payments():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    query = {}

    payments_cursor = collection.find(query).skip((page - 1) * limit).limit(limit)
    payments = []
    for payment in payments_cursor:
        payment['_id'] = str(payment['_id'])  # Convert ObjectId to string
        payments.append(payment)

    total_due = sum([payment["due_amount"] for payment in payments])

    return jsonify({
        "payments": payments,
        "total_due": total_due
    })

# Fetch a single payment by ID form database
@app.route("/payments/<payment_id>", methods=["GET"])
def get_payment_by_id(payment_id):
    try:
        payment = collection.find_one({"_id": ObjectId(payment_id)})
        if payment:
            payment["_id"] = str(payment["_id"])  
            return jsonify(payment), 200
        else:
            return jsonify({"message": "Payment not found"}), 404
    except Exception as e:
        return jsonify({"message": f"Error occurred: {str(e)}"}), 500

# Add a new payment
@app.route("/payments", methods=["POST"])
def create_payment():
    data = request.json
    collection.insert_one(data)
    return jsonify({"message": "Payment added successfully!"}), 201
#update payment method
@app.route("/payments/<payment_id>", methods=["PUT"])
def update_payment(payment_id):
    try:
        data = request.json

        if "_id" in data:
            del data["_id"]

        payment_id = ObjectId(payment_id)

        result = collection.update_one({"_id": payment_id}, {"$set": data})

        if result.matched_count == 0:
            return jsonify({"message": "Payment not found"}), 404

        return jsonify({"message": "Payment updated successfully!"}), 200

    except Exception as e:
        app.logger.error(f"Error updating payment: {e}")
        return jsonify({"message": f"Error occurred: {str(e)}"}), 500


# Delete a payment
@app.route("/payments/<payment_id>", methods=["DELETE"])
def delete_payment(payment_id):
    collection.delete_one({"_id": ObjectId(payment_id)})
    return jsonify({"message": "Payment deleted successfully!"})

# Upload evidence file for a completed payment
@app.route("/payments/<payment_id>/upload", methods=["POST"])
def upload_evidence(payment_id):
    file = request.files['evidence']
    file.save(f"uploads/{file.filename}")
    return jsonify({"message": "File uploaded successfully!"})

if __name__ == "__main__":
    app.run(debug=True)
