import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { Payment } from '../models/payment.model';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.css']
})
export class EditPaymentComponent implements OnInit {
  paymentId!: string;
  payment: Payment = {
    payee_first_name: '',
    payee_last_name: '',
    payee_payment_status: 'pending',
    due_amount: 0,
    payee_due_date: '',
  };
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the payment ID from the route parameter method
    this.paymentId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.paymentId);
    this.loadPaymentDetails();
  }

  // Load payment details for the given payment ID method
  loadPaymentDetails(): void {
    this.isLoading = true;
    this.paymentService.getPaymentById(this.paymentId).subscribe(
      (paymentData: any) => {
        console.log(paymentData);
        this.payment = paymentData;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error loading payment details:', error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.payment.due_amount <= 0) {
      alert('Due amount must be greater than 0');
      return;
    }

    const updatedPayment = { ...this.payment };
    delete updatedPayment._id; 

    this.paymentService.updatePayment(this.paymentId, updatedPayment).subscribe(
      () => {
        alert('Payment updated successfully!');
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Error updating payment:', error);
        alert('Failed to update payment');
      }
    );
  }
}
