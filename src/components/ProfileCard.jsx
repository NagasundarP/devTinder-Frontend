const ProfileCard = ({user}) => {
    console.log(user)
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm" key={user.firstName}>
        <figure>
          <img src={user.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.age}</p>
          <p>{user.about}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Interested</button>
            <button className="btn btn-primary">Ignore</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
