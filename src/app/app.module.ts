import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OptionsPageComponent } from 'src/app/pages/options/options.component';
import { PopupPageComponent } from 'src/app/pages/popup/popup.component';
import { CustomErrorStateMatcher } from 'src/app/providers/custom-error-state-matcher';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightDirective } from './directives/highlight.directive';
import { SideInfoComponent } from './components/side-info/side-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupPageComponent,
    OptionsPageComponent,
    HighlightDirective,
    SideInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatExpansionModule,
    MatCardModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: ErrorStateMatcher,
      useClass: CustomErrorStateMatcher,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
