function gMap() {
    this.center = { lat: 23.661846, lng: 120.646877 };
    this.zoom = 8;
}

gMap.prototype.initMap = function() {

    var pointId = 0;
    var Points = [];
    var polylineId = 0;
    var Polylines = [];
    var polylineMarkers = [];
    var polygonId = 0;
    var Polygons = [];
    var polygonMarkers = [];
    var addedLat,addedLng;


    var mapCanvasDiv = document.createElement('div');
    mapCanvasDiv.id = 'mapCanvas';
    mapCanvasDiv.style.height = window.innerHeight + 'px';
    mapCanvasDiv.style.width = window.innerWidth + 'px';
    document.body.appendChild(mapCanvasDiv);

    this.map = new google.maps.Map(document.getElementById('mapCanvas'), {
        center: { lat: this.center.lat, lng: this.center.lng },
        zoom: this.zoom,
        disableDefaultUI: true
    });

    var newmap = this.map;
    var newcenter = this.center;

    var toolsDiv = document.createElement('div');
    toolsDiv.className = 'fixed-action-btn click-to-toggle horizontal';
    toolsDiv.style.bottom = '45px';
    toolsDiv.style.right = '24px';

    document.body.appendChild(toolsDiv);

    var toolMenu = document.createElement('a');
    toolMenu.className = 'btn-floating btn-large red waves-effect waves-light';
    toolMenu.id = 'toolMenu';

    var toolMenuIcon = document.createElement('i');
    toolMenuIcon.className = 'large material-icons';
    toolMenuIcon.innerHTML = 'edit';

    toolMenu.appendChild(toolMenuIcon); //add i to a tag


    var drawingToolsUl = document.createElement('ul');

    //---------- movingMode (for just moving maps)----------//
    var moveingMode = document.createElement('a');
    moveingMode.className = 'btn-floating grey darken-3 waves-effect waves-light';
    moveingMode.id = 'movingMode';
    var moveingModeIcon = document.createElement('i');
    moveingModeIcon.className = 'material-icons';
    moveingModeIcon.innerHTML = 'pan_tool';
    var moveingModeLi = document.createElement('li');

    moveingMode.appendChild(moveingModeIcon); //append i to a tag
    moveingModeLi.appendChild(moveingMode); //append a to li tag
    drawingToolsUl.appendChild(moveingModeLi); //append li to ul tag

    //---------- drawing point (for getting point coordinate)----------//
    var drawingToolsDrawingPoint = document.createElement('a');
    drawingToolsDrawingPoint.className = 'btn-floating red waves-effect waves-light';
    drawingToolsDrawingPoint.id = 'drawingPoint';
    var drawingToolsDrawingPointIcon = document.createElement('i');
    drawingToolsDrawingPointIcon.className = 'material-icons';
    drawingToolsDrawingPointIcon.innerHTML = 'add_location';
    var pointLi = document.createElement('li');

    var drawingToolsRemovePoint = document.createElement('a');
    drawingToolsRemovePoint.className = 'btn-floating red waves-effect waves-light';
    drawingToolsRemovePoint.id = 'removePoint';
    drawingToolsRemovePoint.style.position = 'absolute';
    drawingToolsRemovePoint.style.display = 'none';
    var drawingToolsRemovePointIcon = document.createElement('i');
    drawingToolsRemovePointIcon.className = 'material-icons white-text';
    drawingToolsRemovePointIcon.innerHTML = 'delete';
    drawingToolsRemovePoint.appendChild(drawingToolsRemovePointIcon);
    document.body.appendChild(drawingToolsRemovePoint);

    var drawingToolsAddMultiPoint = document.createElement('a');
    drawingToolsAddMultiPoint.className = 'btn-floating red waves-effect waves-light';
    drawingToolsAddMultiPoint.id = 'addMultiPoint';
    drawingToolsAddMultiPoint.style.position = 'absolute';
    drawingToolsAddMultiPoint.style.display = 'none';
    var drawingToolsAddMultiPointIcon = document.createElement('i');
    drawingToolsAddMultiPointIcon.className = 'material-icons white-text';
    drawingToolsAddMultiPointIcon.innerHTML = 'add';
    drawingToolsAddMultiPoint.appendChild(drawingToolsAddMultiPointIcon);
    document.body.appendChild(drawingToolsAddMultiPoint);


    drawingToolsDrawingPoint.appendChild(drawingToolsDrawingPointIcon); //append i to a tag
    pointLi.appendChild(drawingToolsDrawingPoint); //append a to li tag
    drawingToolsUl.appendChild(pointLi); //append li to ul tag

    //---------- drawing line (for getting length)----------//
    var drawingToolsDrawingLine = document.createElement('a');
    drawingToolsDrawingLine.className = 'btn-floating green waves-effect waves-light';
    drawingToolsDrawingLine.id = 'drawingPolyline';
    var drawingToolsDrawingLineIcon = document.createElement('i');
    drawingToolsDrawingLineIcon.className = 'material-icons';
    drawingToolsDrawingLineIcon.innerHTML = 'timeline';
    var lineLi = document.createElement('li');

    var drawingToolsRemoveLine = document.createElement('a');
    drawingToolsRemoveLine.className = 'btn-floating green waves-effect waves-light';
    drawingToolsRemoveLine.id = 'removeLine';
    drawingToolsRemoveLine.style.position = 'absolute';
    drawingToolsRemoveLine.style.display = 'none';
    var drawingToolsRemoveLineIcon = document.createElement('i');
    drawingToolsRemoveLineIcon.className = 'material-icons white-text';
    drawingToolsRemoveLineIcon.innerHTML = 'delete';
    drawingToolsRemoveLine.appendChild(drawingToolsRemoveLineIcon);
    document.body.appendChild(drawingToolsRemoveLine);

    var drawingToolsAddMultiLine = document.createElement('a');
    drawingToolsAddMultiLine.className = 'btn-floating green waves-effect waves-light';
    drawingToolsAddMultiLine.id = 'addMultiLine';
    drawingToolsAddMultiLine.style.position = 'absolute';
    drawingToolsAddMultiLine.style.display = 'none';
    var drawingToolsAddMultiLineIcon = document.createElement('i');
    drawingToolsAddMultiLineIcon.className = 'material-icons white-text';
    drawingToolsAddMultiLineIcon.innerHTML = 'add';
    drawingToolsAddMultiLine.appendChild(drawingToolsAddMultiLineIcon);
    document.body.appendChild(drawingToolsAddMultiLine);

    drawingToolsDrawingLine.appendChild(drawingToolsDrawingLineIcon); //append i to a tag
    lineLi.appendChild(drawingToolsDrawingLine); //append a to li tag
    drawingToolsUl.appendChild(lineLi); //append li to ul tag

    //---------- drawing polyline (for getting area)----------//
    var drawingToolsDrawingPolyline = document.createElement('a');
    drawingToolsDrawingPolyline.className = 'btn-floating blue waves-effect waves-light';
    drawingToolsDrawingPolyline.id = 'drawingPolygon';
    var drawingToolsDrawingPolylineIcon = document.createElement('i');
    drawingToolsDrawingPolylineIcon.className = 'material-icons';
    drawingToolsDrawingPolylineIcon.innerHTML = 'crop_5_4';
    var polylineLi = document.createElement('li');

    var drawingToolsRemovePolyline = document.createElement('a');
    drawingToolsRemovePolyline.className = 'btn-floating blue waves-effect waves-light';
    drawingToolsRemovePolyline.id = 'removePolygon';
    drawingToolsRemovePolyline.style.position = 'absolute';
    drawingToolsRemovePolyline.style.display = 'none';
    var drawingToolsRemovePolylineIcon = document.createElement('i');
    drawingToolsRemovePolylineIcon.className = 'material-icons white-text';
    drawingToolsRemovePolylineIcon.innerHTML = 'delete';
    drawingToolsRemovePolyline.appendChild(drawingToolsRemovePolylineIcon);
    document.body.appendChild(drawingToolsRemovePolyline);

    var drawingToolsAddMultiPolyline = document.createElement('a');
    drawingToolsAddMultiPolyline.className = 'btn-floating blue waves-effect waves-light';
    drawingToolsAddMultiPolyline.id = 'addMultiPolygon';
    drawingToolsAddMultiPolyline.style.position = 'absolute';
    drawingToolsAddMultiPolyline.style.display = 'none';
    var drawingToolsAddMultiPolylineIcon = document.createElement('i');
    drawingToolsAddMultiPolylineIcon.className = 'material-icons white-text';
    drawingToolsAddMultiPolylineIcon.innerHTML = 'add';
    drawingToolsAddMultiPolyline.appendChild(drawingToolsAddMultiPolylineIcon);
    document.body.appendChild(drawingToolsAddMultiPolyline);

    drawingToolsDrawingPolyline.appendChild(drawingToolsDrawingPolylineIcon); //append i to a tag
    polylineLi.appendChild(drawingToolsDrawingPolyline); //append a to li tag
    drawingToolsUl.appendChild(polylineLi); //append li to ul tag

    //---------- drawing polygon for capturing map image----------//
    var drawingToolsDrawingPolygon = document.createElement('a');
    drawingToolsDrawingPolygon.className = 'btn-floating yellow darken-2 waves-effect waves-light';
    drawingToolsDrawingPolygon.id = 'captureImage';
    var drawingToolsDrawingPolygonIcon = document.createElement('i');
    drawingToolsDrawingPolygonIcon.className = 'material-icons';
    drawingToolsDrawingPolygonIcon.innerHTML = 'camera_alt';
    var polygonLi = document.createElement('li');

    drawingToolsDrawingPolygon.appendChild(drawingToolsDrawingPolygonIcon); //append i to a tag
    polygonLi.appendChild(drawingToolsDrawingPolygon); //append a to li tag
    drawingToolsUl.appendChild(polygonLi); //append li to ul tag

    //---------- drawing dxf for exporing dxf file----------//
    var drawingToolsDrawingDxf = document.createElement('a');
    drawingToolsDrawingDxf.className = 'btn-floating orange accent-4 waves-effect waves-light';
    drawingToolsDrawingDxf.id = 'drawingDxf';
    var drawingToolsDrawingDxfIcon = document.createElement('i');
    drawingToolsDrawingDxfIcon.className = 'material-icons';
    drawingToolsDrawingDxfIcon.innerHTML = 'save';
    var dxfLi = document.createElement('li');

    drawingToolsDrawingDxf.appendChild(drawingToolsDrawingDxfIcon); // append i to a tag
    dxfLi.appendChild(drawingToolsDrawingDxf); // append a to li tag
    drawingToolsUl.appendChild(dxfLi); // append li to ul tag

    //---------- convert tool----------//
    var convertTool = document.createElement('a');
    convertTool.className = 'btn-floating teal darken-2 waves-effect waves-light';
    convertTool.id = 'convertTool';
    var convertToolIcon = document.createElement('i');
    convertToolIcon.className = 'material-icons';
    convertToolIcon.innerHTML = 'find_replace';
    var convertToolLi = document.createElement('li');

    convertTool.appendChild(convertToolIcon); // append i to a tag
    convertToolLi.appendChild(convertTool); // append a to li tag
    drawingToolsUl.appendChild(convertToolLi); // append li to ul tag

    //---------- Drawing setting----------//
    var drawingSetting = document.createElement('a');
    drawingSetting.className = 'btn-floating grey darken-1 darken-2 waves-effect waves-light';
    drawingSetting.id = 'drawingSetting';
    var drawingSettingIcon = document.createElement('i');
    drawingSettingIcon.className = 'material-icons';
    drawingSettingIcon.innerHTML = 'format_list_bulleted';
    var drawingSettingLi = document.createElement('li');

    drawingSetting.appendChild(drawingSettingIcon); // append i to a tag
    drawingSettingLi.appendChild(drawingSetting); // append a to li tag
    //drawingToolsUl.appendChild(drawingSettingLi); // append li to ul tag

    toolsDiv.appendChild(toolMenu);
    toolsDiv.appendChild(drawingToolsUl);

    //---------- add zoom btn div----------//
    var zoomDiv = document.createElement('div');
    zoomDiv.style.bottom = ((window.innerHeight / 2) - 70) + 'px';
    zoomDiv.style.right = '33px';
    zoomDiv.style.zIndex = 1;
    zoomDiv.style.position = 'absolute';
    zoomDiv.id = 'zoomDiv';
    var zoomUl = document.createElement('ul');

    //---------- add zoomIn----------//
    var zoomInLi = document.createElement('li');
    zoomInLi.style.marginBottom = '10px';
    var zoomIn = document.createElement('a');
    zoomIn.id = 'zoomIn';
    zoomIn.className = 'btn-floating blue-grey waves-effect waves-light'
    var zoomInIcon = document.createElement('i');
    zoomInIcon.className = 'material-icons';
    zoomInIcon.innerHTML = 'add';

    zoomIn.appendChild(zoomInIcon);
    zoomInLi.appendChild(zoomIn);
    zoomUl.appendChild(zoomInLi);

    //---------- add zoomIndicator----------//
    var zoomIndiLi = document.createElement('li');
    zoomIndiLi.style.marginBottom = '10px';
    var zoomIndi = document.createElement('a');
    zoomIndi.id = 'zoomIndi';
    zoomIndi.className = 'btn-floating large grey center';
    zoomIndi.innerText = 8;

    zoomIndiLi.appendChild(zoomIndi);
    zoomUl.appendChild(zoomIndiLi);

    //---------- add zoomOut----------//
    var zoomOutLi = document.createElement('li');
    var zoomOut = document.createElement('a');
    zoomOut.id = 'zoomOut';
    zoomOut.className = 'btn-floating blue-grey waves-effect waves-light'
    var zoomOutIcon = document.createElement('i');
    zoomOutIcon.className = 'material-icons';
    zoomOutIcon.innerHTML = 'remove';

    zoomOut.appendChild(zoomOutIcon);
    zoomOutLi.appendChild(zoomOut);
    zoomUl.appendChild(zoomOutLi);

    zoomDiv.appendChild(zoomUl);
    document.body.appendChild(zoomDiv);

    //---------- add map-type btn div----------//
    var mapTypeDiv = document.createElement('div');
    mapTypeDiv.className = 'fixed-action-btn horizontal click-to-toggle';
    mapTypeDiv.style.bottom = (window.innerHeight - 101) + 'px';
    mapTypeDiv.style.right = '24px';
    mapTypeDiv.id = 'mapTypeDiv';

    document.body.appendChild(mapTypeDiv);

    var mapTypeMenu = document.createElement('a');
    mapTypeMenu.className = 'btn-floating btn-large cyan waves-effect waves-light';

    var mapTypeMenuIcon = document.createElement('i');
    mapTypeMenuIcon.className = 'large material-icons';
    mapTypeMenuIcon.innerHTML = 'burst_mode';

    mapTypeMenu.appendChild(mapTypeMenuIcon); //add i to a tag

    mapTypeDiv.appendChild(mapTypeMenu);

    var mapTypeUl = document.createElement('ul');

    mapTypeDiv.appendChild(mapTypeUl);


    //---------- mapTypeRoad----------//
    var mapTypeRoad = document.createElement('a');
    mapTypeRoad.className = 'btn-floating red waves-effect waves-light';
    mapTypeRoad.id = 'mapTypeRoad';
    var mapTypeRoadIcon = document.createElement('i');
    mapTypeRoadIcon.className = 'material-icons';
    mapTypeRoadIcon.innerHTML = 'grid_on';
    var mapTypeRoadLi = document.createElement('li');

    mapTypeRoad.appendChild(mapTypeRoadIcon); //append i to a tag
    mapTypeRoadLi.appendChild(mapTypeRoad); //append a to li tag
    mapTypeUl.appendChild(mapTypeRoadLi); //append li to ul tag

    //---------- mapType satellite----------//
    var mapTypeSatellite = document.createElement('a');
    mapTypeSatellite.className = 'btn-floating blue waves-effect waves-light';
    mapTypeSatellite.id = 'mapTypeSatellite';
    var mapTypeSatelliteIcon = document.createElement('i');
    mapTypeSatelliteIcon.className = 'material-icons';
    mapTypeSatelliteIcon.innerHTML = 'public';
    var mapTypeSatelliteLi = document.createElement('li');

    mapTypeSatellite.appendChild(mapTypeSatelliteIcon); //append i to a tag
    mapTypeSatelliteLi.appendChild(mapTypeSatellite); //append a to li tag
    mapTypeUl.appendChild(mapTypeSatelliteLi); //append li to ul tag

    //---------- mapType mix----------//
    var mapTypeMix = document.createElement('a');
    mapTypeMix.className = 'btn-floating green waves-effect waves-light';
    mapTypeMix.id = 'mapTypeMix';
    var mapTypeMixIcon = document.createElement('i');
    mapTypeMixIcon.className = 'material-icons';
    mapTypeMixIcon.innerHTML = 'collections';
    var mapTypeMixLi = document.createElement('li');

    mapTypeMix.appendChild(mapTypeMixIcon); //append i to a tag
    mapTypeMixLi.appendChild(mapTypeMix); //append a to li tag
    mapTypeUl.appendChild(mapTypeMixLi); //append li to ul tag


    //---------- add website menu----------//
    var mapMenuDiv = document.createElement('div');
    mapMenuDiv.className = 'fixed-action-btn click-to-toggle';
    mapMenuDiv.style.bottom = '46px';
    mapMenuDiv.style.right = (window.innerWidth - 79) + 'px';
    mapMenuDiv.id = 'mapMenuDiv';

    document.body.appendChild(mapMenuDiv);

    var mapMenu = document.createElement('a');
    mapMenu.className = 'btn-floating btn-large green darken-1 waves-effect waves-light';

    var mapMenuIcon = document.createElement('i');
    mapMenuIcon.className = 'large material-icons';
    mapMenuIcon.innerHTML = 'settings';

    mapMenu.appendChild(mapMenuIcon); //add i to a tag

    mapMenuDiv.appendChild(mapMenu);

    var mapMenuUl = document.createElement('ul');

    mapMenuDiv.appendChild(mapMenuUl);


    //---------- menuInfo----------//
    var menuInfo = document.createElement('a');
    menuInfo.className = 'btn-floating red waves-effect waves-light modal-trigger';
    menuInfo.id = 'menuInfo';
    menuInfo.href='#manu';
    var menuInfoIcon = document.createElement('i');
    menuInfoIcon.className = 'material-icons';
    menuInfoIcon.innerHTML = 'priority_high';
    var menuInfoLi = document.createElement('li');

    menuInfo.appendChild(menuInfoIcon); //append i to a tag
    menuInfoLi.appendChild(menuInfo); //append a to li tag
    mapMenuUl.appendChild(menuInfoLi); //append li to ul tag

    //---------- aboutMe----------//
    var aboutMe = document.createElement('a');
    aboutMe.className = 'btn-floating blue waves-effect waves-light';
    aboutMe.id = 'aboutMe';
    var aboutMeIcon = document.createElement('i');
    aboutMeIcon.className = 'material-icons';
    aboutMeIcon.innerHTML = 'person';
    var aboutMeLi = document.createElement('li');

    aboutMe.appendChild(aboutMeIcon); //append i to a tag
    aboutMeLi.appendChild(aboutMe); //append a to li tag
    mapMenuUl.appendChild(aboutMeLi); //append li to ul tag

    //---------- logo ----------//

    var logo = document.createElement('div');
    logo.style.top = '46px';
    logo.style.left = '24px';
    logo.style.zIndex = 2;
    logo.style.position = 'absolute';
    logo.className = 'chip';
    logo.style.opacity = 0.8;

    var logoLink = document.createElement('a');
    logoLink.href = 'index.html';

    var logoImg = document.createElement('img');
    logoImg.src = 'img/logo.png';
    //logoImg.style.opacity = 0.3;

    var logoName = document.createTextNode('MapCADer');

    logoLink.appendChild(logoImg);
    logoLink.appendChild(logoName);
    logo.appendChild(logoLink);
    document.body.appendChild(logo);

    window.addEventListener('resize', function() {
        mapCanvasDiv.style.height = window.innerHeight + 'px';
        mapCanvasDiv.style.width = window.innerWidth + 'px';
        document.getElementById('zoomDiv').style.bottom = ((window.innerHeight / 2) - 70) + 'px';
        document.getElementById('mapTypeDiv').style.bottom = (window.innerHeight - 101) + 'px';
        document.getElementById('mapMenuDiv').style.right = (window.innerWidth - 79) + 'px';

    });

    google.maps.event.addDomListener(window, 'resize', function() {
        google.maps.event.trigger(newmap, 'resize');
        newmap.setCenter(newcenter);
    });

    //------------create info window------------//

    var infoWindow = document.createElement('div');
    //infoWindow.style.width = (window.innerWidth/5)+'px';
    //infoWindow.style.height = '300px';
    infoWindow.style.top = (window.innerHeight / 4) + 'px';
    infoWindow.style.left = '24px';
    infoWindow.style.position = 'absolute';
    infoWindow.id = 'infoWindow';
    infoWindow.style.display = 'none';
    infoWindow.style.padding = '10px';
    infoWindow.className = 'ui-widget-content z-depth-2';

    document.body.appendChild(infoWindow);

    $('#infoWindow').draggable({
        containment: $("#mapCanvas"),
        cancel: 'table',
        handle: '#infoWindowMovingIcon',
    });

    //------------ create map image view window---------------//

    var mapViewDiv = document.createElement('div');
    mapViewDiv.id='mapViewDiv';
    mapViewDiv.className = "modal modal-fixed-footer row";
    var mapViewContent = document.createElement('div');
    mapViewContent.className = 'modal-content col s12 center';
    var mapImage = document.createElement('img');
    mapImage.className = 'responsive-img';
    mapImage.id = 'mapImageImg';

    var mapViewCloseBtn = document.createElement('div');
    mapViewCloseBtn.className= 'modal-footer';
    var mapViewCloseA = document.createElement('a');
    mapViewCloseA.href='#!';
    mapViewCloseA.className = 'modal-action modal-close waves-effect red btn-flat white-text';
    mapViewCloseA.innerHTML = '離開';
    mapViewCloseBtn.appendChild(mapViewCloseA);

    mapViewDiv.appendChild(mapViewContent);
    mapViewDiv.appendChild(mapViewCloseBtn);
    mapViewContent.appendChild(mapImage);

    document.body.appendChild(mapViewDiv);

    //------------drawing manager setting------------//
    var drawingManager = new google.maps.drawing.DrawingManager({

        drawingControl: false,

        drawingControlOptions: {
            drawingModes: [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.RECTANGLE],

        },

        map: newmap,

        markerOptions: {
            animation: google.maps.Animation.DROP,
        }, //end marker options

        polygonOptions: {
            strokeWeight: 4,
            strokeColor: '#03a9f4',
            strokeOpacity: 0.8,
            fillColor: "#455a64",
            fillOpacity: 0.7,
            editable: true,
        }, //end polygonOptions

        polylineOptions: {
            strokeWeight: 4,
            strokeColor: "#4caf50",
            strokeOpacity: 0.8,
            editable: true,
        }, //end polylineOptions

        rectangleOptions: {
            editable: false,
            strokeWeight: 4,
            strokeColor: "#ffff00",
            fillColor: "#455a64",
            strokeOpacity: 0.8,
            draggable:true,
        }, //end rectangle Options

    });

    //------------drawing point------------//

    document.getElementById('drawingPoint').addEventListener('click', function() {
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
    });


    google.maps.event.addListener(drawingManager, 'markercomplete', function(event) {

        setTimeout(function(){
            addNewPoint(event,Points,pointId,newmap);
            pointId++;
        },200);
       

    });



    //------------moving mode------------//

    document.getElementById('movingMode').addEventListener('click', function() {
        drawingManager.setDrawingMode('');
    });

    //------------polyline mode------------//

    document.getElementById('drawingPolyline').addEventListener('click', function() {
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
    });

    google.maps.event.addListener(drawingManager, 'polylinecomplete', function(event) {
        
        Polylines.push(event);
        addNewLine(event,newmap,Polylines,polylineId,polylineMarkers);
        polylineId++;

    });

    //------------polygon mode------------//

    document.getElementById('drawingPolygon').addEventListener('click', function() {
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    });

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(event) {

        Polygons.push(event);
        addNewPolyline(event,newmap,Polygons,polygonId,polygonMarkers);
        polygonId++;


    });

    //------------capture image mode------------//

    drawingToolsDrawingPolygon.addEventListener('click', function() {
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
    });

    var newMapImageRectangle = new google.maps.Rectangle();

    var polygonRemoved = false;

    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(event) {
        polygonRemoved = false;
        $("#toast-container").remove();

        newMapImageRectangle.setMap(null);
        newMapImageRectangle = event;

        var imageWidth,imageHeight;

        polygonZoomChanged(event,newmap,imageWidth,imageHeight);

        newMapImageRectangle.addListener('dragend',function(){
            $("#toast-container").remove();
            polygonZoomChanged(newMapImageRectangle,newmap,imageWidth,imageHeight);

        });
        

        var polygonZoomChangeEvent = newmap.addListener('zoom_changed',function(){
            if(polygonRemoved == false){
               $("#toast-container").remove();
                polygonZoomChanged(event,newmap,imageWidth,imageHeight);
            }
        });

        

        event.addListener('rightclick',function(){
            polygonRemoved = true;
            event.setMap(null);
            $("#toast-container").remove();
            google.maps.event.removeListener(polygonZoomChangeEvent);
        });


    });

    //------------create dxf mode------------//

    var dxfOptionDiv = document.createElement('div');
    dxfOptionDiv.style.position = 'absolute';
    dxfOptionDiv.style.display = 'none';
    //dxfOptionDiv.style.opacity = 0.7;
    dxfOptionDiv.style.backgroundColor = '#37474f';
    dxfOptionDiv.style.zIndex = 1010;
    dxfOptionDiv.style.padding = '10px';
    dxfOptionDiv.style.borderRadius = '10px';
    dxfOptionDiv.className = 'z-depth-2';

    var dxfForm = document.createElement('form');
    dxfForm.action = '#';

    var dxfP1 = document.createElement('p');
    var dxfInput1 = document.createElement('input');
    dxfInput1.name = 'group1';
    dxfInput1.type = 'radio';
    dxfInput1.id = 'dxfOptionLatLng';
    dxfInput1.setAttribute('checked','');
    var dxfLabel1 = document.createElement('label');
    dxfLabel1.setAttribute('for','dxfOptionLatLng');
    dxfLabel1.innerHTML = '經緯度';
    dxfP1.appendChild(dxfInput1);
    dxfP1.appendChild(dxfLabel1);

    var dxfP2 = document.createElement('p');
    var dxfInput2 = document.createElement('input');
    dxfInput2.name = 'group1';
    dxfInput2.type = 'radio';
    dxfInput2.id = 'dxfOptionTWD97';
    var dxfLabel2 = document.createElement('label');
    dxfLabel2.setAttribute('for','dxfOptionTWD97');
    dxfLabel2.innerHTML = 'TWD97';
    dxfP2.appendChild(dxfInput2);
    dxfP2.appendChild(dxfLabel2);

    var dxfP3 = document.createElement('p');
    var dxfInput3 = document.createElement('input');
    dxfInput3.name = 'group1';
    dxfInput3.type = 'radio';
    dxfInput3.id = 'dxfOptionTWD97O';
    var dxfLabel3 = document.createElement('label');
    dxfLabel3.setAttribute('for','dxfOptionTWD97O');
    dxfLabel3.innerHTML = '優化TWD97';
    dxfP3.appendChild(dxfInput3);
    dxfP3.appendChild(dxfLabel3);

    dxfForm.appendChild(dxfP1);
    dxfForm.appendChild(dxfP2);
    dxfForm.appendChild(dxfP3);


    var dxfOptionTitle = document.createElement('p');
    dxfOptionTitle.style.fontWeight = 800;
    dxfOptionTitle.className = 'grey-text';
    dxfOptionTitle.innerHTML = '請選擇輸出坐標格式';

    dxfOptionDiv.appendChild(dxfOptionTitle);
    dxfOptionDiv.appendChild(dxfForm);

    document.body.appendChild(dxfOptionDiv);    

    $("form").css('font-weight',800);
    
    var dxfEnterTimeout,dxfLiveTimeout,dataString;

    drawingToolsDrawingDxf.addEventListener('click', function() {

        if(document.getElementById('dxfOptionLatLng').checked){
            exportGeometryData(dataString,0);
        }

         if(document.getElementById('dxfOptionTWD97').checked){
            exportGeometryData(dataString,1);
        }

         if(document.getElementById('dxfOptionTWD97O').checked){
            exportGeometryData(dataString,2);
        }
        

    });

    drawingToolsDrawingDxf.addEventListener('mouseenter', function() {
        
        //collectGeometryData(Points,Polylines,Polygons);
        //console.log(dxfOptionLatLng.offsetWidth);

        dataString=collectGeometryData(Points,Polylines,Polygons);
        
        dxfOptionDiv.style.top = drawingToolsDrawingDxf.getBoundingClientRect().top-220+'px';
        dxfOptionDiv.style.left = drawingToolsDrawingDxf.getBoundingClientRect().left-100+'px';
        

        dxfEnterTimeout = setTimeout(function(){
            
            dxfOptionDiv.style.display = 'block';
            dxfOptionDiv.classList.remove('zoomOut');
            dxfOptionDiv.classList.add('animated','bounceIn'); 
        },700);


    });

    drawingToolsDrawingDxf.addEventListener('mouseleave', function() {
        
        clearTimeout(dxfEnterTimeout);

        dxfLeaveTimeout = setTimeout(function(){
            dxfOptionDiv.classList.remove('bounceIn');
            dxfOptionDiv.classList.add('zoomOut');
        },700);
    });

    dxfOptionDiv.addEventListener('mouseenter', function() {
        clearTimeout(dxfLeaveTimeout);
    });

    dxfOptionDiv.addEventListener('mouseleave', function() {
        dxfLeaveTimeout = setTimeout(function(){
            dxfOptionDiv.classList.remove('bounceIn');
            dxfOptionDiv.classList.add('zoomOut');
        },100);
    });


    //------------road map mode------------//

    document.getElementById('mapTypeRoad').addEventListener('click', function() {
        newmap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    });

    //------------satellite map mode------------//

    document.getElementById('mapTypeSatellite').addEventListener('click', function() {
        newmap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    });

    //------------hybrid map mode------------//

    document.getElementById('mapTypeMix').addEventListener('click', function() {
        newmap.setMapTypeId(google.maps.MapTypeId.HYBRID);
    });

    //------------zoom in map------------//

    document.getElementById('zoomIn').addEventListener('click', function() {
        var currentZoom = parseInt(zoomIndi.innerHTML);
        if (currentZoom < 19) {
            newmap.setZoom(currentZoom + 1);
            zoomIndi.innerHTML = (currentZoom) + 1;
        }
    });

    //------------zoom out map------------//

    document.getElementById('zoomOut').addEventListener('click', function() {
        var currentZoom = parseInt(zoomIndi.innerHTML);
        if (currentZoom > 1) {
            newmap.setZoom(currentZoom - 1);
            zoomIndi.innerHTML = (currentZoom) - 1;
        }

    });

    //------------map zoom change------------//

    google.maps.event.addListener(newmap, 'zoom_changed', function(event) {
        zoomIndi.innerHTML = newmap.getZoom();
    });


    //------------coordinate convertor modal------------//
    var convertorDiv = document.createElement('div');
    convertorDiv.id='convertorDiv';
    convertorDiv.className = "modal modal-fixed-footer col s12";
    var convertorContent = document.createElement('div');
    convertorContent.className = 'modal-content row';
    

    var convertorAddBtn = document.createElement('a');
    convertorAddBtn.className = 'waves-effect waves-light btn-floating btn-large green white-text';
    convertorAddBtn.herf='#!';
    convertorAddBtn.innerHTML = '<i class="material-icons">add</i>';
    convertorAddBtn.id = 'convertorAddBtn';
    

    var coordinateInputDivTitle = document.createElement('h3');
    coordinateInputDivTitle.className = 'center teal-text';
    coordinateInputDivTitle.style.fontWeight = 800;
    coordinateInputDivTitle.innerHTML = '坐標轉換';
    var coordinateInputDiv = document.createElement('div');
    coordinateInputDiv.className = 'input-field col s11';
    coordinateInputDiv.style.paddingLeft = 0;
    var coordinateInputBtn = document.createElement('input');
    coordinateInputBtn.id = 'coordinateInputBtn';
    coordinateInputBtn.type = 'text';
    coordinateInputBtn.className = 'validate';
    var coordinateInputBtnLabel = document.createElement('label');
    coordinateInputBtnLabel.for = 'coordinateInputBtn';
    coordinateInputBtnLabel.innerHTML = '請輸入坐標或地址';

    var coordinateTableDiv = document.createElement('table');
    coordinateTableDiv.className = 'col s12 striped bordered';
    coordinateTableDiv.id = 'coordinateTableDiv';

    var coordinateTbody = document.createElement('tbody');

    var coordinateTr = document.createElement('tr');
    var coordinateTr1 = document.createElement('tr');
    var coordinateTr2 = document.createElement('tr');
    var coordinateTr3 = document.createElement('tr');
    
    var coordinateTdLatLng = document.createElement('td');
    coordinateTdLatLng.id = 'tdLatLng';
    var coordinateTdLatLngTag = document.createElement('td');
    coordinateTdLatLngTag.innerHTML = '轉換後經緯度坐標:';

    var coordinateTdTWD97 = document.createElement('td');
    coordinateTdTWD97.id = 'tdTWD';
    var coordinateTdTWD97Tag = document.createElement('td');
    coordinateTdTWD97Tag.innerHTML = '轉換後TWD97坐標:';

    var coordinateTdTWD97O = document.createElement('td');
    coordinateTdTWD97O.id = 'tdTWDO';
    var coordinateTdTWD97OTag = document.createElement('td');
    coordinateTdTWD97OTag.innerHTML = '轉換後TWD97(優化)坐標:';

    var coordinateTdAddress = document.createElement('td');
    coordinateTdAddress.id = 'tdAddress';
    var coordinateTdAddressTag = document.createElement('td');
    coordinateTdAddressTag.innerHTML = '轉換後地址:';

    var converterCloseBtn = document.createElement('div');
    converterCloseBtn.className= 'modal-footer';
    var converterCloseA = document.createElement('a');
    converterCloseA.href='#!';
    converterCloseA.className = 'modal-action modal-close waves-effect red btn-flat white-text';
    converterCloseA.innerHTML = '離開';
    converterCloseBtn.appendChild(converterCloseA);

    coordinateTbody.appendChild(coordinateTr).appendChild(coordinateTdLatLngTag);
    coordinateTr.appendChild(coordinateTdLatLng);
    coordinateTbody.appendChild(coordinateTr2).appendChild(coordinateTdTWD97Tag);
    coordinateTr2.appendChild(coordinateTdTWD97);
    coordinateTbody.appendChild(coordinateTr3).appendChild(coordinateTdTWD97OTag);
    coordinateTr3.appendChild(coordinateTdTWD97O);
    coordinateTbody.appendChild(coordinateTr1).appendChild(coordinateTdAddressTag);
    coordinateTr1.appendChild(coordinateTdAddress);

    coordinateTableDiv.appendChild(coordinateTbody);

    coordinateInputDiv.appendChild(coordinateInputBtn);
    coordinateInputDiv.appendChild(coordinateInputBtnLabel);
    
    convertorContent.appendChild(coordinateInputDivTitle);
    convertorContent.appendChild(coordinateInputDiv);
    convertorContent.appendChild(convertorAddBtn);
    convertorContent.appendChild(coordinateTableDiv);

    convertorDiv.appendChild(convertorContent);
    convertorDiv.appendChild(converterCloseBtn);
    

    document.body.appendChild(convertorDiv);



    //------------coordinate convertor btn click------------//

    document.getElementById('convertTool').addEventListener('click',function(){

        $('#convertorDiv').openModal();
        
    });





    //------------coordinate convertor start------------//

    document.getElementById('coordinateInputBtn').addEventListener('input',function(){
        
        var firstValue,lastValue;

        var geocoding = new google.maps.Geocoder();

        if(this.value.indexOf(',')!=-1){
           
            firstValue = parseFloat(this.value.trim().substring(0,this.value.trim().indexOf(',')));
            lastValue =  parseFloat(this.value.trim().substring(this.value.trim().indexOf(',')+1,this.value.trim().length));
            
            if(lastValue>=21 && lastValue <=26){

                if(firstValue>=120 && firstValue <=122){

                    addedLat = lastValue;
                    addedLng = firstValue;
                    
                    coordinateTdLatLng.innerHTML = firstValue.toFixed(6)+","+lastValue.toFixed(6);
                    
                    var convertedValue = converTo97(lastValue,firstValue,0.9999); 
                    var convertedValueO = converTo97(lastValue,firstValue,0.999941); 
                    
                    coordinateTdTWD97.innerHTML = convertedValue.N+","+convertedValue.E;
                    coordinateTdTWD97O.innerHTML = convertedValueO.N+","+convertedValueO.E;
                
                
                    setTimeout(function(){
                        
                        geocoding.geocode({'location': {lat:lastValue,lng:firstValue}}, function(results, status) {
                           
                            if (status === google.maps.GeocoderStatus.OK) {
                        
                                coordinateTdAddress.innerHTML = results[0].formatted_address;
                                
                            }else if (status === google.maps.GeocoderStatus.ZERO_RESULTS){
                        
                                coordinateTdAddress.innerHTML = '搜尋不到相關地址坐標!';
                            }
                        });
                            
                    },500);

                }
                
            }

            if(firstValue>=2000000 && lastValue >=100000){

                var convertedLatLng = convertToLatLng(lastValue,firstValue,0.9999);
                var convertedValueO2 = converTo97(convertedLatLng.Lat,convertedLatLng.Lng,0.999941); 

                coordinateTdLatLng.innerHTML = convertedLatLng.Lng.toFixed(6)+","+convertedLatLng.Lat.toFixed(6);

                coordinateTdTWD97.innerHTML = firstValue.toFixed(6)+","+lastValue.toFixed(6);
                
                coordinateTdTWD97O.innerHTML = convertedValueO2.N+","+convertedValueO2.E

                addedLat = convertedLatLng.Lat;
                addedLng = convertedLatLng.Lng;

                setTimeout(function(){
    
                    geocoding.geocode({'location': {lat:convertedLatLng.Lat,lng:convertedLatLng.Lng}}, function(results, status) {
                           
                        if (status === google.maps.GeocoderStatus.OK) {
                                
                            coordinateTdAddress.innerHTML = results[0].formatted_address;
                                
                        }else if (status === google.maps.GeocoderStatus.ZERO_RESULTS){
                        
                            coordinateTdAddress.innerHTML = '搜尋不到相關地址坐標!';
                        }
                    });
        
                },500);
            }

        }else if(this.value.indexOf(',')==-1 && this.value!=''){

            var Address = this.value.trim();

            coordinateTdAddress.innerHTML = Address;

            setTimeout(function(){
                
                geocoding.geocode({'address': Address}, function(results, status) {
                   
                    if (status === google.maps.GeocoderStatus.OK) {
                        
                        coordinateTdLatLng.innerHTML = results[0].geometry.location.lng().toFixed(6)+","+results[0].geometry.location.lat().toFixed(6);
                        
                        addedLat = results[0].geometry.location.lat();
                        addedLng = results[0].geometry.location.lng();
                    
                        var convertedValue = converTo97(results[0].geometry.location.lat(),results[0].geometry.location.lng(),0.9999); 
                        var convertedValueO = converTo97(results[0].geometry.location.lat(),results[0].geometry.location.lng(),0.999941); 
                        
                        coordinateTdTWD97.innerHTML = convertedValue.N+","+convertedValue.E;
                        coordinateTdTWD97O.innerHTML = convertedValueO.N+","+convertedValueO.E;
                        
                    }else if (status === google.maps.GeocoderStatus.ZERO_RESULTS){
                        
                        coordinateTdAddress.innerHTML = '搜尋不到相關地址坐標!';
                    }
                });

            },500);


        }else if(this.value==''){
            coordinateTdLatLng.innerHTML = '';
            coordinateTdTWD97.innerHTML = '';
            coordinateTdTWD97O.innerHTML = '';
            coordinateTdAddress.innerHTML = '';
        }

    });
    
    document.getElementById('convertorAddBtn').addEventListener('click',function(){

        if(coordinateInputBtn.value.indexOf(',')!=-1 && coordinateInputBtn.value!=''){
            var newPoint = new google.maps.Marker({
                position:{lat:addedLat,lng:addedLng},
                map:newmap
            });
    
            newmap.setCenter({lat:addedLat,lng:addedLng});
            newmap.setZoom(16);
            zoomIndi.innerHTML = 16;
            
            setTimeout(function(){
                addNewPoint(newPoint,Points,pointId,newmap);
                pointId++;
            },500);
        }
        
    });

    //-------------drawing point remove btn hover event------------------//

    drawingToolsRemovePoint.style.top = (drawingToolsDrawingPoint.getBoundingClientRect().top-97)+"px";
    drawingToolsRemovePoint.style.left = (drawingToolsDrawingPoint.getBoundingClientRect().left)+"px";
    
    var pointHoverCountEnter,pointHoverCountLeave ;

    drawingToolsDrawingPoint.addEventListener('mouseover',function(){
        pointHoverCountEnter = setTimeout(function(){
            drawingToolsRemovePoint.style.display = 'block';
            drawingToolsRemovePoint.classList.remove('zoomOut');
            drawingToolsRemovePoint.classList.add('animated','bounceIn');
        },750);
    });

    drawingToolsDrawingPoint.addEventListener('mouseleave',function(){

        clearTimeout(pointHoverCountEnter);
        //drawingToolsRemovePoint.style.display = 'block';
        pointHoverCountLeave = setTimeout(function(){
            drawingToolsRemovePoint.classList.remove('bounceIn');
            drawingToolsRemovePoint.classList.add('zoomOut');
        },1000);

    });

    drawingToolsRemovePoint.addEventListener('mouseover',function(){

        clearTimeout(pointHoverCountLeave);

    });

    drawingToolsRemovePoint.addEventListener('mouseleave',function(){
        clearTimeout(pointHoverCountLeave);
        clearTimeout(pointHoverCountEnter);
        drawingToolsRemovePoint.classList.remove('bounceIn');
        drawingToolsRemovePoint.classList.add('zoomOut');

    });

    drawingToolsRemovePoint.addEventListener('click',function(){
       
       for(var i=0;i<Points.length;i++){
            Points[i].setMap(null);
       }
       pointId = 0;
       Points = [];

       infoWindowCloseIconA.click();

    });

    //-------------drawing point add multi point btn hover event------------------//

    drawingToolsAddMultiPoint.style.top = (drawingToolsDrawingPoint.getBoundingClientRect().top-48)+"px";
    drawingToolsAddMultiPoint.style.left = (drawingToolsDrawingPoint.getBoundingClientRect().left)+"px";
    
    var multiPointHoverCountEnter,multiPointHoverCountLeave ;

    drawingToolsDrawingPoint.addEventListener('mouseover',function(){
        multiPointHoverCountEnter = setTimeout(function(){
            drawingToolsAddMultiPoint.style.display = 'block';
            drawingToolsAddMultiPoint.classList.remove('zoomOut');
            drawingToolsAddMultiPoint.classList.add('animated','bounceIn');
        },700);
    });

    drawingToolsDrawingPoint.addEventListener('mouseleave',function(){

        clearTimeout(multiPointHoverCountEnter);
        //drawingToolsRemovePoint.style.display = 'block';
        multiPointHoverCountLeave = setTimeout(function(){
            drawingToolsAddMultiPoint.classList.remove('bounceIn');
            drawingToolsAddMultiPoint.classList.add('zoomOut');
        },1000);

    });

    drawingToolsAddMultiPoint.addEventListener('mouseover',function(){

        clearTimeout(multiPointHoverCountLeave);

    });

    drawingToolsAddMultiPoint.addEventListener('mouseleave',function(){
        clearTimeout(multiPointHoverCountLeave);
        clearTimeout(multiPointHoverCountEnter);
        drawingToolsAddMultiPoint.classList.remove('bounceIn');
        drawingToolsAddMultiPoint.classList.add('zoomOut');

    });

    drawingToolsAddMultiPoint.addEventListener('click',function(){
       
       

    });




    //-------------drawing line remove btn hover event------------------//

    drawingToolsRemoveLine.style.top = (drawingToolsDrawingLine.getBoundingClientRect().top-97)+"px";
    drawingToolsRemoveLine.style.left = (drawingToolsDrawingLine.getBoundingClientRect().left)+"px";

    var lineHoverCountEnter,lineHoverCountLeave ;

    drawingToolsDrawingLine.addEventListener('mouseover',function(){
        lineHoverCountEnter = setTimeout(function(){
            drawingToolsRemoveLine.style.display = 'block';
            drawingToolsRemoveLine.classList.remove('zoomOut');
            drawingToolsRemoveLine.classList.add('animated','bounceIn');
        },750);
    });

    drawingToolsDrawingLine.addEventListener('mouseleave',function(){

        clearTimeout(lineHoverCountEnter);

        lineHoverCountLeave = setTimeout(function(){
            drawingToolsRemoveLine.classList.remove('bounceIn');
            drawingToolsRemoveLine.classList.add('zoomOut');
        },1000);

    });

    drawingToolsRemoveLine.addEventListener('mouseover',function(){

        clearTimeout(lineHoverCountLeave);

    });

    drawingToolsRemoveLine.addEventListener('mouseleave',function(){
        clearTimeout(lineHoverCountLeave);
        clearTimeout(lineHoverCountEnter);
        drawingToolsRemoveLine.classList.remove('bounceIn');
        drawingToolsRemoveLine.classList.add('zoomOut');

    });

    drawingToolsRemoveLine.addEventListener('click',function(){
       
       for(var i=0;i<Polylines.length;i++){
            Polylines[i].setMap(null);
            polylineMarkers[i].setMap(null);
       }
       polylineId= 0;
       Polylines = [];
       polylineMarkers=[];

       infoWindowCloseIconA.click();

    });

    //-------------drawing line remove btn hover event------------------//

    drawingToolsAddMultiLine.style.top = (drawingToolsDrawingLine.getBoundingClientRect().top-48)+"px";
    drawingToolsAddMultiLine.style.left = (drawingToolsDrawingLine.getBoundingClientRect().left)+"px";

    var multiLineHoverCountEnter,multiLineHoverCountLeave ;

    drawingToolsDrawingLine.addEventListener('mouseover',function(){
        multiLineHoverCountEnter = setTimeout(function(){
            drawingToolsAddMultiLine.style.display = 'block';
            drawingToolsAddMultiLine.classList.remove('zoomOut');
            drawingToolsAddMultiLine.classList.add('animated','bounceIn');
        },700);
    });

    drawingToolsDrawingLine.addEventListener('mouseleave',function(){

        clearTimeout(multiLineHoverCountEnter);

        multiLineHoverCountLeave = setTimeout(function(){
            drawingToolsAddMultiLine.classList.remove('bounceIn');
            drawingToolsAddMultiLine.classList.add('zoomOut');
        },1000);

    });

    drawingToolsAddMultiLine.addEventListener('mouseover',function(){

        clearTimeout(multiLineHoverCountLeave);

    });

    drawingToolsAddMultiLine.addEventListener('mouseleave',function(){
        clearTimeout(multiLineHoverCountLeave);
        clearTimeout(multiLineHoverCountEnter);
        drawingToolsAddMultiLine.classList.remove('bounceIn');
        drawingToolsAddMultiLine.classList.add('zoomOut');

    });

    drawingToolsAddMultiLine.addEventListener('click',function(){
       

    });

    //-------------drawing polyline remove btn hover event(for area) ------------------//

    drawingToolsRemovePolyline.style.top = (drawingToolsDrawingPolyline.getBoundingClientRect().top-97)+"px";
    drawingToolsRemovePolyline.style.left = (drawingToolsDrawingPolyline.getBoundingClientRect().left)+"px";

    var polylineHoverCountEnter,polylineHoverCountLeave ;

    drawingToolsDrawingPolyline.addEventListener('mouseover',function(){
        polylineHoverCountEnter = setTimeout(function(){
            drawingToolsRemovePolyline.style.display = 'block';
            drawingToolsRemovePolyline.classList.remove('zoomOut');
            drawingToolsRemovePolyline.classList.add('animated','bounceIn');
        },750);
    });

    drawingToolsDrawingPolyline.addEventListener('mouseleave',function(){

        clearTimeout(polylineHoverCountEnter);

        polylineHoverCountLeave = setTimeout(function(){
            drawingToolsRemovePolyline.classList.remove('bounceIn');
            drawingToolsRemovePolyline.classList.add('zoomOut');
        },1000);

    });

    drawingToolsRemovePolyline.addEventListener('mouseover',function(){

        clearTimeout(polylineHoverCountLeave);

    });

    drawingToolsRemovePolyline.addEventListener('mouseleave',function(){
        clearTimeout(polylineHoverCountLeave);
        clearTimeout(polylineHoverCountEnter);
        drawingToolsRemovePolyline.classList.remove('bounceIn');
        drawingToolsRemovePolyline.classList.add('zoomOut');

    });

    drawingToolsRemovePolyline.addEventListener('click',function(){
       
       for(var i=0;i<Polygons.length;i++){
            Polygons[i].setMap(null);
            polygonMarkers[i].setMap(null);
       }
       polygonId= 0;
       Polygons = [];
       polygonMarkers=[];

       infoWindowCloseIconA.click();

    });

    //-------------drawing add multi polyline btn hover event(for area) ------------------//

    drawingToolsAddMultiPolyline.style.top = (drawingToolsDrawingPolyline.getBoundingClientRect().top-48)+"px";
    drawingToolsAddMultiPolyline.style.left = (drawingToolsDrawingPolyline.getBoundingClientRect().left)+"px";

    var multiPolylineHoverCountEnter,multiPolylineHoverCountLeave ;

    drawingToolsDrawingPolyline.addEventListener('mouseover',function(){
        multiPolylineHoverCountEnter = setTimeout(function(){
            drawingToolsAddMultiPolyline.style.display = 'block';
            drawingToolsAddMultiPolyline.classList.remove('zoomOut');
            drawingToolsAddMultiPolyline.classList.add('animated','bounceIn');
        },700);
    });

    drawingToolsDrawingPolyline.addEventListener('mouseleave',function(){

        clearTimeout(multiPolylineHoverCountEnter);

        multiPolylineHoverCountLeave = setTimeout(function(){
            drawingToolsAddMultiPolyline.classList.remove('bounceIn');
            drawingToolsAddMultiPolyline.classList.add('zoomOut');
        },1000);

    });

    drawingToolsAddMultiPolyline.addEventListener('mouseover',function(){

        clearTimeout(multiPolylineHoverCountLeave);

    });

    drawingToolsAddMultiPolyline.addEventListener('mouseleave',function(){
        clearTimeout(multiPolylineHoverCountLeave);
        clearTimeout(multiPolylineHoverCountEnter);
        drawingToolsAddMultiPolyline.classList.remove('bounceIn');
        drawingToolsAddMultiPolyline.classList.add('zoomOut');

    });

    drawingToolsAddMultiPolyline.addEventListener('click',function(){
       

    });

    //------------add molti obj modal------------//
    var addMultiObjDiv = document.createElement('div');
    addMultiObjDiv.id='addMultiObjDiv';
    addMultiObjDiv.className = "modal modal-fixed-footer col s12";
    var addMlutiContent = document.createElement('div');
    addMlutiContent.className = 'modal-content row';
    

    var addMultiPointBtn = document.createElement('a');
    addMultiPointBtn.className = 'waves-effect waves-light btn-floating btn-large red white-text';
    addMultiPointBtn.herf='#!';
    addMultiPointBtn.innerHTML = '<i class="material-icons">add</i>';
    addMultiPointBtn.id = 'addMultiPointBtn';
    addMultiPointBtn.style.display = 'none';

    var addMultiLineBtn = document.createElement('a');
    addMultiLineBtn.className = 'waves-effect waves-light btn-floating btn-large green white-text';
    addMultiLineBtn.herf='#!';
    addMultiLineBtn.innerHTML = '<i class="material-icons">add</i>';
    addMultiLineBtn.id = 'addMultiLineBtn';
    addMultiLineBtn.style.display = 'none';

    var addMultiPolylineBtn = document.createElement('a');
    addMultiPolylineBtn.className = 'waves-effect waves-light btn-floating btn-large blue white-text';
    addMultiPolylineBtn.herf='#!';
    addMultiPolylineBtn.innerHTML = '<i class="material-icons">add</i>';
    addMultiPolylineBtn.id = 'addMultiPolylineBtn';
    addMultiPolylineBtn.style.display = 'none';
    

    var addMultiObjTitle = document.createElement('h3');
    addMultiObjTitle.className = 'center teal-text';
    addMultiObjTitle.style.fontWeight = 800;
    addMultiObjTitle.innerHTML = '新增多幾何物件';
    var addMultiObjInputDiv = document.createElement('div');
    addMultiObjInputDiv.className = 'input-field col s11';
    addMultiObjInputDiv.style.paddingLeft = 0;
    var addMultiObjInputBtn = document.createElement('textarea');
    addMultiObjInputBtn.id = 'addMultiObjInputBtn';
    addMultiObjInputBtn.className = 'materialize-textarea';
    var addMultiObjInputBtnLabel = document.createElement('label');
    addMultiObjInputBtnLabel.for = 'addMultiObjInputBtn';
    addMultiObjInputBtnLabel.innerHTML = '請輸入多物件坐標陣列';

    var addMultiCloseBtn = document.createElement('div');
    addMultiCloseBtn.className= 'modal-footer';
    var addMultiCloseA = document.createElement('a');
    addMultiCloseA.href='#!';
    addMultiCloseA.className = 'modal-action modal-close waves-effect red btn-flat white-text';
    addMultiCloseA.innerHTML = '離開';
    addMultiCloseBtn.appendChild(addMultiCloseA);

    addMultiObjInputDiv.appendChild(addMultiObjInputBtn);
    addMultiObjInputDiv.appendChild(addMultiObjInputBtnLabel);
    
    addMlutiContent.appendChild(addMultiObjTitle);
    addMlutiContent.appendChild(addMultiObjInputDiv);
    addMlutiContent.appendChild(addMultiPointBtn);
    addMlutiContent.appendChild(addMultiLineBtn);
    addMlutiContent.appendChild(addMultiPolylineBtn);

    addMultiObjDiv.appendChild(addMlutiContent);
    addMultiObjDiv.appendChild(addMultiCloseBtn);
    
    document.body.appendChild(addMultiObjDiv);


    //-------------click point line polyline add multi obj btn--------------//

    drawingToolsAddMultiPoint.addEventListener('click',function(){
        addMultiPointBtn.style.display = 'block';
        addMultiLineBtn.style.display = 'none';
        addMultiPolylineBtn.style.display = 'none';
        $("#addMultiObjDiv").openModal();

    });

    drawingToolsAddMultiLine.addEventListener('click',function(){
        addMultiPointBtn.style.display = 'none';
        addMultiLineBtn.style.display = 'block';
        addMultiPolylineBtn.style.display = 'none';
        $("#addMultiObjDiv").openModal();

    });

    drawingToolsAddMultiPolyline.addEventListener('click',function(){
        addMultiPointBtn.style.display = 'none';
        addMultiLineBtn.style.display = 'none';
        addMultiPolylineBtn.style.display = 'block';
        $("#addMultiObjDiv").openModal();

    });

    //-------------click add multi point obj btn--------------//

    addMultiPointBtn.addEventListener('click',function(){
        
        var multiPointObjString = JSON.parse(addMultiObjInputBtn.value.trim());
        
        if(multiPointObjString){

            try{
                
                if(multiPointObjString.length%2==0){

                for(var i=0;i<multiPointObjString.length/2;i++){
                
                    if(multiPointObjString[i*2]<123){
                
                        var addedMultiMarker = new google.maps.Marker({
                            position:{lat:multiPointObjString[i*2+1],lng:multiPointObjString[i*2]},
                            map:newmap,
                        });
                
                        addNewPoint(addedMultiMarker,Points,pointId,newmap);
                        pointId++;
                
                    }else{
                        var addedLatLng = convertToLatLng(multiPointObjString[i*2+1],multiPointObjString[i*2],0.9999);
                        var addedMultiMarker = new google.maps.Marker({
                            position:{lat:addedLatLng.Lat,lng:addedLatLng.Lng},
                            map:newmap,
                        });
                
                        addNewPoint(addedMultiMarker,Points,pointId,newmap);
                        pointId++;
                    }
                    
                }

                }

            }
            catch(e){

            }
        }
        
    });


    //-------------click add multi line obj btn--------------//

    addMultiLineBtn.addEventListener('click',function(){
        
        var multiLineObjString = JSON.parse(addMultiObjInputBtn.value.trim());

        if(multiLineObjString){

            try{

                if(multiLineObjString.length>0){

                    for(var i=0;i<multiLineObjString.length;i++){
                             
                            var addedLineArray = [];
                            
                            for(var j=0;j<(multiLineObjString[i].length/2);j++){
                                
                                if(multiLineObjString[i][j*2]<123){
                                      
                                    addedLineArray.push(new google.maps.LatLng(parseFloat(multiLineObjString[i][j*2+1]),parseFloat(multiLineObjString[i][j*2])));
                    
                                }else if(multiLineObjString[i][j*2]>123){
                                    var addedLatLng = convertToLatLng(multiLineObjString[i][j*2+1],multiLineObjString[i][j*2],0.9999);
                                    addedLineArray.push(new google.maps.LatLng(parseFloat(addedLatLng.Lat),parseFloat(addedLatLng.Lng)));
                                }
                    
                            }
                    
                            //console.log(multiLineObjString[1]);
                            
                    
                            var addedLine = new google.maps.Polyline({
                                path:addedLineArray,
                                strokeWeight: 4,
                                strokeColor: "#4caf50",
                                strokeOpacity: 0.8,
                                editable: true,
                                map:newmap,
                            });
                    
                            addNewLine(addedLine,newmap,Polylines,polylineId,polylineMarkers);
                            Polylines.push(addedLine);
                            polylineId++;
                       
                    }

                }

            }
            catch(e){

            }
        }
        
    });

    //-------------click add multi polyline obj btn for area--------------//

    addMultiPolylineBtn.addEventListener('click',function(){
        
        var multiPolylineObjString = JSON.parse(addMultiObjInputBtn.value.trim());

        if(multiPolylineObjString){

            try{

                if(multiPolylineObjString.length>0){

                    for(var i=0;i<multiPolylineObjString.length;i++){
                            
                            var addedPolylineArray = [];
                    
                            for(var j=0;j<(multiPolylineObjString[i].length/2);j++){
                                
                                if(multiPolylineObjString[i][j*2]<123){
                                    
                                    if(j<(multiPolylineObjString[i].length/2-1)){
                    addedPolylineArray.push(new google.maps.LatLng(parseFloat(multiPolylineObjString[i][j*2+1]),parseFloat(multiPolylineObjString[i][j*2])));
                                    }else if(j==(multiPolylineObjString[i].length/2-1)){
                    addedPolylineArray.push(new google.maps.LatLng(parseFloat(multiPolylineObjString[i][j*2+1]),parseFloat(multiPolylineObjString[i][j*2])));
                    addedPolylineArray.push(new google.maps.LatLng(parseFloat(multiPolylineObjString[i][1]),parseFloat(multiPolylineObjString[i][0])));
                                    }
                          
                    
                                }else if(multiPolylineObjString[i][j*2]>123){
                    
                                    if(j<(multiPolylineObjString[i].length/2-1)){
                    var addedLatLng = convertToLatLng(multiPolylineObjString[i][j*2+1],multiPolylineObjString[i][j*2],0.9999);
                    addedPolylineArray.push(new google.maps.LatLng(parseFloat(addedLatLng.Lat),parseFloat(addedLatLng.Lng)));
                                    }else if(j==(multiPolylineObjString[i].length/2-1)){
                    var addedLatLng = convertToLatLng(multiPolylineObjString[i][j*2+1],multiPolylineObjString[i][j*2],0.9999);
                    addedPolylineArray.push(new google.maps.LatLng(parseFloat(addedLatLng.Lat),parseFloat(addedLatLng.Lng)));
                    var addedLatLngOri = convertToLatLng(multiPolylineObjString[i][1],multiPolylineObjString[i][0],0.9999);
                    addedPolylineArray.push(new google.maps.LatLng(parseFloat(addedLatLngOri.Lat),parseFloat(addedLatLngOri.Lng)));
                                    }
                                }
                    
                            }
                    
                    
                            var addedPolyline = new google.maps.Polygon({
                                paths:addedPolylineArray,
                                strokeWeight: 4,
                                strokeColor: '#03a9f4',
                                strokeOpacity: 0.8,
                                fillColor: "#455a64",
                                fillOpacity: 0.7,
                                editable: true,
                                map:newmap,
                            });
                            
                            Polygons.push(addedPolyline);
                            addNewPolyline(addedPolyline,newmap,Polygons,polygonId,polygonMarkers);
                            polygonId++;
                            
                    }

                }

            }
            catch(e){

            }
        }
        
    });

    //-------------- append menu div to body ------------------//
    $("#menuInfo").on('click',function(){

        if($("#shadowInfoWindow").length!=0){
            document.getElementById('shadowInfoWindow').style.display = 'none';
        }
        
        
        $("body").append("<div id='manu' class='modal' style='max-height:85% ;width:70%;'><div class='modal-content  z-depth-2'><h3 class='center cyan-text' style=\"font-weight: 800\">網站使用說明：</h3><ul class=\"collapsible popout\" data-collapsible=\"accordion\"><li><div class=\"collapsible-header\"><i class=\"red-text material-icons\">add_location</i>新增點位</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='FsWcZ4Bgq3s'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"red-text material-icons\">delete</i>刪除單一與多個點位</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='HJHeHx1XBps'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"red-text material-icons\">add</i>新增多個點位</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='5m-iQQArWMk'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"green-text material-icons\">timeline</i>新增線段</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='kQnOPMSGvmk'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"green-text material-icons\">delete</i>刪除單一線段與所有線段</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='-b6PXKqqhbo'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"green-text material-icons\">add</i>新增多條線段</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='aZA_uA_Z7wE'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"blue-text material-icons\">crop_5_4</i>新增多邊形</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='_ESwajD0CSU'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"blue-text material-icons\">delete</i>刪除單一與所有多邊形</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='zSIl0PXdBH4'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"blue-text material-icons\">add</i>新增複數多邊形</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='2TvTMKpPdfg'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"yellow-text material-icons\">camera_alt</i>地圖影像輸出</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='dSGAJAUYGHY'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"yellow-text material-icons\">camera_alt</i>地圖影像輸出-影像切換與其他操作</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='-ZsdWoPFMFc'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"orange-text material-icons\">save</i>輸出dxf檔</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='bBDCvI28Kww'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"teal-text material-icons\">find_replace</i>點位搜尋與坐標轉化</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='tc93lagcbg8'></div></div></div></li><li><div class=\"collapsible-header\"><i class=\"cyan-text material-icons\">burst_mode</i>地圖切換與地圖縮放</div><div class=\"collapsible-body center\"><div class='youtube-container'><div class='youtube-player' data-id='f32mp3aVh8o'></div></div></div></li>  </ul></div><div class='modal-footer'><a href='#!' class=\"modal-action modal-close waves-effect red white-text btn-flat\">離開</a></div></div></div>");
    
        
        youtubeMinify();

        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });



    });

    //-------------- append first come shadow window ------------------//

    if(Cookies.get('visit')==undefined){
        setTimeout(function(){
        var shadowInfoWindow = document.createElement('div');
        shadowInfoWindow.id='shadowInfoWindow';
        shadowInfoWindow.className='card animated fadeInRight Infinite';
        shadowInfoWindow.innerHTML = '<h4>第一次拜訪網站，請點擊 <a class="btn-floating red"><i class="white-text material-icons">priority_high</i></a> 按鈕觀看說明</h4>';
        shadowInfoWindow.style.top = menuInfo.getBoundingClientRect().top+'px';
        shadowInfoWindow.style.left = menuInfo.getBoundingClientRect().left+100+'px';
        shadowInfoWindow.style.borderRadius = '12px';
        document.body.appendChild(shadowInfoWindow);
        },1000);
    }else if(Cookies.get('visit')==true){
        
    }

    $("div").on('click',function(){
         if($("#shadowInfoWindow").length!=0){
            document.getElementById('shadowInfoWindow').style.display = 'none';
        }
    });
    
    //------------open biography-----------//

    $("body").append("<div id='bio' class='modal modal-fixed-footer'><div class='modal-content'><div class='card'><div class='card-content'> <sapn class='card-title'>關於網站</sapn><p>目前網頁仍在建制中，如果有任何建議，請email至:chenghungko@gmail.com </p></div></div></div><div class='modal-footer'><a href='#!' class=\"modal-action modal-close waves-effect red white-text btn-flat\">離開</a></div></div>");

    $("#aboutMe").on('click',function(){
        $("#bio").openModal();
    });


}//end gMap init

