import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { environment } from 'src/environments/environment';

const SOCKET = environment.webSocket;

export const RxStompConfig: InjectableRxStompConfig = {
    brokerURL: SOCKET,

    heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds
  connectHeaders: {
    login: 'guest',
    passcode: 'guest'
  },
  reconnectDelay: 4000,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
}