import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalNewTask } from './new-task-modal';
import { ListDataService } from './list-data.service'
import { WebSocketService } from '../websocket/websocket.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {

  todo_list: Array<any>
  selectedOption = 'pending';
  status = [
    { id: 'pending', name: 'Pending' },
    { id: 'completed', name: 'Completed' },
  ];

  errorMessage: String = '';

  constructor(
    private service: ListDataService,
    private ws: WebSocketService,
    private modalService: NgbModal,
    private toastr: ToastrService)
  { }

  async ngOnInit() {    
    this.getToDoList(this.selectedOption)
    this.ws.openWebsocket()
  }

  async getToDoList(selected) {
    this.selectedOption = selected
    try {
      this.todo_list = await this.service.get(selected)
    } catch (err) {
      console.log(err)
    }
  }

  async validPassword() {
    let pass = ''
    do {
      if (pass != '') this.showError('Incorrect password')
      const { value: password } = await Swal.fire({
        title: 'Supervisor password required',
        input: 'password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        },
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonColor: '#c1c1c1',
        cancelButtonText: 'Cancel'
      })

      pass = password
      if (typeof pass === "undefined") return false

    } while (pass != 'TrabalheNaSaipos')

    return true
  }

  async modifyStatus(item) {
    try {
      if (item.count_to_pending >= 2 && item.status == 'pending') {
        this.getToDoList(this.selectedOption)
        return this.showError('Pending status change limit reached!')
      }

      const valid = item.status == 'completed' ? false : await this.validPassword()
      if (item.status == 'pending') item.count_to_pending++

      await this.service.save(item)
      this.showSuccess('Success!')
      this.getToDoList(this.selectedOption)
    } catch (err) {
      console.log("err")
      this.showError('Contact your system administrator!')
    }
  }

  async giveMeChores() {
    try {
      await this.service.giveMeChores()
      
      this.showSuccess('Success!')
      this.getToDoList(this.selectedOption)
    } catch (err) {
      console.log("err")
      this.showError('Contact your system administrator!')
    }
  }

  async newTask() {
    try {
      this.modalService.open(ModalNewTask, { size: 'lg', backdrop: 'static' });
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
