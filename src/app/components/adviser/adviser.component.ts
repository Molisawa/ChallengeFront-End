import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/api.service';
import  { IAdviser } from '../../interfaces/Adviser.interface';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {
  userform: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService) { 
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
    this.dataService.sendForm(payload)
  }



}