// Write your JavaScript code here!
window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return(response.json());
    }).then(function (planetData) {
   let form = document.querySelector("form");
   let launchStatus = document.getElementById("launchStatus");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let faultyItems = document.getElementById("faultyItems");
   const missionData = document.getElementById("missionTarget");

   missionData.innerHTML = `
   <h2>Mission Destination</h2>
<ol>
   <li>Name: ${planetData[0].name}</li>
   <li>Diameter: ${planetData[0].diameter}</li>
   <li>Star: ${planetData[0].star}</li>
   <li>Distance from Earth: ${planetData[0].distance}</li>
   <li>Number of Moons: ${planetData[0].moons}</li>
</ol>
<img src="${planetData[0].image}">
`;

   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      event.preventDefault();
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value) || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("Please enter text for Pilot/Copilot and numerical values for Fuel/Cargo.");
      }

      if(fuelLevelInput.value < 10000 && cargoMassInput.value <= 9999) {
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = "<span style='color: red;'>Shuttle not ready for launch</span>";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
         fuelStatus.innerHTML = `Not enough fuel to complete journey`;
         cargoStatus.innerHTML = `Cargo mass low enough for launch`;
      }
      else if(cargoMassInput.value > 10000 && fuelLevelInput.value >= 10000) {
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = "<span style='color: red;'>Shuttle not ready for launch</span>";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
         fuelStatus.innerHTML = `Fuel level high enough for launch`;
         cargoStatus.innerHTML = `There is too much mass for shuttle takeoff`;
      }
      else if(cargoMassInput.value > 10000 && fuelLevelInput.value < 10000) {
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = "<span style='color: red;'>Shuttle not ready for launch</span>";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
         fuelStatus.innerHTML = `Not enough fuel to complete journey`;
         cargoStatus.innerHTML = `There is too much mass for shuttle takeoff`;
      } else {
         faultyItems.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
         launchStatus.innerHTML = "<span style='color: green;'>Shuttle is ready for launch!</span>";
         fuelStatus.innerHTML = `Fuel level high enough for launch`;
         cargoStatus.innerHTML = `Cargo mass low enough for launch`;
      };
      });
   });
});


// This block of code shows how to format the HTML once you fetch some planetary JSON!
// <h2>Mission Destination</h2>
// <ol>
//    <li>Name: ${}</li>
//    <li>Diameter: ${}</li>
//    <li>Star: ${}</li>
//    <li>Distance from Earth: ${}</li>
//    <li>Number of Moons: ${}</li>
// </ol>
// <img src="${}">