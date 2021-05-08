import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  usersSubsription$: Subscription;

  listaUsuarios: any[] = [];
  constructor(private router: Router, private oyenteSvc: DataService) {
    this.usersSubsription$ = this.oyenteSvc.onListenUserList().subscribe((users: any) => {
      this.listaUsuarios = users;
    });
    this.listaUsuarios = oyenteSvc.listaUsuarios;

  }

  ngOnInit(): void {
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.oyenteSvc.sendLogOut({ email: this.oyenteSvc.email });
    this.router.navigate(["login"]);
    alert("has salido de tu sesión exitosamente");
  }

  ngOnDestroy(): void {
  }
}
