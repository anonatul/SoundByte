// DOM Elements
const playButton = document.getElementById("play-btn"); // Button to play the current song
const pauseButton = document.getElementById("pause-btn"); // Button to pause the current song
const previousButton = document.getElementById("previous-btn"); // Button to play the previous song
const nextButton = document.getElementById("next-btn"); // Button to play the next song
const shuffleButton = document.getElementById("shuffle-btn"); // Button to shuffle the playlist
const playlistSongs = document.getElementById("playlist-songs"); // Container for the song list
const playerDisplayTitle = document.getElementById("player-display-title"); // Display for the current song title
const playerDisplayArtist = document.getElementById("player-display-artist"); // Display for the current song artist
const albumArtImage = document.querySelector("#player-album-art img"); // Image element for the album art

// Audio Setup
const audio = new Audio(); // Create a new audio object for playback

// Song Data
const allSongs = [
    { id: 1, title: "Aansu", artist: "Auj", filePath: "/assets/songs/Aansu.mp3", albumArt: "/assets/album-arts/Aansu.jpg", duration: null },
    { id: 2, title: "Bekhana", artist: "Ali Tariq; Harshdeep Kaur", filePath: "/assets/songs/Bekhana.mp3", albumArt: "/assets/album-arts/Bekhana.jpg", duration: null },
    { id: 3, title: "Dil Haara", artist: "Asim Azhar", filePath: "/assets/songs/Dil Haara.mp3", albumArt: "/assets/album-arts/Dil Haara.jpg", duration: null },
    { id: 4, title: "Din Dhalay", artist: "Bayaan", filePath: "/assets/songs/Din Dhalay.mp3", albumArt: "/assets/album-arts/bayaan.jpg", duration: null },
    { id: 5, title: "Faasle", artist: "Kaavish; Quratulain Balouch", filePath: "/assets/songs/Faasle.mp3", albumArt: "/assets/album-arts/Faasle.jpg", duration: null },
    { id: 6, title: "Farda", artist: "Bayaan", filePath: "/assets/songs/Farda.mp3", albumArt: "/assets/album-arts/bayaan.jpg", duration: null },
    { id: 7, title: "Hum Nadaan", artist: "Bayaan", filePath: "/assets/songs/Hum Nadaan.mp3", albumArt: "/assets/album-arts/Hum Nadaan.jpg", duration: null },
    { id: 8, title: "Ishq", artist: "Faheem Abdullah; Rauhan Malik; Amir Ameer", filePath: "/assets/songs/Ishq.mp3", albumArt: "/assets/album-arts/Ishq.jpg", duration: null },
    { id: 9, title: "Kahan Jaoon", artist: "Bayaan", filePath: "/assets/songs/Kahan Jaoon.mp3", albumArt: "/assets/album-arts/Kahan Jaoon.jpg", duration: null },
    { id: 10, title: "Khel Tamasha", artist: "Bayaan", filePath: "/assets/songs/Khel Tamasha.mp3", albumArt: "/assets/album-arts/Khel Tamasha.png", duration: null },
    { id: 11, title: "Lafz", artist: "Auj", filePath: "/assets/songs/Lafz.mp3", albumArt: "/assets/album-arts/Lafz.jpg", duration: null },
    { id: 12, title: "Mera Musafir", artist: "Bayaan", filePath: "/assets/songs/Mera Musafir.mp3", albumArt: "/assets/album-arts/Mera Musafir.jpg", duration: null },
    { id: 13, title: "Nahin Milta", artist: "Bayaan", filePath: "/assets/songs/Nahin Milta.mp3", albumArt: "/assets/album-arts/bayaan.jpg", duration: null },
    { id: 14, title: "Pardes Katenda", artist: "Adnan Dhool", filePath: "/assets/songs/Pardes Katenda.mp3", albumArt: "/assets/album-arts/Pardes Katenda.jpg", duration: null },
    { id: 15, title: "Sapna", artist: "Bayaan; Rovialo; Sherazam", filePath: "/assets/songs/Sapna.mp3", albumArt: "/assets/album-arts/Sapna.jpg", duration: null },
    { id: 16, title: "Suno", artist: "Bayaan", filePath: "/assets/songs/Suno.mp3", albumArt: "/assets/album-arts/Suno.jpg", duration: null },
    { id: 17, title: "Teri Tasveer", artist: "Bayaan; Rufus Shahzad", filePath: "/assets/songs/Teri Tasveer.mp3", albumArt: "/assets/album-arts/Teri Tasveer.jpg", duration: null },
    { id: 18, title: "Tifl", artist: "Bayaan", filePath: "/assets/songs/Tifl.mp3", albumArt: "/assets/album-arts/Tifl.jpg", duration: null }
];


// User Data
const userData = {
    songs: [...allSongs], // Copy of all songs for user data
    currentSong: null, // Currently playing song
    songCurrentTime: 0 // Current playback time of the song
};


