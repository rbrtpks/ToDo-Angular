import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ListDataService } from './list-data.service'

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
    <h4 class="modal-title mb-0">New Task</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body" style="font-family: 'Arial', Courier, monospace;">
      <form>
        <div class="form-group">
          <label>Description</label>
          <input type="text" class="form-control" placeholder="Task description"
          [(ngModel)]="data.description" [ngModelOptions]="{standalone: true}">
        </div>
        <div class="form-group">
          <label>Responsible</label>
          <input type="text" class="form-control" placeholder="Name of the person responsible for the task"
          [(ngModel)]="data.responsible" [ngModelOptions]="{standalone: true}">
        </div>
        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control" placeholder="name@example.com"
          [(ngModel)]="data.email" [ngModelOptions]="{standalone: true}">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success btn-sm" (click)="save()">Save</button>
      <button type="button" class="btn btn-danger btn-sm" (click)="activeModal.close('Close click')">Cancel</button>
    </div>
  `
})
export class ModalNewTask {
  @Input() name;

  data = {
    "description": "",
    "responsible": "",
    "email": "",
    "status": "pending"
  }
  errorMessage: String = '';

  constructor(
    public activeModal: NgbActiveModal,
    private service: ListDataService,
    private toastr: ToastrService
    ) { }

  async save() {
    try {
      const checkMail = await this.service.checkMail(this.data.email)

      if(checkMail.format_valid && checkMail.mx_found) {
        await this.service.save(this.data)
        this.service.sendMessage('updateListAllClients')
        this.activeModal.close()
        this.showSuccess('Success!')
      } else {
        this.showError('Invalid email!')
      }
    } catch (err) {
      console.log("err")
      this.showError('Contact your system administrator!')
    }
  }

  showSuccess(message) {
    this.toastr.success(message);
  }

  showError(message) {
    this.toastr.error(message, 'Action error!');
    this.errorMessage = null
  }
}