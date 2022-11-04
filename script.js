const PLACEHOLDER_DATA = [
    {id: "1", name: "1950s", price: "1" },
    {id: "2", name: "1960s", price: "1" },
    {id: "3", name: "1970s", price: "2" },
    {id: "4", name: "1980s", price: "0" },
    {id: "5", name: "1990s", price: "3" },
    {id: "6", name: "2000s", price: "3" },
];


 //api fetch 
  //async function getData(){
    //fetch('https://top-250-movies-api.herokuapp.com/api/v1/movies')
    //.then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    //.then(data => console.log(data));
   
   

   //const api_url = "https://top-250-movies-api.herokuapp.com/api/v1/movies"; 
   //const api_data = await fetch(api_url);
   //const api_json = await api_data.json();

   
  //const PLACEHOLDER_DATA = api_json.slice(0, 5); //I kept getting an error here when I used the original api: https://imdb-api.com/en/API/Top250Movies/k_8b01xk7o
  //console.log(PLACEHOLDER_DATA);                // When i switched to a simpler api, like the one on this page, it still didn't work, because of a CORS issue. no amount of trouble shooting was able to resolve this, unfortunately
 


let selected = PLACEHOLDER_DATA;


const MARGINS = {top: 20, bottom: 20}
const WIDTH = 600;
const HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

const chartContainer = d3.select('svg')
.attr('width', WIDTH)
.attr('height', HEIGHT + MARGINS.top + MARGINS.bottom)
;

const chart = chartContainer.append('g');

//create scales
const xScale = d3.scaleBand().rangeRound([0, WIDTH]).padding(0.1);
const yScale = d3.scaleLinear().range([HEIGHT, 0]);


//create domains
xScale.domain(PLACEHOLDER_DATA.map((d) => d.name));
yScale.domain([0, d3.max(PLACEHOLDER_DATA, (d) => d.price) + 1 ]);

function render() 
{
    //draw bars
chart.selectAll('.bar')
.data(selected, data => data.id)
.enter()
.append('rect')
.attr('width' , xScale.bandwidth())
.attr('height', data => HEIGHT - yScale(data.price))
.attr('x' , data => xScale(data.name))
.attr('y' , data => yScale(data.price))
.style('fill' , 'rgba(180, 14, 14, 0.863)')
;

//remove bars
chart.selectAll('rect')
.data(selected, data => data.id)
.exit()
.remove();


//draw labels
chart.selectAll('.label')
.data(selected, data => data.id)
.enter()
.append('text')
.text(data => data.price)
.style('fill', 'rgb(240, 248, 255)')
.attr('x', data => xScale(data.name) + (xScale.bandwidth()/2))
.attr('y', data => yScale(data.price) - 10)
.attr('text-anchor' , 'middle')
.classed('label', true) //this is style//
;

//remove labels
chart.selectAll('.label')
.data(selected, data => data.id)
.exit()
.remove()
;
}

//draw x-axis
chart.append('g')
.attr('transform' , `translate(0, ${HEIGHT})`) //Move x axis
.call(d3.axisBottom(xScale))
.attr('color' , '#000000') //color
.classed('axis' , true) // style
;

//KEY TEST
chart.append('g')
.append('text')
.text('DECADES')
.attr('fill', 'white')
.attr('text-anchor' , 'middle')
.attr('x', WIDTH-300)
.attr('y', HEIGHT+40)
;

//key test 2
chart.append('text')
//.attr('class', 'y label')
.attr('text-anchor', 'end')
.attr('dy', '.9em')
.attr('fill', 'white')
.attr('transform', 'rotate(-90)')
.text('NUMBER OF MOVIES IN IMDb LIST (Top Ten)')
;


//INTERACTIVE IMPLEMENTATION
render();
let unselected = [];

//const countryList = d3.select('#data')
//.select('ul')
//.selectAll('li')
//.data(PLACEHOLDER_DATA)
///.enter()
//.append('li')
//;

countryList.append('span')
.text(data => data.name)
;

//check button
//countryList.append('input')
//.attr('type', 'checkbox')
//.attr('checked', true)
//.on('change', (event, info) => {
  // if(unselected.indexOf(info.id) === -1)
   //{
   // unselected.push(info.id);
  // }
  // else
  // {
   // unselected = unselected.filter((id) => id !== info.id);
   //}
  // selected = PLACEHOLDER_DATA.filter(
  //  (d) => unselected.indexOf(d.id) === -1
   //);
  // render();
//}

//}

getData();