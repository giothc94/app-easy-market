import { AngularFirebaseService } from 'src/app/services/angular-firebase.service';
import { ListasService } from './../../services/listas/listas.service';
import { UserService } from './../../services/users/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-efectuar-compra',
  templateUrl: './efectuar-compra.page.html',
  styleUrls: ['./efectuar-compra.page.scss'],
})
export class EfectuarCompraPage implements OnInit {

  data: any = {}

  usuario: any = {}

  listaProductos: any = {}

  precioTotal

  navigate

  listaComprados: any = []

  constructor(
    private avtivatedRouter: ActivatedRoute,
    private userServices: UserService,
    private listaService: ListasService,
    private storage: Storage,
    private router: Router,
    private productosService: AngularFirebaseService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private modalController: ModalController
  ) {


  }

  ngOnInit() {
    this.data = JSON.parse(this.avtivatedRouter.snapshot.paramMap.get('lista'))
    this.usuario.uid = this.data.user.uid
    this.precioTotal = JSON.parse(this.avtivatedRouter.snapshot.paramMap.get('precio'))
    this.navigate = this.avtivatedRouter.snapshot.paramMap.get('ruta')

    this.listaProductos = this.data.lista
    this.userServices.buscarUsuario(this.usuario.uid).subscribe(user => {
      this.usuario = user.payload.data()
      console.log(this.usuario)
    })
  }

  cerrar() {
    this.modalController.dismiss()
  }
  comprar() {
    this.presentLoading()
    let lista: any = []
    this.listaComprados = []
    this.listaProductos.forEach(elementP => {
      this.productosService.obtenerProductoPorId(`${elementP.id}`).subscribe(resp => {
        let fresh: any = {}
        fresh = resp
        fresh.cantidadProducto = fresh.cantidadProducto - elementP.cantidadCompra

        lista.push(fresh)
      })
    });

    setTimeout(() => {
      let item: any = {}
      let listaProd: any = {}
      lista.forEach(element => {
        this.listaService.comprarProducto(element)
      });
      Object.assign(listaProd, lista)
      this.storage.clear()
      item = { 'user': this.usuario, 'lista': listaProd , 'id': Date.now()}
      this.listaService.agregarListaAConfirmadas(item)
      this.presentAlert()
      this.router.navigate([`${this.navigate}`])
      // this.listaService.agregarListaAConfirmadas(lista)
    }, 3000)
    // console.log('fin comprar',lista)
    // return lista
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Compra exitosa',
      message: 'Tu compra fue agregada exitosamente, se te notificara cuando un repartidor tome tu pedido',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Tu compra esta siendo procesada',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
