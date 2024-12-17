const countryNameToCode = {
  'Afghanistan': 'AF',
  'Albania': 'AL',
  'Algeria': 'DZ',
  'United States': 'US',
  'Canada': 'CA',
  'United Kingdom': 'GB',
  'Germany': 'DE',
  'France': 'FR',
  'India': 'IN',
  'Brazil': 'BR',
  'China': 'CN',
  'Japan': 'JP',
  'Italy': 'IT',
  'Australia': 'AU',
  'Spain': 'ES',
  'Mexico': 'MX',
  'Russia': 'RU',
  'South Africa': 'ZA',
  'South Korea': 'KR',
  'Indonesia': 'ID',
  'Sweden': 'SE',
  'Nigeria': 'NG',
  'Saudi Arabia': 'SA',
  'Egypt': 'EG',
  'Thailand': 'TH',
  'Turkey': 'TR',
  'Pakistan': 'PK',
  'Philippines': 'PH',
  'Vietnam': 'VN',
  'Malaysia': 'MY',
  'Poland': 'PL',
  'Argentina': 'AR',
  'Colombia': 'CO',
  'Chile': 'CL',
  'Kenya': 'KE',
  'United Arab Emirates': 'AE',
  'New Zealand': 'NZ',
  'Singapore': 'SG',
  'Belgium': 'BE',
  'Switzerland': 'CH',
  'Austria': 'AT',
  'Portugal': 'PT',
  'Finland': 'FI',
  'Denmark': 'DK',
  'Norway': 'NO',
  'Hungary': 'HU',
  'Romania': 'RO',
  'Czech Republic': 'CZ',
  'Slovakia': 'SK',
  'Croatia': 'HR',
  'Bulgaria': 'BG',
  'Slovenia': 'SI',
  'Ireland': 'IE',
  'Israel': 'IL',
  'Luxembourg': 'LU',
  'Cyprus': 'CY',
  'Malta': 'MT',
  'Serbia': 'RS',
  'Estonia': 'EE',
  'Lithuania': 'LT',
  'Latvia': 'LV',
  'North Macedonia': 'MK',
  'Moldova': 'MD',
  'Armenia': 'AM',
  'Azerbaijan': 'AZ',
  'Kyrgyzstan': 'KG',
  'Tajikistan': 'TJ',
  'Uzbekistan': 'UZ',
  'North Korea': 'KP',
  'Brunei': 'BN',
  'Cambodia': 'KH',
  'Laos': 'LA',
  'Myanmar': 'MM',
  'Nepal': 'NP',
  'Bhutan': 'BT',
  'Bangladesh': 'BD',
  'Macau': 'MO',
  'Timor-Leste': 'TL',
  'Ghana': 'GH',
  'Zimbabwe': 'ZW',
  'Malawi': 'MW',
  'Uganda': 'UG',
};



function getCode(country) {

  country = country[0].toUpperCase() + country.substring(1).toLowerCase();
  console.log(country);
  return [country, countryNameToCode[country]];
}
export function getCountry(code)
{
   for(let key in countryNameToCode)
   {
      if(countryNameToCode[key] == code)
        return key;
   }
   return null;
}



export function getIconLocal(weather, time) {
  var it;
  var icon;
  if (time > 6 && time < 18)
    it = "day";
  else
    it = "night";

    if ((weather == 'Clear') || (weather == 'Clouds') || (weather == 'Rain') || (weather == 'Drizzle')) {
      icon = `${weather}-${it}.png`;
    }
    else if ((weather == 'Thunderstrom') || (weather == 'Snow')||(weather=='Fog')) {
      icon = `${weather}.png`;
    }
    else {
      icon = `${all}.png`;
    }
    return icon;
}



export function getNextFiveDates() {
  const today = new Date();
  var dates = [];

  for (let i = 1; i <= 5; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    //formatting date as YYYY-MM_DD
    dates.push(nextDate.toISOString().split('T')[0]);  
  }

  return dates;
}

// Calculating date based on the timestamp and timeZone as UTC offset
export function convertToLocalTime(timestamp, offset) {
  
  const date = new Date(timestamp * 1000);
  const localDate = new Date(date.getTime() + offset * 1000); 

  // Format the date into "YYYY-MM-DD HH:mm:ss"
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');
  const seconds = String(localDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; 
}


export function getIconForUtc(weather,id)
{
  var it;
  var icon;
  
  if(id[id.length-1]=='d')
      it = "day";
  else 
    it = "night";
    
    
    if ((weather == 'Clear') || (weather == 'Clouds') || (weather == 'Rain') || (weather == 'Drizzle')) {
      icon = `${weather}-${it}.png`;
    }
    else if ((weather == 'Thunderstrom') || (weather == 'Snow')||(weather=='Fog')) {
      icon = `${weather}.png`;
    }
    else {
      icon = `${all}.png`;
    }
    return icon;
}

export function separate(prompt)
{
    var location = prompt.split(',',3);
    location.forEach(element => {
      element = element.trim();
    });
    
    var city = location[0];
    console.log(city);
    if(location.length==1)
    {
        var state = location[0];
        var country = location[0];
        
    }
    else if(location.length==2)
    {
        var state = '';
        var country = location[1];
    }
    else 
    {
        var state = location[1];
        var country = location[2];
    }
    console.log(state);
    console.log(country);
    var countryCode ='';
    if(country)
    {
        [country,countryCode] = getCode(country);
    }
    console.log(countryCode);
    return [city,state,countryCode];
}

