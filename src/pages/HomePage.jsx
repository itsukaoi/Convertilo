"use client"

import { useRef } from "react"
import {
    PlusCircleIcon,
    ExclamationTriangleIcon,
    ArrowDownTrayIcon,
    TrashIcon,
} from "@heroicons/react/24/outline"

import { useFileConverter } from "../hooks/useFileConverter"

import FileDropzone from "../components/converter/FileDropzone"
import FileItem from "../components/converter/FileItem"

const HomePage = () => {
    const fileInputRef = useRef(null)

    const {
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
    } = useFileConverter()


    const handleChange = (e) => {
        addFiles(e.target.files)
        e.target.value = ""
    }

    const handleClick = () => fileInputRef.current?.click()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-12">
            <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold ">
                            Conversor de Archivos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Gratis</span> e <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Ilimitado</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Convertí tus archivos multimedia de forma rápida y sencilla. Soporta imágenes, audio y video con conversión instantánea.
                        </p>
                    </div>

                    {/* Error Message */}
                    {errorMsg && (
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3 shadow-sm">
                                <ExclamationTriangleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{errorMsg}</span>
                            </div>
                        </div>
                    )}

                    {/* Upload Area or File List */}
                    {selectedFiles.length === 0 ? (
                        <FileDropzone
                            inputRef={fileInputRef}
                            onFilesSelected={addFiles}
                            disabled={loadingIndex !== null}
                        />
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            {/* File List */}
                            <div className="grid gap-4 mb-8">
                                {selectedFiles.map((fileObj, index) => {
                                    const converted = convertedFiles.find(
                                        (file) => file.sourceId === fileObj.id
                                    )

                                    return (
                                        <FileItem
                                            key={fileObj.id}
                                            fileObj={fileObj}
                                            index={index}
                                            converted={converted}
                                            loadingIndex={loadingIndex}
                                            onConvert={convertSingleFile}
                                            onDelete={deleteFile}
                                            onFormatChange={changeOutputFormat}
                                        />
                                    )
                                })}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={handleClick}
                                    disabled={loadingIndex !== null}
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                                >
                                    <PlusCircleIcon className="w-5 h-5" />
                                    Agregar archivos
                                </button>

                                {convertedFiles.length > 0 && (
                                    <button
                                        onClick={downloadAll}
                                        disabled={loadingIndex !== null}
                                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                                    >
                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                        Descargar todos
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        clearAll()

                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = ""
                                        }
                                    }}
                                    disabled={loadingIndex !== null}
                                    className="inline-flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                    Limpiar lista
                                </button>
                            </div>

                            <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleChange} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage