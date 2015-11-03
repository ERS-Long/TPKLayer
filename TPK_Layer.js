define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/form/Button',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom', 
    'dojo/domReady!',
    'dojo/on',
    'dojo/text!./TPK_Layer/templates/TPK_Layer.html',
    'dojo/topic',
    'xstyle/css!./TPK_Layer/css/TPK_Layer.css',
    'dojo/dom-construct',
    'dojo/_base/Color',

    'esri/graphic',
    'esri/IdentityManager',
    'esri/layers/GraphicsLayer',
    'esri/layers/ArcGISDynamicMapServiceLayer',
    'esri/layers/ImageParameters',
    'esri/tasks/IdentifyTask',
    'esri/tasks/IdentifyParameters',
    'esri/InfoTemplate',
    'esri/dijit/Legend',
    './TPK_Layer/offline-tpk-src'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Button, lang, arrayUtils, dom, ready, on, template, topic, css, domConstruct, Color, Graphic, 
    IdentityManager, GraphicsLayer, ArcGISDynamicMapServiceLayer, ImageParameters, IdentifyTask, IdentifyParameters, InfoTemplate, Legend
    ) {
    var tpkLayer;
    var map, map1;
    var identifyTask, identifyParams;
    var legend;
    var fileInput, fileInputField;

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        name: 'ESRI-TPK',
        map: true,
        widgetsInTemplate: true,
        templateString: template,
        mapClickMode: null,

        postCreate: function(){
            this.inherited(arguments);
            map = this.map;
/*
            fileInputField = document.getElementById("file-input-field");
            fileInput = document.getElementById("file-input");
            fileInput.addEventListener('change', function() {
                console.log("File success");
                fileInputField.value = fileInput.files[0].name;
                this.zipParser(fileInput.files[0]);
            },false);
*/
        },

        AddTPKLayer: function () {
            fileInput = document.getElementById("file-input");
            console.log(fileInput.files[0]);
            this.zipParser(fileInput.files[0]);

            fileInputField = document.getElementById("file-input-field");
            fileInput = document.getElementById("file-input");
            fileInput.addEventListener('change', function() {
                console.log("File success");
               // fileInputField.value = fileInput.files[0].name;
                this.zipParser(fileInput.files[0]);
            },false);

        },

        onAddTPKLayer: function()
        {
            this.AddTPKLayer();
        },

        zipParser: function (blob){
            console.log("in zip file.");
            O.esri.zip.createReader(new O.esri.zip.BlobReader(blob), function (zipReader) {
                zipReader.getEntries(function (entries) {
                   // this.initMap(entries);
                    if(tpkLayer != null){
                        map.removeLayer(tpkLayer);
                    //    map.destroy();
                        tpkLayer = null;
                    }

//map1 = BootstrapMap.create("mapDiv1",{});

                    console.log("1");
                    tpkLayer = new O.esri.TPK.TPKLayer();
                    
                    console.log("2");
                    tpkLayer.on("progress", function (evt) {
                        console.log("TPK loading...");
                    })

                    console.log("3");
                    console.log(entries);
                    tpkLayer.extend(entries);

                    console.log("4");
                    map.addLayer(tpkLayer);
                    console.log(tpkLayer);
                    //if(entries)alert("TPK downloaded and unzipped!");
                    zipReader.close(function(evt){
                        console.log("Done reading zip file.")
                    })
                }, function (err) {
                    alert("There was a problem reading the file!: " + err);
                })
            })
        },
/*
        initMap: function (entries){
            //Destroy the old map so we can reload a new map
            if(tpkLayer != null){
                map.removeLayer(tpkLayer);
            //    map.destroy();
                tpkLayer = null;
            }

            //map = BootstrapMap.create("mapDiv",{});
           // console.log("1");
            tpkLayer = new O.esri.TPK.TPKLayer();
          //  console.log("2");
            tpkLayer.on("progress", function (evt) {
                console.log("TPK loading...");
            })
          //  console.log("3");
            tpkLayer.extend(entries);
         //   console.log("4");
            map.addLayer(tpkLayer);
        },
*/
        onClear: function()
        {
            //needs to remove the service
            if (dynamicMapServiceLayer){
                this.map.removeLayer(dynamicMapServiceLayer)
                dynamicMapServiceLayer = null;
            }
                
        }

    });
});
