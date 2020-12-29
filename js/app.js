'use strict';
//global variables
var firstImgElement = document.getElementById('imgVoteOne');
var secondImgElement = document.getElementById('imgVoteTwo');
var thirdImgElement = document.getElementById('imgVoteThree');
var sectionForVoteImg = document.getElementById('sectionImagesVote');
var allPicture=[];
var countScore = 0;
var buttonTarget;
var differentRandomNumbers =[];
var allPictureNames= [];
var allPictureVotes=[];
var allPictureViewd=[];

//the main contructor for pictures
var PictureMaster = function(name,votes=0,views=0){
  this.filepath = `img/${name}.jpg`;
  this.title = this.alt = name;
  this.votes = votes;
  this.views = views;
  //this will take any object instance that has the .png or .gif in their name and rewrite the filepath property
  if(this.filepath.includes('.png')){
    this.filepath= `img/${name}`;
    this.title = 'sweep';
  }
  if(this.filepath.includes('.gif')){
    this.filepath=`img/${name}`;
    this.title = 'usb';
  }

  //pushes object instances into allPicture array
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

//essentially this will get 3 number first and put them infrot of the differentRanDOmNumber array
//whenever its call, so when the user click a picture, this is function is inside the render so
// it will run when that happens cause the render is being called in the event trigger, which
// will keep on putting more numbers at the front but checking that the number are not the same before
// hand so you will never repeat number in the whole length of the array while the max lengeth of the array being 8
//cause the last part of the function will remove the 9th number allowing to appear again in the array
//so if you kept increasing the number in the last while you would run out of images to show cause no
// number would fit
function noMatchingRandomNumbers() {
  for(var i=0;i<3;i++){
    var randomNums = randomNumberFromIndexLength();

    //make sure number is unique
    while(differentRandomNumbers.includes(randomNums)){
      randomNums = randomNumberFromIndexLength();
    }

    // put it at the beginning of the array
    differentRandomNumbers.unshift(randomNums);
    //this make array only 6 long by removing the last number
    while(differentRandomNumbers.length>8){
      differentRandomNumbers.pop();
    }
  }
}

//this will render the picture while making sure they are never displayed twice in the same render
//all while adding a 1 to the views when they do appear
function render(){
  noMatchingRandomNumbers();
  var firstRandomNumber = differentRandomNumbers[0];
  var secondRandomNumber = differentRandomNumbers[1];
  var thirdRandomNumber = differentRandomNumbers[2];

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
  var targetTitle = e.target.title;

  // console.log(targetName);
  for(var i=0;i<allPicture.length;i++){
    if(targetTitle===allPicture[i].title){
      allPicture[i].votes++;
      countScore++;
      callThisTOresetandInsertCurrentAllPictureData();
      render();
    }
  }
  //once the user has clicked 25 times, it's set to 24 since loading the page is the first try
  //this will remove the event so no more clicking on images, make a button appear and add an event listener to it
  //button has special name,type,and id with it's listener running fuction below
  if(countScore===25){
    turnIntoJSONString();
    sectionForVoteImg.removeEventListener('click',votingImg);
    var buttonFormation = document.createElement('button');
    buttonFormation.textContent = 'View Chart Results!';
    buttonFormation.name = 'click';
    buttonFormation.type = 'click';
    buttonFormation.id ='buttonList';
    sectionForVoteImg.appendChild(buttonFormation);
    buttonTarget =document.getElementById('buttonList');
    buttonTarget.addEventListener('click',resultRender);
  }

}

//this will function will turn all the object in allpictures and make into the string!!!the setter
function turnIntoJSONString(){
  var stringPictureData = JSON.stringify(allPicture);
  localStorage.setItem('allPicture', stringPictureData);
}
//now this one will get the string out and set it to back to an object and run the function underneath sending the newly made
// object back into it which wtill make the allPicture array become the previous value and then clear the localStorage
// so if they complete the selection it will startover again keep track !!!!the getter and converter
function turnIntoJavaScriptAndMakeANewAllPicture(){
  var getStringPictureData = localStorage.getItem('allPicture');
  var parsedAllPicture = JSON.parse(getStringPictureData);
  makeTheNewAllPicture(parsedAllPicture);
  localStorage.clear('allPicture');
}
//this will be run in the function above while grabiing the parsed data, but it will reset the allPicture array while grabing the string version 
//from the local storage from above to generate an all new object instance array inside the allPicture! so if set up properly, it will keep all
// necessary values from past user instance on machine
function makeTheNewAllPicture(banana){
  allPicture=[];
  for(var i=0;i<banana.length;i++){
    new PictureMaster(banana[i].alt,banana[i].votes,banana[i].views);
  }
}
//this function runs inside the eventListener for the button made after voting, when user clicks on
// the button that appears it fire this and display append a ul with a bunch of li and show a concatenation
// of strings and the views and votes for each instance, then remove its own listner so click on it will not 
// keep making more list
function resultRender(e){
  e.preventDefault();

  if(e.target){
    getTitleNames();
    //this will write list
    var ulElement = document.createElement('ul');
    sectionForVoteImg.appendChild(ulElement);
    ulElement.id = 'ulList';
    var ulListParent = document.getElementById('ulList');
    for(var i=0;i<allPicture.length;i++){
      var liElement = document.createElement('li');
      liElement.textContent = `${allPicture[i].title} had ${allPicture[i].votes} votes, and was seen ${allPicture[i].views} times.`;
      ulListParent.appendChild(liElement);
    }
    //this will write the chart using chart.js
    var ctx = document.getElementById('myChart');
    // eslint-disable-next-line no-undef
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: allPictureNames,// name of all pictures
        datasets: [{
          label: '# of Votes Per Picture',
          data: allPictureVotes,// number of votes
          backgroundColor: 'black',
          borderColor: 'red',
          borderWidth: 1,
          hoverBackgroundColor: 'white',
          hoverBorderColor: 'black',
        },
        {
          label:'# of Views for Each Picture',
          data:allPictureViewd,//number of views 
          backgroundColor: 'blue',
          borderColor:'green',
          borderWidth:.5,
          hoverBackgroundColor:'white',
          hoverBorderColor:'black',
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    //these two lines will remove the listener from the button after making the list and chart so it can't be click on and keep adding more
    buttonTarget =document.getElementById('buttonList');
    buttonTarget.removeEventListener('click',resultRender);
  }
}
//this is a helper function that will grab all the name's and put them into an array
function getTitleNames(){
  for(var i=0;i<allPicture.length;i++){
    allPictureNames.push(allPicture[i].title);
    allPictureVotes.push(allPicture[i].votes);
    allPictureViewd.push(allPicture[i].views);
  }
}
//just some extra last min functions, this one will reset and update the localStorage with current session data whenever called w
function callThisTOresetandInsertCurrentAllPictureData(){
  localStorage.clear('allPicture');
  turnIntoJSONString();
}
//this function is called at the end after the page loads to check if the localStorage is empty, if it is then everything goes on normal
// but if it's not empty it will run the function which will update the current session with previous data of other sessions
function callThisToCheckLocalStorageAn(){
  if(localStorage.getItem('allPicture') === null){
    console.log('yes localstorage be empty nothing happens');
  } else{
    console.log('it do not be empty brotha this will update the allPicture keepign track of previouew stuff etc');
    turnIntoJavaScriptAndMakeANewAllPicture();
  }
}

//calling functions
callThisToCheckLocalStorageAn();
render();
callThisTOresetandInsertCurrentAllPictureData();



