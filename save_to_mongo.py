from pymongo import MongoClient
import pandas as pd

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/") 
db = client["payment_db"] 
collection = db["payments"]  

# Read processed CSV data
file_path = "processed_payment_information.csv" 
data = pd.read_csv(file_path)

# Convert to dictionary and insert into MongoDB
data_dict = data.to_dict(orient="records")
collection.insert_many(data_dict)
print("Data successfully inserted into MongoDB!")
