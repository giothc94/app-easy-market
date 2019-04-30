import { LoginService } from './../../services/login/login.service';
import { ListasService } from './../../services/listas/listas.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-listas-usuario',
  templateUrl: './listas-usuario.page.html',
  styleUrls: ['./listas-usuario.page.scss'],
})
export class ListasUsuarioPage implements OnInit {

  public listaProductosComprados
  public uid
  constructor(
    private modalController: ModalController,
    private listaService: ListasService,
    private loginService: LoginService
  ) {

  }

  ngOnInit() {
    this.loginService.isLoggedInApp()
      .subscribe(resp => {
        this.uid = resp.uid
        this.listaService.obtenerListasDeUsuarioCompradas(this.uid)
          .subscribe(resp => {
            this.listaProductosComprados = resp
          })
        // console.log(this.listaProductosComprados)
      })
  }
  cerrar() {
    this.modalController.dismiss()
  }
}
