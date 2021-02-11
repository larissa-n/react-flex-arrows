import useWindowSize from '@rehooks/window-size';
import { useState } from 'react';

/*
  contract:
  - output: coordinatesById, setRefForCoordinatesById
*/
export interface Coordinates {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
export interface CoordinatesPerId {
  [index: string]: Coordinates;
}
export const getCoordinatesFromDiv = ({ div }: { div: HTMLDivElement }) => {
  const box = div.getBoundingClientRect();
  const offsetY = div.closest("#titlebar + div")  ? div.closest("#titlebar + div")!.scrollTop : window.scrollY;
  const offsetX = div.closest("#titlebar + div") ? div.closest("#titlebar + div")!.scrollLeft : window.scrollX;
  const coordinates = {
    top: box.top + offsetY,
    bottom: box.bottom + offsetY,
    left: box.left + offsetX,
    right: box.right + offsetX,
  };
  return coordinates;
};
export const useCoordinatesPerId = () => {
  useWindowSize(); // use window size to trigger state update when size changes -> triggers recalculation of coordinates
  const [coordinates, setCoordinates] = useState<CoordinatesPerId>({});
  const setCoordinatesOfDivForId = ({ id, div }: { id: string; div: HTMLDivElement | null }) => {
    if (!div) return; // do nothing if div not defined
    const priorCoordinates = coordinates[id];
    const currentCoordinates = getCoordinatesFromDiv({ div });
    if (JSON.stringify(priorCoordinates) !== JSON.stringify(currentCoordinates)) {
      setCoordinates({ ...coordinates, [id]: currentCoordinates });
    }
  };
  return { coordinates, setCoordinatesOfDivForId };
};
