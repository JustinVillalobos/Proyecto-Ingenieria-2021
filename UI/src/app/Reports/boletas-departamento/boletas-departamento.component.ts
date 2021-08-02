import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { ReportsService } from '../../Services/reports.service';
import { BoletaService } from '../../Services/boleta.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DepartamentoService } from '../../Services/departamento.service';
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-boletas-departamento',
  templateUrl: './boletas-departamento.component.html',
  styleUrls: ['./boletas-departamento.component.css']
})
export class BoletasDepartamentoComponent implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef;
   state="non-display";
    title = 'export-table-data-to-pdf-using-jspdf-example';
   head = [[
   {content:'ID', styles: { halign: 'center',lineWidth:0.1 }}, 
    {content:'Palabra CC1', styles: { halign: 'center',lineWidth:0.1 }}, 
     {content:'RP', styles: { halign: 'center',lineWidth:0.1 }}, 
   {content:'Nombre', styles: { halign: 'center',lineWidth:0.1 }},  
   {content:'Sexo', styles: { halign: 'center',lineWidth:0.1 }}, 
  {content:'Dpt', styles: { halign: 'center',lineWidth:0.1 }}]]
   pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
   
  boletas:any = [];
  departamentos:any=[];
  selected: number;
  constructor(private BoletaService:BoletaService,
    private spinner: NgxSpinnerService,private ReportsService:ReportsService,
    private config: NgSelectConfig,private DepartamentoService:DepartamentoService) { 
    this.spinner.show();
    this.getdepartamentos();
     this.getBoletas();
  }

  ngOnInit(): void {
  }
  getdepartamentos(){
    this.DepartamentoService.getDepartamentos().subscribe(
      res=>{
        this.departamentos=res;
        this.spinner.hide();
      },
      err=>console.log(err)
    );
  }
   getBoletas(){
    this.ReportsService.all().subscribe(
      res=>{
        this.boletas=res;
        this.spinner.hide();
        this.openPDF();
      },
      err=>console.log(err)
    );
  }
  getBase64(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
       reader.readAsDataURL(file);
      reader.onload = function() { resolve(reader.result); };
      reader.onerror = reject;
     

    });
  }
  convertedData(data){
    let converted_data=[];
    console.log(data);
    for(let i=0;i<data.length;i++){
      let data_simplex=[
      {content:data[i]["IdBoleta"], styles: { halign: 'center' } },
       {content:data[i]["PalabraClaveConsulta1"],  styles: { halign: 'center' } },
        {content:data[i]["respuestaLegal"],  styles: { halign: 'center' } },
      {content:data[i]["Nombre"]+" "+data[i]["Apellidos"],  styles: { halign: 'center' } },
      {content:data[i]["Descripcion"],  styles: { halign: 'center' } },
      {content:data[i]["dept"],  styles: { halign: 'center' } }];
      converted_data.push(data_simplex);
    }
    return converted_data;
  }
  filterRPT(){
    if(this.selected!=0){
      this.spinner.show();
      this.ReportsService.getReportForDepartment(this.selected).subscribe(
        res=>{
          this.boletas=res;
          this.spinner.hide();
          this.openPDF();
        },
        err=>console.log(err)
      );
    }else{
      this.getBoletas();
    }
  }
  async downloadrpt(){
    let data_formmated=this.convertedData(this.boletas);
    
var doc = new jsPDF('l', 'mm', [200, 210]);
var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
let wantedTableWidth = 100;

let margin = (pageWidth - wantedTableWidth) / 2;
    doc.setFontSize(18);
    doc.text('Reporte por rango de fechas de boletas', pageWidth/2-55, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.head,
      body: data_formmated,
      margin: {left: margin, right: margin},
      theme: 'striped',
       
      didDrawCell: data => {
        //console.log(data.column.index)
      }
    })
    let date=new Date();
    doc.save("Reporte A"+date+".pdf");
  }
  async  openPDF(){
    let data_formmated=this.convertedData(this.boletas);
    
var doc = new jsPDF('l', 'mm', [200, 210]);
var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
let wantedTableWidth = 100;

let margin = 0;//(pageWidth - wantedTableWidth) / 2;
    doc.setFontSize(18);
    doc.text('Reporte por rango de fechas de boletas', pageWidth/2-55, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.head,
      body: data_formmated,
      margin: {left: margin, right: margin},
      theme: 'striped',
       
      didDrawCell: data => {
        //console.log(data.column.index)
      }
    })

    // below line for Open PDF document in new tab
    var out = doc.output();
            var url = 'data:application/pdf;base64,' + btoa(out);
            this.state="";
            this.pdfSrc=url; 
}

}
