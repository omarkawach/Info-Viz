#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: omarkawach
@description: 

There are 3 datasets. First of which is the little free libraries found in 
Victoria, second is the selected census subdivisions in Greater Victoria, and 
third is all the census subdivisions in BC. 

The script begins by converting the first dataset to a GeoDataFrame. 

Then we create a GeoDataFrame composed of all of the second datasets contents. 

Since there is no geography in the second data set, we get that information
from the third dataset.

Next, we count the total number of little free libraries found in the 
census subdivisions. Then, we also assign the LFLs to a census subdivision. 

Finally, the GeoDataFrames are converted to GeoJSON for easy reading on the web
"""

# Import packages
import pandas as pd
import geopandas as gpd
from geopandas import GeoDataFrame as gdf
import shapely.speedups

"""Little Free Libraries in Greater Victoria"""
# Load the LFL excel sheet as a pandas data frame
libraries_df = pd.read_csv('./Little_Libraries_of_Greater_Victoria.csv')

# Convert the LFL pandas data frame into a GeoDataFrame
libraries_gdf = gdf(libraries_df, 
                    geometry=gpd.points_from_xy(libraries_df.Lat, libraries_df.Lon))

# Set a CRS for the LFL GeoDataFrame
libraries_gdf = libraries_gdf.set_crs('epsg:4326')
libraries_gdf["Census subdivision name"] = None

"""Census Data for Greater Victoria area"""
# Load the census CSV specific to Victoria
census_df = pd.read_csv('./Export_Selected_CSD.csv')

# Load the BC census geojson as a GeoDataFrame and remove duplicate entries 
census_gdf = gpd.read_file("./Census_Profiles_for_BC_CSD_2016.geojson").set_crs('epsg:4326')
census_gdf = census_gdf.drop_duplicates(subset=['CENSUS_SUBDIVISION_NAME'], keep='last')

# Create an empty GeoDataFrame and add a geography column
census_updated_gdf = gpd.GeoDataFrame(census_df)
census_updated_gdf['geometry'] = None

# Add geometry information to the new GeoDataFrame
for index, row in census_gdf.iterrows():
    geom = row["geometry"]
    csd = row["CENSUS_SUBDIVISION_NAME"]
    df = census_updated_gdf[census_updated_gdf["Census subdivision name"] == csd]
    if(not df.empty):    
        census_updated_gdf.at[df.index[0], 'geometry'] = geom

# Set a CRS for the census GeoDataFrame
census_updated_gdf = census_updated_gdf.set_crs('epsg:4326')

# Add a new column to count the number of LFLs in a census subdivision
census_updated_gdf['LFL_count'] = 0

shapely.speedups.enable()

# Count the number of LFLs in a census subdivision
for i, lfl in libraries_gdf.iterrows():
    # Now go through each census subdivision
    for index, row in census_updated_gdf.iterrows():
        # See if the census subdivision intersects with a LFL
        if(lfl.geometry.within(row.geometry) == True):
            census_updated_gdf.loc[index, 'LFL_count'] += 1
            libraries_gdf.at[i, "Census subdivision name"] = row["Census subdivision name"]
            

# Convert the geodataframe to GeoJSON
census_updated_gdf.to_file("./CSDs_and_LFLs_for_CRD.geojson", driver='GeoJSON')
libraries_gdf.to_file("./LFLs_assigned.geojson", driver='GeoJSON')
