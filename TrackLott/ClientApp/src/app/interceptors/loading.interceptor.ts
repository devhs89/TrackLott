import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {ProgressIndicatorService} from "../services/progress-indicator.service";
import {delay, finalize, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: ProgressIndicatorService) {
  }

  intercept(httpRequest: HttpRequest<unknown>, httpHandler: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show();

    return httpHandler.handle(httpRequest).pipe(
      delay(2000),
      finalize(() => this.loadingService.hide())
    );
  }
}