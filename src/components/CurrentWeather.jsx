const CurrentWeather = ({
  location: { name, region, country },
  current: {
    condition: { text },
  },
  temperature,
}) => {
  return (
    <>
      <div className="location">
        <div>{`${name} - ${region}`}</div>
        <p>{country}</p>
      </div>
      <div className="temperature">{temperature}</div>
      <div className="description">{text}</div>
    </>
  );
};

export default CurrentWeather;
