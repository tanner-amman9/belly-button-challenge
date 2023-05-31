
// Use the D3 library to read in samples.json from the URL

const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    //Use sample_values as the values for the bar chart.
    //Use otu_ids as the labels for the bar chart.
    //Use otu_labels as the hovertext for the chart.
// Create a bubble chart that displays each sample.
    //Use otu_ids for the x values.
    //Use sample_values for the y values.
    //Use sample_values for the marker size.
    //Use otu_ids for the marker colors.
    //Use otu_labels for the text values.
function charts(testID) {
    d3.json(url).then((data) => {
        let dataSamps = data.samples;
        let results = dataSamps.filter(testIDObj => testIDObj.id == testID);
        let j = results[0];

        console.log(j);

        let barValues = j.sample_values.slice(0,10).reverse();
        let barIds = j.otu_ids.slice(0,10).map((otuID) => `OTU ${otuID}`).reverse();
        let barLabels = j.otu_labels.slice(0,10).reverse();

        let bubbleX = j.otu_ids;
        let bubbleY = j.sample_values;
        let bubbleSize = j.sample_values;
        let bubbleColors = j.otu_ids;
        let bubbleLabels = j.otu_labels;
        
        var trace1 = {
            x: barValues,
            y: barIds,
            text: barLabels,
            type: 'bar',
            orientation: 'h'
        };
        var traceData = [trace1];
        
        var layout = {
            title: "Top 10 Bacterias Found in Belly Button"
        };
        Plotly.newPlot("bar", traceData, layout);

        var trace2 = {
            x: bubbleX,
            y: bubbleY,
            text: bubbleLabels,
            mode: 'markers',
            marker: {
                size: bubbleSize,
                color: bubbleColors,
                colorscale: 'YlOrRd'
            }
        };

        var trace2Data = [trace2];

        var layout2 = {
            title: 'Types of Bacteria',
            xaxis: {title: 'OTU ID'},
        };
        Plotly.newPlot('bubble', trace2Data, layout2);
        
    });
}

// Display the sample metadata, i.e., an individual's demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.
function demInfo(id) {
    let demoData = d3.select('#sample-metadata');
    d3.json(url).then((data)=>
    {
        let metaData = data.metadata;
        let result = metaData.filter(idObj => idObj.id == id);
        let results = result[0];
        demoData.html("");
        Object.entries(results).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
            demoData.append('h5').text(`${key}: ${value}`);
        });
    });
}

// Update all the plots when a new sample is selected
function init() {
    
    d3.json(url).then(function(data) {
        console.log(url, data);
        let drop = d3.select('#selDataset');
        let samples = data.names;
        samples.forEach((sample) => {
            drop.append('option').text(sample).property('value', sample);
        });
        const selected = samples[0];
        demInfo(selected);
        charts(selected);
        
    });

}

function optionChanged(newId) {
    demInfo(newId);
    charts(newId);
    
}

init();

