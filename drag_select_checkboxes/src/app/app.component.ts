import { Component } from '@angular/core';
import { Box } from 'src/model/box';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'drag_select_checkboxes';

  totalBoxes: Box[] = [];
  selectedBoxIds: number[] = [];
  chosenColors: string[] = [];
  total: number = 0;
  row: number = 0;
  column: number = 0;
  color: any;
  isMousePressed: boolean = false;

  getColor(x: Box): string {
    return x.color;
  }

  onInputChange() {
    //empty the totalBoxes array
    this.totalBoxes = [];

    // retriving the entered value for rows and columns
    this.row = <number><unknown>((document.getElementById('row') as HTMLInputElement).value);
    this.column = <number><unknown>((document.getElementById('column') as HTMLInputElement).value);

    //calculating the total number of boxes
    this.total = this.row * this.column;

    //populating totalBoxes array with Box object.
    for (let i = 0; i < this.total; i++) {
      const b = new Box(i, false, "#FFFFFF");
      this.totalBoxes.push(b);
    }

    //seting the number of column as CSS variable
    document.documentElement.style.setProperty("--col", <string><unknown>this.column);
  }

  onMouseUp() {
    this.isMousePressed = false;
  }
  onMouseDown() {
    this.isMousePressed = true;
  }

  //method called on mouseenter event
  dragSelectedCheckBox(x: Box) {
    // if the mouse is pressed and not already saved with a color, then select the box
    if (this.isMousePressed && x.status === false) {
      this.clickSelectedCheckbox(x.boxId);
    }
  }

  //method called to select the checkbox
  clickSelectedCheckbox(id: number) {
    const divId = 'd.' + id;

    //retriving the status of the checkbox, TRUE: if checked, FALSE: if unchecked
    const boxChecked = (document.getElementById(<string><unknown>id) as HTMLInputElement).checked;

    //retrieving whether the checkbox is already saved with a color.
    const boxStatus: boolean = (this.totalBoxes.filter((f) => f.boxId === id)[0]).status;

    //if the checkbox is checked and the checkbox is not saved with a color, then unchecking it
    if (boxChecked && !boxStatus) {
      //unchecking the checkbox
      (document.getElementById(<string><unknown>id) as HTMLInputElement).checked = false;

      //making the background color as white
      (document.getElementById(divId) as HTMLElement).style.backgroundColor = '#FFFFFF';

      //removing the unchecked checkbox from the selectedBox array.
      this.selectedBoxIds.splice(this.selectedBoxIds.indexOf(id), 1);
    }
    //if the checkbox is unchecked and the checkbox is not already saved with a color, then checking the checkbox
    else if (!boxChecked && !boxStatus) {
      //checking the checkbox
      (document.getElementById(<string><unknown>id) as HTMLInputElement).checked = true;

      //converting the background color, to represent that the checkbox is clicked
      (document.getElementById(divId) as HTMLElement).style.backgroundColor = '#E1AEFC';

      //adding the checked checkbox in selectedBox array
      this.selectedBoxIds.push(id);
    }
  }
  save() {
    //retrieving the value of the chosen color
    this.color = (document.getElementById('color') as HTMLInputElement).value;

    //checking if selections with same color has been made earlier
    var isColorPresent = this.chosenColors.filter((f) => f === this.color);
    if (isColorPresent.length <= 0) {
      //adding the color in the chosenColor array
      this.chosenColors.push(this.color);
    }

    //iterating through the selected checkbox array
    this.selectedBoxIds.forEach((e) => {
      const divId = 'd.' + e;
      //find the Box object, change the color to the chosen color and status to true
      var b: Box = this.totalBoxes.filter((f) => f.boxId === e)[0];
      b.color = this.color;
      b.status = true;
      (document.getElementById(divId) as HTMLElement).style.backgroundColor = this.color;
    })
    //selectedBoxIds array is cleared
    this.selectedBoxIds = [];

    //displaying the Box objects in console.
    console.clear();
    this.totalBoxes.forEach((t) => console.log(t));
  }

  //method called to remove a selection
  remove(color: string) {
    //removing the color from the array
    this.chosenColors.splice(this.chosenColors.indexOf(color), 1);

    //changing the condition of the checkboxes that are saved with the given color to their initial condition
    this.totalBoxes.forEach((element) => {
      if (element.color === color) {
        element.status = false;
        element.color = "#FFFFFF";
        (document.getElementById(<string><unknown>element.boxId) as HTMLInputElement).checked = false;
        const divId = 'd.' + element.boxId;
        (document.getElementById(divId) as HTMLElement).style.backgroundColor = "#FFFFFF";
      }
    });
  }
}
