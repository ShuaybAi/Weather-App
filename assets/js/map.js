
import { getLatLon } from "./script.js";

async function showLatLon() {
  const result = await getLatLon();
  console.log(result);
}

showLatLon();