

const WEATHER_SEARCH_URL = "https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=d86b9843fdc4941e520f985922146256"

//retrieve data from OpenWeather API
function getWeatherData() {
    let city = $('.search-query').val();
    $.ajax(WEATHER_SEARCH_URL, {
        data: {
            units: 'imperial',
            q: city
        },
        dataType: 'jsonp',
        type: 'GET',
        success: function (data) {
            let widget = displayWeather(data);
            $('#weather-display').html(widget);
        },
        error: function (data) {
          let err = displayError(data);
          $('#weather-display').html(err);
        }
    });
}

const SWEATER_SANDALS = [{name:"a Sweater", img:"images/sweater.png"},{name:"Sandals", img:"images/sandals.png"}]

function displayName(data) {
  if (data.main.temp_min < 60 ) {
    return SWEATER_SANDALS[0].name
  } else {
    return SWEATER_SANDALS[1].name
  }
}

function displayIcon(data) {
  if (data.main.temp < 60 ) {
    return SWEATER_SANDALS[0].img
  } else {
    return SWEATER_SANDALS[1].img
  }
}

function displayWeather(data) {
  console.log(data.main)
    return `
    <div class="weather-results">
        <h1><strong>Current Weather for ${data.name}</strong></h1>
        <img style="max-width:25%; height:auto;" src="${displayIcon(data)}">
        <p style="font-size:30px; margin-top:10px;">Perfect Weather for ${displayName(data)}!</p>
        <p style="color:orangered;" ">Description:</p><p"> ${data.weather[0].description}</p>
        <p style="color:orangered;">Temperature:</p><p> ${data.main.temp} &#8457; / ${(((data.main.temp)-32)*(5/9)).toFixed(2)} &#8451;</p>
        <p style="color:orangered;">Min. Temperature:</p><p> ${data.main.temp_min} &#8457; / ${(((data.main.temp_min)-32)*(5/9)).toFixed(2)} &#8451</p>
        <p style="color:orangered;">Max. Temperature:</p><p> ${data.main.temp_max} &#8457; / ${(((data.main.temp_max)-32)*(5/9)).toFixed(2)} &#8451</p>
        <p style="color:orangered;">Humidity:</p><p> ${data.main.humidity} &#37;</p>
    </div>
`;
}

function displayError(data) {
  return `
  <div class="weather-results">
        <h1><strong>Error - Invalid Search</strong></h1>
    </div>
`
}

function enterLocation() {
    $('.category-button').click(function () {
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });

    $('.search-form').submit(function (event) {
        event.preventDefault();
        $('.navigation').removeClass("hide");
        $('#weather-display').html("");
        getWeatherData();
        $('button').removeClass("selected");
    });
}

//autocomplete location name in form
function activatePlacesSearch() {
    let options = {
        types: ['(regions)']
    };
    let input = document.getElementById('search-term');
    let autocomplete = new google.maps.places.Autocomplete(input, options);
}


$(enterLocation);
