/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/map.js":
/*!************************!*\
  !*** ./src/lib/map.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n//Auntoinvocacion\r\n(function () {\r\n    const lat = 20.282984803757543;\r\n    const lng = -97.9583501815796;\r\n    const map = L.map('map').setView([lat, lng], 16);\r\n    let marker\r\n    const geocoderService = L.esri.Geocoding.geocodeService();\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);\r\n\r\n    marker = new L.marker([lat, lng], {\r\n        draggable: true, //Puedes mover\r\n        autoPan: true,\r\n    }).addTo(map);\r\n\r\n\r\n    marker.on('moveend', function (e) { //Este es escuchador\r\n        marker = e.target\r\n        const position = marker.getLatLng()\r\n        console.log(`El usuario solto el marcador en las coordenadas:${position.lat}, ${position.lng}`)\r\n        map.panTo(new L.LatLng(position.lat, position.lng))\r\n\r\n        //TODO: OBTENER LA INFROMACION DE LA DIRECCION FISICA\r\n        geocoderService.reverse().latlng(position, 13).run(function (error, result) {\r\n            console.log(`La informacion calculada por geocoder al intentar hacer la georeferencia inversa es:${result}`)\r\n            console.log(result)\r\n\r\n            marker.bindPopup(result.address.LongLabel)\r\n\r\n            function iso3toiso2(iso3) {\r\n                const isoMap = {'AFG': 'AF', 'ALB': 'AL', 'DEU': 'DE', 'DZA': 'DZ', 'AND': 'AD', 'AGO': 'AO', 'AIA': 'AI', 'ATA': 'AQ',\r\n                'ATG': 'AG', 'ANT': 'AN', 'SAU': 'SA', 'ARG': 'AR', 'ARM': 'AM', 'ABW': 'AW', 'AUS': 'AU', 'AUT': 'AT',\r\n                'AZE': 'AZ','BEL':'BE','BHS':'BS','BHR':'BH','BGD':'BD','BRB':'BB','BLZ':'BZ','BEN':'BJ','BTN':'BT','BLR':'BY','MMR':'MM','BOL':'BO','BIH':'BA','BWA':'BW','BRA':'BR','BRN':'BN','BGR':'BG','BFA':'BF','BDI':'BI','CPV':'CV','KHM':'KH','CMR':'CM','CAN':'CA','TCD':'TD','CHL':'CL','CHN':'CN','CYP':'CY','VAT':'VA','COL':'CO','COM':'KM','COG':'CG','COD':'CD','PRK':'KP','KOR':'KR','CIV':'CI','CRI':'CR','HRV':'HR','CUB':'CU','DNK':'DK','DMA':'DM','ECU':'EC','EGY':'EG','SLV':'SV','ARE':'AE','ERI':'ER','SVK':'SK','SVN':'SI','ESP':'ES','USA':'US','EST':'EE','ETH':'ET','PHL':'PH','FIN':'FI','FJI':'FJ','FRA':'FR','GAB':'GA','GMB':'GM','GEO':'GE','GHA':'GH','GIB':'GI','GRD':'GD','GRC':'GR','GRL':'GL','GLP':'GP','GUM':'GU','GTM':'GT','GUF':'GF','GGY':'GG','GIN':'GN','GNQ':'GQ','GNB':'GW','GUY':'GY','HTI':'HT','HND':'HN','HKG':'HK','HUN':'HU','IND':'IN','IDN':'ID','IRN':'IR','IRQ':'IQ','IRL':'IE','BVT':'BV','IMN':'IM','CXR':'CX','NFK':'NF','ISL':'IS','BMU':'BM','CYM':'KY','CCK':'CC','COK':'CK','ALA':'AX','FRO':'FO','SGS':'GS','HMD':'HM','MDV':'MV','FLK':'FK','MNP':'MP','MHL':'MH','PCN':'PN','SLB':'SB','TCA':'TC','UMI':'UM','VG':'VG','VIR':'VI','ISR':'IL','ITA':'IT','JAM':'JM','JPN':'JP','JEY':'JE','JOR':'JO','KAZ':'KZ','KEN':'KE','KGZ':'KG','KIR':'KI','KWT':'KW','LBN':'LB','LAO':'LA','LSO':'LS','LVA':'LV','LBR':'LR','LBY':'LY','LIE':'LI','LTU':'LT','LUX':'LU','MEX':'MX','MCO':'MC','MAC':'MO','MKD':'MK','MDG':'MG','MYS':'MY','MWI':'MW','MLI':'ML','MLT':'MT','MAR':'MA','MTQ':'MQ','MUS':'MU','MRT':'MR','MYT':'YT','FSM':'FM','MDA':'MD','MNG':'MN','MNE':'ME','MSR':'MS','MOZ':'MZ','NAM':'NA','NRU':'NR','NPL':'NP','NIC':'NI','NER':'NE','NGA':'NG','NIU':'NU','NOR':'NO','NCL':'NC','NZL':'NZ','OMN':'OM','NLD':'NL','PAK':'PK','PLW':'PW','PSE':'PS','PAN':'PA','PNG':'PG','PRY':'PY','PER':'PE','PYF':'PF','POL':'PL','PRT':'PT','PRI':'PR','QAT':'QA','GBR':'GB','CAF':'CF','CZE':'CZ','DOM':'DO','REU':'RE','RWA':'RW','ROU':'RO','RUS':'RU','ESH':'EH','WSM':'WS','ASM':'AS','BLM':'BL','KNA':'KN','SMR':'SM','MAF':'MF','SPM':'PM','VCT':'VC','SHN':'SH','LCA':'LC','STP':'ST','SEN':'SN','SRB':'RS','SYC':'SC','SLE':'SL','SGP':'SG','SYR':'SY','SOM':'SO','LKA':'LK','ZAF':'ZA','SDN':'SD','SWE':'SE','CHE':'CH','SUR':'SR','SJM':'SJ','SWZ':'SZ','TJK':'TJ','THA':'TH','TWN':'TW','TZA':'TZ','IOT':'IO','ATF':'TF','TLS':'TL','TGO':'TG','TKL':'TK','TON':'TO','TTO':'TT','TUN':'TN','TKM':'TM','TUR':'TR','TUV':'TV','UKR':'UA','UGA':'UG','URY':'UY','UZB':'UZ','VUT':'VU','VEN':'VE','VNM':'VN','WLF':'WF','YEM':'YE','DJI':'DJ','ZMB':'ZM','ZWE':'ZW'\r\n                  };\r\n              \r\n                return isoMap[iso3] || null;\r\n              }\r\n              \r\n              // Ejemplo de uso\r\n              const iso2 = iso3toiso2(result.address.CountryCode); // Cambia \r\n              const pais = iso2.toLowerCase();\r\n              \r\n            \r\n            \r\n            document.querySelector('.street').textContent = result.address?.Address ?? '';\r\n            document.querySelector('#street').value = result.address?.Address ?? '';\r\n            document.querySelector('#icono').src = `https://flagcdn.com/w40/${pais}.png`;\r\n            document.querySelector('#lat').value = result.latlng?.lat ?? '';\r\n            document.querySelector('#lng').value = result.latlng?.lng ?? '';\r\n            \r\n\r\n        })\r\n    })\r\n})();\n\n//# sourceURL=webpack://mx.edu.utxj.ti.dsm.awos.bienesraices-221004/./src/lib/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/lib/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;