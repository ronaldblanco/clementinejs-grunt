
var appUrl = window.location.origin;
var ajaxFunctions = {
   ready: function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest (method, url, callback) {
      'use strict';
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
};;

(function () {
   'use strict';
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = appUrl + '/api/:id/clicks';

   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

   addButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

})();
;

(function () {
   'use strict';
   var addButton = document.querySelector('#adddata');
   var delButton = document.querySelector('#deldata');
   var grid = document.querySelector('#list');
   var name = document.querySelector('#name');
   //var image = document.querySelector('#image');
   var apiUrl = appUrl + '/api/:id/info';

   var cont = -1;//-1,3
   function colors(){
      //cont = min;
      var colors = ["list-group-item-info","list-group-item-warning","list-group-item-danger","list-group-item-success"];
      cont++;
      if(cont > -1 && cont < 2) return colors[cont];
      else{
         cont = 0;
         return colors[cont];
      } 
   }
   var cont1 = 1;
   function colors1(){
      //cont = min;
      var colors = ["list-group-item-info","list-group-item-warning","list-group-item-danger","list-group-item-success"];
      cont1++;
      if(cont1 > 0 && cont1 < 4) return colors[cont1];
      else{
         cont1 = 2;
         return colors[cont1];
      } 
   }

   function updateGrid (data) {
      var info = JSON.parse(data);
      console.log(info.data);
      grid.innerHTML = '';
      for(var a = 0; a < info.data.length; a++){
         grid.innerHTML = grid.innerHTML + '<li class="list-group-item '+colors1()+'"><input type="radio" value="?name=' +info.data[a].name+'" name="radioData" id="radioData'+a+'">'+info.data[a].name+'</li>';
      }
      
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid));

   addButton.addEventListener('click', function () {

      var query = "?name=" + name.value;
      ajaxFunctions.ajaxRequest('POST', apiUrl + 'add' + query, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
      });

   }, false);

   delButton.addEventListener('click', function () {

      var query = document.querySelector('input[name = "radioData"]:checked').value;
      ajaxFunctions.ajaxRequest('DELETE', apiUrl + 'del' + query, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateGrid);
      });

   }, false);
   
})();
;

(function () {
   'use strict';
   var photoId = document.querySelector('#photoId') || null;
   var repo = document.querySelector('#repo') || null;
   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   //var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject, displayName, 'username');
      }

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }

      if(userObject.publicRepos !== undefined && repo !== null){
         if (userObject.publicRepos !== null) {
            repo.innerHTML =  '<p><span>Repositories: </span><span id="profile-repos" class="profile-value">'+ userObject.publicRepos +'</span></p>';
            //updateHtmlElement(userObject, profileRepos, 'publicRepos'); 
         }
      }else if(userObject.publicRepos === undefined && repo !== null){
         repo.innerHTML =  '<p><span>Repositories: </span><span id="profile-repos" class="profile-value">No Info!</span></p>'; 
      }
      
      if(userObject.photo !== undefined && photoId !== null){
         if (userObject.photo !== null && photoId !== null) {
            photoId.innerHTML =  '<img src='+userObject.photo+' class = "img-rounded">';
         }
      } else if(userObject.photo === undefined && photoId !== null) {
         photoId.innerHTML =  '<img src="/public/img/gh-mark-32px.png" alt="github logo" />';
      }
      

   }));
})();
;

(function () {
   'use strict';
   var login = document.querySelector('#login') || null;
   var create = document.querySelector('#create') || null;
   var reset = document.querySelector('#reset') || null;
   var authform = document.querySelector('#authform') || null;
   var message = document.querySelector('#message') || null;
   var apiUrl = appUrl + '/auth/localnew';

   function updateForm (ope) {
      if(ope == 'login') authform.innerHTML = '<form action="/auth/local" method="post">	<h3>LOGIN LOCAL USER</h3>	<div class="form-group">	<div>	<label>Username:</label>	<input type="text" name="username"class="form-control" placeholder="Username or Email"/><br/>	</div>	<div>	<label>Password:</label>	<input type="password" name="password" class="form-control" placeholder="Password"/>	</div>	</div>	<br>	<div class="form-group">	<div>	<input type="submit" class="btn btn-primary" value="Submit"/>	</div>	</div></form>';
      if(ope == 'create') authform.innerHTML = '<form action="/auth/localnew" method="post">	<h3>CREATE LOCAL USER</h3>	<div class="form-group">	<div>	<label>Username:</label>	<input type="text" name="username"class="form-control" placeholder="Username or Email"/><br/>	</div>	<div>	<label>Display Name:</label>	<input type="text" name="display"class="form-control" placeholder="Display Name"/><br/>	</div>	<div>	<label>Password:</label>	<input type="password" name="password" class="form-control" placeholder="Password"/>	</div>	</div>	<br>	<div class="form-group">	<div>	<input type="submit" class="btn btn-primary" value="Submit"/>	</div>	</div></form>';
      if(ope == 'reset') authform.innerHTML = '<p>Only valid if your username is a valid email!</p><br> Username:<input type="text" name="name" id="resetusername" class="form-control" placeholder="Email"><br>  <button type="submit" class="btn btn-add btn-primary" id ="resetaction">Reset!</button>';
   }
   
   function updateMess (data){
      var info = JSON.parse(data);
      if(info.message != null && info.message != undefined){
         message.innerHTML = '<div class="'+info.type+'"><h2>'+ info.message +'</h2></div>';
      }
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('login')));
   
   login.addEventListener('click', function () {

         ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('login'));
      
   }, false);
   
   create.addEventListener('click', function () {

         ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('create'));
      
   }, false);
   
   reset.addEventListener('click', function () {

         ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('reset'));
         
         document.querySelector('#resetaction').addEventListener('click', function(){
            var resetUsername = document.querySelector('#resetusername').value;
            ajaxFunctions.ajaxRequest('POST', apiUrl + 'reset?name=' + resetUsername, function () {
               ajaxFunctions.ajaxRequest('GET', apiUrl+'message', updateMess);
               ajaxFunctions.ajaxRequest('GET', apiUrl, updateForm('login'));
            });
         });
         
      
   }, false);
   
})();
