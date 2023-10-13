// Find your hat //
const prompt = require('prompt-sync')({ sigint: true }); 
const clear = require('clear-screen');

const hat = '💰';
const hole = '💣';
const fieldCharacter = '🌳';
const pathCharacter = '👾';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.positionX = 0;
    this.positionY = 0;
    this.randomStartPosition(); 
  };
  
  randomStartPosition() {
    const randomX = Math.floor(Math.random() * this.field[0].length); 
    const randomY = Math.floor(Math.random() * this.field.length); 
    this.positionX = randomX; 
    this.positionY = randomY; 
    this.field[randomY][randomX] = pathCharacter; 
  }
  
  static generateField (height, width, percentage = 0.2){ 
    let field = new Array(height); 
    for (let i = 0; i < field.length; i++){ 
      field[i] = new Array(width); 
    }
    for (let i = 0; i < field.length; i++){  
      for (let j =0; j < field[i].length; j++){ 
        const area = Math.random();  
        field[i][j] = area > percentage ? fieldCharacter : hole; 
      }
    }
    
    const hatLocation = {  
      x : Math.floor(Math.random() * width), 
      y : Math.floor(Math.random() * height) 
    }
    field[hatLocation.x][hatLocation.y] = hat; 
    return field; 
  };

  printField() { 
    clear(); 
    console.log('      Find Your Money  '); 
    for (let row of this.field){ 
      console.log(row.join(' ')); 
    }
    console.log('U = Up D = Down R = Right L = Left'); 
  };

  moveDirection(){
    const userInput = prompt('Which way do you want to move?').toUpperCase(); 
    switch(userInput){ 
      case 'U' : this.positionY -= 1; 
        break; //จบการทำงาน
      case 'D' : this.positionY += 1; 
        break;
      case 'R' : this.positionX += 1; 
        break;
      case 'L' : this.positionX -= 1; 
        break;
      default  : console.log('Invalid! Please enter U,D,R or L'); 
        this.moveDirection(); 
        break;
    }
  };

  isInField(){
    return (this.positionY >= 0 && this.positionX >= 0 && this.positionY < this.field.length && this.positionX < this.field[0].length); 
  };

  isHat(){
    return this.field[this.positionY][this.positionX] === hat;
  };

  isHole(){
    return this.field[this.positionY][this.positionX] === hole;
  };
 
  gameStart(){
    let playStatus = true; 
    while (playStatus){ 
      this.printField(); 
      this.moveDirection(); 
      if (!this.isInField()){ 
        console.log('Oops 🙊, You lost you way!!'); 
        playStatus = false; 
        break; 
      }else if(this.isHole()){ 
        console.log('Bomb 💥 !!, Your money 💸 is gone!'); 
        playStatus = false; 
        break; 
      }else if(this.isHat()){
        console.log('Yay!! Congratulations 🎉. You are found your money!'); 
        playStatus = false; 
        break; 
      }
      this.field[this.positionY][this.positionX] = pathCharacter; 
    };
  };
};

const newGame = new Field(Field.generateField(10,10,0.3)); 
newGame.gameStart();
