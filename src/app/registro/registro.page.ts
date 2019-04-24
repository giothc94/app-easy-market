import { UserService } from './../services/users/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user: any = {}

  formUser: FormGroup

  status

  constructor(private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private formBuilder: FormBuilder,
    private userService:UserService,
    public alertController: AlertController
    ) {

    this.user = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user'))
    console.log(this.user)
    this.formUser = this.formBuilder.group({
      nombres: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12)]],
      telefono: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      id:['',Validators.required],
      imgUser:['',Validators.required]
    })
  }

  ngOnInit() {
  }

  async registrar() {
    this.status = this.formUser.status == "VALID" ? true : false
    console.log(this.status)
    if (this.status) {
    this.userService.registrarUsuario(this.formUser.value)
        .then(resp=>{
          this.presentAlert()
        })
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD8NKYKzbu_XTSPE6ENTlJqlrDhimxwifw',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD8NKYKzbu_XTSPE6ENTlJqlrDhimxwifw'
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.router.navigate(['login'])
    });
  }




  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Listo !',
      subHeader: 'Tu registro fue exitoso',
      message: 'Bienvenido a Easy Market',
      buttons: ['OK']
    });

    await alert.present();
  }
}
