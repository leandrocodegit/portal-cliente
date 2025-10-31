import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { PainelSidebarComponent } from './painel-sidebar.component';
import { AppSidebar } from './app.sidebar';
import { PreloadComponent } from 'src/app/shared/components/preload/preload.component';
import { LoadService } from 'src/app/shared/components/preload/load.service';
import { LayoutService } from '../services/layout.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    AppSidebar,
    RouterModule,
    PreloadComponent,
    ToastModule,
    ConfirmDialogModule,
    TabsModule
  ],
  template: `
<div class="layout-wrapper" [ngClass]="containerClass">
  <app-top-bar></app-top-bar>
  <app-sidebar></app-sidebar>
  <div class="layout-main-container">
    <div class="block lg:flex flex-col gap-4 h-[97%]">
        <div class="layout-main">
          @if(load){
          <app-preload></app-preload>
          }
          <router-outlet></router-outlet>
          <p-toast />
          <p-confirmdialog />
        </div>
    </div>
  </div>
  <div class="layout-mask animate-fadein"></div>
</div>
  `
})
export class AppLayout {
  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  @ViewChild(PainelSidebarComponent) appSidebar!: PainelSidebarComponent;

  @ViewChild(TopBarComponent) appTopBar!: TopBarComponent;

  protected viewDetalhes = false;
  protected load = false;
  protected instanceId?: any;
  protected recenteService: LoadService;

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router,
    private readonly nagivate: ActivatedRoute,
    private readonly loadService: LoadService
  ) {

    loadService.loadUpdate$.subscribe(data => {
        var intervalo = setInterval(() => {
          this.load = data;
          clearInterval(intervalo);
        }, 100);

    })

    this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
      if (!this.menuOutsideClickListener) {
        this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
          if (this.isOutsideClicked(event)) {
            this.hideMenu();
          }
        });
      }

      if (this.layoutService.layoutState().staticMenuMobileActive) {
        this.blockBodyScroll();
      }
    });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.hideMenu();
    });
  }

  isOutsideClicked(event: MouseEvent) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');
    const eventTarget = event.target as Node;

    return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
  }

  hideMenu() {
    this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  get containerClass() {
    return {
      'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
      'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
      'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
      'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
      'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
