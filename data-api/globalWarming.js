//Parsing the CSV into temperatures and years
async function getData() {
  const dataUrl = "./ZonAnn.Ts+dSST.csv";
  const response = await fetch(dataUrl);
  const dataSet = await response.text();
  const table = dataSet.split("\n").slice(1);
  const temperatures = [];
  console.log(temperatures);
  const years = [];
  console.log(years);
  table.forEach(elt => {
    const row = elt.split(",");
    const year = row[0];
    var temp = row[1];
    temp += 14;
    years.push(year);
    temperatures.push(parseFloat(temp) + 14);
  });
  return { temperatures, years };
}

//Chart.js
async function chartIt() {
  const data = await getData();
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.years,
      datasets: [
        {
          label: "Global Surface Temperatures in C° since 1880",
          data: data.temperatures,
          borderColor: "rgba(255, 0, 0, 1)",
          backgroundColor: "rgba(255, 0, 0, .5)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              // Include a degree sign in the ticks
              callback: function(value, index, values) {
                return value + "°";
              }
            }
          }
        ]
      }
    }
  });
}
chartIt();
