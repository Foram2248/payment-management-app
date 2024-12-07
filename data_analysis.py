import pandas as pd

# Load CSV file
file_path = "payment_information.csv" 
data = pd.read_csv(file_path)

# Analyze the data
print("First 5 rows of data:")
print(data.head())
print("\nColumn Names:")
print(data.columns)

# Fill missing values
data.fillna("N/A", inplace=True)

# Convert date columns to readable format (if needed)
data['payee_due_date'] = pd.to_datetime(data['payee_due_date'])

# Filter overdue payments
overdue_payments = data[data['payee_payment_status'] == 'overdue']
print("Overdue Payments:")
print(overdue_payments)

# Save the processed data to a new CSV file
processed_file_path = "processed_payment_information.csv"
data.to_csv(processed_file_path, index=False) 
print(f"Processed data has been saved to {processed_file_path}")
