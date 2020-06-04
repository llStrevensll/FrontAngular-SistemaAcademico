import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'sistema-academico';


  ngOnInit(): void {
    $('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

}
