
$(document).ready(function () {
  // ------------- Anum's Code ---------------
  var results;

  //Function for Edamam Ajax Call
  function ajaxCall(queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      results = response.hits;
      //loop to go through the result recipes
      for (var i = 0; i < results.length; i++) {

        var resultDiv = $("<div id= 'recipe-info'>");

        //recipe title 
        recipeName = results[i].recipe.label;
        var recipeNameDiv = $("<div class='card-header'>").text("Recipe Title : " + recipeName);
        resultDiv.append(recipeNameDiv);

        //recipe image
        imageURL = results[i].recipe.image;
        var image = $("<img class='card-img-top'>").attr("src", imageURL);
        resultDiv.append(image);

        //recipe info button for ingredients & nutritions
        var ingBtn = $("<button id='infobtn' class = 'btn-info' data-toggle='modal' href='#myModal'>");
        ingBtn.text("Details");
        ingBtn.attr("Recipe", i);
        resultDiv.append(ingBtn);

        //recipe direction button for instructions
        var instrBtn = $("<button id = 'instr' class = 'btn-info'>");
        instrBtn.text("Directions");
        instrBtn.attr("Recipe", i);
        resultDiv.append(instrBtn);

        //info button content div
        infoDiv = $("<div class = 'info>");
        resultDiv.append(infoDiv);

        $("#recipe-div").prepend(resultDiv);
      } //for loop ends

    }); //Edamam Ajax function ends
  }//ajaxcall function ends

  var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function () {
      printResult(
        options.method + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      );
    };
    x.setRequestHeader('user-key', '55adf6ab65ffdd6019fcf477dd22d704');
    x.send(options.data);

  }

  (function () {

    document.getElementById('get').onclick = function (e) {
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

        // -------- Edamam API Input & Ajax Query 
        $("#recipe-div").empty();
        var user_input = $("#recipe-input").val().trim();
        var app_id = "05823dd1";
        var app_key = "d5dcdb5a64dd4a50eeabc641ee10f4d1";
        var foodstyle = "italian";

        //https://api.edamam.com/search?q=chicken&app_id=05823dd1&app_key=d5dcdb5a64dd4a50eeabc641ee10f4d1&from=0&to=3&calories=591-722&health=alcohol-free"
        var queryURL = "https://api.edamam.com/search?q=" + user_input + "%20" + foodstyle + "&app_id=" + app_id + "&app_key=" + app_key;
        ajaxCall(queryURL);
        $("#recipe-input").val("");



        //   for (var i = 0; i < numArticles; i++) {

        // }



      });
    };

  })();
  if (typeof console === 'object') {
    console.log('// To test a local CORS Anywhere server, set cors_api_url. For example:');
    console.log('cors_api_url = "http://localhost:8080/"');
  }




  //---- Edamam Info button function
  $(document).on("click", "#infobtn", function (event) {

    $(".info").empty();

    //For Ingredients
    var recipeIng = $(this).attr("Recipe");
    var response = results[recipeIng]["recipe"];
    ingredients = response.ingredientLines;
    var ingrHeading = $("<div id = 'recipe-data'>").html("<h2> Ingredients: </h2>");
    $(".info").append(ingrHeading);

    for (var i = 0; i < ingredients.length; i++) {

      ing = ingredients[i];
      var IngtDiv = $("<div id= 'recipe-data'>").text(ing);
      $(".info").append(IngtDiv);
    }

    $("#recipe-info").append(infoDiv);


    //For Nutritions
    var recipeNutr = $(this).attr("Recipe");

    serving = response.yield;
    nutCal = Math.round(response.calories / serving);
    nutFat = Math.round(response.totalNutrients.FAT.quantity / serving);
    nutCarb = Math.round(response.totalNutrients.CHOCDF.quantity / serving);
    nutProt = Math.round(response.totalNutrients.PROCNT.quantity / serving);
    console.log(nutProt);

    var nutHeading = $("<div id = 'recipe-data'>").html("<h2> Nutritions: </h2>");
    var serdiv = $("<div id = 'recipe-data'>").text("# Servings: " + serving);
    var nCalDiv = $("<div id = 'recipe-data'>").text("Calories per Serving: " + nutCal);
    var nFatDiv = $("<div id = 'recipe-data'>").text("Fats : " + nutFat + response.totalNutrients.FAT.unit);
    var nCarDiv = $("<div id = 'recipe-data'>").text("Carbs: " + nutCarb + response.totalNutrients.CHOCDF.unit);
    var nProDiv = $("<div id = 'recipe-data'>").text("Protien: " + nutProt + response.totalNutrients.PROCNT.unit);

    $(".info").append(nutHeading)
      .append(serdiv)
      .append(nCalDiv)
      .append(nFatDiv)
      .append(nCarDiv)
      .append(nProDiv);
    $("#recipe-info").append(infoDiv);

  }); //Info button function ends

  //---- Edamam direction button function
  $(document).on("click", "#instr", function (event) { //check button class inside the document

    $("#ing").empty();

    var recipeInstr = $(this).attr("Recipe");
    var response = results[recipeInstr]["recipe"];
    instructionURL = response.url;
    window.open(instructionURL, '_blank');

  }); //direction button function ends

});//document ready function ends
