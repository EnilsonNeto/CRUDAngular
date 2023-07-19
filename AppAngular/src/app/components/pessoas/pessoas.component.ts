import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/Pessoa';
import { PessoasService } from 'src/app/pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {
  viewTable = true;
  viewForm = false;
  formulario: any;
  titleOfForm: string;
  pessoas: Pessoa[];
  namePerson: string;
  pessoaId: number;
  modalRef: BsModalRef;

  constructor(private pessoasService: PessoasService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllPerson();
    this.form();
  }

  form() {
    this.titleOfForm = 'Nova pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });
  }

  sendToform(): void {
    const pessoa: Pessoa = this.formulario.value
    if (pessoa.pessoaId > 0) {
      this.pessoasService.updatePerson(pessoa).subscribe(
        (response) => {
          alert('Pessoa atualizada com sucesso!');
          this.viewForm = false;
          this.viewTable = true;
          this.getAllPerson();
        }
      );
    } else {
      this.pessoasService.savePerson(pessoa).subscribe(
        (response) => {
          alert('Pessoa cadastrada com sucesso!');
          this.viewForm = false;
          this.viewTable = true;
          this.getAllPerson();
        },
        (error) => {
          console.log(error);
        });
    }
  }

  getAllPerson() {
    this.pessoasService.getAll().subscribe((reponse) => {
      this.pessoas = reponse;
    });
  }

  viewFormWeb(): void {
    this.viewTable = false;
    this.viewForm = true
    this.form();
  }

  cancel(): void {
    this.viewTable = true;
    this.viewForm = false
  }

  viewUpdateForm(pessoaId): void {
    this.viewTable = false;
    this.viewForm = true;
    this.pessoasService.getId(pessoaId).subscribe(
      (response) => {
        this.titleOfForm = `Atualizar ${response.nome} ${response.sobrenome}`
        this.formulario = new FormGroup({
          pessoaId: new FormControl(response.pessoaId),
          nome: new FormControl(response.nome),
          sobrenome: new FormControl(response.sobrenome),
          idade: new FormControl(response.idade),
          profissao: new FormControl(response.profissao)
        });
      });
  }

  deletePerson(pessoaId): void {
    this.pessoasService.deletePerson(pessoaId).subscribe(
      (response) => {
        this.modalRef.hide();
        alert('Pessoa excluida com sucesso');
        this.getAllPerson();
      }
    );
  }

  viewConfirmationExclude(pessoaId, namePerson, conteudoModal: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.namePerson = namePerson;
  }
}