function addObjectInfo(parentId, addedObj) {
    //addedObj is json format object
    //parentId is the ul tag in windowinfo div,

    document.getElementById('infoWindow').style.display = 'block';
    var subObj = document.createElement('table');
    subObj.id = addedObj.id + 'Info';
    subObj.className = 'striped bordered';
    //subObj.style.border ='1px solid black';

    if (addedObj.type == 'point') {
        subObj.innerHTML = '<thead><tr><th><i class="small red-text material-icons">place</i></th><th>' + addedObj.name + '</th></tr></thead>' +
            '<tbody>' + '<tr><td>經緯度:</td>' + '<td>(' + addedObj.lng + ',' + addedObj.lat + ')</td></tr>' +
            '<tr>' + '<td>平面N,E坐標(TWD97):</td>' + '<td>(' + addedObj.twdN + ',' + addedObj.twdE + ')</td></tr>' +
            '<tr>' + '<td>平面N,E坐標(優化TWD97):</td>' + '<td>(' + addedObj.twdNO + ',' + addedObj.twdEO + ')</td></tr>' +
            '</tbody>';
    }

    if (addedObj.type == 'polyline') {
        subObj.innerHTML = '<thead><tr><th><i class="small green-text material-icons">timeline</i></th><th>' + addedObj.name + '</th></tr></thead>' + '<tbody><tr><td>路線長度(WGS84)</td>' + '<td>' + addedObj.wgs84Length + ' (m)</td></tr>' + '<tr><td>路線長度(TWD97)</td>' + '<td>' + addedObj.twd97Length + ' (m)</td></tr>' + '<tr><td>路線長度(優化TWD97)</td>' + '<td>' + addedObj.twd97LengthO + ' (m)</td></tr>' + '</tbody>';
    }

    if (addedObj.type == 'polygon') {
        subObj.innerHTML = '<thead><tr><th><i class="small blue-text material-icons">crop_5_4</i></th><th>' + addedObj.name + '</th></tr></thead>' +
            '<tbody><tr>' + '<td>區域面積(WGS84)</td>' + '<td>' + addedObj.wgs84Area + ' (m^2) = ' + (parseFloat(addedObj.wgs84Area) / 3.30578).toFixed(3) + ' (坪)</td></tr>' + '<tr><td>區域面積(TWD97)</td>' + '<td>' + addedObj.twd97Area + ' (m^2) = ' + (parseFloat(addedObj.twd97Area) / 3.30578).toFixed(3) + ' (坪)</td></tr>' + '<tr><td>區域面積(優化TWD97)</td>' + '<td>' + addedObj.twd97AreaO + ' (m^2) = ' + (parseFloat(addedObj.twd97AreaO) / 3.30578).toFixed(3) + ' (坪)</td></tr>' +
            '</tbody>';

    }

    var infoWindowMovingIconA = document.createElement('a');
    infoWindowMovingIconA.className = 'btn-floating cyan lighten-2';
    infoWindowMovingIconA.style.top = '-18px';
    infoWindowMovingIconA.style.left = '-18px';
    infoWindowMovingIconA.style.position = 'absolute';
    infoWindowMovingIconA.id = 'infoWindowMovingIcon';
    var infoWindowMovingIcon = document.createElement('i');
    infoWindowMovingIcon.className = 'material-icons';
    infoWindowMovingIcon.innerHTML = 'open_with';

    var infoWindowCloseIconA = document.createElement('a');
    infoWindowCloseIconA.className = 'btn-floating red lighten-2 waves-effect';
    infoWindowCloseIconA.style.top = '-18px';
    infoWindowCloseIconA.style.right = '-18px';
    infoWindowCloseIconA.style.position = 'absolute';
    infoWindowCloseIconA.id = 'infoWindowCloseIconA';
    var infoWindowCloseIcon = document.createElement('i');

    infoWindowCloseIcon.className = 'material-icons';
    infoWindowCloseIcon.innerHTML = 'clear';

    infoWindowMovingIconA.appendChild(infoWindowMovingIcon);
    infoWindowCloseIconA.appendChild(infoWindowCloseIcon);

    document.getElementById('infoWindow').innerHTML = '';
    document.getElementById('infoWindow').appendChild(subObj);
    document.getElementById('infoWindow').appendChild(infoWindowMovingIconA);
    document.getElementById('infoWindow').appendChild(infoWindowCloseIconA);

    document.getElementById('infoWindowCloseIconA').addEventListener('click', function() {
        document.getElementById('infoWindow').style.display = 'none';
    });

}

