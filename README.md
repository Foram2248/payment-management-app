# Payment Management App

This project is a comprehensive **Payment Management System** that allows users to track, update, and manage payment records with a robust frontend and backend integration. The system includes functionalities such as viewing, adding, updating, and deleting payment records.

The project also includes **data analysis** on payment records, such as calculating total due amounts, identifying overdue payments, and generating summary statistics about the payments.

### Features
- **View Payments**: Display a list of all payments with detailed information, including payee names, due amounts, payment status, and due dates.
- **Add Payments**: Allows users to add new payment records.
- **Edit Payments**: Modify payment details.
- **Delete Payments**: Remove payment records from the system.
- **Data Analysis**: 
  - Calculates the **total due amount** across all payments.
  - Identifies **overdue payments** based on the due date.
  - Provides **payment summaries** with status breakdowns (e.g., paid, pending, overdue).
  - Uses **Pandas** to perform data analysis on the payment data stored in MongoDB.

## Tech Stack
- **Frontend**: Angular (Angular Material for UI components)
- **Backend**: Flask (Python), MongoDB (NoSQL database)
- **Data Analysis**: Performed using **Pandas** for aggregating and analyzing payment data (such as calculating totals and filtering by status).
- **Database**: MongoDB (for storing payments data)
- **CORS**: Cross-Origin Resource Sharing enabled to allow communication between frontend (Angular) and backend (Flask) running on different ports.

## Setup Instructions

### Prerequisites
Before starting, ensure you have the following tools installed on your machine:

- **Node.js**: For running the Angular frontend
- **Python 3.x**: For running the Flask backend
- **MongoDB**: For the database (You can use a local or cloud MongoDB instance, e.g., MongoDB Atlas)
- **Git**: To clone and push the repository

### Frontend Setup (Angular)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Foram2248/payment-management-app.git
   cd payment-management-app
