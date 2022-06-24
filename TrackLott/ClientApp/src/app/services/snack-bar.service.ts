import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {notificationMessage} from "../constants/notification-message";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {
  }

  showSnackBar(message: any) {
    this.matSnackBar.open(typeof message === "string" ? message : notificationMessage.generic, "Dismiss");
  }
}
