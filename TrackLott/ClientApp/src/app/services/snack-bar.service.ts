import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {responseMsg} from "../constants/response-msg";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {
  }

  showSnackBar(message: any) {
    this.matSnackBar.open(typeof message === "string" ? message : responseMsg.generic, "Dismiss");
  }
}
