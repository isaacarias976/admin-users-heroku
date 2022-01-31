import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { UserServiceService } from './user-service.service';
import { User } from './user';
import { DialogNormalComponent } from '../dialog-normal/dialog-normal.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { $ } from 'protractor';

@Component({
  selector: 'app-crud-users',
  templateUrl: './crud-users.component.html',
  styleUrls: ['./crud-users.component.css']
})
export class CrudUsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['brm', 'nombre', 'puesto', 'img','actions'];
  dataSource : MatTableDataSource<User>;

  base64:string = "";
  loading:boolean = false;
  messageModal:string = "";

  user: User = new User();
  userEdit:User = new User;

  constructor(private userService:UserServiceService,public dialogo: MatDialog){}

  ngOnInit() {
    this.getUsers();
  }

  setEditUser(u:User){
    this.userEdit = u;
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(
      ul=>{
        console.log(ul);
        ul.forEach(element => {
          element.img = element.img.substr(0,15) + "...";
          element.base64 = 'data:image/jpeg;base64,'+element.base64;
        });
        this.dataSource = new MatTableDataSource<User>(ul);
        this.dataSource.paginator = this.paginator;
        this.user = new User();
        this.base64 = "";
        this.loading = false;
      }
    )
  }

  addUser(){
    this.loading = true;
    if(this.user !== null){
     if(this.user.brm){
      if(this.user.puesto){
        if(this.base64){
          if(this.user.nombre){
            this.userService.createUser(this.user).subscribe(e=>{
              this.mostrarDialogo("Usuario agregado exitosamente");
              this.getUsers();
            })
          }else{
            this.showFieldEmpty("Falta nombre");
          }
        }else{
          this.showFieldEmpty("Falta foto de perfil");
        }
      }else{
        this.showFieldEmpty("Falta puesto");
      }
     }else{
        this.showFieldEmpty("Falta BRM");
     }
    }else{
      this.showFieldEmpty("Rellene todos los campos");
    }
  }

  showFieldEmpty(message:string){
    this.loading = false;
    this.mostrarDialogo(message);
  }

  setImg(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result.toString();
      this.user.img = event.target.files[0].name;
      var baseToUpload : string = reader.result.toString();
      let indexFinishType = baseToUpload.indexOf(',');
      baseToUpload = baseToUpload.substr(indexFinishType+1,baseToUpload.length-1);
      this.user.base64 = baseToUpload;
    };
  }

  setImgEdit(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userEdit.base64 = reader.result.toString();
      this.userEdit.img = event.target.files[0].name;
    };
  }

  mostrarDialogo(title:string): void {
    this.dialogo
      .open(DialogNormalComponent, {
        data: title
      });
  }

  deleteUser(id:number):void{
    this.dialogo
      .open(DialogConfirmComponent, {
        data: "¿Está seguro de eliminar este usuario?"
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.userService.deleteUser(id).subscribe(res=>{
            this.mostrarDialogo("Usuario eliminado correctamente");
            this.getUsers();
          })
        }
      });
  }

  msgModal(message:string):void {
    var alertPlaceholder = document.getElementById('alertPlaceholder')
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-warning alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    alertPlaceholder.append(wrapper)
  }

  updateUser(u:User):void{
    if(u.brm){
      if(u.puesto !== "" && u.puesto !== "Selecciona un puesto"){
        if(u.base64 !== ""){
          if(u.nombre !== ""){
            let indexFinishType = u.base64.indexOf(',');
            u.base64 = u.base64.substr(indexFinishType+1,u.base64.length-1);
            this.userService.updateUser(u).subscribe(e=>{
              this.mostrarDialogo("Usuario actualizado exitosamente");
              document.getElementById("showEditBtn").click();
              this.getUsers();
            })
          }else{
            this.msgModal("Falta nombre");
          }
        }else{
          this.msgModal("Falta foto de perfil");
        }
      }else{
        this.msgModal("Falta puesto");
      }
    }else{
      this.msgModal("Falta BRM");
    }
  }
}

