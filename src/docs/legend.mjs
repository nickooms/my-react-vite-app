import fs from 'fs/promises';
import fetch from 'node-fetch';
import { layers } from './layers.mjs';

const URL = 'https://geoservices.informatievlaanderen.be/raadpleegdiensten/GRB/wms';

const layerUrl = (id) => {
  const service = 'WMS';
  const request = 'GetLegendGraphic';
  const scale = 1;
  const format = 'image/png';
  const height = 30;
  const width = 40;
  const LEGEND_OPTIONS = 'forceLabels:on';
  const layer = `GRB_${id}`;

  const url = `${URL}?${Object.entries({ service, request, scale, format, height, width, LEGEND_OPTIONS, layer })
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
  return url;
};

await Promise.all(
  Object.keys(layers).map(async (id) =>
    fetch(layerUrl(id))
      .then((res) => res.body)
      .then((blob) => {
        fs.writeFile(`./legend/${id}.png`, blob);
        return id;
      })
  )
);
// console.log(url);
