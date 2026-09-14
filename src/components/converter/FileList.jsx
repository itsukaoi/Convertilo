import FileItem from "./FileItem"

const FileList = ({
    files,
    convertedFiles,
    loadingIndex,
    onConvert,
    onDelete,
    onFormatChange
}) => {
    return (
        <div className="grid gap-4 mb-8">
            {files.map((fileObj, index) => {
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
                        onConvert={onConvert}
                        onDelete={onDelete}
                        onFormatChange={onFormatChange}
                    />
                )
            })}
        </div>
    )
}

export default FileList