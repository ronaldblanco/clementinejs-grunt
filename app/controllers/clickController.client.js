

(function () {
   'use strict';
   var addButton = document.querySelector('.btn-add') || null;
   var deleteButton = document.querySelector('.btn-delete') || null;
   var clickNbr = document.querySelector('#click-nbr') || null;
   var apiUrl = appUrl + '/api/:id/clicks';

   function updateClickCount (data) {
      if(data != null && data != undefined){
         var clicksObject = JSON.parse(data);
         if(clickNbr != null) {clickNbr.innerHTML = clicksObject.clicks;}
      }
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

   if(addButton != null){
      addButton.addEventListener('click', function () {

         ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
            ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
         });

      }, false);
   }

   if(deleteButton != null){
      deleteButton.addEventListener('click', function () {

         ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
            ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
         });

      }, false);
   }

})();
