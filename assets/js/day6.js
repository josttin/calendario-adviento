document.getElementById("moodForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    
    const mood = document.getElementById("mood").value;
    generatePlaylist(mood);
});

function generatePlaylist(mood) {
    let songs = [];
// Aquí agregamos más canciones para cada estado de ánimo
if (mood === "relajante") {
    songs = [
        { title: "Weightless - Marconi Union", url: "https://www.youtube.com/watch?v=UfcAVejslrU" },
        { title: "Sunset Lover - Petit Biscuit", url: "https://www.youtube.com/watch?v=4l7aClvqg8k" },
        { title: "Night Owl - Galimatias", url: "https://www.youtube.com/watch?v=VdIruY8Q4Kw" },
        { title: "Deja Vu - Giorgio Moroder", url: "https://www.youtube.com/watch?v=PAQm_JmY7p4" }, // Nuevo
        { title: "Cold Little Heart - Michael Kiwanuka", url: "https://www.youtube.com/watch?v=JHG41dzDdQI" }, // Nuevo
    ];
} else if (mood === "fiesta") {
    songs = [
        { title: "Uptown Funk - Mark Ronson ft. Bruno Mars", url: "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
        { title: "Shape of You - Ed Sheeran", url: "https://www.youtube.com/watch?v=JGwWNGJdvx8" },
        { title: "Despacito - Luis Fonsi ft. Daddy Yankee", url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk" },
        { title: "Bailando - Enrique Iglesias", url: "https://www.youtube.com/watch?v=NUsoVlDFqZg" }, // Nuevo
        { title: "Dákiti - Bad Bunny & Jhay Cortez", url: "https://www.youtube.com/watch?v=Eq_VvwQW_jo" }, // Nuevo
    ];
} else if (mood === "romántica") {
    songs = [
        { title: "Perfect - Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
        { title: "Just the Way You Are - Bruno Mars", url: "https://www.youtube.com/watch?v=LjhCEhWiKXk" },
        { title: "All of Me - John Legend", url: "https://www.youtube.com/watch?v=450p7goxZqg" },
        { title: "Te Amo - Franco de Vita", url: "https://www.youtube.com/watch?v=mOPge0LOzM4" }, // Nuevo
        { title: "Amor Eterno - Rocío Dúrcal", url: "https://www.youtube.com/watch?v=ce7ihDjj5m8" }, // Nuevo
    ];
} else if (mood === "motivacional") {
    songs = [
        { title: "Eye of the Tiger - Survivor", url: "https://www.youtube.com/watch?v=btPJPFnesV4" },
        { title: "Stronger - Kanye West", url: "https://www.youtube.com/watch?v=PsO6ZnUZI0g" },
        { title: "Don't Stop Believin' - Journey", url: "https://www.youtube.com/watch?v=1k8craCGpgs" },
        { title: "Rise Up - Andra Day", url: "https://www.youtube.com/watch?v=lwgr_IMeEgA" }, // Nuevo
        { title: "Fighter - Christina Aguilera", url: "https://www.youtube.com/watch?v=FJfJOfaIt1Y" }, // Nuevo
    ];
} else if (mood === "trabajo") {
    songs = [
        { title: "Get Lucky - Daft Punk", url: "https://www.youtube.com/watch?v=5NV6Rdv1a3I" },
        { title: "Happy - Pharrell Williams", url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
        { title: "Can't Stop the Feeling! - Justin Timberlake", url: "https://www.youtube.com/watch?v=ru0K8uYEZWw" },
        { title: "Vivir Mi Vida - Marc Anthony", url: "https://www.youtube.com/watch?v=YXnjXgkAlXM" }, // Nuevo
        { title: "La Vida es un Carnaval - Celia Cruz", url: "https://www.youtube.com/watch?v=DeXqyfVihTk" }, // Nuevo
        
    ];
} else if (mood === "viaje") {
    songs = [
        { title: "On the Road Again - Willie Nelson", url: "https://www.youtube.com/watch?v=E4Kz0KvqikI" },
        { title: "Send Me On My Way - Rusted Root", url: "https://www.youtube.com/watch?v=KATXJ2k5H6s" },
        { title: "Ride - Twenty One Pilots", url: "https://www.youtube.com/watch?v=Pw5Hawhkv-Q" },
        { title: "Ruta 66 - Chuck Berry", url: "https://www.youtube.com/watch?v=3Zl7gftv1p8" }, // Nuevo
        { title: "Life is a Highway - Tom Cochrane", url: "https://www.youtube.com/watch?v=YgKpq35vcP4" }, // Nuevo
    ];
} else if (mood === "nostalgia") {
    songs = [
        { title: "Yesterday - The Beatles", url: "https://www.youtube.com/watch?v=8v9b4qMmyyk" },
        { title: "Africa - Toto", url: "https://www.youtube.com/watch?v=FTQbiNvZqaY" },
        { title: "Take on Me - A-ha", url: "https://www.youtube.com/watch?v=djV11Xbc914" },
        { title: "Creep - Radiohead", url: "https://www.youtube.com/watch?v=XFkzRNyygfk" }, // Nuevo
        { title: "Smells Like Teen Spirit - Nirvana", url: "https://www.youtube.com/watch?v=hTWKbfoikeg" }, // Nuevo
    ];
}
    // Mostrar el resultado de la playlist
    const playlistContainer = document.getElementById("playlistResults");
    const playlistList = document.getElementById("playlist");
    playlistList.innerHTML = ""; // Limpiar la lista de canciones anterior

    songs.forEach(song => {
        const li = document.createElement("li");
        li.textContent = song.title;

        // Crear el botón de reproducción
        const playButton = document.createElement("button");
        playButton.classList.add("playButton");
        playButton.textContent = "Reproducir";
        playButton.onclick = () => openInNewTab(song.url);

        li.appendChild(playButton);
        playlistList.appendChild(li);
    });

    playlistContainer.classList.remove("hidden");
}

// Función para abrir la URL en una nueva ventana pequeña
function openInNewTab(url) {
    const width = 800;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(url, 'YouTube', `width=${width}, height=${height}, top=${top}, left=${left}`);
}
