import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  formulario: any;
  titleOfForm: string;

  constructor() { }

  ngOnInit(): void {
    this.titleOfForm = 'Nova pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });
  }

}