function twoDArray(number) {

    var twoarray = [];

    for (var i = 0; i < number; i++) {
        twoarray[i] = new Array();
    }

    return twoarray;

}

var coor97 = {
    a: 6378137,
    b: 6356752.31414,
    e2: 0.00669438,
    eplus2: 0.00673949675,
    X0: 250000,
    Y0: 0,
};

function converTo97(lat, lon, m0) {

    lat = lat * Math.PI / 180;
    lon = lon * Math.PI / 180;

    var T = Math.pow(Math.tan(lat), 2);
    var C = coor97.eplus2 * Math.pow(Math.cos(lat), 2);
    var A = (lon - 121 * Math.PI / 180) * Math.cos(lat);
    var N = coor97.a / Math.sqrt(1 - coor97.e2 * Math.pow(Math.sin(lat), 2));
    var G = coor97.a * ((1 - coor97.e2 / 4 - 3 * coor97.e2 * coor97.e2 / 64 - 5 * coor97.e2 * coor97.e2 * coor97.e2 / 256) * lat - (3 * coor97.e2 / 8 + 3 * coor97.e2 * coor97.e2 / 32 + 45 * coor97.e2 * coor97.e2 * coor97.e2 / 1024) * Math.sin(2 * lat) + (15 * coor97.e2 * coor97.e2 / 256 + 45 * coor97.e2 * coor97.e2 * coor97.e2 / 1024) * Math.sin(4 * lat) - (35 * coor97.e2 * coor97.e2 * coor97.e2 / 3072) * Math.sin(6 * lat));

    var X = coor97.X0 + m0 * N * (A + (1 - T + C) * A * A * A / 6 + (5 - 18 * T + T * T + 72 * C - 58 * coor97.eplus2) * Math.pow(A, 5) / 120);
    var Y = coor97.Y0 + m0 * (G + N * Math.tan(lat) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * Math.pow(A, 4) / 24 + (61 - 58 * T + T * T + 600 * C - 300 * coor97.eplus2) * Math.pow(A, 6) / 720));

    return { E: X.toFixed(6), N: Y.toFixed(6) };

}

