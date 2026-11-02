/* Location and geographic distance utilities for North American farmers market */

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface ResolvedLocation {
  query: string;
  locationName: string;
  isEurope: boolean;
  lat?: number;
  lng?: number;
  region?: string;
  country?: "Canada" | "United States" | "Europe" | "Unknown";
}

/**
 * Known locations with exact geographic coordinates
 */
export const KNOWN_LOCATIONS: Record<
  string,
  {
    name: string;
    lat: number;
    lng: number;
    region: string;
    country: "Canada" | "United States" | "Europe";
    isEurope: boolean;
  }
> = {
  // Canada: Quebec
  montreal: { name: "Montreal, QC", lat: 45.5017, lng: -73.5673, region: "Quebec", country: "Canada", isEurope: false },
  "quebec city": { name: "Quebec City, QC", lat: 46.8139, lng: -71.208, region: "Quebec", country: "Canada", isEurope: false },
  quebec: { name: "Quebec, QC", lat: 46.8139, lng: -71.208, region: "Quebec", country: "Canada", isEurope: false },
  qc: { name: "Montreal, QC", lat: 45.5017, lng: -73.5673, region: "Quebec", country: "Canada", isEurope: false },
  "saint-hyacinthe": { name: "Saint-Hyacinthe, QC", lat: 45.6267, lng: -72.9555, region: "Quebec", country: "Canada", isEurope: false },
  rougemont: { name: "Rougemont, QC", lat: 45.4372, lng: -73.0569, region: "Quebec", country: "Canada", isEurope: false },
  bromont: { name: "Bromont, QC", lat: 45.3167, lng: -72.65, region: "Quebec", country: "Canada", isEurope: false },
  sutton: { name: "Sutton, QC", lat: 45.1, lng: -72.6167, region: "Quebec", country: "Canada", isEurope: false },
  magog: { name: "Magog, QC", lat: 45.2667, lng: -72.15, region: "Quebec", country: "Canada", isEurope: false },
  "mont-saint-hilaire": { name: "Mont-Saint-Hilaire, QC", lat: 45.56, lng: -73.19, region: "Quebec", country: "Canada", isEurope: false },
  sherbrooke: { name: "Sherbrooke, QC", lat: 45.4042, lng: -71.8929, region: "Quebec", country: "Canada", isEurope: false },
  laval: { name: "Laval, QC", lat: 45.5699, lng: -73.692, region: "Quebec", country: "Canada", isEurope: false },
  gatineau: { name: "Gatineau, QC", lat: 45.4765, lng: -75.7013, region: "Quebec", country: "Canada", isEurope: false },

  // Canada: Ontario
  toronto: { name: "Toronto, ON", lat: 43.6532, lng: -79.3832, region: "Ontario", country: "Canada", isEurope: false },
  on: { name: "Toronto, ON", lat: 43.6532, lng: -79.3832, region: "Ontario", country: "Canada", isEurope: false },
  ontario: { name: "Toronto, ON", lat: 43.6532, lng: -79.3832, region: "Ontario", country: "Canada", isEurope: false },
  ottawa: { name: "Ottawa, ON", lat: 45.4215, lng: -75.6972, region: "Ontario", country: "Canada", isEurope: false },
  mississauga: { name: "Mississauga, ON", lat: 43.589, lng: -79.6441, region: "Ontario", country: "Canada", isEurope: false },
  hamilton: { name: "Hamilton, ON", lat: 43.2557, lng: -79.8711, region: "Ontario", country: "Canada", isEurope: false },
  niagara: { name: "Niagara-on-the-Lake, ON", lat: 43.2557, lng: -79.0717, region: "Ontario", country: "Canada", isEurope: false },
  "niagara-on-the-lake": { name: "Niagara-on-the-Lake, ON", lat: 43.2557, lng: -79.0717, region: "Ontario", country: "Canada", isEurope: false },
  picton: { name: "Picton, ON", lat: 43.9928, lng: -77.1408, region: "Ontario", country: "Canada", isEurope: false },
  "prince edward county": { name: "Prince Edward County, ON", lat: 43.9928, lng: -77.1408, region: "Ontario", country: "Canada", isEurope: false },
  guelph: { name: "Guelph, ON", lat: 43.5448, lng: -80.2482, region: "Ontario", country: "Canada", isEurope: false },
  kingston: { name: "Kingston, ON", lat: 44.2312, lng: -76.486, region: "Ontario", country: "Canada", isEurope: false },

  // Canada: British Columbia
  vancouver: { name: "Vancouver, BC", lat: 49.2827, lng: -123.1207, region: "British Columbia", country: "Canada", isEurope: false },
  bc: { name: "Vancouver, BC", lat: 49.2827, lng: -123.1207, region: "British Columbia", country: "Canada", isEurope: false },
  "british columbia": { name: "Vancouver, BC", lat: 49.2827, lng: -123.1207, region: "British Columbia", country: "Canada", isEurope: false },
  victoria: { name: "Victoria, BC", lat: 48.4284, lng: -123.3656, region: "British Columbia", country: "Canada", isEurope: false },
  kelowna: { name: "Kelowna, BC", lat: 49.888, lng: -119.496, region: "British Columbia", country: "Canada", isEurope: false },
  okanagan: { name: "Okanagan Valley, BC", lat: 49.888, lng: -119.496, region: "British Columbia", country: "Canada", isEurope: false },
  abbotsford: { name: "Abbotsford, BC", lat: 49.0546, lng: -122.328, region: "British Columbia", country: "Canada", isEurope: false },
  "fraser valley": { name: "Fraser Valley, BC", lat: 49.0546, lng: -122.328, region: "British Columbia", country: "Canada", isEurope: false },

  // Canada: Prairies (Alberta, Saskatchewan, Manitoba)
  calgary: { name: "Calgary, AB", lat: 51.0447, lng: -114.0719, region: "Alberta", country: "Canada", isEurope: false },
  ab: { name: "Calgary, AB", lat: 51.0447, lng: -114.0719, region: "Alberta", country: "Canada", isEurope: false },
  alberta: { name: "Calgary, AB", lat: 51.0447, lng: -114.0719, region: "Alberta", country: "Canada", isEurope: false },
  edmonton: { name: "Edmonton, AB", lat: 53.5461, lng: -113.4938, region: "Alberta", country: "Canada", isEurope: false },
  "high river": { name: "High River, AB", lat: 50.5814, lng: -113.8744, region: "Alberta", country: "Canada", isEurope: false },
  saskatoon: { name: "Saskatoon, SK", lat: 52.1332, lng: -106.67, region: "Saskatchewan", country: "Canada", isEurope: false },
  sk: { name: "Saskatoon, SK", lat: 52.1332, lng: -106.67, region: "Saskatchewan", country: "Canada", isEurope: false },
  saskatchewan: { name: "Saskatchewan, SK", lat: 52.1332, lng: -106.67, region: "Saskatchewan", country: "Canada", isEurope: false },
  "swift current": { name: "Swift Current, SK", lat: 50.2858, lng: -107.7977, region: "Saskatchewan", country: "Canada", isEurope: false },
  regina: { name: "Regina, SK", lat: 50.4547, lng: -104.6067, region: "Saskatchewan", country: "Canada", isEurope: false },
  winnipeg: { name: "Winnipeg, MB", lat: 49.8951, lng: -97.1384, region: "Manitoba", country: "Canada", isEurope: false },
  mb: { name: "Winnipeg, MB", lat: 49.8951, lng: -97.1384, region: "Manitoba", country: "Canada", isEurope: false },
  manitoba: { name: "Manitoba, MB", lat: 49.8951, lng: -97.1384, region: "Manitoba", country: "Canada", isEurope: false },

  // Canada: Atlantic
  halifax: { name: "Halifax, NS", lat: 44.6488, lng: -63.5752, region: "Nova Scotia", country: "Canada", isEurope: false },
  ns: { name: "Halifax, NS", lat: 44.6488, lng: -63.5752, region: "Nova Scotia", country: "Canada", isEurope: false },
  "nova scotia": { name: "Nova Scotia, NS", lat: 44.6488, lng: -63.5752, region: "Nova Scotia", country: "Canada", isEurope: false },
  wolfville: { name: "Wolfville, NS", lat: 45.0911, lng: -64.3644, region: "Nova Scotia", country: "Canada", isEurope: false },
  "annapolis valley": { name: "Annapolis Valley, NS", lat: 45.0911, lng: -64.3644, region: "Nova Scotia", country: "Canada", isEurope: false },
  charlottetown: { name: "Charlottetown, PEI", lat: 46.2382, lng: -63.1311, region: "Prince Edward Island", country: "Canada", isEurope: false },
  pei: { name: "Prince Edward Island, PEI", lat: 46.2382, lng: -63.1311, region: "Prince Edward Island", country: "Canada", isEurope: false },
  "prince edward island": { name: "Prince Edward Island, PEI", lat: 46.2382, lng: -63.1311, region: "Prince Edward Island", country: "Canada", isEurope: false },
  kensington: { name: "Kensington, PEI", lat: 46.4361, lng: -63.6372, region: "Prince Edward Island", country: "Canada", isEurope: false },
  fredericton: { name: "Fredericton, NB", lat: 45.9636, lng: -66.6431, region: "New Brunswick", country: "Canada", isEurope: false },
  moncton: { name: "Moncton, NB", lat: 46.0878, lng: -64.7782, region: "New Brunswick", country: "Canada", isEurope: false },
  nb: { name: "New Brunswick, NB", lat: 45.9636, lng: -66.6431, region: "New Brunswick", country: "Canada", isEurope: false },

  // United States: Pacific Northwest & West
  seattle: { name: "Seattle, WA", lat: 47.6062, lng: -122.3321, region: "Washington", country: "United States", isEurope: false },
  wa: { name: "Seattle, WA", lat: 47.6062, lng: -122.3321, region: "Washington", country: "United States", isEurope: false },
  washington: { name: "Washington State, WA", lat: 47.6062, lng: -122.3321, region: "Washington", country: "United States", isEurope: false },
  yakima: { name: "Yakima, WA", lat: 46.6021, lng: -120.5059, region: "Washington", country: "United States", isEurope: false },
  portland: { name: "Portland, OR", lat: 45.5152, lng: -122.6784, region: "Oregon", country: "United States", isEurope: false },
  or: { name: "Portland, OR", lat: 45.5152, lng: -122.6784, region: "Oregon", country: "United States", isEurope: false },
  oregon: { name: "Oregon, OR", lat: 45.5152, lng: -122.6784, region: "Oregon", country: "United States", isEurope: false },
  salem: { name: "Salem, OR", lat: 44.9429, lng: -123.0351, region: "Oregon", country: "United States", isEurope: false },
  "willamette valley": { name: "Willamette Valley, OR", lat: 44.9429, lng: -123.0351, region: "Oregon", country: "United States", isEurope: false },

  // United States: California
  "san francisco": { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194, region: "California", country: "United States", isEurope: false },
  ca: { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194, region: "California", country: "United States", isEurope: false },
  california: { name: "California, CA", lat: 37.7749, lng: -122.4194, region: "California", country: "United States", isEurope: false },
  "los angeles": { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437, region: "California", country: "United States", isEurope: false },
  "san diego": { name: "San Diego, CA", lat: 32.7157, lng: -117.1611, region: "California", country: "United States", isEurope: false },
  sonoma: { name: "Sonoma, CA", lat: 38.2919, lng: -122.458, region: "California", country: "United States", isEurope: false },
  napa: { name: "Napa Valley, CA", lat: 38.2975, lng: -122.2869, region: "California", country: "United States", isEurope: false },
  fresno: { name: "Fresno, CA", lat: 36.7468, lng: -119.7726, region: "California", country: "United States", isEurope: false },
  "central valley": { name: "Central Valley, CA", lat: 36.7468, lng: -119.7726, region: "California", country: "United States", isEurope: false },

  // United States: Midwest & East
  chicago: { name: "Chicago, IL", lat: 41.8781, lng: -87.6298, region: "Illinois", country: "United States", isEurope: false },
  il: { name: "Chicago, IL", lat: 41.8781, lng: -87.6298, region: "Illinois", country: "United States", isEurope: false },
  illinois: { name: "Illinois, IL", lat: 41.8781, lng: -87.6298, region: "Illinois", country: "United States", isEurope: false },
  "door county": { name: "Door County, WI", lat: 44.8342, lng: -87.377, region: "Wisconsin", country: "United States", isEurope: false },
  "sturgeon bay": { name: "Sturgeon Bay, WI", lat: 44.8342, lng: -87.377, region: "Wisconsin", country: "United States", isEurope: false },
  wi: { name: "Door County, WI", lat: 44.8342, lng: -87.377, region: "Wisconsin", country: "United States", isEurope: false },
  wisconsin: { name: "Wisconsin, WI", lat: 44.8342, lng: -87.377, region: "Wisconsin", country: "United States", isEurope: false },
  madison: { name: "Madison, WI", lat: 43.0731, lng: -89.4012, region: "Wisconsin", country: "United States", isEurope: false },
  lancaster: { name: "Lancaster, PA", lat: 40.0379, lng: -76.3055, region: "Pennsylvania", country: "United States", isEurope: false },
  pa: { name: "Lancaster, PA", lat: 40.0379, lng: -76.3055, region: "Pennsylvania", country: "United States", isEurope: false },
  pennsylvania: { name: "Pennsylvania, PA", lat: 40.0379, lng: -76.3055, region: "Pennsylvania", country: "United States", isEurope: false },
  philadelphia: { name: "Philadelphia, PA", lat: 39.9526, lng: -75.1652, region: "Pennsylvania", country: "United States", isEurope: false },

  // United States: South & Southwest
  austin: { name: "Austin, TX", lat: 30.2672, lng: -97.7431, region: "Texas", country: "United States", isEurope: false },
  tx: { name: "Austin, TX", lat: 30.2672, lng: -97.7431, region: "Texas", country: "United States", isEurope: false },
  texas: { name: "Texas, TX", lat: 30.2672, lng: -97.7431, region: "Texas", country: "United States", isEurope: false },
  fredericksburg: { name: "Fredericksburg, TX", lat: 30.2752, lng: -98.8719, region: "Texas", country: "United States", isEurope: false },
  "hill country": { name: "Texas Hill Country, TX", lat: 30.2752, lng: -98.8719, region: "Texas", country: "United States", isEurope: false },
  houston: { name: "Houston, TX", lat: 29.7604, lng: -95.3698, region: "Texas", country: "United States", isEurope: false },
  dallas: { name: "Dallas, TX", lat: 32.7767, lng: -96.797, region: "Texas", country: "United States", isEurope: false },
  atlanta: { name: "Atlanta, GA", lat: 33.749, lng: -84.388, region: "Georgia", country: "United States", isEurope: false },
  ga: { name: "Atlanta, GA", lat: 33.749, lng: -84.388, region: "Georgia", country: "United States", isEurope: false },
  georgia: { name: "Georgia, GA", lat: 33.749, lng: -84.388, region: "Georgia", country: "United States", isEurope: false },
  "fort valley": { name: "Fort Valley, GA", lat: 32.5532, lng: -83.8874, region: "Georgia", country: "United States", isEurope: false },
  miami: { name: "Miami, FL", lat: 25.7617, lng: -80.1918, region: "Florida", country: "United States", isEurope: false },
  fl: { name: "Miami, FL", lat: 25.7617, lng: -80.1918, region: "Florida", country: "United States", isEurope: false },
  florida: { name: "Florida, FL", lat: 25.7617, lng: -80.1918, region: "Florida", country: "United States", isEurope: false },
  orlando: { name: "Orlando, FL", lat: 28.5383, lng: -81.3792, region: "Florida", country: "United States", isEurope: false },

  // United States: Northeast
  "new york": { name: "New York, NY", lat: 40.7128, lng: -74.006, region: "New York", country: "United States", isEurope: false },
  ny: { name: "New York, NY", lat: 40.7128, lng: -74.006, region: "New York", country: "United States", isEurope: false },
  brooklyn: { name: "Brooklyn, NY", lat: 40.6782, lng: -73.9442, region: "New York", country: "United States", isEurope: false },
  manhattan: { name: "Manhattan, NY", lat: 40.7831, lng: -73.9712, region: "New York", country: "United States", isEurope: false },
  "hudson valley": { name: "Hudson Valley, NY", lat: 41.7004, lng: -73.921, region: "New York", country: "United States", isEurope: false },
  boston: { name: "Boston, MA", lat: 42.3601, lng: -71.0589, region: "Massachusetts", country: "United States", isEurope: false },
  ma: { name: "Boston, MA", lat: 42.3601, lng: -71.0589, region: "Massachusetts", country: "United States", isEurope: false },
  massachusetts: { name: "Massachusetts, MA", lat: 42.3601, lng: -71.0589, region: "Massachusetts", country: "United States", isEurope: false },
  stowe: { name: "Stowe, VT", lat: 44.4654, lng: -72.6874, region: "Vermont", country: "United States", isEurope: false },
  burlington: { name: "Burlington, VT", lat: 44.4759, lng: -73.2121, region: "Vermont", country: "United States", isEurope: false },
  vt: { name: "Stowe, VT", lat: 44.4654, lng: -72.6874, region: "Vermont", country: "United States", isEurope: false },
  vermont: { name: "Vermont, VT", lat: 44.4654, lng: -72.6874, region: "Vermont", country: "United States", isEurope: false },

  // ==================== EUROPEAN LOCATIONS ====================
  europe: { name: "Europe", lat: 48.8566, lng: 2.3522, region: "Europe", country: "Europe", isEurope: true },
  paris: { name: "Paris, France", lat: 48.8566, lng: 2.3522, region: "Ile-de-France", country: "Europe", isEurope: true },
  france: { name: "France", lat: 46.2276, lng: 2.2137, region: "Europe", country: "Europe", isEurope: true },
  london: { name: "London, United Kingdom", lat: 51.5074, lng: -0.1278, region: "Greater London", country: "Europe", isEurope: true },
  uk: { name: "United Kingdom", lat: 55.3781, lng: -3.436, region: "Europe", country: "Europe", isEurope: true },
  "united kingdom": { name: "United Kingdom", lat: 55.3781, lng: -3.436, region: "Europe", country: "Europe", isEurope: true },
  england: { name: "England, UK", lat: 52.3555, lng: -1.1743, region: "Europe", country: "Europe", isEurope: true },
  scotland: { name: "Scotland, UK", lat: 56.4907, lng: -4.2026, region: "Europe", country: "Europe", isEurope: true },
  berlin: { name: "Berlin, Germany", lat: 52.52, lng: 13.405, region: "Berlin", country: "Europe", isEurope: true },
  germany: { name: "Germany", lat: 51.1657, lng: 10.4515, region: "Europe", country: "Europe", isEurope: true },
  munich: { name: "Munich, Germany", lat: 48.1351, lng: 11.582, region: "Bavaria", country: "Europe", isEurope: true },
  frankfurt: { name: "Frankfurt, Germany", lat: 50.1109, lng: 8.6821, region: "Hesse", country: "Europe", isEurope: true },
  rome: { name: "Rome, Italy", lat: 41.9028, lng: 12.4964, region: "Lazio", country: "Europe", isEurope: true },
  italy: { name: "Italy", lat: 41.8719, lng: 12.5674, region: "Europe", country: "Europe", isEurope: true },
  milan: { name: "Milan, Italy", lat: 45.4642, lng: 9.19, region: "Lombardy", country: "Europe", isEurope: true },
  florence: { name: "Florence, Italy", lat: 43.7696, lng: 11.2558, region: "Tuscany", country: "Europe", isEurope: true },
  madrid: { name: "Madrid, Spain", lat: 40.4168, lng: -3.7038, region: "Community of Madrid", country: "Europe", isEurope: true },
  spain: { name: "Spain", lat: 40.4637, lng: -3.7492, region: "Europe", country: "Europe", isEurope: true },
  barcelona: { name: "Barcelona, Spain", lat: 41.3851, lng: 2.1734, region: "Catalonia", country: "Europe", isEurope: true },
  amsterdam: { name: "Amsterdam, Netherlands", lat: 52.3676, lng: 4.9041, region: "North Holland", country: "Europe", isEurope: true },
  netherlands: { name: "Netherlands", lat: 52.1326, lng: 5.2913, region: "Europe", country: "Europe", isEurope: true },
  holland: { name: "Netherlands", lat: 52.1326, lng: 5.2913, region: "Europe", country: "Europe", isEurope: true },
  brussels: { name: "Brussels, Belgium", lat: 50.8503, lng: 4.3517, region: "Brussels", country: "Europe", isEurope: true },
  belgium: { name: "Belgium", lat: 50.5039, lng: 4.4699, region: "Europe", country: "Europe", isEurope: true },
  dublin: { name: "Dublin, Ireland", lat: 53.3498, lng: -6.2603, region: "Leinster", country: "Europe", isEurope: true },
  ireland: { name: "Ireland", lat: 53.1424, lng: -7.6921, region: "Europe", country: "Europe", isEurope: true },
  zurich: { name: "Zurich, Switzerland", lat: 47.3769, lng: 8.5417, region: "Zurich", country: "Europe", isEurope: true },
  geneva: { name: "Geneva, Switzerland", lat: 46.2044, lng: 6.1432, region: "Geneva", country: "Europe", isEurope: true },
  switzerland: { name: "Switzerland", lat: 46.8182, lng: 8.2275, region: "Europe", country: "Europe", isEurope: true },
  vienna: { name: "Vienna, Austria", lat: 48.2082, lng: 16.3738, region: "Vienna", country: "Europe", isEurope: true },
  austria: { name: "Austria", lat: 47.5162, lng: 14.5501, region: "Europe", country: "Europe", isEurope: true },
  lisbon: { name: "Lisbon, Portugal", lat: 38.7223, lng: -9.1393, region: "Lisbon", country: "Europe", isEurope: true },
  portugal: { name: "Portugal", lat: 39.3999, lng: -8.2245, region: "Europe", country: "Europe", isEurope: true },
  warsaw: { name: "Warsaw, Poland", lat: 52.2297, lng: 21.0122, region: "Masovian", country: "Europe", isEurope: true },
  poland: { name: "Poland", lat: 51.9194, lng: 19.1451, region: "Europe", country: "Europe", isEurope: true },
  prague: { name: "Prague, Czech Republic", lat: 50.0755, lng: 14.4378, region: "Prague", country: "Europe", isEurope: true },
  athens: { name: "Athens, Greece", lat: 37.9838, lng: 23.7275, region: "Attica", country: "Europe", isEurope: true },
  greece: { name: "Greece", lat: 39.0742, lng: 21.8243, region: "Europe", country: "Europe", isEurope: true },
  stockholm: { name: "Stockholm, Sweden", lat: 59.3293, lng: 18.0686, region: "Stockholm", country: "Europe", isEurope: true },
  sweden: { name: "Sweden", lat: 60.1282, lng: 18.6435, region: "Europe", country: "Europe", isEurope: true },
  oslo: { name: "Oslo, Norway", lat: 59.9139, lng: 10.7522, region: "Oslo", country: "Europe", isEurope: true },
  norway: { name: "Norway", lat: 60.472, lng: 8.4689, region: "Europe", country: "Europe", isEurope: true },
  copenhagen: { name: "Copenhagen, Denmark", lat: 55.6761, lng: 12.5683, region: "Capital", country: "Europe", isEurope: true },
  denmark: { name: "Denmark", lat: 56.2639, lng: 9.5018, region: "Europe", country: "Europe", isEurope: true },
};

