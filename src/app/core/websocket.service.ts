import {Injectable} from "@angular/core";
import {Client, IFrame, IMessage} from "@stomp/stompjs";
import {AsyncSubject, Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly connection: Client;
  private connected$ = new AsyncSubject<boolean>();
  private topicMap$ = new Map<string, Subject<IMessage>>()

  constructor() {
    this.connection = new Client({
      brokerURL: environment.wsBrokerURL,
      reconnectDelay: 5000,
      debug: this.onDebug.bind(this),
      onConnect: this.onConnect.bind(this),
      onStompError: this.onStompError.bind(this),
    });
    this.connection.activate();
  }

  public connected(): Observable<boolean> {
    return this.connected$.asObservable();
  }

  public send(topic: string, data: any) {
    if (this.connection && this.connection.connected) {
      this.connection.publish({
        destination: topic,
        body: JSON.stringify(data)
      });
    } else {
      console.log('Issue with websocket connection')
    }
  }

  public listenImessage(topic: string): Observable<IMessage> {
    if (!this.topicMap$.has(topic)) {
      this.topicMap$.set(topic, new Subject<IMessage>());
    }
    return this.topicMap$.get(topic)!.asObservable();
  }

  public subscribeToTopic(topic : string) {
    if (this.connection && this.connection.connected) {
      console.log("subscribeToTopic", topic);
      this.connection?.subscribe(topic, (msg: IMessage) => {
        if (!this.topicMap$.has(topic)) {
          this.topicMap$.set(topic, new Subject<IMessage>());
        }
        this.topicMap$.get(topic)?.next(msg);
      });
    } else {
      console.log('issue with websocket connection')
    }
  }

  private onDebug(str: string) {
    //console.log(str);
  }

  private onConnect(frame: IFrame) {
    console.log('Connected ', frame);
    this.connected$.next(true);
    this.connected$.complete();
  }

  private onStompError(frame: IFrame) {
    console.error('Broker reported error: ', frame.headers['message']);
    console.error('Additional details: ', frame.body);
  }
}
