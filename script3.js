const PLACEHOLDER_DATA = [
    {id: "1", name: "1920", price: "6" },
    {id: "2", name: "1930", price: "7" },
    {id: "3", name: "1940", price: "12" },
    {id: "4", name: "1950", price: "23" },
    {id: "5", name: "1960", price: "18" },
    {id: "6", name: "1970s", price: "18" },
    {id: "7", name: "1980s", price: "27" },
    {id: "8", name: "1990s", price: "41" },
    {id: "9", name: "2000s", price: "48" },
    {id: "10", name: "2010s", price: "43" },
    {id: "11", name: "2020s", price: "7" },
];

//api fetch
//async function getData(){
    //const api_url = "http://makeup-api.herokuapp.com/api/v1/products.json"; 
   // const api_data = await fetch(api_url);
  //  const api_json = await api_data.json();
   // const PLACEHOLDER_DATA = api_json.slice(0, 5);
   // console.log(PLACEHOLDER_DATA);


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
.call(d3.axisBottom(xScale))
.attr('color' , '#000000')
.classed('axis' , true)
.attr('transform' , `translate(0, ${HEIGHT})`) //Move x axis
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
.text('TIMES PRESENT IN LIST')
;



//INTERACTIVE IMPLEMENTATION
render();
let unselected = [];

//const countryList = d3.select('#data')
//.select('ul')
//.selectAll('li')
//.data(PLACEHOLDER_DATA)
//.enter()
//.append('li')
//;

countryList.append('span')
.text(data => data.name)
;

//check button
//countryList.append('input')
//.attr('type', 'checkbox')
//.attr('checked', true)
//.//on('change', (event, info) => {
//   if(unselected.indexOf(info.id) === -1)
//   {
//    unselected.push(info.id);
//   }
//   else
//   {
//    unselected = unselected.filter((id) => id !== info.id);
//   }
//   selected = PLACEHOLDER_DATA.filter(
//    (d) => unselected.indexOf(d.id) === -1
//   );
//   render();
//})
//;

//}

getData();