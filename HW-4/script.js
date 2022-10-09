const countriesElement = document.querySelector(".countries");
const filter = document.querySelector(".filter");
const filtersElement = document.querySelector(".filters");
const region = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("regionName");
const search = document.querySelector(".search");
const countryName = document.getElementsByClassName("countryName");
const mode = document.querySelector(".mode");
const moon = document.querySelector(".moon");
const countryAbout = document.querySelector(".countryAbout");

async function getCountry() {
  const url = await fetch("https://restcountries.com/v2/all");
  const res = await url.json();
  console.log(res);
  res.forEach((element) => {
    showCountry(element);
  });
}
getCountry();
function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `<div class="countryFlag">
				<img src="${data.flag}">
			</div>
			<div class="country-info">
				<h5 class="countryName">${data.name}</h5>
				<p><strong>Population: </strong>${data.population}</p>
				<p class="regionName"><strong>Region: </strong>${data.region}</p>
				<p><strong>Capital: </strong>${data.capital}</p>
			</div>`;
  countriesElement.appendChild(country);
  country.addEventListener("click", () => {
    showDetails(data);
  });
}

filter.addEventListener("click", () => {
  filtersElement.classList.toggle("showFilters");
});
region.forEach((element) => {
  element.addEventListener("click", () => {
    Array.from(regionName).forEach((elem) => {
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        elem.parentElement.parentElement.style.display = "grid";
      } else {
        elem.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
search.addEventListener("input", () => {
  Array.from(countryName).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else {
      elem.parentElement.parentElement.style.display = "none";
    }
  });
});
mode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  moon.classList.toggle("fas");
});

function showDetails(data) {
  countryAbout.classList.toggle("show");
  countryAbout.innerHTML = `<button class="back">Back</button>
		<div class="about">
			<div class="left">
				<img src="${data.flag}">
			</div>
			<div class="right">
				<h1>${data.name}</h1>
				<div class="information">
					<div class="rightleft feature ">
						<p><strong>Native Name: </strong>${data.nativeName}</p>
						<p><strong>Population: </strong>${data.population}</p>
						<p><strong>Region: </strong>${data.region}</p>
						<p><strong>Sub Region: </strong>${data.subregion}</p>
						<p><strong>Capital: </strong>${data.capital}</p>
					</div>
					<div class="rightright feature">
						<p><strong>Top Level Domain: </strong>${data.topLevelDomain.map(
              (elem) => elem
            )}</p>
						<p><strong>Currencies: </strong>${data.currencies.map((elem) => elem.name)}</p>
						<p><strong>Languages: </strong>${data.languages.map((elem) => elem.name)}</p>
					</div>
				</div>
			</div>
		</div>`;
  const back = countryAbout.querySelector(".back");
  back.addEventListener("click", () => {
    countryAbout.classList.toggle("show");
  });
}
