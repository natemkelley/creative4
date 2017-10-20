//declaration of playlist app
var playlistApp = angular.module('playlistApp', []);

//playlist controller
playlistApp.controller('playlistController', function ($scope) {
    //random number to choose background color
    var randomNum = function (min, max) {
        return Math.floor((Math.random() * max));
    }

    //choose a random background color
    $scope.radio = {
        backgrounds: ['#535353', '#3498db', '#9b59b6', '#e67e22', '#e74c3c', '#0fe5e5', '#26c96b', '#d1e536', '#966020', '#dedede', '#d833b8'],
        playing: false
    };

    //choose a background from the backgrounds array
    $scope.radio.background = $scope.radio.backgrounds[randomNum(0, $scope.radio.backgrounds.length)];

    // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    window.onYouTubeIframeAPIReady = function () {
        $scope.player = new YT.Player('player', {
            height: '180',
            width: '180',
            videoId: 'siRMGLA6FsU', //video id from youtube
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            },
            playerVars: {
                'controls': 0,
                'showinfo': 0
            }
        });
    }

    //Youtube built in API call that triggers the video player is ready.
    function onPlayerReady(event) {
        //immediately load and pause video
        event.target.pauseVideo();
        //create variable with video information in it. track.title;track.author; etc.
        $scope.$apply(function () {
            $scope.track = event.target.getVideoData();
        });
        //change play button icon
        $scope.radio.playing = false;
    }

    //Youtube built in API call that triggers when the player's state changes.
    function onPlayerStateChange(event) {
        $scope.$apply(function () {
            $scope.track = event.target.getVideoData();
        });
        //change the icon if player is playing
        if (event.data == YT.PlayerState.PLAYING) {
            $scope.$apply(function () {
                $scope.radio.playing = true;
            });
        } else {
            $scope.$apply(function () {
                $scope.radio.playing = false;
            });
        }
        $scope.radio.background = $scope.radio.backgrounds[randomNum(0, $scope.radio.backgrounds.length)];

    }

    //when play button is clicked these functions fire
    $scope.playVideo = function () {
        console.log("playing video");
        $scope.player.playVideo();
    }

    $scope.pauseVideo = function () {
        console.log("pausing video");
        $scope.player.pauseVideo();
    }

    $scope.nextVideo = function () {
        $scope.player.nextVideo();
    }


    //change video id function
    $scope.playVideoById = function (nextVideoId) {
        console.log("selecting new video by id");
        console.log("new video id:" + nextVideoId);
        $scope.player.loadVideoById(nextVideoId);
        $scope.radio.background = $scope.radio.backgrounds[randomNum(0, $scope.radio.backgrounds.length)];

    }
});
