fetch('https://imdb-api.com/en/API/Top250Movies/k_8b01xk7o')
.then (response => response.json())
//.then(data => console.log(data));

const PLACEHOLDER_DATA = [
    {id: "1", name: "South Africa", price: "22" },
    {id: "2", name: "USA", price: "55" },
    {id: "3", name: "Ireland", price: "11" },
    {id: "4", name: "China", price: "8" },
]

const WIDTH = 600;
const HEIGHT = 400;

const chartContainer = d3.select('svg')
.attr('width', WIDTH)
.attr('height', HEIGHT)
;

const chart = chartContainer.append('g');

const xScale = d3.scaleBand().rangeRound([0, WIDTH]).padding(0,1);
const yScale = d3.scaleLinear().range([HEIGHT, 0]);

xScale.domain(PLACEHOLDER_DATA.map((d)=> d.name));
yScale.domain([0, d3.max(PLACEHOLDER_DATA, (d)=> d.price) + 1]);

chart.selectAll('.bar')
.data(PLACEHOLDER_DATA)
.enter()
.append('rect')
.attr('width',xScale.bandWidth())
.attr('height', data => HEIGHT - yScale(data.price))
.attr('x', data => xScale(data.name))
.attr('y', data => yScale(data.price));