function getPathLength(lengthArray97, lengthArray97O) {

    var pLength = 0;
    var pLengthO = 0;

    for (var i = 0; i < lengthArray97.length - 1; i++) {

        pLength = pLength + Math.sqrt(Math.pow((lengthArray97[i + 1][0] - lengthArray97[i][0]), 2) + Math.pow((lengthArray97[i + 1][1] - lengthArray97[i][1]), 2));
        pLengthO = pLengthO + Math.sqrt(Math.pow((lengthArray97O[i + 1][0] - lengthArray97O[i][0]), 2) + Math.pow((lengthArray97O[i + 1][1] - lengthArray97O[i][1]), 2));

    }

    return { twd97length: pLength.toFixed(6), twd97lengtho: pLengthO.toFixed(6) };

} //end pathLength only work for MVCObject array

function getArea(polygonPoints) {

    var A = 0;
    var B = 0;

    for (var i = polygonPoints.length - 1; i > -1; i--) {
        if (i > -1) {
            if (i == polygonPoints.length - 1) {
                A += polygonPoints[i][0] * polygonPoints[0][1];
                B += polygonPoints[i][1] * polygonPoints[0][0];
            } else {
                A += polygonPoints[i][0] * polygonPoints[i + 1][1];
                B += polygonPoints[i][1] * polygonPoints[i + 1][0];
            }

        }

    }

    return (Math.abs(A - B) / 2).toFixed(6);

}

