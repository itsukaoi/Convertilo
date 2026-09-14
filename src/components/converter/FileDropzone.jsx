import {
    PhotoIcon,
    MusicalNoteIcon,
    FilmIcon,
    CloudArrowUpIcon
} from "@heroicons/react/24/outline"

const FileDropzone = ({ inputRef, onFilesSelected, disabled }) => {
    const handleChange = (e) => {
        onFilesSelected(e.target.files)
        e.target.value = ""
    }

    const handleDrop = (e) => {
        e.preventDefault()

        if (disabled) return

        onFilesSelected(e.dataTransfer.files)
    }

    const handleClick = () => {
        if (!disabled) inputRef.current?.click()
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div
                className="relative border-2 border-dashed border-blue-300 rounded-2xl p-8 sm:p-12 bg-white/70 backdrop-blur-sm hover:bg-blue-50/70 cursor-pointer transition-all duration-300 hover:border-blue-400 hover:shadow-lg group"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={handleClick}
            >
                <input
                    type="file"
                    multiple
                    ref={inputRef}
                    className="hidden"
                    onChange={handleChange}
                    disabled={disabled}
                    accept="image/*,audio/*,video/*"
                />

                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                        <CloudArrowUpIcon className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                        Arrastra tus archivos aquí
                    </h3>
                    <p className="text-gray-600 mb-6">
                        o haz clic para seleccionar archivos
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <PhotoIcon className="w-4 h-4 text-blue-500" />
                            <span>Imágenes</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MusicalNoteIcon className="w-4 h-4 text-green-500" />
                            <span>Audio</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FilmIcon className="w-4 h-4 text-red-500" />
                            <span>Video</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileDropzone