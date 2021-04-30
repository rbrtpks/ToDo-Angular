import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class ListDataService {
  constructor(private http: HttpClient) { }

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