function reflashPolyline(polylineObj, infoObj, infoMarker, Polylines) {

    var polylinePoints = polylineObj.getPath();
    var twd97line = twoDArray(polylinePoints.length);
    var twd97lineo = twoDArray(polylinePoints.length);

    for (var i = 0; i < polylinePoints.length; i++) {
        twd97line[i][0] = converTo97(polylinePoints.getAt(i).lat(), polylinePoints.getAt(i).lng(), 0.9999).E;
        twd97line[i][1] = converTo97(polylinePoints.getAt(i).lat(), polylinePoints.getAt(i).lng(), 0.9999).N;
        twd97lineo[i][0] = converTo97(polylinePoints.getAt(i).lat(), polylinePoints.getAt(i).lng(), 0.999941).E;
        twd97lineo[i][1] = converTo97(polylinePoints.getAt(i).lat(), polylinePoints.getAt(i).lng(), 0.999941).N;
    }

    var wgs84Length = (google.maps.geometry.spherical.computeLength(polylineObj.getPath()));
    var twd97Length = getPathLength(twd97line, twd97lineo);

    polylineObj.polylineId = polylineObj.polylineId;
    polylineObj.name = 'Polyline' + polylineObj.polylineId,
    polylineObj.type = 'polyline';
    polylineObj.wgs84Length = wgs84Length.toFixed(6);
    polylineObj.twd97Length = twd97Length.twd97length;
    polylineObj.twd97LengthO = twd97Length.twd97lengtho;
    polylineObj.twd97Path = twd97line;
    polylineObj.twd97PathO = twd97lineo;
    polylineObj.latlngPath = polylineObj.getPath();


    infoObj = {
        id: polylineObj.polylineId,
        name: polylineObj.name,
        type: 'polyline',
        wgs84Length: polylineObj.wgs84Length,
        twd97Length: polylineObj.twd97Length,
        twd97LengthO: polylineObj.twd97LengthO,
    };

    addObjectInfo('infoWindow', infoObj);
    Polylines[polylineObj.polylineId] = polylineObj;
    infoMarker.setPosition({ lat: polylinePoints.getAt(0).lat(), lng: polylinePoints.getAt(0).lng() });

}


