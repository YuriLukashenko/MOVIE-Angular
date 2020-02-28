import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Poster} from '../shared/IPoster.model';
import {SessionStateService} from '../services/session-state.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  poster: Poster;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private sessionStateService: SessionStateService) { }

  ngOnInit(): void {
    this.poster = this.sessionStateService.getCurrentPoster();
  }

}
