const UserCard = ({ user }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {user &&
        user.map((item) => (
          <div className="card bg-base-300 w-96 shadow-sm" key={item.firstName}>
            <figure>
              <img
                src={item.photoUrl}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {item.firstName} {item.lastName}
              </h2>
              <p>{item.age}</p>
              <p>
                {item.about}
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary">Interested</button>
                <button className="btn btn-primary">Ignore</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserCard;
