import { Component } from "@angular/core";
import { MsalService } from "@azure/msal-angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "reserveClass";
  isIframe = false;
  loginDisplay = false;

  constructor() {}

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }

  // login() {
  //   this.authService.loginRedirect();
  // }

  // setLoginDisplay() {
  //   this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  // }
}