/**
 * Common European keyword patterns for general text matching
 */
const EUROPE_KEYWORD_REGEX =
  /\b(europe|european|france|paris|uk|united kingdom|england|britain|british|scotland|ireland|dublin|germany|deutschland|berlin|munich|frankfurt|italy|italia|rome|roma|milan|milano|florence|firenze|spain|espana|madrid|barcelona|netherlands|holland|amsterdam|belgium|brussels|switzerland|swiss|zurich|geneva|austria|vienna|wien|portugal|lisbon|poland|warsaw|prague|czech|greece|athens|sweden|stockholm|norway|oslo|denmark|copenhagen|finland|helsinki)\b/i;

/**
 * Calculates straight line great circle distance between two points in miles
 */
export function calculateDistanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusMiles = 3958.8;
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusMiles * c;
  return Math.round(distance * 10) / 10;
}

/**
 * Resolves any user query into a geographic location or European notification
 */
export function resolveLocation(rawQuery?: string): ResolvedLocation {
  const query = (rawQuery ?? "").trim().toLowerCase();

  // If blank or empty, default to Montreal QC base hub
  if (!query) {
    return {
      query: "",
      locationName: "Montreal, QC",
      isEurope: false,
      lat: 45.5017,
      lng: -73.5673,
      region: "Quebec",
      country: "Canada",
    };
  }

  // Check explicit European keywords first
  if (EUROPE_KEYWORD_REGEX.test(query)) {
    // Find closest specific European city if mentioned
    for (const [key, loc] of Object.entries(KNOWN_LOCATIONS)) {
      if (loc.isEurope && (query === key || query.includes(key))) {
        return {
          query: rawQuery ?? "",
          locationName: loc.name,
          isEurope: true,
          lat: loc.lat,
          lng: loc.lng,
          region: loc.region,
          country: "Europe",
        };
      }
    }
    return {
      query: rawQuery ?? "",
      locationName: "Europe",
      isEurope: true,
      country: "Europe",
    };
  }

  // Exact key match in dictionary
  if (KNOWN_LOCATIONS[query]) {
    const loc = KNOWN_LOCATIONS[query];
    return {
      query: rawQuery ?? "",
      locationName: loc.name,
      isEurope: loc.isEurope,
      lat: loc.lat,
      lng: loc.lng,
      region: loc.region,
      country: loc.country,
    };
  }

  // Substring match in keys
  for (const [key, loc] of Object.entries(KNOWN_LOCATIONS)) {
    if (query.includes(key) || key.includes(query)) {
      return {
        query: rawQuery ?? "",
        locationName: loc.name,
        isEurope: loc.isEurope,
        lat: loc.lat,
        lng: loc.lng,
        region: loc.region,
        country: loc.country,
      };
    }
  }

  // Check Canadian postal code pattern (e.g. H2X 1Y6, V6B, M5V)
  const canadianPostalMatch = query.match(/^[a-z]\d[a-z]/i);
  if (canadianPostalMatch) {
    const prefix = canadianPostalMatch[0].toUpperCase();
    if (prefix.startsWith("H") || prefix.startsWith("J") || prefix.startsWith("G")) {
      return {
        query: rawQuery ?? "",
        locationName: `Montreal Area (${rawQuery?.toUpperCase()})`,
        isEurope: false,
        lat: 45.5017,
        lng: -73.5673,
        region: "Quebec",
        country: "Canada",
      };
    }
    if (prefix.startsWith("M") || prefix.startsWith("L") || prefix.startsWith("K") || prefix.startsWith("N")) {
      return {
        query: rawQuery ?? "",
        locationName: `Ontario Region (${rawQuery?.toUpperCase()})`,
        isEurope: false,
        lat: 43.6532,
        lng: -79.3832,
        region: "Ontario",
        country: "Canada",
      };
    }
    if (prefix.startsWith("V")) {
      return {
        query: rawQuery ?? "",
        locationName: `British Columbia (${rawQuery?.toUpperCase()})`,
        isEurope: false,
        lat: 49.2827,
        lng: -123.1207,
        region: "British Columbia",
        country: "Canada",
      };
    }
    if (prefix.startsWith("T")) {
      return {
        query: rawQuery ?? "",
        locationName: `Alberta (${rawQuery?.toUpperCase()})`,
        isEurope: false,
        lat: 51.0447,
        lng: -114.0719,
        region: "Alberta",
        country: "Canada",
      };
    }
  }

  // Check US 5 digit zip code
  if (/^\d{5}$/.test(query)) {
    const zipNum = parseInt(query, 10);
    if (zipNum >= 98000 && zipNum <= 99499) {
      return {
        query: rawQuery ?? "",
        locationName: `Washington State (${query})`,
        isEurope: false,
        lat: 47.6062,
        lng: -122.3321,
        region: "Washington",
        country: "United States",
      };
    }
    if (zipNum >= 90000 && zipNum <= 96162) {
      return {
        query: rawQuery ?? "",
        locationName: `California (${query})`,
        isEurope: false,
        lat: 37.7749,
        lng: -122.4194,
        region: "California",
        country: "United States",
      };
    }
    if (zipNum >= 75000 && zipNum <= 79999) {
      return {
        query: rawQuery ?? "",
        locationName: `Texas (${query})`,
        isEurope: false,
        lat: 30.2672,
        lng: -97.7431,
        region: "Texas",
        country: "United States",
      };
    }
    if (zipNum >= 10000 && zipNum <= 14999) {
      return {
        query: rawQuery ?? "",
        locationName: `New York (${query})`,
        isEurope: false,
        lat: 40.7128,
        lng: -74.006,
        region: "New York",
        country: "United States",
      };
    }
  }

  // Friendly fallback: Montreal QC hub
  return {
    query: rawQuery ?? "",
    locationName: `${rawQuery} (North America Hub)`,
    isEurope: false,
    lat: 45.5017,
    lng: -73.5673,
    region: "Quebec",
    country: "Canada",
  };
}

