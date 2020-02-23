# Global Warming - Presenting Global Temperature

## Data-Set

The data set was taken from [Kaggle](https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data) (License
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)).

The original data set went throw few sorting and cleaning at this [jupyter notebook](warming-jupyter/world-temp-chunks.ipynb)

## The Sketch

This visualization is presenting the temperature in majors cities in the world from 1900 to 2013.

It uses the [Global Temperature by City table](https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data#GlobalLandTemperaturesByCity.csv) that was sorted by date and the Lat/Long was parsed to coordinates from UTM.

Its temperature sets each city color - Green will be smaller than 10 degrees celsius, Orange between 11 to 22 degrees celsius, and Red are larger than 23 degrees celsius.

[WATCH IT HERE](v3/)
