import { Component,OnInit } from '@angular/core';
import { DespesaService } from '../../services/despesa.service';
import { Despesa } from '../../models/despesa';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-lista-despesas',
  templateUrl: './lista-despesas.component.html',
  styleUrls: ['./lista-despesas.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ListaDespesasComponent implements OnInit{

  despesas: Despesa[] = []

  abrirNovaDespesa = () => {
    this.despesa = new Despesa()
    this.submitted = false;
    this.despesaDialog = true;
  }

  async salvarDespesa(){
    this.submitted = true;
    const isEdit = Boolean(this.despesa.id)

        if (this.despesa.despesa.trim()) {
          this._despesasService.saveDespesa(this.despesa).subscribe(response => {
            if (isEdit) {
              this.despesas[this.findIndexById(this.despesa.id)] = response;
              this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Despesa Atualizada!', life: 3000});
            }
            else {
              this.despesas.push(response);
              this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Despesa Criada!', life: 3000});
            }

            this.despesas = [...this.despesas];
            this.despesaDialog = false;
            this.despesa = new Despesa();
          })

        }
  }

  editarDespesa(despesa: Despesa){
    this.despesa = {...despesa};
    this.despesaDialog = true;
  }

  deletarDespesa(despesa: Despesa){
    this.confirmationService.confirm({
      message: 'Você tem certeza que quer deletar ' + despesa.despesa + '?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this._despesasService.deleteDespesa(despesa.id).subscribe(() => {
            this.despesas = this.despesas.filter(val => val.id !== despesa.id);
            this.despesa = new Despesa();
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Despesa Deletada!', life: 3000});
          })
      }
  });
  }

  fecharDialog() {
    this.despesaDialog = false
  }

  findIndexById(id: number): number{
    let index = -1;
    for (let i = 0; i < this.despesas.length; i++) {
        if (this.despesas[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

  despesaDialog: boolean = false;

  despesa: Despesa = new Despesa();

  submitted: boolean = false;


  constructor(private _despesasService: DespesaService,private messageService: MessageService, private confirmationService: ConfirmationService){
    this._despesasService.getDespesas().subscribe(
      data =>this.despesas = data
    )
  }

  ngOnInit(): void{
  }
}
