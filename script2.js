const PLACEHOLDER_DATA = [
 
    {id: "2", name: "1930s", price: "2" },
    {id: "3", name: "1940s", price: "2" },
    {id: "4", name: "1950s", price: "3" },
    {id: "5", name: "1960s", price: "4" },
    {id: "6", name: "1970s", price: "4" },
    {id: "7", name: "1980s", price: "3" },
    {id: "8", name: "1990s", price: "17" },
    {id: "9", name: "2000s", price: "10" },
    {id: "10", name: "2010s", price: "5" },
   
];

//api fetch
//async function getData(){
    //fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
    //.then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    //.then(data => console.log(data));

    //const api_url = "http://makeup-api.herokuapp.com/api/v1/products.json"; 
    //const api_data = await fetch(api_url);
    //const api_json = await api_data.json();

    //const PLACEHOLDER_DATA = api_json.slice(0, 5);
    //console.log(PLACEHOLDER_DATA);


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

}

//draw x-axis
chart.append('g')
.call(d3.axisBottom(xScale))
.attr('color' , '#000000')
.classed('axis' , true)
.attr('transform' , `translate(0, ${HEIGHT})`) //Move x axis
;

//KEY 
chart.append('g')
.append('text')
.text('DECADES')
.attr('fill', 'white')
.attr('text-anchor' , 'middle')
.attr('x', WIDTH-300)
.attr('y', HEIGHT+40)
;

//KEY (Y)
chart.append('text')
//.attr('class', 'y label')
.attr('text-anchor', 'end')
.attr('dy', '.9em')
.attr('fill', 'white')
.attr('transform', 'rotate(-90)')
.text('NUMBER OF MOVIES IN IMDb LIST (Top 50)')
;


//INTERACTIVE IMPLEMENTATION
render();
let unselected = [];

countryList.append('span')
.text(data => data.name)
;

getData();