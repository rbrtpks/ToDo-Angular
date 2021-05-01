import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, fromEventPattern, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable()
export class ListDataService {
  public todo_socket: any;

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  
  constructor(private http: HttpClient) { }

  socket = io('http://localhost:3000');

  public sendMessage(message) {
    this.socket.emit('new_todo', message);
  }

  public connect = () => {
    console.log("Socket open")
    this.socket.on('broadcast', (message) => {
      this.todo_socket = message
      console.log("TODO SOCKET",this.todo_socket)

      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  get(statusSelected) {
    return this.http.get(`http://localhost:3000/todo?params=${statusSelected}`)
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }

  checkMail(email) {
    return this.http.get(`http://apilayer.net/api/check?access_key=beea0b52fa1edc2195c8aa218155ee57&email=${email}`)
    .toPromise()
    .then(response => response)
    .catch(error => error)
  }

  giveMeChores() {
    return this.http.get(`http://localhost:3000/todo/give_me_chores`)
    .toPromise()
    .then(response => response)
    .catch(error => error)
  }

  save(data) {
		return this.http.post(`http://localhost:3000/todo`, data)
			.toPromise()
			.then(response => response)
			.catch(error => error);
	}
}