function addNewPoint(newpoint,Points,pointId,newmap){

    newpoint.pointId = pointId;
    newpoint.type = 'point';
    newpoint.name = 'Point' + pointId;
    newpoint.lng = newpoint.getPosition().lng().toFixed(6);
    newpoint.lat = newpoint.getPosition().lat().toFixed(6);
    newpoint.wgsE = converTo97(newpoint.lat, newpoint.lng, 0.9996).E;
    newpoint.wgsN = converTo97(newpoint.lat, newpoint.lng, 0.9996).N;
    newpoint.twdE = converTo97(newpoint.lat, newpoint.lng, 0.9999).E;
    newpoint.twdN = converTo97(newpoint.lat, newpoint.lng, 0.9999).N;
    newpoint.twdEO = converTo97(newpoint.lat, newpoint.lng, 0.999941).E;
    newpoint.twdNO = converTo97(newpoint.lat, newpoint.lng, 0.999941).N;

    Points.push(newpoint);

    addObjectInfo('infoWindow', {
        id: newpoint.pointId,
        name: newpoint.name,
        type: 'point',
        lng: newpoint.lng,
        lat: newpoint.lat,
        wgsE: newpoint.wgsE,
        wgsN: newpoint.wgsN,
        twdE: newpoint.twdE,
        twdN: newpoint.twdN,
        twdNO: newpoint.twdNO,
        twdEO: newpoint.twdEO,
    });

    google.maps.event.addListener(newpoint, 'click', function() {
        addObjectInfo('infoWindow', {
            id: newpoint.pointId,
            name: newpoint.name,
            type: 'point',
            lng: newpoint.lng,
            lat: newpoint.lat,
            wgsE: newpoint.wgsE,
            wgsN: newpoint.wgsN,
            twdE: newpoint.twdE,
            twdN: newpoint.twdN,
            twdNO: newpoint.twdNO,
            twdEO: newpoint.twdEO,
        });
    });

    google.maps.event.addListener(newpoint, 'rightclick', function() {
        newpoint.setMap(null);
        Points.splice(newpoint.pointId, 1);
        document.getElementById('infoWindow').style.display = 'none';
    });

    var pointIdIndicator = new google.maps.InfoWindow({
        content: '<div class="red-text" style="font-weight:800">' + newpoint.name + '</div>'
    });

    pointIdIndicator.open(newmap, newpoint);

    google.maps.event.addListener(pointIdIndicator, 'domready', function() {
        $(".gm-style-iw").next("div").hide();
    });
}


