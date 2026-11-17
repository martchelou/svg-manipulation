import { BASE_URL } from './base';
import { modalOpen } from './modal';

const mapa = document.getElementById('mapa');
// console.log(mapa);
const fetchSvg = (img) => 
{
    fetch(img.src)
    .then( res => res.ok ? res.text() : Promise.reject(res))
    .then( data => {
        const span = document.createElement('span');
        span.innerHTML = data;
        const inlineSvg = span.getElementsByTagName('svg')[0];
        img.parentNode.replaceChild(inlineSvg, img);
        // console.log('Imagem base: ', img, 'svg resultante: ', inlineSvg);
        return true;
    })
    .then(() => getActions())
}
fetchSvg(mapa);

const estados = [];
const name = document.getElementById('stateName');
const population = document.getElementById('statePopulation');
const description = document.getElementById('stateDescription');

// default values
name.innerText = '';
population.innerText = '';
description.innerText = '';

const getActions = () => 
{
    const states = document.getElementsByClassName('estado');
    for (let i=0; i<states.length; i++)
    {
        states[i].onclick = () => stateClicked(states[i]);
    }
    getEstados();
}
const getEstados = () => 
{
    fetch(BASE_URL + 'data/estados.json')
    .then( res => res.ok ? res.text() : Promise.reject(res))
    .then( data =>
    {
        estados.push(...JSON.parse(data));            
    });
    // console.log('estados json data: ', estados);
    return true;
}
const stateClicked = state => 
{
    const code = state.getAttribute('code');        
    const uf = estados.find(estado => estado.code === code);
    if (!uf) return;
    // console.log('filtro por uf: ', uf);
    fillContent(uf);
}
const fillContent = uf =>
{                
    name.innerText = `${uf.nome} (${uf.sigla})`;
    population.innerText = `População: ${uf.populacao} de habitantes`;
    description.innerText = `${uf.descricao}`;
    modalOpen(document.getElementById('text').innerHTML);
}