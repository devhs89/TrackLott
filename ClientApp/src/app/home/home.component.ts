import {Component} from '@angular/core';
import {ProgressIndicatorService} from "../services/progress-indicator.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  greeting: string = "Welcome";
}
