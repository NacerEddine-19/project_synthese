export default function Test({handleFileChange}) {
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
}