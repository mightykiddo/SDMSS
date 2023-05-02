
const AdoptList = ({adopt, title}) => {
    return(
        <div>
            <h2>{title}</h2>
            {adopt.slice(0).reverse().map((adopt) => (
                <div className="adopt-preview" key={adopt.id}>
                    <h1>{adopt.name}</h1>
                    <p>Email: {adopt.email}</p>
                    <p>Contact Number: {adopt.contact}</p>
                    <p>Pet Name: {adopt.petname}</p>
                    <p>Reason: {adopt.reason}</p>
                    <p>ID: {adopt.id}</p>
                </div>    
            ))}
        </div>
    )
}

export default AdoptList;

