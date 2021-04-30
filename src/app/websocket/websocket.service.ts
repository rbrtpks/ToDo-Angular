import { Injectable } from '@angular/core'
import { dataMessage } from './data-message.model'

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {

  webSocket: WebSocket
  dataMessage: dataMessage[] = []
  dataHTMLMessage: any
  restart: any
  errorCount: number

  constructor() { }

  public openWebsocket() {
    this.webSocket = new WebSocket('ws://localhost:3000');

    this.webSocket.onopen = (event) => {
      console.log("Event", event)
    }

    this.webSocket.onmessage = (event) => {
      console.log("Event onmessage",event)
    }

    this.webSocket.onerror = (event) => {
      console.log("Event error",event)
      this.restart = setInterval(() => {
        this.webSocket.close()
        console.log('Restarting WebSocket...')
        clearInterval(this.restart)
        this.openWebsocket()
      }, 5000)
    }
  }
}