import { useState, useEffect, useCallback } from 'react';
import { WBN, WVB, ADP, GBG, WPI, WRI, WGO, TBLGBGADR, GVL, GVP, WLI, WTI } from './svg/GRB';
import { getId } from './Feature';
import { URL } from './wfs/grb';

// const URL = 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/GRB/wfs';

export const useObjectIds = ({
  x,
  y,
  radius = 100,
  featureTypes = [WBN, WVB, ADP, GBG, WPI, WRI, WGO, TBLGBGADR, GVL, GVP, WLI, WTI],
}: {
  x: number;
  y: number;
  radius?: number;
  featureTypes?: string[];
}) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ids, setIds] = useState<string[]>([]);

  const parseResponse = useCallback((response: Response): Promise<any> => response.json(), []);

  const handleResponse = useCallback((d: any): void => {
    setData(d);
    setIds(d.features.map(getId));
  }, []);

  const handleError = useCallback((reason: any): void => {
    console.error(reason);
    setError(reason);
  }, []);

  useEffect(() => {
    const srsname = 'EPSG:31370';
    const service = 'WFS';
    const request = 'GetFeature';
    const prefix = 'GRB';
    // const featureTypes = ['WBN', 'GBG'];
    const typeName = featureTypes.map((featureType: string) => [prefix, featureType].join(':')).join(','); // 'GRB:WBN,GRB:GBG';
    // const count = 100;
    const propertyname = 'UIDN';
    const outputformat = 'json';
    const bbox = `${x - radius},${y - radius},${x + radius},${y + radius}`;
    const query = {
      request,
      service,
      typeName,
      propertyname,
      outputformat,
      srsname,
      bbox,
    };
    const queryString = new URLSearchParams(Object.entries(query) as string[][]).toString();
    const url = [URL, queryString].join('?');
    // console.log(url);
    fetch(url).then(parseResponse).then(handleResponse).catch(handleError);
  }, [x, y]);

  return { x, y, data, ids, error };
};
