import { Injectable } from '@angular/core';
interface alertOptions {
  id;
  title;
  description?: string;
  closeIn?: number;
  status: 'error' | 'success';
  confirm?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class CustomizedAlertsFeService {
  //TODO customized alerts for events
  showed = false;
  constructor() {}

  show(alertOptions: alertOptions, callback?) {
    let { id, title, description = '', closeIn, status, confirm } = alertOptions;
    this.showed = true;
    let alert = document.getElementById(id);

    let appRoot = document.getElementsByTagName('app-root')[0];
    appRoot.insertAdjacentHTML(
      'beforeend',
      `
      <div class="custom_modal_container" id="${id}">
        <div class="custom-alert animate__animated animate__bounceIn"  id="alert-${id}">
          <div class="top-line ${status}"></div>
          <div class="alert-content ${status}">
            <div class="icon"><i class="material-icons-round">${status == 'success' ? 'check' : 'close'}</i></div>
            <div class="title">${title}</div>
            <div class="description">${description}</div>
          </div>
          <div class="options">
            <div class="close_button accept_button" id="close-${id}">Ok</div>
            <div class="close_button cancel_button" style="display:none" id="cancel-${id}">Cancel</div>
            <div class="close_button confirm_button" style="display:none" id="confirm-${id}">Ok</div>
          </div>
        </div>
        <div class="bg animate__animated animate__fadeIn" id="bg-${id}"></div>
      </div>
      `
    );
    alert = document.getElementById(id);
    if (confirm) {
      document.getElementById(`close-${id}`).style.display = 'none';
      document.getElementById(`cancel-${id}`).style.display = 'block';
      document.getElementById(`confirm-${id}`).style.display = 'block';
    }
    document.getElementById(`bg-${id}`).addEventListener('click', () => {
      this.closeAction(id);
    });
    document.getElementById(`close-${id}`).addEventListener('click', () => {
      this.closeAction(id);
    });
    document.getElementById(`cancel-${id}`).addEventListener('click', () => {
      this.closeAction(id);
    });
    document.getElementById(`confirm-${id}`).addEventListener('click', () => {
      callback();
    });
    if (closeIn)
      setTimeout(() => {
        this.closeAction(id);
      }, 3000);

    alert.addEventListener('animationend', () => {
      if (!this.showed) {
        alert.classList.remove('animate__animated', 'animate__bounceIn', 'animate__bounceOut');
        alert.style.display = 'none';
        alert.parentNode.removeChild(alert);
      }
    });
  }

  closeAction(id) {
    this.showed = false;
    let alert: any = document.getElementById(`alert-${id}`);
    if (alert) alert.classList.add('animate__animated', 'animate__bounceOut');
  }
}