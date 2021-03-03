import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OptionsComponent } from './components/options/options.component';
import { PopupComponent } from './components/popup/popup.component';
@NgModule({
  declarations: [AppComponent, PopupComponent, OptionsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
