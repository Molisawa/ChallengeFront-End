import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/api.service';
import { IForm } from '../../interfaces/form.interface';
import { IState } from 'src/app/interfaces/State.interface';
import { ICity } from 'src/app/interfaces/City.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  states: IState[];
  selectedState: IState;

  cities: ICity[];
  selectedCity: ICity;

  filterCities: ICity[];

  userform: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService) {
    this.userform = this.fb.group({
      name: new FormControl('', Validators.required),
      lastNameP: new FormControl('',Validators.required),
      lastNameM: new FormControl('',Validators.required),
      rfc: new FormControl('',[Validators.required, Validators.maxLength(10)]),
      city: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      street: new FormControl('',Validators.required),
      numberE: new FormControl('',Validators.required),
      numberI: new FormControl('',Validators.required),
      zipCode: new FormControl('',Validators.required),
    });

    this.dataService.getDataStatesMexico().then(states => {
      this.states = states;
    });

    this.dataService.getDataCitiesMexico().then(cities => {
      this.cities = cities;
    });
  }
  ngOnInit(): void {
  }

  f(event) {
    this.filterCities = this.cities.filter(city => city.state_id == this.selectedState.id);
  }

  onSubmit() {
    const form = this.userform.getRawValue();
   
    var auxRfc = form.rfc
    var bDate = auxRfc.slice(4, 10)
    var aDate = bDate[0] + bDate[1] + '-' + bDate[2] + bDate[3] + '-' + bDate[4] + bDate[5]
    var today = new Date();
    var bday = new Date(aDate);
    var age = today.getFullYear() - bday.getFullYear();
    var aux = today.getMonth() - bday.getMonth();

    if (aux < 0 || (aux === 0 && today.getDate() < bday.getDate())) {
      age--;
    }
    const name = form.name;
    const lastnamep = form.lastNameP;
    const lastnamem =  form.lastNameM;
    const ag = age;
    const rfc = form.rfc;
    const city = form.city.id || [];
    const street =  form.street;
    const numbere =   form.numberE;
    const numberi =   form.numberI;
    const zipcode = form.zipCode;

    if (name === '' || lastnamep === '' || lastnamem === '' || ag === null || isNaN(ag) || rfc === '' ||
        street === '' || numbere === null || numberi === null || zipcode === null || numbere === '' ||
        numberi === '' || zipcode === '' || city === '' || form.state.id === "undefined")  {
      this.messageService.add({
        key: 'custom-danger' ,
        severity: 'info',
        summary: 'Error en el llenado del formulario',
        detail: 'Favor de llenar todos los campos correctamente.',
        life: 3000,
        closable: false
      });
      return;
    }

    const payload: IForm = {
      name: form.name,
      lastNameP: form.lastNameP,
      lastNameM: form.lastNameM,
      age: age,
      rfc: form.rfc,
      city_id: form.city.id,
      state_id: form.state.id,
      city_name: form.city.name,
      state_name: form.state.name,
      street: form.street,
      numberE: form.numberE,
      numberI: form.numberI,
      zipCode: form.zipCode,
    
  }
    if ((form.state.id == 14) && (form.city.id == 120 || form.city.id == 39 || form.city.id == 97 || form.city.id == 98 ||
      form.city.id == 101 || form.city.id == 70 || form.city.id == 44 || form.city.id == 124 || form.city.id == 51 || form.city.id == 2)) {

      if (age < 30) {
        this.dataService.sendEmailDefault()
      }
      else {
        this.dataService.sendEmailPromo()
      }
    } else {
      this.dataService.sendEmailDefault()
    }
    this.dataService.sendData(payload);
    this.messageService.add({
      key: 'custom-danger' ,
      severity: 'success',
      summary: 'Éxito :)',
      detail: 'El formulario ha sido enviado con éxito.',
      life: 3000,
      closable: false
    });
  }

}

