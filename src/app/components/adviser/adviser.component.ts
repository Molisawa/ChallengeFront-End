import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/api.service';
import  { IAdviser } from '../../interfaces/Adviser.interface';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {
  userform: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService) { 
    this.userform = this.fb.group({
      email: new FormControl('')
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    const form = this.userform.getRawValue();
    const payload: IAdviser = {
      email:form.email
    }
    const mail = form.email;
    if (mail === '') {
      this.messageService.add({
        key: 'custom-danger' ,
        severity: 'info',
        summary: 'SRS',
        detail: 'Favor de completar los campos.',
        life: 3000,
        closable: false
      });
      return;
    }else{
    this.dataService.sendForm(payload)
    this.messageService.add({
      key: 'custom-danger' ,
      severity: 'success',
      summary: 'Éxito',
      detail: 'El correo fue enviado exitosamente.',
      life: 3000,
      closable: false
    });
    }

  }



}