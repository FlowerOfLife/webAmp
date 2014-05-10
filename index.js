//audio object
window.onload = (function () {
    /*	var wavesurfer = Object.create(WaveSurfer);
     */

    var editProgressBar = true;
    //Define Objects
    //Audio Object
    var audio = new Audio();
    audio.addEventListener('ended', function () {
        console.log('ended')
        playlist.controlles;
        buttonForword.onclick();
    });
    audio.src = '';
    //audio.controls = "true";
    audio.id = "audioElementId";
    //Main Panel
    var Panel = document.getElementById('Panel');
    //Add audio objct to Panel
    Panel.appendChild(audio);


    var playlist = {

        setTimer: function (timeInSec) {
            var timer = document.getElementById('timer');
            timer.innerText = playlist.readableDuration(timeInSec);

        },
        controlles: function () {
            //Controlls Buttons events
            var buttonPlay = document.getElementById('buttonPlay');
            var buttonStop = document.getElementById('buttonStop');
            var buttonForword = document.getElementById('buttonForword');
            var buttonbackword = document.getElementById('buttonBackword');
            //Play
            buttonPlay.onclick = function () {
                audio.play();
            };
            //Stop
            buttonStop.onclick = function () {
                console.log("POU")
                //wavesurfer.pause();
                audio.pause();
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
            audio.src = treckSrc;
        },

        addTracksNumbers: function (playingTrackId) {
            //Count trecks
            var rows = document.getElementById('playListTable').getElementsByTagName('TR');
            for (var i = 1; i < rows.length; i++) {
                rows[i].id = i;
                rowTd = rows[i].getElementsByTagName('td');
                //add track number to table
                rowTd[0].textContent = (i - 1) + ".";
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
            //button click to input click
            var inputFileDiv = document.getElementById('inputFileDiv');
            var openFileButton = document.getElementById('openFileButton');
            console.log(inputFileDiv)
            inputFileDiv.onclick = function () {
                openFileButton.click();
            }
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

            for (var file = 0; file < files.length; file++) {
                (function (file, files) {


                    //Get file Data
                    playlist.getTreckData(files[file], function (treckData) {
                        //Add to playlisy table
                        playlist.addTrackToPlaylistTable(treckData);
                    });

                })(file, files)
            }

        },
        volumeInput: function () {
            var volume = document.getElementById('volume');
            volume.onmousedown = function () {
                volume.onmousemove = function () {
                    audio.volume = this.value / 100;
                }
            }
        },
        getTreckData: function (file, callback) {
            try {
                id3(file, function (err, tags) {
                    var treck = {};
                    treck.file = file;
                    treck.id3Tags = tags;
                    callback(treck);
                })
            } catch (e) {
                console.log(e)
            }
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
            var tb = document.getElementById('tbody')
            //tr.id = files[file];
            tr.ondblclick = function () {

                tr.className = "playing";
                playlist.playTrack(treck.file, tr.id);

            }
            tr.appendChild(tdTreckNumber);
            tr.appendChild(tdTitle);
            tr.appendChild(tdArtist);
            tr.appendChild(tdTreckDuration);
            tdTitle.textContent = treck.id3Tags.title;
            //files[file].path;
            tdArtist.textContent = treck.id3Tags.artist;
            tb.appendChild(tr);
            //playlistTable.appendChild(tr)
            playlist.addTracksNumbers()
        },
        treckEntety: function () {
            this.file;
            this.id3Tags;
            return this;
        },
        setupProgressBar: function (min, max) {
            // setup progressbar
            progressBar = document.getElementById('trackProgressBar');
            progressBar.min = min;
            progressBar.max = max;

        },
        waveSerferLoadTreck: function () {
            var wav = document.getElementById('wave');
            wav.innerHTML = ''
            wavesurfer.init({
                container: '#wave',
                waveColor: '#008132',
                progressColor: 'yellow',
                height: 35,
                pixelRatio: 1
            });


            wavesurfer.load(audio.src);

            wavesurfer.on('ready', function () {
                //wavesurfer.draw()
            });
        },
        beatAnaliser: function () {
            context = new webkitAudioContext(); // AudioContext object instance
            analyser = context.createAnalyser(); // AnalyserNode method
            canvas = document.getElementById('analyser_render');
            canvas.innerHTML = '';
            ctx = canvas.getContext('2d');
            // Re-route audio playback into the processing graph of the AudioContext
            source = context.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(context.destination);
            console.log(analiser)

        },
        runningText: function (runningString) {
            var runningText = document.getElementById('runningText');
            runningText.innerHTML = runningString;
        },
        graphicEqualiser: function () {
            var analyser_render_c = document.getElementById('analyser_render_canvas');
            analyser_render_c.innerHTML = '';
            initMp3Player();

            var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
            // Initialize the MP3 player after the page loads all of its HTML into the window


            function initMp3Player() {
                //document.getElementById('audio_box').appendChild(audio);
                context = new webkitAudioContext(); // AudioContext object instance
                analyser = context.createAnalyser(); // AnalyserNode method
                canvas = document.getElementById('analyser_render_canvas');
                canvas.innerHTML = '';
                ctx = canvas.getContext('2d');
                // Re-route audio playback into the processing graph of the AudioContext
                source = context.createMediaElementSource(audio);
                source.connect(analyser);
                analyser.connect(context.destination);
                frameLooper();
            }
            // frameLooper() animates any style of graphics you wish to the audio frequency
            // Looping at the default frame rate that the browser provides(approx. 60 FPS)
            function frameLooper() {
                window.webkitRequestAnimationFrame(frameLooper);
                fbc_array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(fbc_array);
                //console.log(fbc_array)
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
                ctx.fillStyle = '#14dc14'; // Color of the bars
                bars = 100;
                for (var i = 0; i < bars; i++) {
                    bar_x = i * 3;
                    bar_width = 2;
                    bar_height = -(fbc_array[i] / 2);
                    //fillRect( x, y, width, height ) // Explanation of the parameters below
                    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
                }
            }
        },
        playTrack: function (trackObjrct, tdId) {
            playlist.volumeInput();
            //numirate tracks for forword/back
            playlist.addTracksNumbers();
            //change class played file
            playlist.addPlayStopCssClass(tdId);
            //play audio element
            audio.src = URL.createObjectURL(trackObjrct);
            //audio.volume = 0.01;
            audio.play();
            audio.addEventListener('loadedmetadata', function () {
                progressBar.max = audio.duration;
            });
            //runningText(String)
            playlist.runningText(trackObjrct.name);
            //playlist.waveSerferLoadTreck();
            //setup progress bar
            progressBar = document.getElementById('treckProgressBar');

            progressBar.onmouseup = function () {
                progressBar.onmousemove = '';
                editProgressBar = true;
                audio.currentTime = this.value;

            }
            progressBar.onmousedown = function () {
                editProgressBar = false;
                playlist.setTimer(this.value)
                progressBar.onmousemove = function () {
                    //editProgressBar = false;
                    playlist.setTimer(this.value)
                }
            }


            audio.addEventListener('timeupdate', function (duration) {
                if (editProgressBar == true) {
                    progressBar.value = audio.currentTime;
                    playlist.setTimer(audio.currentTime)
                    //console.log(audio.currentTime);
                }
            });

        }
    }


    playlist.openFiles()
    //  Panel.appendChild(playlist.openFiles());
    window.onload = (function () {

        console.log('PPPPPCCC');
        var audio_file = document.getElementById('audio_file');
    })
    playlist.graphicEqualiser();
    playlist.controlles();

})