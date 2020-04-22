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
      let dropdownValues = [planetData[0], planetData[1], planetData[2], planetData[3], planetData[4], planetData[5]];
      let selectButton = document.getElementById("selector");
      let selectList = document.createElement("select");
      let numberInput = /[0-9]/;
      selectList.setAttribute("id", "mySelect");
      selectButton.appendChild(selectList);

      for (let i=0; i<dropdownValues.length; i++) {
         let option = document.createElement("option");
         option.setAttribute("value", dropdownValues[i]);
         option.text = dropdownValues[i].name;
         selectList.appendChild(option);
      }

      selector.addEventListener('click', function() {
         missionData.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${planetData[mySelect.selectedIndex].name}</li>
            <li>Diameter: ${planetData[mySelect.selectedIndex].diameter}</li>
            <li>Star: ${planetData[mySelect.selectedIndex].star}</li>
            <li>Distance from Earth: ${planetData[mySelect.selectedIndex].distance}</li>
            <li>Number of Moons: ${planetData[mySelect.selectedIndex].moons}</li>
         </ol>
         <img src="${planetData[mySelect.selectedIndex].image}">
         `;
      });

   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      event.preventDefault();
      if (pilotNameInput.value.match(numberInput) || copilotNameInput.value.match(numberInput) || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value) || fuelLevelInput.value === "" || cargoMassInput.value === "" || pilotNameInput.value === "" || copilotNameInput.value === "") {
         alert("Please enter text for Pilot/Copilot and numerical values for Fuel/Cargo.");
      } else {
         faultyItems.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
      }

      if(fuelLevelInput.value < 10000 && cargoMassInput.value <= 9999) {
         launchStatus.innerHTML = "<span style='color: red;'>Shuttle not ready for launch</span>";
         fuelStatus.innerHTML = `<span style='color: red;'>Not enough fuel to complete journey</span>`;
         cargoStatus.innerHTML = `Cargo mass low enough for launch`;
      }
      else if(cargoMassInput.value > 10000 && fuelLevelInput.value >= 10000) {
         launchStatus.innerHTML = "<span style='color: red;'>Shuttle not ready for launch</span>";
         fuelStatus.innerHTML = `Fuel level high enough for launch`;
         cargoStatus.innerHTML = `<span style='color: red;'>There is too much mass for shuttle takeoff</span>`;
      }
      else if(cargoMassInput.value > 10000 && fuelLevelInput.value < 10000) {
         launchStatus.innerHTML = "<span style='color: red;'>Shuttle not ready for launch</span>";
         fuelStatus.innerHTML = `<span style='color: red;'>Not enough fuel to complete journey</span>`;
         cargoStatus.innerHTML = `<span style='color: red;'>There is too much mass for shuttle takeoff</span>`;
      } else {
         launchStatus.innerHTML = "<span style='color: green;'>Shuttle is ready for launch!</span>";
         fuelStatus.innerHTML = `Fuel level high enough for launch`;
         cargoStatus.innerHTML = `Cargo mass low enough for launch`;
      };
      });
   });
});
