export const outputFormats = {
    image: ["jpg", "jpeg", "png", "webp", "bmp", "ico", "tiff"],
    audio: ["mp3", "aac", "flac", "wav", "ogg", "wma", "m4a"],
    video: ["mp4", "webm", "avi", "mov", "mkv", "flv", "m4v"]
}

export const getMimeType = (format) => {
    const mimeTypes = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
        bmp: "image/bmp",
        ico: "image/x-icon",
        tiff: "image/tiff",
        mp3: "audio/mpeg",
        aac: "audio/aac",
        flac: "audio/flac",
        wav: "audio/wav",
        ogg: "audio/ogg",
        wma: "audio/x-ms-wma",
        m4a: "audio/mp4",
        mp4: "video/mp4",
        webm: "video/webm",
        avi: "video/x-msvideo",
        mov: "video/quicktime",
        mkv: "video/x-matroska",
        flv: "video/x-flv",
        m4v: "video/x-m4v"
    }

    return mimeTypes[format] || "application/octet-stream"
}