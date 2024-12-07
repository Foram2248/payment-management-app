import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
  payments: any[] = [];
  totalDue: number = 0;
  page: number = 1;
  limit: number = 10;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.getPayments(this.page, this.limit).subscribe((data) => {
      console.log('Loaded payments:', data);
      this.payments = data.payments;
      this.totalDue = data.total_due;
    }, (error) => {
      console.error('Error loading payments:', error);
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.loadPayments();
  }

  onDelete(paymentId: string) {
    this.paymentService.deletePayment(paymentId).subscribe(
      () => {
        this.payments = this.payments.filter((payment) => payment._id !== paymentId);
        console.log(`Payment with ID ${paymentId} deleted successfully.`);
      },
      (error) => {
        console.error(`Failed to delete payment with ID ${paymentId}:`, error);
      }
    );
  }
}
