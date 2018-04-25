import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-console-display',
  templateUrl: './console-display.component.html',
  styleUrls: ['./console-display.component.css']
})
export class ConsoleDisplayComponent implements AfterViewInit {
  @Input() text: string;
  @Input() duration: number;
  @ViewChild('dataContainer') dataContainer: ElementRef;

  public start: any;
  public elapsed: any;

  public totalIterations: number;
  public currentIteration: number;
  public done: boolean;
  public frameID: any;
  constructor(element: ElementRef, public ngZone: NgZone) {
    this.duration = 5000;
  }

  ngAfterViewInit() {
    if (!this.done) {
      this.start = new Date().getTime();
      this.tick();
    }
  }

  tick() {
    var timestamp = new Date().getTime();;

    this.elapsed = timestamp - this.start;

    this.totalIterations = Math.round(this.duration / 1000 * 60);
    this.currentIteration = Math.round(this.elapsed / 1000 * 60);

    this.done = this.type(this.currentIteration, this.totalIterations, this.text.length);
    if (this.done) {
      cancelAnimationFrame(this.frameID);
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.frameID = requestAnimationFrame((a) => {
          this.tick();
        });
      });
    }

  }
  typeUpToCurrentChar(currentChar, charsTyped, resetCounter) {
    var originalValue = this.text;
    if (currentChar - charsTyped < originalValue.length) {
      var charsToType = currentChar - charsTyped;
      this.newContent(originalValue.substring(0, charsToType));
      charsTyped += charsToType;
    } else {
      this.newContent(originalValue);
      charsTyped = originalValue.length;
    }

    return charsTyped;
  }
  type(currentIteration, totalIterations, totalChars) {
    var currentChar = Math.ceil(currentIteration / totalIterations * totalChars);

    var charsTyped = this.typeUpToCurrentChar(currentChar, 0, true);

    var done = totalChars <= charsTyped;
    return done;
  }

  newContent(data) {
    this.dataContainer.nativeElement.innerHTML = data;
  }
}
