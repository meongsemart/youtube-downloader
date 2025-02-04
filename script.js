function generateDownloadLink() {
    let url = document.getElementById("youtubeUrl").value;
    let videoId = extractVideoId(url);

    if (videoId) {
        // Menampilkan preview video
        let embedUrl = `https://www.youtube.com/embed/${videoId}`;
        document.getElementById("youtubePlayer").src = embedUrl;
        document.getElementById("previewSection").style.display = "block";

        // Mendapatkan nama video otomatis dari YouTube API
        fetchVideoTitle(videoId);

        // Link download langsung
        let downloadUrl = `https://savefrom.net/download?url=https://www.youtube.com/watch?v=${videoId}`;
        document.getElementById("downloadLink").href = downloadUrl;
        document.getElementById("downloadLink").download = '';  // Mengaktifkan download otomatis
        document.getElementById("downloadSection").style.display = "block";
    } else {
        alert("Masukkan URL YouTube yang valid!");
    }
}

function extractVideoId(url) {
    let regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    let match = url.match(regex);
    return match ? match[1] : null;
}

function fetchVideoTitle(videoId) {
    const apiKey = 'AIzaSyCjtCAzy7pq22Kdnfb5g7S_QR2ejjmTtes';  // Ganti dengan API Key Anda
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const title = data.items[0].snippet.title;
                document.getElementById("videoTitle").innerText = title;
            } else {
                alert("Video tidak ditemukan.");
            }
        })
        .catch(error => {
            alert("Terjadi kesalahan saat mengambil data video.");
            console.error(error);
        });
}
