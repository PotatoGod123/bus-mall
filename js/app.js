'use strict';
//global variables
var firstImgElement = document.getElementById('imgVoteOne');
var secondImgElement = document.getElementById('imgVoteTwo');
var thirdImgElement = document.getElementById('imgVoteThree');
var sectionForVoteImg = document.getElementById('sectionImagesVote');
var allPicture=[];
var countScore = 0;
var buttonTarget;


var PictureMaster = function(name){
  this.filepath = `img/${name}.jpg`;
  this.title = this.alt = name;
  this.votes = 0;
  this.views = 0;
  if(this.filepath.includes('.png')){
    this.filepath= `img/${name}`;
    this.title = 'sweep';
  }
  if(this.filepath.includes('.gif')){
    this.filepath=`img/${name}`;
    this.title = 'usb';
  }
  allPicture.push(this);
};

new PictureMaster('bag');
new PictureMaster('banana');
new PictureMaster('bathroom');
new PictureMaster('boots');
new PictureMaster('breakfast');
new PictureMaster('bubblegum');
new PictureMaster('chair');
new PictureMaster('cthulhu');
new PictureMaster('dog-duck');
new PictureMaster('dragon');
new PictureMaster('sweep.png');
new PictureMaster('pen');
new PictureMaster('pet-sweep');
new PictureMaster('scissors');
new PictureMaster('shark');
new PictureMaster('tauntaun');
new PictureMaster('unicorn');
new PictureMaster('water-can');
new PictureMaster('wine-glass');
new PictureMaster('usb.gif');

function randomNumberFromIndexLength(){
  return Math.floor(Math.random() * allPicture.length);
}

function render(){
  var firstRandomNumber = randomNumberFromIndexLength();
  var secondRandomNumber = randomNumberFromIndexLength();
  var thirdRandomNumber = randomNumberFromIndexLength();

  while(firstRandomNumber===secondRandomNumber){
    secondRandomNumber = randomNumberFromIndexLength();
  }
  while(secondRandomNumber===thirdRandomNumber){
    thirdRandomNumber = randomNumberFromIndexLength();
  }

  while(thirdRandomNumber===firstRandomNumber){
    thirdRandomNumber = randomNumberFromIndexLength();
  }

  firstImgElement.src = allPicture[firstRandomNumber].filepath;
  firstImgElement.title = allPicture[firstRandomNumber].title;
  firstImgElement.alt = allPicture[firstRandomNumber].alt;
  allPicture[firstRandomNumber].views++;

  secondImgElement.src = allPicture[secondRandomNumber].filepath;
  secondImgElement.title = allPicture[secondRandomNumber].title;
  secondImgElement.alt = allPicture[secondRandomNumber].alt;
  allPicture[secondRandomNumber].views++;

  thirdImgElement.src = allPicture[thirdRandomNumber].filepath;
  thirdImgElement.title = allPicture[thirdRandomNumber].title;
  thirdImgElement.alt = allPicture[thirdRandomNumber].alt;
  allPicture[thirdRandomNumber].views++;
}


sectionForVoteImg.addEventListener('click',votingImg);

function votingImg(e){
  var targetName = e.target.title;

  console.log(targetName);
  for(var i=0;i<allPicture.length;i++){
    if(targetName===allPicture[i].title){
      allPicture[i].votes++;
      countScore++;
      render();
    }
  }

  if(countScore===24){
    sectionForVoteImg.removeEventListener('click',votingImg);
    var buttonFormation = document.createElement('button');
    buttonFormation.textContent = 'View Results';
    buttonFormation.name = 'click';
    buttonFormation.type = 'click';
    buttonFormation.id ='buttonList';
    sectionForVoteImg.appendChild(buttonFormation);
    buttonTarget =document.getElementById('buttonList');
    buttonTarget.addEventListener('click',resultRender);
  }

}

function resultRender(e){
  e.preventDefault();

  if(e.target){
    var ulElement = document.createElement('ul');
    sectionForVoteImg.appendChild(ulElement);
    ulElement.id = 'ulList';
    var ulListParent = document.getElementById('ulList');
    for(var i=0;i<allPicture.length;i++){
      var liElement = document.createElement('li');
      liElement.textContent = `${allPicture[i].title} had ${allPicture[i].votes} votes, and was seen ${allPicture[i].views} times.`;
      ulListParent.appendChild(liElement);
    }
    buttonTarget =document.getElementById('buttonList');
    buttonTarget.removeEventListener('click',resultRender);
  }
}



render();
