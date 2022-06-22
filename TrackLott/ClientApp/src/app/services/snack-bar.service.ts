import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {
  }

  showSnackBar(message: string) {
    this.matSnackBar.open(message, "Dismiss");
  }
}
