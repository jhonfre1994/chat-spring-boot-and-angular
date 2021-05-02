import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  /**
   * objeto que captura el usuario y la contraseña ingresada por el usuario.
   */
  modelUser: any = {};
  /**
   * bandera que muestra y esconde la progressBar del formulario del login.
   */
  IsWait: boolean = false;
  /**
   * constructor
   * @param router libreria para redireccionar a otra url
   * @param authenticationService servicio de autenticacion 
   * @param userService servicio de usuarios 
   * @param snackBar libreria para mostrar mensajes en el sncackbar
   * @param loginService libreria de login service
   */
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar) {

  }

  /**
   * metodos que se ejecutan al iniciar el componente
   */
  ngOnInit() {
    sessionStorage.clear();
  }

  /**
      *  configuracion del snackBar
      * @param message mensate que se muestra, ejemplo: "faltan campos"
      * @param action se muestra una accion a tomar o una alerta.
      */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /**
   * metodo que valida que los campos ingresado en el formulario no esten vacios
   * @param modelUser datos ingresador en el formulario de login
   */
  validarCampor(modelUser: any) {
    let isValid = true;
    if (!modelUser.username) {
      this.openSnackBar("El nombre de usuario no puede estar vacío", "!Cuidado!");
      isValid = false;
    }

    if (!modelUser.password) {
      this.openSnackBar("La contraseña no puede esta vacía", "!Cuidado!");
      isValid = false;
    }
    return isValid;
  }

  /**
   * metodo para iniciar sesion, primero genera el token, luego
   *  busca el usuario en la base de datos para guardarlo en el sessionStorage
   */
  login() {
    this.IsWait = true;
    if (this.validarCampor(this.modelUser) == true) {
      this.authenticationService.login(this.modelUser.username, this.modelUser.password).subscribe(
        result => {
          if (result) {
            sessionStorage.setItem("access_token", result.access_token)
            this.navigateAfterSuccess();
          }
        },
        error => {
          console.log(error);
          this.openSnackBar(error.error.error_description, "!Cuidado¡");
          this.IsWait = false;
        });
    }

  }

  /**
   * metodo para redireccionar a la visualizacion 
   * de plan estrategico luego de logearse correctamente
   */
  public navigateAfterSuccess() {
    this.router.navigate(['chat']);
  }

}
