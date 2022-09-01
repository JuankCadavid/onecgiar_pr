import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pr-button',
  templateUrl: './pr-button.component.html',
  styleUrls: ['./pr-button.component.scss']
})
export class PrButtonComponent implements OnInit {
  @Input() text: string;
  @Input() icon: string;
  @Input() reverse: boolean = false;
  @Input() showBackground: boolean = true;
  @Input() colorType = 'primary';
  constructor() { }

  ngOnInit(): void {
    console.log(this.colorType);
  }

}