function addNewLine(lineObj,newmap,Polylines,polylineId,polylineMarkers){
    
    var polylinePoints = lineObj.getPath();
    var twd97line = twoDArray(polylinePoints.length);
    var twd97lineo = twoDArray(polylinePoints.length);

    for (var i = 0; i < polylinePoints.length; i++) {

        twd97line[i][0] = converTo97(polylinePoints.getAt(i).lat(), polylinePoints.getAt(i).lng(), 0.9999).E;
        twd97line[i][1] = converTo97(polylinePoints.getAt(i).lat(), polylinePoints.getAt(i).lng(), 0.9999).N;
        twd97lineo[i][0] = converTo97(polylinePoints.getAt(i).lat(), polylinePoints.getAt(i).lng(), 0.999941).E;
        twd97lineo[i][1] = converTo97(polylinePoints.getAt(i).lat(), polylinePoints.getAt(i).lng(), 0.999941).N;

    }

    var wgs84Length = (google.maps.geometry.spherical.computeLength(lineObj.getPath()));
    var twd97Length = getPathLength(twd97line, twd97lineo);
    
    lineObj.polylineId = polylineId;
    lineObj.name = 'Polyline' + polylineId,
    lineObj.type = 'polyline';
    lineObj.wgs84Length = wgs84Length.toFixed(6);
    lineObj.twd97Length = twd97Length.twd97length;
    lineObj.twd97LengthO = twd97Length.twd97lengtho;
    lineObj.twd97Path = twd97line;
    lineObj.twd97PathO = twd97lineo;
    lineObj.latlngPath = lineObj.getPath();
    
    var infoObj = {
        id: lineObj.polylineId,
        name: lineObj.name,
        type: 'polyline',
        wgs84Length: lineObj.wgs84Length,
        twd97Length: lineObj.twd97Length,
        twd97LengthO: lineObj.twd97LengthO,
    };

    addObjectInfo('infoWindow', infoObj);

    google.maps.event.addListener(lineObj, 'click', function() {
        addObjectInfo('infoWindow', infoObj);
    });

    google.maps.event.addListener(lineObj.getPath(), 'set_at', function() {
        reflashPolyline(lineObj, infoObj, polylineMarker, Polylines);
    });

    google.maps.event.addListener(lineObj.getPath(), 'insert_at', function() {
        reflashPolyline(lineObj, infoObj, polylineMarker, Polylines);
    });

    var polylineMarker = new google.maps.Marker({
        position: { lat: polylinePoints.getAt(0).lat(), lng: polylinePoints.getAt(0).lng() },
        map: newmap,
        opacity: 0,
    });

    polylineMarkers.push(polylineMarker);

    google.maps.event.addListener(lineObj, 'rightclick', function() {
        lineObj.setMap(null);
        Polylines.splice(lineObj.polylineId, 1);
        polylineMarker.setMap(null);
        polylineMarkers.splice(lineObj.polylineId, 1);
        document.getElementById('infoWindow').style.display = 'none';

    });

    var polylineIdIndicator = new google.maps.InfoWindow({
        content: '<div class="green-text" style="font-weight:800">' + lineObj.name + '</div>'
    });

    polylineIdIndicator.open(newmap, polylineMarker);

    google.maps.event.addListener(polylineIdIndicator, 'domready', function() {
        $(".gm-style-iw").next("div").hide();
    });
    
}

function addNewPolyline(polylineObj,newmap,Polygons,polygonId,polygonMarkers){

    var polygonPoints = polylineObj.getPath();
    var twd97polygon = twoDArray(polygonPoints.length);
    var twd97polygono = twoDArray(polygonPoints.length);

    for (var i = 0; i < polygonPoints.length; i++) {

        twd97polygon[i][0] = converTo97(polygonPoints.getAt(i).lat(), polygonPoints.getAt(i).lng(), 0.9999).E;
        twd97polygon[i][1] = converTo97(polygonPoints.getAt(i).lat(), polygonPoints.getAt(i).lng(), 0.9999).N;
        twd97polygono[i][0] = converTo97(polygonPoints.getAt(i).lat(), polygonPoints.getAt(i).lng(), 0.999941).E;
        twd97polygono[i][1] = converTo97(polygonPoints.getAt(i).lat(), polygonPoints.getAt(i).lng(), 0.999941).N;

    }

    var wgs84Area = (google.maps.geometry.spherical.computeArea(polylineObj.getPath()));
    var twd97Area = getArea(twd97polygon);
    var twd97Areao = getArea(twd97polygono);

    polylineObj.polygonId = polygonId;
    polylineObj.name = 'Polygon' + polygonId,
    polylineObj.type = 'polygon';
    polylineObj.wgs84Area = wgs84Area.toFixed(6);
    polylineObj.twd97Area = twd97Area;
    polylineObj.twd97AreaO = twd97Areao;
    polylineObj.twd97Path = twd97polygon;
    polylineObj.twd97PathO = twd97polygono;

    var infoObj = {
        id: polylineObj.polygonId,
        name: polylineObj.name,
        type: 'polygon',
        wgs84Area: polylineObj.wgs84Area,
        twd97Area: polylineObj.twd97Area,
        twd97AreaO: polylineObj.twd97AreaO,
    };

    addObjectInfo('infoWindow', infoObj);

    google.maps.event.addListener(polylineObj, 'click', function() {
        addObjectInfo('infoWindow', infoObj);
    });


    google.maps.event.addListener(polylineObj.getPath(), 'set_at', function() {
        reflashPolygon(polylineObj, infoObj, polygonMarker, Polygons);
    });

    google.maps.event.addListener(polylineObj.getPath(), 'insert_at', function() {
        reflashPolygon(polylineObj, infoObj, polygonMarker, Polygons);
    });

    var polygonMarker = new google.maps.Marker({
        position: { lat: polygonPoints.getAt(0).lat(), lng: polygonPoints.getAt(0).lng() },
        map: newmap,
        opacity: 0,
    });

    polygonMarkers.push(polygonMarker);

    google.maps.event.addListener(polylineObj, 'rightclick', function() {
        polylineObj.setMap(null);
        Polygons.splice(polylineObj.polygonId, 1);
        polygonMarker.setMap(null);
        polygonMarkers.splice(polylineObj.polygonId, 1);
        document.getElementById('infoWindow').style.display = 'none';
    });


    var polygonIdIndicator = new google.maps.InfoWindow({
        content: '<div class="blue-text" style="font-weight:800">' + polylineObj.name + '</div>'
    });

    polygonIdIndicator.open(newmap, polygonMarker);

    google.maps.event.addListener(polygonIdIndicator, 'domready', function() {
        $(".gm-style-iw").next("div").hide();
    });
}

function reflashPolygon(polygonObj, infoObj, infoMarker, Polygons) {

    var polygonPoints = polygonObj.getPath();
    var twd97polygon = twoDArray(polygonPoints.length);
    var twd97polygono = twoDArray(polygonPoints.length);

    for (var i = 0; i < polygonPoints.length; i++) {
        twd97polygon[i][0] = converTo97(polygonPoints.getAt(i).lat(), polygonPoints.getAt(i).lng(), 0.9999).E;
        twd97polygon[i][1] = converTo97(polygonPoints.getAt(i).lat(), polygonPoints.getAt(i).lng(), 0.9999).N;
        twd97polygono[i][0] = converTo97(polygonPoints.getAt(i).lat(), polygonPoints.getAt(i).lng(), 0.999941).E;
        twd97polygono[i][1] = converTo97(polygonPoints.getAt(i).lat(), polygonPoints.getAt(i).lng(), 0.999941).N;
    }

    var wgs84Area = (google.maps.geometry.spherical.computeArea(polygonObj.getPath()));
    var twd97Area = getArea(twd97polygon);
    var twd97Areao = getArea(twd97polygono);

    polygonObj.polygonId = polygonObj.polygonId;
    polygonObj.name = 'Polygon' + polygonObj.polygonId,
        polygonObj.type = 'polygon';
    polygonObj.wgs84Area = wgs84Area.toFixed(6);
    polygonObj.twd97Area = twd97Area;
    polygonObj.twd97AreaO = twd97Areao;
    polygonObj.twd97Path = twd97polygon;
    polygonObj.twd97PathO = twd97polygono;

    infoObj = {
        id: polygonObj.polygonId,
        name: polygonObj.name,
        type: 'polygon',
        wgs84Area: polygonObj.wgs84Area,
        twd97Area: polygonObj.twd97Area,
        twd97AreaO: polygonObj.twd97AreaO,
    };

    addObjectInfo('infoWindow', infoObj);
    Polygons[polygonObj.polygonId] = polygonObj;

    infoMarker.setPosition({ lat: polygonPoints.getAt(0).lat(), lng: polygonPoints.getAt(0).lng() });

}


//-------- convert 97 to lat lng --------//
function convertToLatLng(X,Y,m0){
                
    var Y0=0;

    var e1= (1-Math.sqrt(1-coor97.e2))/(1+Math.sqrt(1-coor97.e2));
    var miu = (Y-Y0)/(coor97.a*m0*(1-coor97.e2/4-3*coor97.e2*coor97.e2/64-5*coor97.e2*coor97.e2*coor97.e2/256));
    var Lad1 = miu+(3*e1/2-27*Math.pow(e1,3)/32)*Math.sin(2*miu)+(21*e1*e1/16-55*Math.pow(e1,4)/32)*Math.sin(4*miu)+(151*Math.pow(e1,3)/96)*Math.sin(6*miu)+(1097*Math.pow(e1,4)/512)*Math.sin(miu*8);
    var N1=coor97.a/Math.sqrt(1-coor97.e2*Math.pow(Math.sin(Lad1),2));
    var T1=Math.pow(Math.tan(Lad1),2);
    var C1 = coor97.eplus2*Math.pow(Math.cos(Lad1),2);
    var M1 = coor97.a*(1-coor97.e2)/Math.pow((1-coor97.e2*Math.pow(Math.sin(Lad1),2)),1.5);
    var D = (X-250000)/(N1*m0);


    return {Lat:(Lad1-(N1*Math.tan(Lad1)/M1)*(D*D/2-(5+3*T1+10*C1-4*C1*C1-9*coor97.eplus2)*Math.pow(D,4)/24+(61+90*T1+298*C1+45*T1*T1-252*coor97.eplus2-3*C1*C1)*Math.pow(D,6)/720))*180/Math.PI,Lng:121+(D-(1+2*T1+C1)*D*D*D/6+(5-2*C1+28*T1-3*C1*C1+8*coor97.eplus2+24*T1*T1)*Math.pow(D,5)/120)/Math.cos(Lad1)*180/Math.PI};

}

