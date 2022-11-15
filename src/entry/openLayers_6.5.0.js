import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import * as proj from 'ol/proj';
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import TileImage from "ol/source/TileImage";
import Tile from "ol/layer/Tile";
import TileGrid from "ol/tilegrid/TileGrid";
import XYZ from "ol/source/XYZ";

let openLayers = {
    Map: Map,
    View: View,
    Tile: Tile,
    TileLayer: TileLayer,
    TileWMS: TileWMS,
    TileImage: TileImage,
    TileGrid: TileGrid,
    ScaleLine: ScaleLine,
    proj: proj,
    XYZ: XYZ,
    defaultControls: defaultControls
};

export default openLayers;