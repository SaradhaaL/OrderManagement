import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserApisService } from 'src/services/user-apis.service';
import Swal from 'sweetalert2';

interface Orders {
  id: string;
  dueDate: Date;
  customer: string;
  address: string;
  phoneNum: string;
  total: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList: Orders[];
  //Modal
  modalRef: BsModalRef;
  editFlag;

  // Order form
  orderForm: FormGroup;
  submitted;

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn alert-login-button mb-3 px-4',
      cancelButton: 'btn alert-cancel-button mb-3 px-4 mx-2',
      title: 'alert-title'
    },
    buttonsStyling: false
  })


  constructor(
    private userApis: UserApisService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initialFunction();
  }
  initialFunction() {
    this.orderForm = this.fb.group({
      id: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      phoneNum: ['', [Validators.required]],
      address: ['', [Validators.required]],
      total: ['', [Validators.required]],
    });
    this.userApis.getOrdersList().subscribe((res) => {
      this.ordersList = res;
    });
  }
  Order(content, edit?, value?) {
    this.editFlag = edit;
    if (this.editFlag) {
      this.orderForm.patchValue(value);
    }
    this.modalRef = this.modalService.show(content, {
      class: 'modal-dialog-centered gray',
      backdrop: 'static',
      keyboard: false,
    });
  }
  onCancel() {
    this.orderForm.reset();
    this.modalRef.hide();
    this.submitted = false;
    this.editFlag = false;
  }
  OrderSubmit() {
    this.submitted = true;
    if (this.orderForm.valid) {
      if (!this.editFlag) {
        this.ordersList.push(this.orderForm.value);
        this.showSwal('added')
      } else {
        let i = this.ordersList.findIndex(
          (val) => val.id === this.orderForm.value.id
        );
        this.ordersList[i] = this.orderForm.value;
        this.showSwal('modified')
      }
     
    }
  }
  deleteOrder(value) {
    let i = this.ordersList.findIndex(
      (val) => val.id === value.id
    );
    this.ordersList.splice(i, 1);
    }

  //FormControls
  get order() {
    return this.orderForm.controls;
  }

  showSwal(type,option1?) {
    if (type == 'added' || type == 'modified') {
      this.swalWithBootstrapButtons.fire({

        text: `Order ${type} successfully`,
        icon: 'success',
        focusConfirm: false,
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Okay!'
      }).then(() => {
        this.onCancel();
      });
    } else if(type=="delete") {
      this.swalWithBootstrapButtons.fire({

        text: "Are you sure? You won't be able to revert back?",
        focusConfirm: false,
        showCancelButton: true,
        allowOutsideClick: false,
        icon: 'warning',
        confirmButtonText: 'Delete',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteOrder(option1);
        }
      });
    }
  }
}
