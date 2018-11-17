import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, Searchbar, ModalController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild("searchbar") searchbar:Searchbar;
  bgcolor: string;

  constructor(private statusBar: StatusBar, private platform: Platform,public modalController: ModalController, private speechRecognition: SpeechRecognition) {

  }

  async ngOnInit() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }
      });

    this.platform.backButton.subscribe(() => {
      this.statusBar.backgroundColorByHexString('#cc0000');
    });
  }

  async goBack() {
    this.statusBar.backgroundColorByHexString('#cc0000');
  }

  async start() {
    var self = this;
    self.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          var abc = matches[0];
          self.showText(abc);
        },
        (onerror) => console.log('error:', onerror)
      )

  }

  async showText(text) {
    this.bgcolor = text;
  }

  ionViewWillEnter() {
    this.searchbar.setFocus(); // Tried with this one 1st, this only works in Internet Explorer / Edge
     // And also this with @ViewChild
}

fileChange(ev){
console.log(ev);
}

}
