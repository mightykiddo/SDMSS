
const ReleaseList = ({release, title}) => {
    return(
        <div>
            <h2>{title}</h2>
            {release.slice(0).reverse().map((release) => (
                <div className="release-preview" key={release.id}>
                    <h1>{release.name}</h1>
                    <p>Email: {release.email}</p>
                    <p>Contact Number: {release.contact}</p>
                    <p>Pet Name: {release.petname}</p>
                    <p>Pet Type: {release.pettype}</p>
                    <p>Health Status: {release.status}</p>
                    <p>Reason: {release.reason}</p>
                    <p>ID: {release.id}</p>
                </div>    
            ))}
        </div>
    )
}

export default ReleaseList;
