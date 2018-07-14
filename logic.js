
  $(document).ready(function () {
    var results;
    function ajaxCall(queryURL) {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            results = response.hits; //in variable to use in loop
           // console.log(results);
          // $(".card").empty();
            //to display result recipes
            for (var i = 0; i < 5; i++) {
                //create recipe div
                var resultDiv = $("<div class= 'card-body'>");
                //resultDiv.addClass("card col s12 m6 l4");
               // resultDiv.className = 'card';
                 //creating div to display result name
                recipeName = results[i].recipe.label;
                var recipeNameDiv = $("<div class='card-header'>").text("Recipe Title : " + recipeName);
                // console.log(recipeName);
                resultDiv.append(recipeNameDiv);
                //var recipeCalories = results[i].recipe.calories;
                //var recipeCaloriesDiv = $("<div class='card-text'>").text("Calories Count : " + recipeCalories);
                //resultDiv.append(recipeCaloriesDiv);
                imageURL = results[i].recipe.image;
                //  console.log(imageURL);
                var image = $("<img class='card-img-top' style='width:200px'>").attr("src", imageURL);
                // console.log(image);
                resultDiv.append(image);
            
                var ingBtn = $("<button id='demo' class = 'btn-info'>"); //creating a button for ingredients
                        ingBtn.text("Ingredients");
                        ingBtn.attr("Recipe", i);
                resultDiv.append(ingBtn);
                
                $("#recipes").prepend(resultDiv);
                //console.log(results[i].recipe.ingredientLines);
            } //for loop ends
        }); //Ajax function ends
    }//ajaxcall function ends
  
  var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        options.method + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      );
    };
  x.setRequestHeader('user-key', '55adf6ab65ffdd6019fcf477dd22d704');
  x.send(options.data);

  }

  (function() {

     document.getElementById('get').onclick = function(e) {
      e.preventDefault();
      var foodStyle = $("#food-style").val();
      var foodStyleText = $("#food-style option:selected").text();
      console.log(foodStyleText);

      doCORSRequest({
        method: this.id === 'post' ? 'POST' : 'GET',
      //  url: "robwu.nl/dump.php",
        url: "https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&cuisines=" + foodStyle,
      }, function printResult(result) {
      //  console.log(result);
      //  var r = result;
        var s = result.split("\n");
      //  console.log(s);
        var t = s[3];
        var u = JSON.parse(t);


        console.log(u);
        console.log(u.results_found);
        console.log(u.restaurants[0].restaurant.name);
        console.log(u.restaurants[0].restaurant.location.address);
        console.log(u.restaurants[0].restaurant.location.locality);
        console.log(u.restaurants[0].restaurant.url);
        console.log(u.restaurants[0].restaurant.cuisines);

        for (var i = 0; i < 5; i++) {
             var restaurantResultDiv = $("<div class= 'card-body'>"); //creating div to display result name
             var restaurantName = u.restaurants[i].restaurant.name;
             restaurantResultDiv.append("<h1>" + restaurantName + "</h1");
             restaurantResultDiv.append("<br/>");

             var restImageURL = u.restaurants[i].restaurant.thumb;
             var restImage = $("<img>").attr("src", restImageURL);
             restaurantResultDiv.append(restImage);
             restaurantResultDiv.append("<br/>");

             var restaurantAddress = $("<p>").text("Address : " + u.restaurants[i].restaurant.location.address);
             restaurantResultDiv.append(restaurantAddress);

            var menuURL = u.restaurants[i].restaurant.menu_url
            var menuLink = $('<a>').attr('href', menuURL).attr('target', "_blank").text('Menu')
            restaurantResultDiv.append(menuLink);
            restaurantResultDiv.append("<br/>");

             var restaurantURL = u.restaurants[i].restaurant.url;
             var restaurantLink = $('<a>').attr('href', restaurantURL).attr('target', "_blank").text('More Info')
             restaurantResultDiv.append(restaurantLink);
             restaurantResultDiv.append("<br/>");


             $("#restaurants").prepend(restaurantResultDiv);
         }

         var user_input = $("#recipe-input").val().trim();
         console.log(user_input);
         var app_id = "05823dd1";
         var app_key = "d5dcdb5a64dd4a50eeabc641ee10f4d1";
         //https://api.edamam.com/search?q=chicken&app_id=05823dd1&app_key=d5dcdb5a64dd4a50eeabc641ee10f4d1&from=0&to=3&calories=591-722&health=alcohol-free"
         var queryURL = "https://api.edamam.com/search?q=" + user_input + "%20" + foodStyleText + "&app_id=" + app_id + "&app_key=" + app_key;
         ajaxCall(queryURL);
         $("#recipe-input").val("");
        // console.log(results); 
         setTimeout(function() {
            // console.log(results);
             
         }, 5000);   



     //   for (var i = 0; i < numArticles; i++) {

    // }



      });
    };

  })();
  if (typeof console === 'object') {
    console.log('// To test a local CORS Anywhere server, set cors_api_url. For example:');
    console.log('cors_api_url = "http://localhost:8080/"');
  }

  

$(document).on("click", ".btn-info", function (event) { //check button class inside the document
     $(".card-text").empty();


        var recipeIng = $(this).attr("Recipe");
       // console.log(this);
        //console.log($(this).attr("Recipe"));
        console.log("a");
        //console.log(results[recipeIng]["recipe"]);
        var response = results[recipeIng]["recipe"];
        //console.log(response);
        ingredients = response.ingredientLines;
            //console.log(ingredients);
         for (var i = 0; i < ingredients.length; i++)
         {
             ing = ingredients[i];
            // console.log(ingredients[i]);
            var IngtDiv = $("<div class= 'card-text'>").text (ing);
            $(".card-body").append(IngtDiv);
          //  console.log(IngtDiv);
         }
    }); //recipe result div click function ends
    
});//document ready function ends
