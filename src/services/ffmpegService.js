import { FFmpeg } from "@ffmpeg/ffmpeg"
import ffmpegWorkerURL from "@ffmpeg/ffmpeg/worker?worker&url"
import { fetchFile, toBlobURL } from "@ffmpeg/util"

const ffmpeg = new FFmpeg()

let loaded = false
let loadPromise = null

const loadFFmpeg = async () => {
    if (loaded) return

    if (!loadPromise) {
        loadPromise = (async () => {
            const baseURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm"

            const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript")
            const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm")

            await ffmpeg.load({
                coreURL,
                wasmURL,
                classWorkerURL: ffmpegWorkerURL
            })

            loaded = true
        })()
    }

    try {
        await loadPromise
    } catch (error) {
        loadPromise = null
        loaded = false
        throw error
    }
}

export const convertFile = async (file, outputFormat) => {
    await loadFFmpeg()

    const jobId = crypto.randomUUID()
    const extension = file.name.includes(".") ? file.name.split(".").pop() : "input"
    const inputName = `input-${jobId}.${extension}`
    const outputName = `output-${jobId}.${outputFormat}`

    try {
        await ffmpeg.writeFile(inputName, await fetchFile(file))

        const exitCode = await ffmpeg.exec([
            "-i",
            inputName,
            outputName
        ])

        if (exitCode !== 0) {
            throw new Error(`FFmpeg terminó con código ${exitCode}`)
        }

        const data = await ffmpeg.readFile(outputName)

        if (!(data instanceof Uint8Array)) {
            throw new Error("FFmpeg devolvió un tipo de archivo inesperado")
        }

        return data
    } finally {
        try {
            await ffmpeg.deleteFile(inputName)
        } catch {
            //the file might not be created
        }

        try {
            await ffmpeg.deleteFile(outputName)
        } catch {
            //the file might not be created
        }
    }
}