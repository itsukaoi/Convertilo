import {
    PhotoIcon,
    MusicalNoteIcon,
    FilmIcon,
    DocumentIcon,
    ArrowDownTrayIcon,
    TrashIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline"

import { outputFormats } from "../../constants/formats"

const FileItem = ({
    fileObj,
    index,
    converted,
    loadingIndex,
    onConvert,
    onDelete,
    onFormatChange
}) => {
    const getIcon = (type) => {
        if (type === "image") return <PhotoIcon className="w-6 h-6 text-blue-500" />
        if (type === "audio") return <MusicalNoteIcon className="w-6 h-6 text-green-500" />
        if (type === "video") return <FilmIcon className="w-6 h-6 text-red-500" />
        return <DocumentIcon className="w-6 h-6 text-gray-500" />
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">{getIcon(fileObj.typeGroup)}</div>

                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {fileObj.file.name}
                        </p>

                        <p className="text-xs text-gray-500">
                            {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <select
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                        value={fileObj.outputFormat}
                        disabled={loadingIndex !== null}
                        onChange={(e) => onFormatChange(fileObj.id, index, e.target.value)}
                    >
                        {outputFormats[fileObj.typeGroup].map((format) => (
                            <option key={format} value={format}>
                                .{format.toUpperCase()}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => onConvert(fileObj, index)}
                        disabled={loadingIndex !== null}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
                    >
                        {loadingIndex === index && (
                            <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        )}

                        {loadingIndex === index ? "Convirtiendo..." : "Convertir"}
                    </button>

                    {converted && (
                        <a
                            href={converted.url}
                            download={converted.name}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Descargar
                        </a>
                    )}

                    <button
                        onClick={() => onDelete(index)}
                        disabled={loadingIndex !== null}
                        className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FileItem