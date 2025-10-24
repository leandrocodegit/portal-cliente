import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-tabs-usuario',
  imports: [
        RouterModule,
        TabsModule
  ],
  templateUrl: './tabs-usuario.component.html',
  styleUrl: './tabs-usuario.component.scss'
})
export class TabsUsuarioComponent implements OnInit {

  protected tab = 'users';

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if (param['tab'])
        this.tab = param['tab'];
      console.log(param);

    })
  }

  selectTab(event: any) {
    this.router.navigate([`/painel/users/${event}`]);
    this.tab = event;
  }
}
