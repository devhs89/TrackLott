import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {ProgressIndicatorService} from "../services/progress-indicator.service";
import {finalize, Observable} from "rxjs";
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
      finalize(() => this.loadingService.hide())
    );
  }
}
