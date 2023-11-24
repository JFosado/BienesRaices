//Auntoinvocacion
(function () {
    const lat = 20.282984803757543;
    const lng = -97.9583501815796;
    const map = L.map('map').setView([lat, lng], 16);
    let marker
    const geocoderService = L.esri.Geocoding.geocodeService();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = new L.marker([lat, lng], {
        draggable: true, //Puedes mover
        autoPan: true,
    }).addTo(map);


    marker.on('moveend', function (e) { //Este es escuchador
        marker = e.target
        const position = marker.getLatLng()
        console.log(`El usuario solto el marcador en las coordenadas:${position.lat}, ${position.lng}`)
        map.panTo(new L.LatLng(position.lat, position.lng))

        //TODO: OBTENER LA INFROMACION DE LA DIRECCION FISICA
        geocoderService.reverse().latlng(position, 13).run(function (error, result) {
            console.log(`La informacion calculada por geocoder al intentar hacer la georeferencia inversa es:${result}`)
            console.log(result)

            marker.bindPopup(result.address.LongLabel)

            function iso3toiso2(iso3) {
                const isoMap = {'AFG': 'AF', 'ALB': 'AL', 'DEU': 'DE', 'DZA': 'DZ', 'AND': 'AD', 'AGO': 'AO', 'AIA': 'AI', 'ATA': 'AQ',
                'ATG': 'AG', 'ANT': 'AN', 'SAU': 'SA', 'ARG': 'AR', 'ARM': 'AM', 'ABW': 'AW', 'AUS': 'AU', 'AUT': 'AT',
                'AZE': 'AZ','BEL':'BE','BHS':'BS','BHR':'BH','BGD':'BD','BRB':'BB','BLZ':'BZ','BEN':'BJ','BTN':'BT','BLR':'BY','MMR':'MM','BOL':'BO','BIH':'BA','BWA':'BW','BRA':'BR','BRN':'BN','BGR':'BG','BFA':'BF','BDI':'BI','CPV':'CV','KHM':'KH','CMR':'CM','CAN':'CA','TCD':'TD','CHL':'CL','CHN':'CN','CYP':'CY','VAT':'VA','COL':'CO','COM':'KM','COG':'CG','COD':'CD','PRK':'KP','KOR':'KR','CIV':'CI','CRI':'CR','HRV':'HR','CUB':'CU','DNK':'DK','DMA':'DM','ECU':'EC','EGY':'EG','SLV':'SV','ARE':'AE','ERI':'ER','SVK':'SK','SVN':'SI','ESP':'ES','USA':'US','EST':'EE','ETH':'ET','PHL':'PH','FIN':'FI','FJI':'FJ','FRA':'FR','GAB':'GA','GMB':'GM','GEO':'GE','GHA':'GH','GIB':'GI','GRD':'GD','GRC':'GR','GRL':'GL','GLP':'GP','GUM':'GU','GTM':'GT','GUF':'GF','GGY':'GG','GIN':'GN','GNQ':'GQ','GNB':'GW','GUY':'GY','HTI':'HT','HND':'HN','HKG':'HK','HUN':'HU','IND':'IN','IDN':'ID','IRN':'IR','IRQ':'IQ','IRL':'IE','BVT':'BV','IMN':'IM','CXR':'CX','NFK':'NF','ISL':'IS','BMU':'BM','CYM':'KY','CCK':'CC','COK':'CK','ALA':'AX','FRO':'FO','SGS':'GS','HMD':'HM','MDV':'MV','FLK':'FK','MNP':'MP','MHL':'MH','PCN':'PN','SLB':'SB','TCA':'TC','UMI':'UM','VG':'VG','VIR':'VI','ISR':'IL','ITA':'IT','JAM':'JM','JPN':'JP','JEY':'JE','JOR':'JO','KAZ':'KZ','KEN':'KE','KGZ':'KG','KIR':'KI','KWT':'KW','LBN':'LB','LAO':'LA','LSO':'LS','LVA':'LV','LBR':'LR','LBY':'LY','LIE':'LI','LTU':'LT','LUX':'LU','MEX':'MX','MCO':'MC','MAC':'MO','MKD':'MK','MDG':'MG','MYS':'MY','MWI':'MW','MLI':'ML','MLT':'MT','MAR':'MA','MTQ':'MQ','MUS':'MU','MRT':'MR','MYT':'YT','FSM':'FM','MDA':'MD','MNG':'MN','MNE':'ME','MSR':'MS','MOZ':'MZ','NAM':'NA','NRU':'NR','NPL':'NP','NIC':'NI','NER':'NE','NGA':'NG','NIU':'NU','NOR':'NO','NCL':'NC','NZL':'NZ','OMN':'OM','NLD':'NL','PAK':'PK','PLW':'PW','PSE':'PS','PAN':'PA','PNG':'PG','PRY':'PY','PER':'PE','PYF':'PF','POL':'PL','PRT':'PT','PRI':'PR','QAT':'QA','GBR':'GB','CAF':'CF','CZE':'CZ','DOM':'DO','REU':'RE','RWA':'RW','ROU':'RO','RUS':'RU','ESH':'EH','WSM':'WS','ASM':'AS','BLM':'BL','KNA':'KN','SMR':'SM','MAF':'MF','SPM':'PM','VCT':'VC','SHN':'SH','LCA':'LC','STP':'ST','SEN':'SN','SRB':'RS','SYC':'SC','SLE':'SL','SGP':'SG','SYR':'SY','SOM':'SO','LKA':'LK','ZAF':'ZA','SDN':'SD','SWE':'SE','CHE':'CH','SUR':'SR','SJM':'SJ','SWZ':'SZ','TJK':'TJ','THA':'TH','TWN':'TW','TZA':'TZ','IOT':'IO','ATF':'TF','TLS':'TL','TGO':'TG','TKL':'TK','TON':'TO','TTO':'TT','TUN':'TN','TKM':'TM','TUR':'TR','TUV':'TV','UKR':'UA','UGA':'UG','URY':'UY','UZB':'UZ','VUT':'VU','VEN':'VE','VNM':'VN','WLF':'WF','YEM':'YE','DJI':'DJ','ZMB':'ZM','ZWE':'ZW'
                  };
              
                return isoMap[iso3] || null;
              }
              
              // Ejemplo de uso
              const iso2 = iso3toiso2(result.address.CountryCode); // Cambia 
              const pais = iso2.toLowerCase();
              
            
            
            document.querySelector('.street').textContent = result.address?.Address ?? '';
            document.querySelector('#street').value = result.address?.Address ?? '';
            document.querySelector('#icono').src = `https://flagcdn.com/w40/${pais}.png`;
            document.querySelector('#lat').value = result.latlng?.lat ?? '';
            document.querySelector('#lng').value = result.latlng?.lng ?? '';
            

        })
    })
})();