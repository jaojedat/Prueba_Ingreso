import 'leaflet/dist/leaflet.css';
import './map.scss';

const L =require ('leaflet');

import {carto_light} from './layers/control-layers'
import { catastroPredios } from './layers/predios-catastro';

export var map = L.map('map', {
    center: [10.5, -75.133],
    zoom: 13,
    layers: [carto_light]
});

L.control.zoom({position: 'topright'}).addTo(map);

// scale control
new L.control.scale({imperial: false}).addTo(map)

function PopUp(feature, layer){
    if(feature.properties && feature.properties.codigo){
        layer.bindPopup("<strong>Area: </strong>" + 
        feature.properties.area + "<br/>" + 
        "<strong>Codigo: </strong>" + feature.properties.codigo);
    }
}

L.geoJSON(catastroPredios).addTo(map);

var codigojs = L.geoJSON(catastroPredios, {
    onEachFeature: PopUp
}).addTo(map);

