import { useState } from "react"
import { convertFile } from "../services/ffmpegService"
import { outputFormats, getMimeType } from "../constants/formats"

export const useFileConverter = () => {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const [convertedFiles, setConvertedFiles] = useState([])
    const [loadingIndex, setLoadingIndex] = useState(null)

    const addFiles = (files) => {
        const allowedTypes = ["image/", "audio/", "video/"]
        const newFiles = Array.from(files)
        const validFiles = []
        const invalidFiles = []

        newFiles.forEach((file) => {
            const isValid = allowedTypes.some((type) => file.type.startsWith(type))

            if (isValid) {
                const typeGroup = file.type.split("/")[0]

                validFiles.push({
                    id: crypto.randomUUID(),
                    file,
                    typeGroup,
                    outputFormat: outputFormats[typeGroup][0]
                })
            } else {
                invalidFiles.push(file.name)
            }
        })

        if (invalidFiles.length > 0) {
            setErrorMsg(`Los siguientes archivos no son válidos: ${invalidFiles.join(", ")}`)
        } else {
            setErrorMsg("")
        }

        setSelectedFiles((prev) => [...prev, ...validFiles])
    }

    const convertSingleFile = async (fileObj, index) => {
        const { file, outputFormat } = fileObj

        setLoadingIndex(index)
        setErrorMsg("")

        try {
            const data = await convertFile(file, outputFormat)
            const blob = new Blob([data], { type: getMimeType(outputFormat) })
            const url = URL.createObjectURL(blob)
            const baseName = file.name.replace(/\.[^/.]+$/, "")
            const downloadName = `${baseName}.${outputFormat}`

            setConvertedFiles((prev) => {
                const previous = prev.find((converted) => converted.sourceId === fileObj.id)

                if (previous) {
                    URL.revokeObjectURL(previous.url)
                }

                return [
                    ...prev.filter((converted) => converted.sourceId !== fileObj.id),
                    {
                        sourceId: fileObj.id,
                        name: downloadName,
                        url
                    }
                ]
            })
        } catch (error) {
            console.error("Error al convertir archivo:", error)
            setErrorMsg(`No se pudo convertir "${file.name}". Intentá nuevamente.`)
        } finally {
            setLoadingIndex(null)
        }
    }

    const changeOutputFormat = (id, index, newFormat) => {
        setSelectedFiles((prev) =>
            prev.map((file, i) => i === index ? { ...file, outputFormat: newFormat } : file)
        )

        setConvertedFiles((prev) => {
            const converted = prev.find((file) => file.sourceId === id)

            if (converted) {
                URL.revokeObjectURL(converted.url)
            }

            return prev.filter((file) => file.sourceId !== id)
        })
    }

    const deleteFile = (index) => {
        const fileToDelete = selectedFiles[index]

        if (!fileToDelete) return

        setConvertedFiles((prev) => {
            const converted = prev.find((file) => file.sourceId === fileToDelete.id)

            if (converted) {
                URL.revokeObjectURL(converted.url)
            }

            return prev.filter((file) => file.sourceId !== fileToDelete.id)
        })

        setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const clearAll = () => {
        convertedFiles.forEach(({ url }) => {
            URL.revokeObjectURL(url)
        })

        setSelectedFiles([])
        setConvertedFiles([])
        setErrorMsg("")
        setLoadingIndex(null)
    }

    const downloadAll = () => {
        convertedFiles.forEach(({ name, url }) => {
            const link = document.createElement("a")
            link.href = url
            link.download = name
            document.body.appendChild(link)
            link.click()
            link.remove()
        })
    }

    return {
        selectedFiles,
        convertedFiles,
        errorMsg,
        loadingIndex,
        addFiles,
        convertSingleFile,
        changeOutputFormat,
        deleteFile,
        clearAll,
        downloadAll
    }
}