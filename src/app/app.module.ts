import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//Components
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { CrudUsersComponent } from './crud-users/crud-users.component';
import { DialogNormalComponent } from './dialog-normal/dialog-normal.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';


const routes:Routes = [
  {path : '', redirectTo: '/adminUsers', pathMatch: 'full' },
  {path : 'adminUsers', component:CrudUsersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CrudUsersComponent,
    DialogNormalComponent,
    DialogConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule, 
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogNormalComponent,
    DialogConfirmComponent
  ]
})
export class AppModule { }
