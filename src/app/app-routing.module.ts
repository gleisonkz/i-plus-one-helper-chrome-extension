import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsPageComponent } from 'src/app/pages/options/options.component';
import { PopupPageComponent } from 'src/app/pages/popup/popup.component';

const routes: Routes = [
  { path: 'popup', component: PopupPageComponent },
  { path: 'options', component: OptionsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
