import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
declare var Html5Qrcode: any;

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.css']
})
export class QrScanComponent implements OnInit {


  public qrcode:string; '';
  public windowsWidth:string = `${window.innerWidth > 500 ? 500 : window.innerWidth}rm`;
  private html5QrCode;
  public validado;
  public cameras = [];
  private cameraId;
  @ViewChild('video', {}) videoElement: ElementRef;
  @ViewChild('canvas', {}) canvas: ElementRef;
  @Output() qrcodeChange = new EventEmitter();

  sendQrCode(msg) {
      this.qrcodeChange.emit(msg);
  }

  async ngOnInit() {
    await this.getCameras();
  }

  async getCameras() {
    await Html5Qrcode.getCameras().then((devices:any[]) => {
      if (devices && devices.length) {
        devices.forEach(dvic => {
          this.cameras.push(dvic.id)
        });
        this.cameraId = devices[0].id;
        this.startCamera();
      }
    }).catch(err => {
      console.log(err)
    });
  }

  startCamera() {
    this.html5QrCode = new Html5Qrcode("reader");
    this.html5QrCode.start(
      this.cameraId,     // retreived in the previous step.
      {
        fps: 10,    // sets the framerate to 10 frame per second
        qrbox: 250  // sets only 250 X 250 region of viewfinder to
                    // scannable, rest shaded.
      },
      qrCodeMessage => {
        this.validado = true;
        // do something when code is read. For example:
        this.qrcode = qrCodeMessage;
        this.sendQrCode(qrCodeMessage);
      },
      errorMessage => {

      })
    .catch(err => {

    });
  }

  random(array){
    let choices = array
    let tamanho_array = choices.length
    let n_aleatorio = Math.floor(Math.random() * tamanho_array);
    let retorno_aleatorio = choices[n_aleatorio]
    return retorno_aleatorio
  }

  mudaCamera(){
    let camera =  this.random(this.cameras)
    this.cameraId = camera;
    this.html5QrCode.stop().then(ignore => {
      // QR Code scanning is stopped.
    }).catch(err => {
      // Stop failed, handle it.
    });
    this.startCamera();
  }

}
