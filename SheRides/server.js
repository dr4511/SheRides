
var platform = new H.service.Platform({
        apikey: 'xIP_I3tzM2LwjrmKG2ykKbocLvo-9JEB-MqEY6OiboI'
      });

      // get the default map types from the platform object
      var defaultLayers = platform.createDefaultLayers();

      var map = new H.Map(
        document.getElementById('map'),
        defaultLayers.vector.normal.map,
        {
          zoom: 13,
          center: { lat: 52.5, lng: 13.4 }
        }
      );

      // get the user's location and add a marker to the map
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var userMarker = new H.map.Marker(userLocation);
        map.addObject(userMarker);
        map.setCenter(userLocation);
      });

      // find the route when the user clicks the "Find Route" button
      document.getElementById('find-route').addEventListener('click', function() {
        var destinationAddress = document.getElementById('destination-address').value;
        var searchService = platform.getSearchService();
        searchService.geocode(
          {
            q: destinationAddress
          },
          function(result) {
            var destinationLocation = result.items[0].position;
            var destinationMarker = new H.map.Marker(destinationLocation);
            map.addObject(destinationMarker);
            // calculate the route between the user's location and the destination address
            var routingService = platform.getRoutingService();
            var userLocation = map.getCenter();
            var routeRequestParams = {
              mode: 'fastest;car',
              representation: 'display',
              waypoint0: userLocation.lat + ',' + userLocation.lng,
              waypoint1: destinationLocation.lat + ',' + destinationLocation.lng
            };
            routingService.calculateRoute(
        routeRequestParams,
        function(result) {
          var routeLineString = new H.geo.LineString();
      result.routes[0].sections.forEach(function(section) {
        section.geoLine.forEachLatLngAlt(function(lat, lng) {
          routeLineString.pushLatLngAlt(lat, lng);
        });
      });
      var routePolyline = new H.map.Polyline(routeLineString, {
        style: {
          lineWidth: 5,
          strokeColor: '#00AFAF'
        }
      });
      map.addObject(routePolyline);
    },
    function(error) {
      console.error(error); 
    }
              )}
          );
      });

        



