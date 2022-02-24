import {Injectable} from "@angular/core";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceBreakpointService {

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  public handsetBreakpoint(width: string): Observable<boolean> {
    return this.breakpointObserver.observe(width).pipe(map(result => result.matches), shareReplay());
  }
}
