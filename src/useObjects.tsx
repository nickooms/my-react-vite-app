import { useState, useEffect, useCallback } from 'react';

const URL = 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/GRB/wfs';

export const useObjects = ({ ids }: { ids: string[] }) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseResponse = useCallback((response: Response): Promise<any> => response.json(), []);

  const handleResponse = useCallback((d: any): void => {
    setData(d);
  }, []);

  const handleError = useCallback((reason: any): void => {
    console.error(reason);
    setError(reason);
  }, []);

  useEffect(() => {
    const srsname = 'EPSG:31370';
    const service = 'WFS';
    const request = 'GetFeature';
    const typeNames = [
      'GRB:WBN',
      'GRB:ADP',
      'GRB:GBG',
      'GRB:WPI',
      'GRB:WRI',
      'GRB:WVB',
      'GRB:WGO',
      'GRB:TBLGBGADR',
      'GRB:GVL',
      'GRB:GVP',
      'GRB:WLI',
      'GRB:WTI',
    ];
    // const count = 100;
    // const propertyname = 'UIDN';
    const outputformat = 'json';
    // const featureId = ids.slice(0, count).join(',');
    // const bbox = `${x - radius},${y - radius},${x + radius},${y + radius}`;
    // const query = { request, service, typeName, count, outputformat, srsname, featureId };
    // const queryString = new URLSearchParams(Object.entries(query) as string[][]).toString();
    // const url = [URL, queryString].join('?');

    const GetFeature = `<?xml version="1.0" ?>
<GetFeature
  version="2.0.0"
  service="WFS"
  xmlns="http://www.opengis.net/wfs/2.0"
  xmlns:fes="http://www.opengis.net/fes/2.0"
  xmlns:GRB="informatievlaanderen.be/grb"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs/2.0
                      http://schemas.opengis.net/wfs/2.0/wfs.xsd"
>
  ${typeNames.map(
    (typeName) => `<Query typeNames="${typeName}">
    <fes:Filter>
      ${ids
        .filter((id) => id.split('.')[0] === typeName.split(':')[1])
        .map((id) => `<fes:ResourceId rid="${id}"/>`)
        .join('\n')}
    </fes:Filter>
  </Query>`
  )}
</GetFeature>`;
    fetch(
      [
        URL,
        new URLSearchParams(
          Object.entries({
            request,
            service,
            typeName: typeNames,
            /* count, */ outputformat,
            srsname /* , featureId */,
          }) as string[][]
        ).toString(),
      ].join('?'),
      {
        body: GetFeature,
        method: 'POST',
        headers: { 'Content-Type': 'text/xml' },
      }
    )
      .then(parseResponse)
      .then(handleResponse)
      .catch(handleError);
    // console.log(url);
    // fetch(url).then(parseResponse).then(handleResponse).catch(handleError);
  }, [ids]);

  return { data, error };
};
