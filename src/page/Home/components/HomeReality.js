function HomeReality({ allUserList }) {
  return (
    <ul className="home-list-reality">
      {allUserList.length !== 0 &&
        allUserList.map((item) => (
          <li className="reality" key={item.id}>
            <div className="reality-pic-outside">
              <div className="reality-pic" id={item.id}>
                <img src={item.picture} alt={item.firstName} id={item.id} />
              </div>
            </div>
            <div className="reality-title" id={item.id}>
              <h5 id={item.id}>{item.firstName}</h5>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default HomeReality;
