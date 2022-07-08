import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {responseMsg} from "../constants/response-msg";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar, private router: Router) {
  }

  handleResponse(resp: any): Promise<boolean> | null {
    if (typeof resp === "object") {
      let parsedResp: { message?: string, title?: string, returnUrl?: string } = resp;
      this.showSnackBar(parsedResp.message ?? parsedResp.title ?? responseMsg.generic);
      return parsedResp.returnUrl ? this.router.navigate([parsedResp.returnUrl]) : null;
    } else if (typeof resp === "string") {
      this.showSnackBar(resp);
      return null;
    }
    this.showSnackBar(responseMsg.generic);
    return null;
  }

  private showSnackBar(msg: string) {
    this.matSnackBar.open(msg, "Dismiss");
  }
}
