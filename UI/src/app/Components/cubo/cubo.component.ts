import { Component, OnInit } from '@angular/core';
//import XmlaStore from 'devextreme/ui/pivot_grid/xmla_store';
//import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
@Component({
  selector: 'app-cubo',
  templateUrl: './cubo.component.html',
  styleUrls: ['./cubo.component.css']
})
export class CuboComponent implements OnInit {
	dataSource: any;

    constructor() {
        /*this.dataSource = {
            fields: [
                { dataField: '[Product].[Category]', area: 'row' },
                { 
                    dataField: "[Product].[Subcategory]", 
                    area: "row",
                    headerFilter: {
                        allowSearch: true
                    } 
                },
                { dataField: '[Ship Date].[Calendar Year]', area: 'column' },
                { dataField: '[Ship Date].[Month of Year]', area: 'column' },
                { dataField: "[Measures].[Reseller Freight Cost]", area: "data", format: "currency" }
            ],
            store: {
                type: 'xmla',
                 //url: 'https://localhost/Services/OLAP/msmdpump.dll',
                url: 'https://demos.devexpress.com/Services/OLAP/msmdpump.dll',
                catalog: 'Adventure Works DW Standard Edition',
                cube: 'Adventure Works'
            }
        }*/
    }

  ngOnInit(): void {
  }
  helloWorld() {
        alert('Hello world!');
    }

}
