import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {errorMessage} from "../constants/error-message";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {
  }

  showSnackBar(message: any) {
    this.matSnackBar.open(typeof message === "string" ? message : errorMessage.generic, "Dismiss");
  }
}
