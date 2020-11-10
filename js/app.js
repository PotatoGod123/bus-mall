'use strict';
//global variables
var firstImgElement = document.getElementById('imgVoteOne');
var secondImgElement = document.getElementById('imgVoteTwo');
var thirdImgElement = document.getElementById('imgVoteThree');
var sectionForVoteImg = document.getElementById('sectionImagesVote');
var allPicture=[];
var countScore = 0;
var buttonTarget;

//the main contructor for pictures
var PictureMaster = function(name){
  this.filepath = `img/${name}.jpg`;
  this.title = this.alt = name;
  this.votes = 0;
  this.views = 0;
  //this will take any object instance that has the .png or .gif in their name and rewrite the filepath property
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

//all object instances
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
//this will get a ranodm between 0 and the amount of pictures
function randomNumberFromIndexLength(){
  return Math.floor(Math.random() * allPicture.length);
}
//this will render the picture while making sure they are never displayed twice in the same render
//all while adding a 1 to the views when they do appear
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

  while(thirdRandomNumber===firstRandomNumber||thirdRandomNumber===firstRandomNumber){
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

//this will add the event listener that will listen to the section of the img and listen for a listen
sectionForVoteImg.addEventListener('click',votingImg);
//this is the function running in the listener above, whic will look for the value of title and match
// it to the tittle in all the intance inside the array and then once matched at a 1 vote value
function votingImg(e){
  var targetName = e.target.title;

  // console.log(targetName);
  for(var i=0;i<allPicture.length;i++){
    if(targetName===allPicture[i].title){
      allPicture[i].votes++;
      countScore++;
      render();
    }
  }
  //once the user has clicked 25 times, it's set to 24 since loading the page is the first try
  //this will remove the event so no more clicking on images, make a button appear and add an event listener to it
  //button has special name,type,and id with it's listener running fuction below
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
//this function runs inside the eventListener for the button made after voting, when user clicks on
// the button that appears it fire this and display append a ul with a bunch of li and show a concatenation
// of strings and the views and votes for each instance, then remove its own listner so click on it will not 
// keep making more list
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

//calling functions

render();