//-------- get map scale --------//
var zoomScale=[];

zoomScale[0]=591657550.5;

for(var i=1;i<21;i++){
    zoomScale[i]=zoomScale[i-1]/2
}


//-------- get extanted map image --------//

function getExtentedMapImage(oriCenter,dLat,dLng,imageHeight,imageWidth,zoom,mapType){

    var eCenter = [];
    eCenter[0] = {lat:(oriCenter.lat-dLat),lng:(oriCenter.lng+dLng)};
    eCenter[1] = {lat:(oriCenter.lat),lng:(oriCenter.lng+dLng)};
    eCenter[2] = {lat:(oriCenter.lat+dLat),lng:(oriCenter.lng+dLng)};
    eCenter[3] = {lat:(oriCenter.lat-dLat),lng:(oriCenter.lng)};
    eCenter[4] = {lat:(oriCenter.lat+dLat),lng:(oriCenter.lng)};
    eCenter[5] = {lat:(oriCenter.lat-dLat),lng:(oriCenter.lng-dLng)};
    eCenter[6] = {lat:(oriCenter.lat),lng:(oriCenter.lng-dLng)};
    eCenter[7] = {lat:(oriCenter.lat+dLat),lng:(oriCenter.lng-dLng)};

    var eImageLink = [];
    for (var i=0;i<8;i++){
        eImageLink[i] = "https://maps.googleapis.com/maps/api/staticmap?center="+eCenter[i].lat+","+eCenter[i].lng+"&zoom="+zoom+"&scale=2"+"&size="+imageWidth+"x"+imageHeight+"&maptype="+mapType+"&format=jpg";
    }
    return eImageLink;

}


//-------- get extanted map image when zoomed --------//
function polygonZoomChanged(polygon,newmap,imageWidth,imageHeight){

    $("#toast-container").remove();

    var ne = polygon.getBounds().getNorthEast();
    var sw = polygon.getBounds().getSouthWest();
    
    var distanceE = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(ne.lat(),ne.lng()),new google.maps.LatLng(ne.lat(),sw.lng()));
    var distanceN = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(ne.lat(),ne.lng()),new google.maps.LatLng(sw.lat(),ne.lng()));
    
    //imageCenter = converTo97(event.getBounds().getCenter().lat(),event.getBounds().getCenter().lng(),0.9999);
        
    var rectangleCenter ={lat:polygon.getBounds().getCenter().lat(),lng:polygon.getBounds().getCenter().lng()};
    
    imageWidth = (((Math.abs(distanceE))/zoomScale[newmap.getZoom()]/0.00027608695)+35).toFixed(0);
    imageHeight = (((Math.abs(distanceN))/zoomScale[newmap.getZoom()]/0.00027608695)+35).toFixed(0);
    
    if(imageWidth>=640 || imageHeight>=640){

        var newboundLat = Math.abs((640)*zoomScale[newmap.getZoom()]*0.00027608695);
        var newboundLng = Math.abs((640)*zoomScale[newmap.getZoom()]*0.00027608695);
        var newDiff = (convertToLatLng(newboundLng+250000,newboundLat,0.9996));
        var newsw = new google.maps.LatLng((rectangleCenter.lat-newDiff.Lat/2),(rectangleCenter.lng-(newDiff.Lng-121)/2));
        var newne = new google.maps.LatLng((rectangleCenter.lat+newDiff.Lat/2),(rectangleCenter.lng+(newDiff.Lng-121)/2));
        var newBound = new google.maps.LatLngBounds(newsw,newne);

        polygon.setBounds(newBound);
               
        imageWidth = 640;
        imageHeight = 640;

    }

    var imageLink4btn = "https://maps.googleapis.com/maps/api/staticmap?center="+rectangleCenter.lat+","+rectangleCenter.lng+"&zoom="+newmap.getZoom()+"&scale=2"+"&size="+ imageWidth+"x"+imageHeight+"&maptype="+newmap.getMapTypeId()+"&format=jpg";
    
    $toastContent = $('<span>影像大小: '+imageWidth*2+' X '+imageHeight*2+'&nbsp'+'<a id="showMapImage" class="btn btn-floating waves-effect"><i class="material-icons">pageview</i></a>'+   '<a id="exporMapImage" class="blue btn btn-floating waves-effect"><i class="material-icons">cloud_download</i></a>'+'</span>');
    
    Materialize.toast($toastContent);

    $(".toast").css('borderRadius','24px');

    document.getElementById('exporMapImage').addEventListener('click',function(){
            
        document.getElementById("mapImageUrlInput").value = "https://maps.googleapis.com/maps/api/staticmap?center="+rectangleCenter.lat+","+rectangleCenter.lng+"&zoom="+newmap.getZoom()+"&scale=2"+"&size="+ imageWidth+"x"+imageHeight+"&maptype="+newmap.getMapTypeId()+"&format=jpg&lang=zh-tw";
        document.getElementById("mapImageUrlForm").submit();

    });

    document.getElementById('showMapImage').addEventListener('click',function(){

        document.getElementById('mapImageImg').src="https://maps.googleapis.com/maps/api/staticmap?center="+rectangleCenter.lat+","+rectangleCenter.lng+"&zoom="+newmap.getZoom()+"   &scale=2"+"&size="+imageWidth+"x"+imageHeight+"&maptype="+newmap.getMapTypeId()+"&format=jpg&lang=zh-tw";;
        $('#mapViewDiv').openModal();
    
    });
    
    $(".click-to-toggle li a").on('click',function(){
                
        if($(this).attr('id')!='captureImage' && $(this).attr('id')!='mapTypeRoad' && $(this).attr('id')!='mapTypeSatellite' && $(this).attr('id')!='mapTypeMix' && $(this).attr('id')!='movingMode'){
            $("#toast-container").remove();
        }
                
    });
}


function collectGeometryData(points,polylines,polygons){

    var pointsJSONString = twoDArray(points.length);
    var polylinesJSONString = twoDArray(polylines.length);
    var polygonsJSONString = twoDArray(polygons.length);

    for(var i=0;i<points.length;i++){
        pointsJSONString[i][0] = points[i].name;
        pointsJSONString[i][1] = [points[i].lng,points[i].lat];
        pointsJSONString[i][2] = [points[i].twdE,points[i].twdN];
        pointsJSONString[i][3] = [points[i].twdEO,points[i].twdNO];

    }
    
    for(var i=0;i<polylines.length;i++){

        polylinesJSONString[i][0] = new Array() ;
        polylinesJSONString[i][1] = new Array() ;
        polylinesJSONString[i][2] = new Array() ;

        polylinesJSONString[i][0][0] = 'Polyline' + polylines[i].polylineId;
        polylinesJSONString[i][1][0] = 'Polyline' + polylines[i].polylineId;
        polylinesJSONString[i][2][0] = 'Polyline' + polylines[i].polylineId;

        for(var j=0;j<polylines[i].getPath().length;j++){

            polylinesJSONString[i][0][j+1] = [polylines[i].getPath().getAt(j).lng(),polylines[i].getPath().getAt(j).lat()];
            polylinesJSONString[i][1][j+1] = polylines[i].twd97Path[j];
            polylinesJSONString[i][2][j+1] = polylines[i].twd97PathO[j]; 
                
        }

    }

    for(var i=0;i<polygons.length;i++){

        polygonsJSONString[i][0] = new Array() ;
        polygonsJSONString[i][1] = new Array() ;
        polygonsJSONString[i][2] = new Array() ;

        polygonsJSONString[i][0][0] = 'Polygon' + polygons[i].polygonId;
        polygonsJSONString[i][1][0] = 'Polygon' + polygons[i].polygonId;
        polygonsJSONString[i][2][0] = 'Polygon' + polygons[i].polygonId;

        for(var j=0;j<polygons[i].getPath().length;j++){

            polygonsJSONString[i][0][j+1] = [polygons[i].getPath().getAt(j).lng(),polygons[i].getPath().getAt(j).lat()];
            polygonsJSONString[i][1][j+1] = polygons[i].twd97Path[j];
            polygonsJSONString[i][2][j+1] = polygons[i].twd97PathO[j]; 
                
        }
    }

    return [pointsJSONString,polylinesJSONString,polygonsJSONString];
}

function exportGeometryData(dataString,mode){
    if(dataString[0].length>0){
        var pointOutputString='';

        for(var i=0;i<dataString[0].length;i++){

            if(i==0 && dataString[0].length>1){
                pointOutputString = '\"point\":['+'['+dataString[0][i][mode+1]+'],';
            }else if(i<dataString[0].length-1){
                pointOutputString += '['+dataString[0][i][mode+1]+'],';
            }else if(i==dataString[0].length-1){
                pointOutputString += '['+dataString[0][i][mode+1]+']]';
            }
    
            if(i==0 && dataString[0].length==1){
                pointOutputString = '\"point\":['+'['+dataString[0][i][mode+1]+']]';
            }
        }

    }else {
         var pointOutputString='\"point\":[]';
    }
    

    if(dataString[1].length>0){
        var polylineOutputString='\"polyline\":[';
        for(var i=0;i<dataString[1].length;i++){
        
            if(i<dataString[1].length-1){
    
                polylineOutputString +='[[\"'+dataString[1][i][mode][0]+'\"],';
    
                for(var j=1;j<dataString[1][i][mode].length;j++){
    
                    if(j<dataString[1][i][mode].length-1){
                        polylineOutputString += '['+dataString[1][i][mode][j]+'],';
                    }
                        
                    if(j==dataString[1][i][mode].length-1){
                        polylineOutputString += '['+dataString[1][i][mode][j]+']],';
                    }
                }
    
            }
    
            if(i==dataString[1].length-1){
    
                polylineOutputString +='[[\"'+dataString[1][i][mode][0]+'\"],';
    
                for(var j=1;j<dataString[1][i][mode].length;j++){
    
                    if(j<dataString[1][i][mode].length-1){
                        polylineOutputString += '['+dataString[1][i][mode][j]+'],';
                    }
                        
                    if(j==dataString[1][i][mode].length-1){
                        polylineOutputString += '['+dataString[1][i][mode][j]+']]]';
                    }
                }
    
            }
        
        }
    }else {
        var polylineOutputString='\"polyline\":[]';
    }

    if(dataString[2].length>0){
        var polygonOutputString='\"polygon\":[';
        for(var i=0;i<dataString[2].length;i++){
        
            if(i<dataString[2].length-1){
    
                polygonOutputString +='[[\"'+dataString[2][i][mode][0]+'\"],';
    
                for(var j=1;j<dataString[2][i][mode].length;j++){
    
                    if(j<dataString[2][i][mode].length-1){
                        polygonOutputString += '['+dataString[2][i][mode][j]+'],';
                    }
                        
                    if(j==dataString[2][i][mode].length-1){
                        polygonOutputString += '['+dataString[2][i][mode][j]+']],';
                    }
                }
    
            }
    
            if(i==dataString[2].length-1){
    
                polygonOutputString +='[[\"'+dataString[2][i][mode][0]+'\"],';
    
                for(var j=1;j<dataString[2][i][mode].length;j++){
    
                    if(j<dataString[2][i][mode].length-1){
                        polygonOutputString += '['+dataString[2][i][mode][j]+'],';
                    }
                        
                    if(j==dataString[2][i][mode].length-1){
                        polygonOutputString += '['+dataString[2][i][mode][j]+']]]';
                    }
                }
    
            }
        
        }
    }else{
        var polygonOutputString='\"polygon\":[]';;
    }
    

    document.getElementById('dxfExportInput').value = '{'+pointOutputString+','+polylineOutputString+','+polygonOutputString+'}';

    document.getElementById('dxfExportForm').submit();
   //console.log($("#dxfExportInput").val());

}

