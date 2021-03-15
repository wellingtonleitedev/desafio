import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-ofertas',
  templateUrl: './cadastro-ofertas.component.html',
  styleUrls: ['./cadastro-ofertas.component.scss']
})
export class CadastroOfertasComponent implements OnInit {
  public saleForm: FormGroup;

  lojas = [
    { id: 1, nome: 'Epic' },
    { id: 2, nome: 'Origin' },
    { id: 3, nome: 'Steam' },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.saleForm = this.fb.group({
      id: ['', Validators.compose([
        Validators.pattern('[D]g'),
        Validators.required
      ])],
      title: ['', [Validators.required]],
      price: ['', Validators.compose([
        Validators.min(0), 
        Validators.required
      ])],
      salePrice: ['', Validators.compose([
        Validators.min(0), 
        Validators.required
      ])],
      store: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  onSubmit() {
    console.log(this.saleForm.value);
  }

}