// Render Songs
const renderSongs = (array) => {
    // Generate HTML for the song list and update the playlist display
    const songsHTML = array.map((song) => `
        <li id="song-${song.id}" class="playlist-song">
            <button class="playlist-song-info" onclick="playSong(${song.id})">
                <span class="playlist-song-album-art"><img src="${song.albumArt}" alt=""></span>
                <span class="playlist-song-title">${song.title}</span>
                <span class="playlist-song-artist">${song.artist}</span>
            </button>
        </li>
    `).join("");

    playlistSongs.innerHTML = songsHTML; // Update the inner HTML of the playlist
};


// Sort Songs
const sortSongs = () => {
    // Sort songs alphabetically by title
    userData?.songs.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }

        return 0;
    });
    return userData?.songs;
}


// Play Song
const playSong = (id) => {
    // Find the song by ID and play it
    const song = userData.songs.find((song) => song.id === id);
    if (!song) return; // Handle case where song is not found

    audio.src = song.filePath; // Set the audio source to the song's file path
    audio.title = song.title; // Set the audio title

    // Reset playback time if a new song is played
    if (!userData.currentSong || userData.currentSong.id !== song.id) {
        userData.songCurrentTime = 0;
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData.songCurrentTime; // Resume from the last played time
    }

    userData.currentSong = song; // Update the current song
    playButton.classList.add("playing"); // Add playing class to the play button
    updatePlayerDisplay(); // Update the player display with the current song info
    highlightCurrentSong();
    audio.play(); // Start playing the audio
};


// Pause Song
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime; // Save the current playback time
    playButton.classList.remove("playing"); // Remove playing class from the play button
    audio.pause(); // Pause the audio
};

// Play Next Song
const playNextSong = () => {
    // Get the index of the current song in the songs array
    const currentSongIndex = getCurrentSongIndex();

    if (userData?.currentSong === null || currentSongIndex === userData?.songs.length - 1) {  // Check if there is no current song or if the current song is the last in the list
        // If true, play the first song in the list
        playSong(userData?.songs[0].id);
    }
    else {
        // If not, get the next song in the list
        const nextSong = userData?.songs[currentSongIndex + 1];
        // Play the next song
        playSong(nextSong.id);
    }
}

// Play Previous Song
const playPreviousSong = () => {
    // Get the index of the current song and play the previous one
    const currentSongIndex = getCurrentSongIndex();
    if (currentSongIndex > 0) {
        const previousSong = userData.songs[currentSongIndex - 1]; // Get the previous song
        playSong(previousSong.id); // Play the previous song
    }
};

// Get Current Song Index
const getCurrentSongIndex = () => {
    return userData?.songs.indexOf(userData?.currentSong);
}

// Shuffle Songs
const shuffleSongs = () => {
    // Shuffle the songs and render the shuffled playlist
    const shuffledSongs = userData.songs.sort(() => 0.5 - Math.random());
    renderSongs(shuffledSongs);
    highlightCurrentSong();
};


// Update Player Display
const updatePlayerDisplay = () => {
    // Update the player display with the current song's information
    const currentSong = userData.currentSong;
    if (currentSong) {
        playerDisplayTitle.innerText = currentSong.title; // Update title display
        playerDisplayArtist.innerText = currentSong.artist; // Update artist display
        albumArtImage.src = currentSong.albumArt; // Update album art
    } else {
        playerDisplayTitle.innerText = "No song playing"; // Default message when no song is playing
        playerDisplayArtist.innerText = ""; // Clear artist display
        albumArtImage.src = "/assets/album-arts/default-album-art.jpg"; // Default album art
    }
};


// Highlight Current Song
const highlightCurrentSong = () => {
    // Clear previous highlights
    const playlistSongElements = document.querySelectorAll(".playlist-song");
    playlistSongElements.forEach((song) => {
        song.classList.remove("highlight"); // Remove highlight class from all songs
    });
    
    // Highlight the current song
    const currentSongId = userData?.currentSong?.id;
    const songToHighlight = document.getElementById(`song-${currentSongId}`);
    
    if (!songToHighlight.classList.contains("highlight")) {
        songToHighlight.classList.add("highlight"); // Add highlight class to the current song
    }
};


// Event Handlers
renderSongs(sortSongs()); // Render the sorted songs on initial load

// Add event listeners for button clicks
playButton.addEventListener("click", () => {
    if (userData.currentSong === null) {
        playSong(userData.songs[0].id); // Play the first song if none is currently playing
    } else {
        playSong(userData.currentSong.id); // Resume the current song
    }
});

pauseButton.addEventListener("click", pauseSong); // Pause the current song
nextButton.addEventListener("click", playNextSong); // Play the next song
previousButton.addEventListener("click", playPreviousSong); // Play the previous song
shuffleButton.addEventListener("click", shuffleSongs); // Shuffle the playlist
audio.addEventListener("ended", playNextSong); // Automatically play the next song when the current one ends