import { Component } from '@angular/core';
import { PaymentService } from '../payment.service';


@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
})
export class AddPaymentComponent {
  payment = {
    payee_first_name: '',
    payee_last_name: '',
    due_amount: 0,
    payee_due_date: '',
    payee_payment_status: 'pending',
  };

  constructor(private paymentService: PaymentService) {}

  onSubmit() {
    this.paymentService.createPayment(this.payment).subscribe(() => {
      alert('Payment added successfully!');
    });
  }
}
