"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry) {

    $scope.url = "http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2015.mp3";

    $scope.downloadlist = [];

    $scope.getFile = function(url) {

        var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
        if (matches.length > 1) {
            return matches[1];
        }
        return null;

    };


    $scope.error = function(error) {

        alert('plugin got error');

    };

       $scope.status = function(id, msg) {

        var status = document.getElementById(id);
        status.innerHTML = msg;
    }


    $scope.done = function(result) {


        if (result) {

            if (result.data.type == 'pause') {

                 $scope.status(result.data.callbackId+1,'Pause Triggered')
            }

            if (result.data.type == 'resume') {


                $scope.status(result.data.callbackId+1,'Resume Triggered')
            }

            if (result.data.type == 'cancel') {

                $scope.status(result.data.callbackId+1,'Cancel Triggered')
            }


            if (result.data.type == 'status') {

                 $scope.status(result.data.callbackId+1,'Status Triggered - Progress '  + result.data.progress)

            }

        }


    };


    $scope.pauseDownload = function(callback) {


        BackgroundDownload.pauseDownload($scope.done, $scope.error, callback);

    };

    $scope.cancelDownload = function(callback) {

        BackgroundDownload.cancelDownload($scope.done, $scope.error, callback);

    };

    $scope.resumeDownload = function(callback) {

        BackgroundDownload.resumeDownload($scope.done, $scope.error, callback);

    };

    $scope.statusOfDownload = function(callback) {

        BackgroundDownload.statusOfDownload($scope.done, $scope.error, callback);

    };

    $scope.download = function(url) {
        var download = function(url) {
            this.file = $scope.getFile(url);
            this.url = url;
            this.status = 'Download Initiated';
        };

        download.prototype = {
            file: null,
            url: null,
            callbackid: null,
            setCallbackid: function(value) {
                download.prototype.callbackid = value;
            },
            Downloadcallback: function(data) {



                if (data && typeof data.callback != 'undefined') {
                    download.prototype.setCallbackid(data.callback.id);
                }

                if (data && typeof data.progress != 'undefined') {


                    var status = document.getElementById(data.progress.callbackId);

                    status.innerHTML = (parseFloat(100 * data.progress.bytesReceived / data.progress.totalBytesToReceive)).toFixed(2) + '%';
                }

                if (data && typeof data.complete != 'undefined') {

                    var status = document.getElementById(data.complete.callbackId);

                    //file path variable = data.complete.path


                    status.innerHTML = (data.complete.callbackId, 'complete' );

                }

            },
            startDownload: function() {

                BackgroundDownload.startDownload(this.Downloadcallback, $scope.error, this.url);
            }
        };

        var obj = new download(url);

        obj.startDownload();

        return obj;
    };


    $scope.addNewDownload = function() {


        var data = $scope.download($scope.url);

        //  alert(angular.toJson(data));

        this.downloadlist.push(data);



    };


});