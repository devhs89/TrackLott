import {Injectable} from "@angular/core";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeviceBreakpoint {

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  public handsetBreakpoint(width: string) {
    return this.breakpointObserver.observe(width).pipe(map(result => result.matches), shareReplay());
  }
}
