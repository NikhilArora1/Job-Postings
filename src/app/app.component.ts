import { Component, OnInit } from '@angular/core';

const data = require('../assets/data.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  jobs = [];
  filterCondition = {
    role: '',
    level: '',
    languages: [],
    tools: []
  };
  filteredData;

  chips = [];

  ngOnInit(): void {
    this.jobs = data;
    this.filteredData = this.jobs;
  }

  add(type, chip): void {
    if (type === 'languages' || type === 'tools') {
      this.filterCondition[type].push(chip);
    } else {
      this.filterCondition[type] = chip;
    }
    this.chips.push(chip);
    this.filter();
  }

  remove(chip): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }

    if (this.filterCondition.level === chip) {
      delete this.filterCondition.level;
    } else if (this.filterCondition.role === chip) {
      delete this.filterCondition.role;
    } else if (this.filterCondition.languages.includes(chip)) {
      const i = this.filterCondition.languages.indexOf(chip);
      if (index >= 0) {
        this.filterCondition.languages.splice(index, 1);
      }
    } else if (this.filterCondition.tools.includes(chip)) {
      const i = this.filterCondition.tools.indexOf(chip);
      if (i >= 0) {
        this.filterCondition.tools.splice(i, 1);
      }
    }
    this.filter();
  }

  filter(): void {
    this.filteredData = this.jobs;
    Object.keys(this.filterCondition).forEach(key => {
      if (this.filterCondition[key] && (key === 'role' || key === 'level')) {
        this.filteredData = this.filteredData.filter(job => job[key] === this.filterCondition[key]);
      } else if (this.filterCondition[key].length && (key === 'languages' || key === 'tools')) {
        this.filteredData = this.filteredData.filter(job => {
          const checker = this.filterCondition[key].every(v => job[key].includes(v));
          return checker;
        });
      }
    });
  }

  clearFilter(): void {
    this.chips = [];
    this.filterCondition = {
      role: '',
      level: '',
      languages: [],
      tools: []
    };
    this.filteredData = this.jobs;
  }
}
