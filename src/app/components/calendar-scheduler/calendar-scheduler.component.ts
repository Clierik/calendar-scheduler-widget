import {
  Component,
  OnInit
} from '@angular/core';
import {
  EventOfView
} from './interfaces'
import * as moment from "moment";

@Component({
  selector: 'app-calendar-scheduler',
  templateUrl: './calendar-scheduler.component.html',
  styleUrls: ['./calendar-scheduler.component.scss']
})

export class CalendarSchedulerComponent implements OnInit {

  preSetDate: any = moment(); // moment obj
  activeDate: any; // moment obj
  startOfWeek: number;
  endOfWeek: number;
  eventsPerView: number;
  eventsArr: EventOfView[] = [];
  cellAdjustedProportion: number;
  activeView: string;

  constructor() {}

  ngOnInit() {
    this.activeDate = moment().format('DD');
    this.activeView = 'month';
    this.setActiveView('month', this.preSetDate);
    this.setActiveWeek();
  }

  setActiveView(viewType: string, activeViewDate) {
    if (viewType === 'month') {
      this.activeView === 'month';
      this.eventsPerView = moment(this.preSetDate).daysInMonth();
    } else if (viewType === 'week') {
      // this.activeView === 'week';
      // this.eventsPerView = moment(this.activeDate).daysInMonth();
    } else if (viewType === 'day') {
      // this.activeView === 'day';
      // this.eventsPerView = moment(this.activeDate).daysInMonth();
    }
    this.viewConstruct();
  }

  setActiveWeek() {
    let startWeek = Number(moment(this.activeDate, 'D').startOf('week').format('D')) + 1;
    let endWeek = Number(moment(this.activeDate, 'D').endOf('week').format('D')) + 1;
    if (endWeek < 7) {
      this.startOfWeek = 1;
      this.endOfWeek = Number(moment(endWeek, 'D').format('D'));
    } else if (startWeek > (this.eventsPerView - 7)) {
      this.startOfWeek = Number(moment(startWeek, 'D').format('D'));
      this.endOfWeek = this.eventsPerView;
    } else {
      this.startOfWeek = Number(moment(startWeek, 'D').format('D'));
      this.endOfWeek = Number(moment(endWeek, 'D').format('D'));
    }
  }

  viewConstruct() {
    for (let i = 0; i + 1 < this.eventsPerView; i++) {
      let momentString = `${moment(this.preSetDate).format('YYYY-MM')}` + "-" + `${i + 1}`;
      this.eventsArr.push({
        date: moment(momentString).format('YYYY-MM-DD'),
        dateString: moment(momentString).format('D'),
        dayType: moment(momentString).format('ddd'),
      });
    }
    this.cellHeightSet();
  }

  cellHeightSet() {
    window.addEventListener('load', () => {
      this.cellAdjustedProportion = 100 / this.eventsPerView;
    });
  }

  cellWrapperZoomControl() {
    window.addEventListener('wheel', event => { // needs beeter to window restraints
      let delta = Math.sign(event.deltaY);
      console.info(delta);
      // this.setActiveView('month week day', );
    });
  }

  setActiveEvent(eventDateString, eventDayType) {
    if (eventDayType === 'Sun' ) {
      this.activeDate
    } else {
      let momentString = `${moment(this.preSetDate).format('YYYY-MM') + "-" + eventDateString}`;
      console.log(momentString);
      this.activeDate = moment(momentString);
    } 
    this.activeDate = eventDateString;
    this.setActiveWeek();
  }

  provideVariableChech(dateString, dayType) {
    console.log(dateString);
    console.log(dayType);
  }

}
