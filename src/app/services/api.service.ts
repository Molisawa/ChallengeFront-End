import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common'
import { IAdviser } from '../interfaces/Adviser.interface';
import { ICity } from '../interfaces/City.interface';
import { IData } from '../interfaces/Data.interface';
import { IForm } from '../interfaces/form.interface';
import { IState } from '../interfaces/State.interface'; 
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Origin': '*'
  })
  };
@Injectable()
export class DataService {


    constructor(private http: HttpClient, private datePipe: DatePipe) { }

    getData() {
        return this.http.get<any>('../../assets/data.json')
        .toPromise()
        .then(res => <IData[]>res.data)
        .then(data => { return data; });
    }

    getDataStatesMexico() {
        return this.http.get<any>('../../assets/dataStatesMexico.json')
        .toPromise()
        .then(res => <IState[]>res.data)
        .then(data => { return data; });
    }

    getDataCitiesMexico() {
        return this.http.get<any>('../../assets/dataCitiesMexico.json')
        .toPromise()
        .then(res => <ICity[]>res.data)
        .then(data => { return data; });
    }

    sendEmailPromo() {
        const body = {httpOptions};
        return this.http.post(`/promo-email`, body)
        .toPromise()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    sendEmailDefault() {
        const body = {httpOptions};
        return this.http.post(`/default-email`, body)
        .toPromise()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    sendForm(payload: IAdviser) {
        return this.http.post(`/send-form`, payload, httpOptions)
        .toPromise()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    // send the IForm to the server
    sendData(payload: IForm) {
        var data = {name: payload.name + " " + payload.lastNameP + ' ' + payload.lastNameM,
        age: payload.age,
        address: `${payload.state_name}, ${payload.city_name}, ${payload.street} ${payload.numberE}, cp: ${payload.zipCode}${payload.numberE != null ? `, num ext ${payload.numberE}` : ''}`,
        date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),};
        return this.http.post(`/save-data`, data, httpOptions)
        .toPromise()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    // get the data from server
    getDataFromServer() {
        return this.http.get(`/get-data`, httpOptions)
        .toPromise()
        .then(res => <IData[]>res)
        .then(data => { return data; });
    }

    

}