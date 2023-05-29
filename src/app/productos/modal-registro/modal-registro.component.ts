import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ProductoService } from 'src/app/_services/productos/producto.service';
import { EventBusService, } from 'src/app/_shared/event-bus.service';
import { EventData } from 'src/app/_shared/event.class';
import { ProductoReqModel } from 'src/app/model/productos/producto-req.model';
import { ProductoModel } from 'src/app/model/productos/producto.model';
import { ModalMensajeComponent } from '../modal-mensaje/modal-mensaje.component';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.css']
})
export class ModalRegistroComponent {




  @Output() refrescarTabla: EventEmitter<true>;
  modalForm: FormGroup = new FormGroup({});
  mensajeText="";
  isUpdateEnabled = false;
  submitted: boolean = false;
  title = "";
  data: ProductoModel = new ProductoModel();

  constructor(
    public modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private eventBusService: EventBusService,
    private decimalPipe: DecimalPipe,
    private modalService: BsModalService
  ) {
    this.refrescarTabla = new EventEmitter();

  }
  get f() { return this.modalForm.controls; }
  ngOnInit() {
    if (this.isUpdateEnabled) {
      this.modalForm = this.formBuilder.group({
        idProducto: [{ value: '', disabled: true }, Validators.required],
        nombreProducto: ['', Validators.required],
        precio: ['', Validators.required],
        cantidad: ['', Validators.required]
      });
      this.f['idProducto'].setValue(this.data.id)
      this.f['nombreProducto'].setValue(this.data.nombre)
      this.f['precio'].setValue(this.data.precio)
      this.f['cantidad'].setValue(this.data.stock)
      this.f['precio'].setValue(this.decimalPipe.transform(this.f['precio'].value, "1.2-2"))
    } else {
      this.modalForm = this.formBuilder.group({
        nombreProducto: ['', Validators.required],
        precio: ['', Validators.required],
        cantidad: ['', Validators.required]
      });
      this.f['precio'].setValue(this.decimalPipe.transform(this.f['precio'].value, "1.2-2"))
    }
  }

  realizarTransaccion() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.modalForm.invalid) {
      return;
    }

    if (this.isUpdateEnabled) {

      let request: ProductoModel = {
        id: this.f['idProducto'].value,
        nombre: this.f['nombreProducto'].value,
        precio: this.f['precio'].value,
        stock: this.f['cantidad'].value
      }

      this.productoService.updateProducto(request).subscribe(
        data => {
          console.log(data.resultado)
          this.modalRef.hide()
          this.refreshTable()
          this.mensajeText="El producto se actualizo correctamente";
          this.openModal(this.mensajeText)
        },
        error => {
          //this.alertService.error(error);
        });

    } else {

      let request: ProductoReqModel = {
        nombre: this.f['nombreProducto'].value,
        precio: this.f['precio'].value,
        cantidad: this.f['cantidad'].value
      }

      this.productoService.saveProduto(request).subscribe(
        data => {
          console.log(data.resultado)
          this.modalRef.hide()
          this.refreshTable()
          this.mensajeText="El producto se registro correctamente";
          this.openModal(this.mensajeText)
        },
        error => {
          //this.alertService.error(error);
        });
    }
  }

  roundNumber(num: number): string | null {
    return this.decimalPipe.transform(num, "1.2-2") ?? '0';
  }
  formatInput() {
    this.f['precio'].setValue(this.decimalPipe.transform(this.f['precio'].value, "1.2-2"))
  }


openModal(mensaje:string){
  this.modalRef = this.modalService.show(ModalMensajeComponent, {
    initialState: {
      title: 'Información',
      data: mensaje
    }
  });
}

  refreshTable() {
    // this.refrescarTabla.emit(true);
    this.eventBusService.emit(new EventData("refreshTable", true));
  }
}
