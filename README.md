# Info-Viz
Project for CSC411 - Information Visualization at the University of Victoria

## Done:
   colour scale for LFLs in each CSD legend and repositioned
   marker bar for median income
   formatted $, income, age 


## TODO
1) Implement variable switcher in Chart.js:
    - % visible minorities & non-official languages
    - houses & income
    - houses & population density
    - age & income
    - LFL density and population density
    This should switch the data point from the JSON file,
    Currently the 1 chart just pulls from x & y values, which are age & income
2) Adjust transitions in motionConfig

4) Update data JSON to have demographics then all GeoJSON markers for map
5) Leaflet interactivity, notify map of chart element selection using context and event listeners
   - Load LFL locations into map on chart click
   - Highlight polygon on chart click
6) Center map properly
7)  Styling
8)  When I do ctrl + s in VS code, the React app re-renders 
    - Confirm if issue still occurs after ```npm build```

## BONUS TODO
1) Make swappable colour scheme for LFL#s and LFL/Sqkm
2) Add LFL features
3) Info panel based on Chart.js onClick
