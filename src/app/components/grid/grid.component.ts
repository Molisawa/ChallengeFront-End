import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IData } from '../../interfaces/Data.interface';
import { DataService } from '../../services/api.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  data: IData[];
  constructor(private dataService: DataService, private datePipi: DatePipe) { }

  ngOnInit() {
    this.dataService.getDataFromServer().then(data => this.data = data.map(item => {
      item.date = this.datePipi.transform(new Date(item.date), 'dd-MM-yyyy');
      return item;
    }));
}

}
