import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasComponent } from './components/pessoas/pessoas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gerenciador-de-pessoas',
    pathMatch: 'full'
  },
  {
    path: 'gerenciador-de-pessoas',
    component: PessoasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
