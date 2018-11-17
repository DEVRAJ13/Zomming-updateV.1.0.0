import { Component, ViewChild } from '@angular/core';
import { ToastController, Slides, PopoverController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;
  private apikey: any = '783a602413d5276c84bfe19cd8ef0fe1';
  private language: any = 'en-US';
  public page_position: any = '';
  private only_one_movieDetail: any = {};
  public upcoming_moviesDerail: any = [];
  private top_rate: any = [];
  public nowplaying_list: any[];
  private popular_list: any[];
  public fiveItemsOnly = [];
  static hdImageBaseURL = 'http://image.tmdb.org/t/p/w500/';
  public homeOptions: any;
  public loaderPen: boolean;
  public titlePen: boolean;
  value: any = '43';


  constructor(public toastController: ToastController,public modalController: ModalController, private statusBar: StatusBar, private network: Network, public popoverController: PopoverController, public route: Router, private http: HttpClient) {
    this.getupcoming();
    this.getnowplaying();
  }
  
  ionViewDidEnter(){

  }


  async getupcoming() {
    this.loaderPen = true;
    this.titlePen = false;
    var self = this;
    let body = new FormData();
    body.append('api_key', this.apikey);
    body.append('language', this.language);
    body.append('page', this.page_position);
    this.http.post('https://api.themoviedb.org/3/movie/upcoming?', body)
      .subscribe((success) => {
        this.loaderPen = false;
        this.only_one_movieDetail = JSON.parse(JSON.stringify(success)).results;
        this.upcoming_moviesDerail = JSON.parse(JSON.stringify(success)).results;
        for (let i = 1; i <= 7; i++) {
          var newName = this.upcoming_moviesDerail[i];
          this.fiveItemsOnly.push(newName);
        }
        this.titlePen = true;
        setTimeout(function () {
          self.slides.startAutoplay();
        }, 3000);
      });
  }

  async getnowplaying() {
    let body = new FormData();
    body.append('api_key', this.apikey);
    body.append('language', this.language);
    body.append('page', this.page_position);
    this.http.post('https://api.themoviedb.org/3/movie/now_playing?', body)
      .subscribe((success) => {
        this.nowplaying_list = JSON.parse(JSON.stringify(success)).results;
      });
  }

  async navigationBtn() {
    this.route.navigate(['detail']);
  }

  async searchResult() {
    this.route.navigate(['search']);
    this.statusBar.backgroundColorByHexString('#e5e5e5');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Click to Close',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done'
    });
    toast.present();
  }

}
