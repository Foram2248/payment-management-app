export interface Payment {
  _id?: string;  // Optional field for MongoDB _id
  payee_first_name: string;
  payee_last_name: string;
  payee_payment_status: string;
  due_amount: number;
  payee_due_date: string;
}
