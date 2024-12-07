import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://127.0.0.1:5000/payments'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Add a new payment method
  createPayment(payment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payment);
  }

  // Fetch all payments (for list components) method
  getPayments(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  // Update an existing payment method
  updatePayment(id: string, payment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payment);
  }

  // Delete a payment by ID method
  deletePayment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Get payment by ID method
  getPaymentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
