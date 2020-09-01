import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {GenderService} from '../../../service/gender.service';

@Component
  ({
    selector: 'app-panel-left',
    templateUrl: './panel-left.component.html',
    styleUrls: ['./panel-left.component.css']
  })
export class PanelLeftComponent implements OnInit
{
  @Output() target = new EventEmitter();

  // lista de generos con la cantidad de libros en cad uno.
  gendersCount: any;
  constructor(private genderService: GenderService) {}

  async ngOnInit(): Promise<void>
  {
    // se obtienen todos los generos
    this.gendersCount = await this.genderService.getCount('gender')
  }

  selectTarget(value: string)
  {
    this.target.emit(value);
  }
}
