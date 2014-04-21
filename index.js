    //audio object
    window.onload = (function () {

        var wavesurfer = Object.create(WaveSurfer);
        var wavesurfer = wavesurfer;
        wavesurfer.init({
            container: document.querySelector('#wave'),
            waveColor: '#ebff00',
            progressColor: '#ff8f0d',
            height: '100',
            minPxPerSec: 5,
            fillParent: true
        });


        //Define Objects
        //Audio Object
        var audio = document.createElement('audio');
        audio.controls = "true";
        audio.id = "audioElementId";
        //Main Panel
        var Panel = document.getElementById('Panel');
        //Add audio objct to Panel
        Panel.appendChild(audio);
        var playlist = {

            controlles: function () {
                //Controlls Buttons events 
                var buttonPlay = document.getElementById('buttonPlay');
                var buttonStop = document.getElementById('buttonStop');
                var buttonForword = document.getElementById('buttonForword');
                var buttonbackword = document.getElementById('buttonBackword');
                //Play
                buttonPlay.onclick = function () {
                    wavesurfer.play();
                };
                //Stop
                buttonStop.onclick = function () {
                    console.log("POU")
                    wavesurfer.pause();
                };
                //Forword
                buttonForword.onclick = function () {
                    nowPlaying = document.getElementsByClassName('playing');
                    nextTrack = document.getElementById(parseInt(nowPlaying[0].id) + 1);
                    nextTrack.ondblclick();
                };
                //Back
                buttonbackword.onclick = function () {
                    nowPlaying = document.getElementsByClassName('playing');
                    nextTrack = document.getElementById(parseInt(nowPlaying[0].id) - 1);
                    nextTrack.ondblclick();
                };
            },

            addAudioToPlayer: function (treckSrc) {
                //Add audio file to playlist
                //var treckSrc = file bulb src
                audio.src = treckSrc;
            },

            addTracksNumbers: function (playingTrackId) {
                console.log(playingTrackId)
                //Count trecks
                var rows = document.getElementById('playListTable').getElementsByTagName('TR');
                for (var i = 1; i < rows.length; i++) {
                    rows[i].id = i;
                    rowTd = rows[i].getElementsByTagName('td');
                    //add track number to table
                    rowTd[0].textContent = i;
                }
            },
            addPlayStopCssClass: function (playingTrackId) {
                //Count trecks
                var rows = document.getElementById('playListTable').getElementsByTagName('TR');
                for (var i = 1; i < rows.length; i++) {
                    //change class in case Play/Pouse
                    if (playingTrackId == i) {
                        rows[i].className = 'Playing';
                    } else {
                        rows[i].className = 'Paused';
                    }
                }
            },
            openFiles: function () {
                //get files from input
                document.getElementById('openFileButton');
                //event when files open
                openFileButton.onchange = (function () {
                    var audioFiles = this.files;
                    playlist.processFiles(this.files, playlist.addTracksNumbers())
                })
            },

            processFiles: function (files, callback) {
                //ptocess files
                for (file in files) {
                    (function (file, files) {
                        if (!isNaN(file)) {
                            //Get file Data
                            playlist.getTreckData(files[file], function (treckData) {
                                //Add to playlisy table
                                playlist.addTrackToPlaylistTable(treckData);
                            });
                        }
                    })(file, files)
                }

            },
            getTreckData: function (file, callback) {
                id3(file, function (err, tags) {
                    var treck = new playlist.treckEntety();
                    treck.file = file;
                    treck.id3Tags = tags;
                    callback(treck);
                })
            },
            readableDuration: function (seconds) {
                sec = Math.floor(seconds);
                min = Math.floor(sec / 60);
                min = min >= 10 ? min : '0' + min;
                sec = Math.floor(sec % 60);
                sec = sec >= 10 ? sec : '0' + sec;
                return min + ':' + sec;
            },
            addTrackToPlaylistTable: function (treck) {
                var playlistTable = document.getElementById('playListTable');
                var tr = function () {
                    return document.createElement('tr')
                };
                var td = function () {
                    return document.createElement('td')
                };
                var tdTreckNumber = new td;
                var tdTitle = new td;
                var tdArtist = new td;
                var tdTreckDuration = new td;
                var tr = new tr;
                //console.log(files[file])
                tr.onmouseover = function () {
                    this.style.fontWeight = 'bold'
                }
                tr.onmouseout = function () {
                    this.style.fontWeight = ''
                }
                //tr.id = files[file];
                tr.ondblclick = function () {
                    tr.className = "playing";
                    document.querySelector('#wave')
                    playlist.playTrack(treck.file, tr.id);

                }
                tr.appendChild(tdTreckNumber);
                tr.appendChild(tdTitle);
                tr.appendChild(tdArtist);
                tr.appendChild(tdTreckDuration);
                tdTitle.textContent = treck.id3Tags.title;
                //files[file].path;
                tdArtist.textContent = treck.id3Tags.artist;
                //tdTreckDuration.textContent = files[file].duration;
                playlistTable.appendChild(tr)

            },
            treckEntety: function () {
                this.file;
                this.id3Tags;
                return this;
            },
            playTrack: function (trackObjrct, tdId) {
                playlist.addTracksNumbers()
                playlist.addPlayStopCssClass(tdId);
                // Play after treck was loaded to wavesurfer
                (function () {
                    var progressDiv = document.querySelector('#progress-bar');
                    var progressBar = progressDiv.querySelector('.progress-bar');

                    var showProgress = function (percent) {
                        console.log(percent)
                        if (percent == 100) {
                            // console.log('loaded');
                            wavesurfer.play()
                        }
                        //progressDiv.style.display = 'block';
                        //progressBar.style.width = percent + '%';
                    };

                    var hideProgress = function () {
                        progressDiv.style.display = 'none';
                    };

                    wavesurfer.on('loading', showProgress);
                    wavesurfer.on('ready', hideProgress);
                    wavesurfer.on('destroy', hideProgress);
                    wavesurfer.on('error', hideProgress);
                }());

                wavesurfer.on('ready', function () {
                    wavesurfer.play();
                    //wavesurfer.createDrawer();
                    console.log(wavesurfer.getDuration())
                });
                // wavesurfer load track bolb url
                wavesurfer.load(URL.createObjectURL(trackObjrct));
                //audio.src = URL.createObjectURL(trackObjrct);
            }
        }


        playlist.openFiles()
        //  Panel.appendChild(playlist.openFiles());
        window.onload = (function () {
            console.log('PPPPPCCC');
            var audio_file = document.getElementById('audio_file');
        })

        playlist.controlles();

    })