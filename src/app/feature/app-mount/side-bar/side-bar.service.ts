import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SideBarService {
  private sideBarVisible = true;

  public isVisible(): boolean {
    return this.sideBarVisible;
  }

  public hide(): void {
    this.sideBarVisible = false;
  }

  public show(): void {
    this.sideBarVisible = true;
  }
}
