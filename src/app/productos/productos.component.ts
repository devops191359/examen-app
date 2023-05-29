import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../_services/productos/producto.service';
import { EventBusService } from '../_shared/event-bus.service';
import { ProductoModel } from '../model/productos/producto.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalRegistroComponent } from './modal-registro/modal-registro.component';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { ModalMensajeComponent } from './modal-mensaje/modal-mensaje.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  @ViewChild('myTable') table: any;

  private _eventBusSub: Subscription = new Subscription();

  private isLoading: boolean = false;
  selection: SelectionType;
  cache: any = {};
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  title = '';

  selected = [];

  rows: Array<ProductoModel> = new Array<ProductoModel>();
  mensajeText: string = "";
  constructor(private productoService: ProductoService,
    private eventBusService: EventBusService,
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private decimalPipe: DecimalPipe) {
    this.selection = SelectionType.single;
  }

  ngOnInit(): void {
    this.obtenerProductos()
    this._eventBusSub = this.eventBusService.on("refreshTable", (data: boolean) => {
      if (data) {
        this.rows = []
        this.obtenerProductos();
      }
    });

  }

  ngOnDestroy() {
    if (this._eventBusSub) { this._eventBusSub.unsubscribe(); }
  }


  obtenerProductos() {
    this.productoService.getProductos().subscribe({
      next: data => {
        const resultadoJSON = data.resultado;


        this.rows = resultadoJSON;

        console.log(this.rows)
      },
      error: err => {
        this.rows=[]
        console.log('error : ' + err.error.message)
      }
    });
  }

  agregarProducto() {
    this.openModal({}, false)
  }

  setPage(pageInfo: any) {

  }


  openModal(data: any, valueFlag: boolean) {
    this.modalRef = this.modalService.show(ModalRegistroComponent, {
      initialState: {
        title: 'Modificación del producto',
        data: data,
        isUpdateEnabled: valueFlag
      }
    });
  }

  onSelect({ selected }: any) {
    console.log('Select Event', selected[0]);
    this.openModal(selected[0], true)
  }

  modificarProducto(row: ProductoModel) {
    console.log("fila seleccionada : " + row.id)
    this.openModal(row, true)
  }

  eliminarProducto(id: number) {

    this.productoService.deleteProducto(id).subscribe(
      data => {
        console.log(data.resultado)
        this.rows=[]
        this.obtenerProductos();
        this.mensajeText = "El producto se ha eliminado correctamente";
        this.openModalMSG(this.mensajeText)
      },
      error => {
        //this.alertService.error(error);
      });
  }

  openModalMSG(mensaje: string) {
    this.modalRef = this.modalService.show(ModalMensajeComponent, {
      initialState: {
        title: 'Información',
        data: mensaje
      }
    });
  }

  onActivate(event: any) {
  }

  roundNumber(num: number): string | null {
    return this.decimalPipe.transform(num, "1.2-2") ?? '0';
  }
}
