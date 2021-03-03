import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from './components/options/options.component';
import { PopupComponent } from './components/popup/popup.component';

const routes: Routes = [
  { path: 'popup', component: PopupComponent },
  { path: 'options', component: OptionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
