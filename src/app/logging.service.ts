import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
@Injectable()
export class LoggingService {
  lastlog: string;

  printLog(message: string) {
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
  }
}
