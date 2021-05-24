# JavaScript API

The `src/essence/API/API.js` file exposes functions that can be called using the global `window.API` object.

## Layer Control

### clearVectorLayer(layerName)

This function clears an existing vector layer with a specified name

#### Function parameters

- `layerName` - name of layer to clear

The following is an example of how to call the `clearVectorLayer` function:

```javascript
window.API.clearVectorLayer('Waypoints')
```

### updateVectorLayer(layerName, inputData, keepN)

This function updates an existing vector layer with a specified name, valid GeoJSON data and keeps the last N number of features after adding the new data

#### Function parameters

- `layerName` - name of layer to update
- `inputData` - valid GeoJSON data
- `keepN` - number of features to keep. A value less than or equal to 0 keeps all previous features

The following is an example of how to call the `updateVectorLayer` function:

```javascript
window.API.updateVectorLayer('Waypoints', {
    "type": "Feature",
    "properties": {
    "sol": 690,
    "site": 39,
    "pos": 726,
    "SCLK_START": 458746227.91,
    "SCLK_END": 458748923.8,
    },
    "geometry": {
        "type": "Point",
            "coordinates": [
                137.38361,
                -4.658036,
                -4461.908691
            ]
    }
}, 5)

```

## Time Control

## toggleTimeUI(visibility)

This function toggles the visibility of ancillary Time Control User Interface. It is useful in situations where time functions are controlled by an external application.

#### Function parameters

- `visibility` - Time UI is visibile if true and hidden if false

The following is an example of how to call the `toggleTimeUI` function:

```javascript
window.API.toggleTimeUI(false)
```

## setTime(startTime, endTime, isRelative, timeOffset)

This function sets the global time properties for all of MMGIS. All time enabled layers that are configured to use the `Global` time type will be updated by this function.

Note that layers will not be refreshed on the map until `reloadTimeLayers()` (or `reloadLayer()` for individual layers) is called.

#### Function parameters

- `startTime` - Can be either `YYYY-MM-DDThh:mm:ssZ` if absolute, or `hh:mm:ss` or seconds if relative
- `endTime` - Can be either `YYYY-MM-DDThh:mm:ssZ` if absolute, or `hh:mm:ss` or seconds if relative
- `isRelative` - If true, startTime and endTime are relative to the current UTC time
- `timeOffset` - An offset to use for the current UTC time; can be either a string in `hh:mm:ss` format or an integer value in seconds

The following are examples of how to call the `setTime` function:

```javascript
window.API.setTime('2021-05-13T01:00:00Z', '2021-05-13T07:00:00Z', false)

window.API.setTime('02:00:00', '00:00:00', true, '01:00:00')

window.API.setTime(7200, 0, true, 3600)
```

## setLayerTime(layer, startTime, endTime)

This function sets the start and end time for a single layer. It can be used to override the global time for the layer. Note that `setTime` also updates the times for layers that use the `Global` time type.

For layers that use a single time, `endTime` is used (i.e., `{time}=={endTime}`)

Note that the layer will not be refreshed on the map until `reloadTimeLayers()` (or `reloadLayer()` for individual layers) is called.

#### Function parameters

- `layer` - The layer name string or a layer object
- `startTime` - The start time in `YYYY-MM-DDThh:mm:ssZ` format
- `endTime` - The end time in `YYYY-MM-DDThh:mm:ssZ` format

The following is an example of how to call the `setLayerTime` function:

```javascript
window.API.setLayerTime('Earthquakes', '2021-05-01T00:00:00Z', '2021-05-13T23:59:59Z')
```

## getTime()

Returns the current time on the map with offset included in `YYYY-MM-DDThh:mm:ssZ` format.

The following is an example of how to call the `getTime` function:

```javascript
window.API.getTime()

"2021-05-14T02:06:29Z"
```

## getStartTime()

Returns the global start time on the map with offset included in `YYYY-MM-DDThh:mm:ssZ` format.

The following is an example of how to call the `getStartTime` function:

```javascript
window.API.getStartTime()

"2021-05-14T01:06:29Z"
```

## getEndTime()

Returns the global end time on the map with offset included in `YYYY-MM-DDThh:mm:ssZ` format.

The following is an example of how to call the `getEndTime` function:

```javascript
window.API.getEndTime()

"2021-05-14T03:06:29Z"
```

## getLayerStartTime(layer)

Returns the start time set for an individual in `YYYY-MM-DDThh:mm:ssZ` format.

#### Function parameters

- `layer` - The layer name string or a layer object

The following is an example of how to call the `getLayerStartTime` function:

```javascript
window.API.getStartTime('Earthquakes')

"2021-05-01T00:00:00Z"
```

## getLayerEndTime(layer)

Returns the end time set for an individual in `YYYY-MM-DDThh:mm:ssZ` format.

#### Function parameters

- `layer` - The layer name string or a layer object

The following is an example of how to call the `getLayerEndTime` function:

```javascript
window.API.getEndTime('Earthquakes')

"2021-05-13T23:59:59Z"
```

## reloadTimeLayers()

This function will reload every layer that is time-enabled by re-fetching the data and re-drawing on the map. It should be called after `setTime` or `setLayerTime`. It will return a list of layers that were reloaded.

The following is an example of how to call the `reloadTimeLayers` function:

```javascript
window.API.reloadTimeLayers()

["Lunaserv", "Earthquakes"]
```

## reloadLayer(layer)

This function will reload the given time-enabled layer by re-fetching the data and re-drawing on the map. It should be called after `setTime` or `setLayerTime`.

#### Function parameters

- `layer` - The layer name string or a layer object

The following is an example of how to call the `reloadLayer` function:

```javascript
window.API.reloadLayer('Earthquakes')
```

## setLayersTimeStatus(color)

This function will set the status icon color (e.g. to indicate staleness) for all global time enabled layers. It returns a list of the layers that were updated.

#### Function parameters

- `color` - The name of a color of hex RGB value

The following is an example of how to call the `reloadLayer` function:

```javascript
window.API.setLayersTimeStatus('#ff0000')

["Lunaserv", "Earthquakes"]

window.API.setLayersTimeStatus('green')

["Lunaserv", "Earthquakes"]
```

## setLayerTimeStatus(layer, color)

This function will set the status icon color (e.g. to indicate staleness) for the specified time enabled layers.

#### Function parameters

- `layer` - The layer name string or a layer object
- `color` - The name of a color of hex RGB value

The following is an example of how to call the `reloadLayer` function:

```javascript
window.API.setLayerTimeStatus('Earthquakes', '#ff0000')

window.API.setLayerTimeStatus('Earthquakes', 'green')
```

## updateLayersTime()

This function will synchronize every global time enabled layer with the current global times. Similar to `setTime`  but used internally to update values when users change values on the Time UI. Unlikely to be needed elsewhere except for potential edge cases where re-synchronization may be necessary.

The following is an example of how to call the `updateLayersTime` function:

```javascript
window.API.updateLayersTime()
```