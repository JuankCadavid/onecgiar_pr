import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

interface Header {
  attr: string;
  name: string;
  type: 'normal' | 'url';
}

@Component({
  selector: 'app-simple-table-with-clipboard',
  templateUrl: './simple-table-with-clipboard.component.html',
  styleUrls: ['./simple-table-with-clipboard.component.scss'],
  providers: [MessageService]
})
export class SimpleTableWithClipboardComponent {
  @Input() distribution: 'left' | 'normal' = 'normal';
  @Input() title: string;
  @Input() header = [];
  @Input() data = [];

  constructor(private messageService: MessageService) {}

  copyTable(table) {
    // const s = window.getSelection();
    // if (s.rangeCount > 1) {
    //   for (let i = 1; i < s.rangeCount; i++) {
    //     s.removeRange(s.getRangeAt(i));
    //   }
    // }

    let range = new Range();
    // s.removeRange(range);

    range.setStart(table, 0);
    range.setEnd(table, table.childNodes.length);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
    document.execCommand('copy');
    this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Copied', detail: 'Table copied to clipboard' });
    document.getSelection().removeAllRanges();
  }
}